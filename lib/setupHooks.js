'use strict';

module.exports = function setupHooks(context) {
  const { compiler } = context;

  if (compiler.hooks) {
    compiler.hooks.invalid.tap('webpack-dev-middleware', () => {
      context.state = false;
    });

    compiler.hooks.done.tap('webpack-dev-middleware', (stats) => {
      context.state = true;
      context.webpackStats = stats;

      // Execute any callbacks waiting for a valid build
      context.callbacks.forEach((cb) => cb(stats));
      context.callbacks = [];
    });
  }
};
