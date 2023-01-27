import type EventEmitter from 'events';
import { createClient } from 'redis';

const client = createClient({ url: import.meta.env.REDIS_URI });

(client as EventEmitter).on('error', (err: any) => console.log('Redis Client error', err));
(client as EventEmitter).on('connect', () => console.log('Redis Client connected'));

await client.connect();

export default client;
