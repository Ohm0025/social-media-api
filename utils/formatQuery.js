exports.queryUpdateUser = (arrQuery, arrKey) => {
  let resQuery = arrQuery
    .filter((item) => item)
    .map((item, index) => {
      return arrKey[index] + "=$" + (index + 1);
    });
  console.log(resQuery);
  return { text: resQuery.join(","), lastIndex: resQuery.length + 1 };
};
exports.variablePostgress = (arrVariable) => {
  let resVariable = arrVariable.filter((item) => item);
  console.log(resVariable);
  return resVariable;
};
