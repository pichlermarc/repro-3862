# Reproducer for https://github.com/open-telemetry/opentelemetry-js/issues/3862

**How to run**

- `npm ci`
- `npm run start`
- `http.route` is not available on metrics when the trace SDK is not registered, this is because no `ContextManager` is 
registered when no trace SDK is set up.

**A workaround** 

A workaround exists for this: manually setting up a `ContextManager` - to do so, simply do this before setting up your SDK

```ts
import {context} from "@opentelemetry/api";
import {AsyncLocalStorageContextManager} from "@opentelemetry/context-async-hooks";

// manually setting a context manager to replace the no-op context manager
context.setGlobalContextManager(new AsyncLocalStorageContextManager())
```
