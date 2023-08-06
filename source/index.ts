import 'dotenv/config';
import 'reflect-metadata';

import Koa from 'koa';
import jwt from 'koa-jwt';
import KoaLogger from 'koa-logger';
import { useKoaServer } from 'routing-controllers';

import { getAuthorizationChecker } from './common/CommonUtils';
import { mocker, router, swagger } from './controller';
import dataSource, { isProduct } from './model';
import { EnvMap } from './common/EnvUtils';

const { PORT = 8080, APP_SECRET } = process.env;

const HOST = `http://localhost:${PORT}`,
    app = new Koa()
        .use(KoaLogger())
        .use(swagger({ exposeSpec: true }))
        .use(jwt({ secret: APP_SECRET, passthrough: true }));

if (!isProduct) app.use(mocker());

useKoaServer(app, {
    ...router,
    cors: true,
    authorizationChecker: async action =>
        !!(await getAuthorizationChecker(action)),
    currentUserChecker: getAuthorizationChecker
});

console.time('Server boot');

dataSource.initialize().then(() =>
    app.listen(PORT, () => {
        new EnvMap();

        console.log(`
HTTP served at ${HOST}
Swagger API served at ${HOST}/docs/
Swagger API exposed at ${HOST}/docs/spec`);

        if (!isProduct) console.log(`Mock API served at ${HOST}/mock/\n`);

        console.timeEnd('Server boot');
    })
);
