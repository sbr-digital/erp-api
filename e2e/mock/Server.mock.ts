import { FastifyInstance, LightMyRequestResponse } from 'fastify'

import { server as app } from '@/app'

interface MockConfig {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  body?: Record<string, unknown>
  cookies?: { [k: string]: string }
  headers?: { [k: string]: string }
}

/**
 * A mock server for testing purposes.
 */
export class MockServer {
  private _instance: FastifyInstance

  constructor() {
    this._instance = app.instance
  }

  /**
   * Initializes the mock server.
   */
  async initialize() {
    this._instance = app.instance
    await this._instance.ready()
  }

  /**
   * Returns the Fastify instance of the mock server.
   *
   * @returns {FastifyInstance} The Fastify instance.
   * @throws {Error} If the server is not initialized.
   */
  get instance() {
    if (!this._instance) {
      throw new Error('Server not initialized')
    }
    return this._instance
  }

  /**
   * Parses the URL path and replaces placeholders with actual values.
   *
   * @param {string} path - The URL path with placeholders.
   * @param {object} params - This object optionally contains key-value pairs to replace the placeholders in the path.
   * @return {string} The parsed URL path with actual values replacing the placeholders.
   */
  parseUrl({
    path,
    params,
  }: {
    path: string
    params?: { [key: string | number]: string | number }
  }): string {
    let formattedUrl = path

    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = params[key]
        formattedUrl = formattedUrl.replace(`:${key}`, value.toString())
      }
    }
    return formattedUrl
  }

  /**
   * Sends a request to the mock server.
   *
   * @param {Partial<MockConfig>} config - The configuration for the request.
   * @param {Body} [config.body] - The request body.
   * @returns {Promise<LightMyRequestResponse>} - The response from the server.
   */
  async request({
    method,
    url,
    body,
    cookies,
    headers,
  }: MockConfig): Promise<LightMyRequestResponse> {
    const response = await this.instance.inject({
      method,
      url,
      body,
      headers,
      cookies,
    })

    return response
  }

  /**
   * Closes the mock server.
   */
  async close() {
    await this._instance.close()
  }
}
