const path = require("path");

module.exports = {
  plugins: {
    '@pandacss/dev/postcss': {
      cwd: __dirname,
      configPath: path.resolve(__dirname, './panda.config.ts'),
    },
  },
}
