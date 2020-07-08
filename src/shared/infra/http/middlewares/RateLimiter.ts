import {Request, Response, NextFunction} from 'express'
import {RateLimiterRedis} from 'rate-limiter-flexible';
import redis from 'redis';
import Error from '@shared/errors/AppError';

;const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD || undefined,
});

const limeter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction): Promise<void>{
  try{
    await limeter.consume(request.ip);
    return next();
  }catch (error){
    throw new Error('Too Many request ', 429);
  }
}

export default rateLimiter;
