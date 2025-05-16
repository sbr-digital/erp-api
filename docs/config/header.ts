import { SERVERS } from '@/constants'
import { env } from '@/infra'

export const header = {
  openapi: '3.0.1',
  info: {
    title: 'Docs - ERP NJAA',
    description: 'API for the ONG NJAA Management System',
    version: '1.0.0',
    termsOfService: 'https://njaa.ong.br',
    contact: {
      name: 'support',
      email: 'contato@sbrdigital.com.br',
      url: 'https://njaa.ong.br',
    },
  },
  servers: [SERVERS[env.NODE_ENV]],
  tags: [
    {
      name: 'Address',
      description: 'Routes about addresses',
    },
    {
      name: 'Auth',
      description: 'Routes about authentication',
    },
    {
      name: 'Person',
      description: 'Routes about person',
    },
    {
      name: 'Users',
      description: 'Routes about users',
    },
    {
      name: 'Private',
      description: 'Testing private route',
    },
  ],
}
