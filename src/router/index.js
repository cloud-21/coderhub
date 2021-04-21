const fs = require('fs');
const userRouter = require('./user.router');

const useRouters = function () {
  fs.readdirSync(__dirname).forEach(file => {
    if(file === 'index.js') return;
    const router = require(`./${file}`);
    this.use(router.routes());
    this.use(router.allowedMethods())
  })
}

module.exports = useRouters;