import {ConsoleMetricExporter, PeriodicExportingMetricReader} from '@opentelemetry/sdk-metrics';
import {NodeSDK} from '@opentelemetry/sdk-node';
import {HttpInstrumentation} from '@opentelemetry/instrumentation-http';
import {ExpressInstrumentation} from '@opentelemetry/instrumentation-express';

new NodeSDK({
    instrumentations: [
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
    ],
    metricReader: new PeriodicExportingMetricReader({
        exportIntervalMillis: 1000,
        exporter: new ConsoleMetricExporter(),
    }),
}).start();