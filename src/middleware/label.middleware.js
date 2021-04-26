const serve = require('../service/label.service');

const verifyLabelsExists = async (ctx, next) => {
  console.log("验证标签是否存在的middleWate...");
  const { labels } = ctx.request.body;

  let newLabels = [];
  for(let name of labels) {
    let label = {name};
    const labelResult = await serve.getTableByName(name);
    if(!labelResult) {
      const result =  await serve.create(name);
      label.id = result.insertId;
    } else {
      // console.log(labelResult);
      label.id = labelResult.id;
    }
    newLabels.push(label);
  }
  // console.log(newLabels);
  ctx.labels = newLabels;
  await next()
}

module.exports = {
  verifyLabelsExists
};