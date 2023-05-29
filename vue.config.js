const { defineConfig } = require('@vue/cli-service');
let BASE_URL = process.env.NODE_ENV === 'production' ? '/aurora-management/' : '/'
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: BASE_URL
});
