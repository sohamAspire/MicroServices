import genericController from './generic-controller/generic.controller'
import genericRouter from './generic-router/generic.router'
import logger from './logger/logger'
import redisClient from './redis/redisClient'
import initializeMetrics from './prometheus/prometheus.config'

export { genericController, genericRouter, logger, initializeMetrics, redisClient }