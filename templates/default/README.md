<h1 align="center">my Project</h1>

ping 检测

- dev: xxxxxxx/ping
- test: xxxxxxx/ping

前端域名 :

- dev: xxxxxxx
- test: xxxxxxx
- uat: xxxxxxx
- prod: xxxxxxx

## 说明

该项目基于 node 框架 koa2, 其取代原有 ng 配置
我们的技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[koa2](https://koa.bootcss.com/)、 [React](http://facebook.github.io/react/)、[UmiJS](https://umijs.org/)、[dva](http://github.com/dvajs/dva)、和 [antd](https://ant.design/docs/react/introduce-cn)。

## 开发环境

先安装依赖，

```js
$ npm install
$ cd web
$ npm install
$ cd ../
```

然后运行 `npm run dev` dev 环境  
或者运行 `npm run test` 测试环境

在浏览器打开

- [http://localhost:8008/]

## SSR 渲染本地构建测试

```js
$ npm run builddev
```

然后运行 `npm run d` dev 环境

在浏览器打开

- [http://localhost:5000/]

## Git 提交

```js
$ git add .
$ git cz
$ git push
```
