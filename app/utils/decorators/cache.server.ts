import { redisClient } from '~/redis/config.server';

export function Cache(key: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any) {
      const id = JSON.stringify(args);
      const cachedData = await redisClient.get(`${key}:${id}`);
      if (cachedData) {
        return cachedData ? JSON.parse(cachedData) : null;
      }

      const data = await originalMethod.apply(this, args);
      if (!data) return data;

      await redisClient.set(`${key}:${id}`, JSON.stringify(data), 'EX', 600);
      return data;
    };

    return descriptor;
  };
}
