import 'reflect-metadata'
import { lookup } from 'geoip-lite'
import { FastifyReply } from 'fastify'
import { container } from 'tsyringe'

import { CONTAINER } from '@/constants'
import { FastifyErrorHandler } from '@/errors'
import { env } from '@/infra'
import { DependencyInjection } from '@/infra/container'
import {
  FastifyServer,
  CorsMiddleware,
  CookiesMiddleware,
  HelmetMiddleware,
  JwtMiddleware,
  RateLimitMiddleware,
  verifyToken,
  verifyUserRole,
} from '@/infra/http/fastify'
import {
  addressRoutes,
  authenticationRoutes,
  serverRoutes,
  personRoutes,
  userRoutes,
} from '@/infra/http/routes'

DependencyInjection.botstrap()

export const server = new FastifyServer()

server.registerMiddlewares([
  new JwtMiddleware(),
  new CookiesMiddleware(),
  new CorsMiddleware(),
  new HelmetMiddleware(),
  new RateLimitMiddleware(),
])

server.registerRoutes([
  addressRoutes,
  authenticationRoutes,
  serverRoutes,
  personRoutes,
  userRoutes,
])

server.registerErrorHandler([new FastifyErrorHandler()])

server.instance.addHook('onRequest', (req, reply, done) => {
  let xForwardedFor = req.headers['x-forwarded-for']
  xForwardedFor =
    xForwardedFor && typeof xForwardedFor === 'string'
      ? xForwardedFor.split(',')[0]
      : xForwardedFor && xForwardedFor[0]

  const clientIp = xForwardedFor ?? req.ip

  const geolocation = lookup(clientIp)

  const routeIsBlocked = env.BLOCK_PREFIXES.some((prefix) =>
    req.url.startsWith(prefix),
  )

  const userAgentBlocked = [
    'python-requests/',
    'Expanse, a Palo Alto Networks',
    'CensysInspect/',
    'Custom-AsyncHttpClient',
  ].some(
    (prefix) =>
      req.headers['user-agent'] && req.headers['user-agent'].startsWith(prefix),
  )

  if (routeIsBlocked || req.url === '/' || userAgentBlocked) {
    server.fatifyLogger.warn(
      JSON.stringify({
        method: req.method,
        url: req.url,
        ip: clientIp,
        country: geolocation?.country,
        city: geolocation?.city,
        region: geolocation?.region,
        timezone: geolocation?.timezone,
        user: req.user?.sub ?? 'N/A',
        userAgent: req.headers['user-agent'],
      }),
    )
    return reply.status(403).send({ error: 'Forbidden' })
  }

  done()
})

server.instance.addHook('preHandler', async (req, reply) => {
  container.register(CONTAINER.HTTP.REQUEST, { useValue: req })
  container.register(CONTAINER.HTTP.REPLY, { useValue: reply })
})

server.instance.addHook('onRequest', (req, reply, done) => {
  let xForwardedFor = req.headers['x-forwarded-for']
  xForwardedFor =
    xForwardedFor && typeof xForwardedFor === 'string'
      ? xForwardedFor.split(',')[0]
      : xForwardedFor && xForwardedFor[0]
  const clientIp = xForwardedFor ?? req.ip
  const geolocation = lookup(clientIp)

  server.fatifyLogger.info(
    JSON.stringify({
      method: req.method,
      url: req.url,
      ip: clientIp,
      country: geolocation?.country,
      city: geolocation?.city,
      region: geolocation?.region,
      timezone: geolocation?.timezone,
      user: req.user?.sub ?? 'N/A',
      userAgent: req.headers['user-agent'],
    }),
  )

  done()
})

server.instance.get(
  '/private',
  { onRequest: [verifyToken, verifyUserRole('ADMIN')] },
  (_, reply: FastifyReply) =>
    reply.status(200).send({ message: 'testing authorization' }),
)
