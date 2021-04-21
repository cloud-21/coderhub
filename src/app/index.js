const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

// const userRouter = require('../router/user.router');
// const authRouter = require('../router/auth.router');
const useRouters = require('../router');    //自动导入router目录下的index.js

const errorHandler = require("./error-handler");

const app = new Koa();
app.useRouters = useRouters;

app.use(bodyParser());

app.useRouters();

app.on('error', errorHandler);

module.exports = app;