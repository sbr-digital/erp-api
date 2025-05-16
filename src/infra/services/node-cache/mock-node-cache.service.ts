import NodeCache from 'node-cache'

import { ICacheService } from '@/core/domain/services/i-cache-service'

export const cacheConfig = {
  stdTTL: 600, // Tempo de vida padrão em segundos (10 minutos)
  checkperiod: 120, // Período de verificação em segundos (2 minutos)
}

export class MockNodeCacheService<T> implements ICacheService<T> {
  private cache: NodeCache

  constructor() {
    this.cache = new NodeCache({
      stdTTL: cacheConfig.stdTTL,
      checkperiod: cacheConfig.checkperiod,
    })
  }

  get(): T {
    return false as T
  }

  set(): void {}

  delete(): void {}

  purgeKeys(): void {}
}
