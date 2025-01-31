// // src/redis-client.js

// const Redis = require('ioredis');

// // Create a Redis client and connect to the Redis server
// const redis = new Redis({
//   host: 'localhost',   // Redis server host (can be an IP address or domain)
//   port: 6379,          // Redis server port
//   password: 'your_password', // Optional: Password if Redis requires authentication
//   db: 0,               // Database index
//   lazyConnect: true,   // Avoids auto-connection
// });

// // Set data in Redis (key-value pair)
// const setData = async (key, value) => {
//   try {
//     await redis.set(key, value);
//     console.log(`Data set for key: ${key}`);
//   } catch (err) {
//     console.error(`Error setting data for key: ${key}`, err);
//   }
// };

// // Get data from Redis by key
// const getData = async (key) => {
//   try {
//     const data = await redis.get(key);
//     if (data === null) {
//       console.log(`No data found for key: ${key}`);
//       return null;
//     }
//     return data;
//   } catch (err) {
//     console.error(`Error getting data for key: ${key}`, err);
//   }
// };

// // Remove data from Redis (delete key-value pair)
// const removeData = async (key) => {
//   try {
//     const result = await redis.del(key);
//     if (result === 1) {
//       console.log(`Data removed for key: ${key}`);
//     } else {
//       console.log(`No data found for key: ${key}`);
//     }
//   } catch (err) {
//     console.error(`Error removing data for key: ${key}`, err);
//   }
// };

// // Check if a key exists in Redis
// const keyExists = async (key) => {
//   try {
//     const exists = await redis.exists(key);
//     return exists === 1;
//   } catch (err) {
//     console.error(`Error checking existence of key: ${key}`, err);
//   }
// };

// // Close Redis connection gracefully
// const close = async () => {
//   try {
//     await redis.quit();
//     console.log('Redis client connection closed');
//   } catch (err) {
//     console.error('Error closing Redis connection', err);
//   }
// };

// // Export the Redis functions
// module.exports = {
//   setData,
//   getData,
//   removeData,
//   keyExists,
//   close,
// };
