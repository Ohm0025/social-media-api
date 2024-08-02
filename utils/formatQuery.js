exports.queryUpdateUser = (arrQuery, arrKey) => {
  let count = 0;
  let resQuery = arrQuery.map((item, index) => {
    if (item) {
      count += 1;
      return arrKey[index] + "=$" + count;
    }
    return;
  });
  console.log(typeof resQuery.filter((item) => item).join(","));
  return {
    text: resQuery.filter((item) => item).join(","),
    lastIndex: resQuery.filter((item) => item).length + 1,
  };
};
exports.variablePostgress = (arrVariable) => {
  let resVariable = arrVariable.filter((item) => item);
  console.log(resVariable);
  return resVariable;
};
