module.exports = function setupHooks(context) {
  const { compiler } = context;

  // Webpack 4+ exposes `compiler.hooks`
  if (compiler.hooks && compiler.hooks.invalid && compiler.hooks.done) {
    compiler.hooks.invalid.tap("DevMiddleware", () => {
      context.state = false;
    });

    compiler.hooks.done.tap("DevMiddleware", (stats) => {
      context.stats = stats;
      context.state = true;
      context.callbacks.forEach((cb) => cb(stats));
      context.callbacks = [];
    });
  } else {
    // Webpack 3 fallback
    compiler.plugin("invalid", () => {
      context.state = false;
    });

    compiler.plugin("done", (stats) => {
      context.stats = stats;
      context.state = true;
      context.callbacks.forEach((cb) => cb(stats));
      context.callbacks = [];
    });
  }
};
