import Redis from 'ioredis';

const RedisClient = (() => {
    let redisInstance: Redis | null = null;

    const initialize = ({ host, port, password, db }: { host: string; port: number; password?: string; db?: number }) => {
        if (redisInstance) {
            throw new Error('Redis is already initialized.');
        }

        redisInstance = new Redis({
            host,
            port,
            password,
            db,
            lazyConnect: true,
        });

        console.log('Redis connection initialized.');
    };

    const setData = async (key: string, value: string) => {
        ensureInitialized();
        await redisInstance!.set(key, value);
    };

    const getData = async (key: string) => {
        ensureInitialized();
        const data = await redisInstance!.get(key);
        return data !== null ? data : null;
    };

    const removeData = async (key: string) => {
        ensureInitialized();
        return await redisInstance!.del(key);
    };

    const keyExists = async (key: string) => {
        ensureInitialized();
        const exists = await redisInstance!.exists(key);
        return exists === 1;
    };

    const close = async () => {
        if (redisInstance) {
            await redisInstance.quit();
            redisInstance = null;
            console.log('Redis connection closed.');
        }
    };

    const ensureInitialized = () => {
        if (!redisInstance) {
            throw new Error('Redis instance is not initialized. Please initialize it first.');
        }
    };

    return {
        initialize,
        setData,
        getData,
        removeData,
        keyExists,
        close,
    };
})();

export default RedisClient;
