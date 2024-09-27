import {ConsoleMetricExporter, PeriodicExportingMetricReader} from '@opentelemetry/sdk-metrics';
import {NodeSDK} from '@opentelemetry/sdk-node';
import {HttpInstrumentation} from '@opentelemetry/instrumentation-http';
import {ExpressInstrumentation} from '@opentelemetry/instrumentation-express';
import {context} from "@opentelemetry/api";
import {AsyncLocalStorageContextManager} from "@opentelemetry/context-async-hooks";

// manually setting a context manager to replace the no-op context manager
context.setGlobalContextManager(new AsyncLocalStorageContextManager())

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