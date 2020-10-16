import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn:
      "https://7b36fa3caec946de9cb9b71517b23258@o461699.ingest.sentry.io/5463832",
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

function log(err) {
  Sentry.captureException(err);
}

export default {
  init: init,
  log: log,
};
