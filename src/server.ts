import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { createConnection } from 'typeorm';
import jwt from 'koa-jwt';
import koaStatic from 'koa-static'

import { JWT_SECRET } from './constants';
import 'reflect-metadata';

import { unprotectedRouter, protectedRouter } from './routers';
import { logger } from './logger'


createConnection()
  .then(() => {
    // 初始化 Koa 应用实例
    const app = new Koa();

    // 注册中间件
    app.use(require('koa-static')(__dirname + '/public/dist'))
    app.use(logger());
    app.use(cors());
    app.use(bodyParser());

    app.use(async (ctx, next) => {
      try {
        await next();
      } catch(err) {
        // 返回JSON格式的响应
        ctx.status = err.status || 500;
        ctx.body = { message: err.message };
      }
    })

    // 无需权限就可以访问的路由
    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

    // 注册JWT中间件
    app.use(jwt({ secret: JWT_SECRET }).unless({ method: 'GET' }));

    // 需要携带token才可以访问的路由
    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

    // 运行服务器
    app.listen(3001, () => {
      console.log('http://localhost:3001/');
    });
  })
