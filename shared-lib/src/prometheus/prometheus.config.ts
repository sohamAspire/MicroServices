import { NextFunction, Request, Response , Express } from 'express';
import client from 'prom-client';

const initializeMetrics = (app: Express) => {

    // Default Registry
    const register = new client.Registry();

    // Create custom metrics
    const httpRequestCounter = new client.Counter({
        name: 'http_requests_total',
        help: 'Total number of HTTP requests',
        labelNames: ['method', 'route', 'status_code'],
    });

    const httpRequestDurationHistogram = new client.Histogram({
        name: 'http_request_duration_seconds',
        help: 'Histogram of HTTP request durations in seconds',
        labelNames: ['method', 'route'],
        buckets: [0.1, 0.5, 1, 2.5, 5, 10],
    });

    const memoryUsageGauge = new client.Gauge({
        name: 'process_memory_usage_bytes',
        help: 'Current memory usage of the process in bytes',
    });

    setInterval(() => {
        memoryUsageGauge.set(process.memoryUsage().heapUsed);
    }, 10000);

    const cpuUsageCounter = new client.Counter({
        name: 'process_cpu_seconds_total',
        help: 'Total CPU time spent by the process in seconds',
    });

    setInterval(() => {
        const cpuUsage = process.cpuUsage();
        cpuUsageCounter.inc(cpuUsage.user / 1e6);
    }, 10000);

    const errorCounter = new client.Counter({
        name: 'errors_total',
        help: 'Total number of errors encountered',
        labelNames: ['type'],
    });

    register.registerMetric(errorCounter);
    register.registerMetric(cpuUsageCounter);
    register.registerMetric(memoryUsageGauge);
    register.registerMetric(httpRequestCounter);
    register.registerMetric(httpRequestDurationHistogram);

    app.get('/metrics', async (req: any, res: any) => {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    });

    // Middleware to increment the counter
    app.use((req : Request, res : Response, next : NextFunction) => {
        const endTimer = httpRequestDurationHistogram.startTimer();
        res.on('finish', () => {
            httpRequestCounter.inc();
            endTimer({ method: req.method, route: req.originalUrl });
        });
        next();
    });

    console.log('--------------Metrics endpoint initialized at /metrics-----------------------------------------------------------');
}

// Export the metrics and the initialization function
export default initializeMetrics;
