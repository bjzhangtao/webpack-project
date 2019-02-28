## webpack-project

> 功能
- js/jsx：通过babel转译打包；
- sass/css：打包、压缩、提取；
- images：压缩、base64、雪碧图；
- 测试服务：热更新、代理、动态生成html；
- sourceMap开启；
- 开发生产环境同config，通过NODE_ENV区分；
- 打包前自动清理dist；
> 开发
- 初始化：`npm install`或 `yarn / yarn install`;
- 本地测试：`npm run dev` 或 `yarn run dev`;
- 打包：`npm run build` 或 `yarn run build`;

>目录
- /src：主要开发目录；
- /dist：打包完上线目录；