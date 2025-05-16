import NodeCache from 'node-cache'

import { ICacheService } from '@/core/domain'
import { env } from '@/infra/env'

const cacheConfig = {
  stdTTL: 600, // Tempo de vida padrão em segundos (10 minutos)
  checkperiod: 120, // Período de verificação em segundos (2 minutos)
}

export class NodeCacheService<T> implements ICacheService<T> {
  private cache: NodeCache
  private isActive: boolean

  constructor() {
    this.cache = new NodeCache({
      stdTTL: cacheConfig.stdTTL,
      checkperiod: cacheConfig.checkperiod,
    })
    this.isActive = env.ACTIVE_CACHE
  }

  get(key: string): T {
    if (!this.isActive) return false as T

    return this.cache.get(key) as T
  }

  set(key: string, value: T): void {
    if (!this.isActive) return

    this.cache.set(key, value)
  }

  delete(key: string): void {
    if (!this.isActive) return

    this.cache.del(key)
  }

  purgeKeys(keys: string[]): void {
    if (!this.isActive) return

    keys.forEach((key) => {
      this.cache.del(key)
    })
  }
}
