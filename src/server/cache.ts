import type EventEmitter from 'events';
import { createClient, type SetOptions } from 'redis';

const DEFAULT_CACHE_EX = 30;

class Cache {
  private client = createClient({ url: import.meta.env.REDIS_URI || process.env.REDIS_URI });
  private isConnected = false;

  constructor() {
    (this.client as EventEmitter).on('connect', () => console.log('Redis Client connected'));
  }

  async get(key: string) {
    await this.ensureConnection();
    return this.client.get(key);
  }

  async set(key: string, value: string, opts: SetOptions) {
    await this.ensureConnection();
    await this.client.set(key, value, { EX: opts?.EX ?? DEFAULT_CACHE_EX });
  }

  private async ensureConnection() {
    if (this.isConnected) return;

    try {
      await this.client.connect();
      this.isConnected = true;
    } catch (err) {
      await this.client.disconnect();
      throw err;
    }
  }
}

export default new Cache();
