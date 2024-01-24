exports.queryUpdateUser = (arrQuery) => {
  let resQuery = arrQuery
    .filter((item) => !item)
    .map((item, index) => item + "=$" + index);
  return { text: resQuery.join(","), lastIndex: resQuery.length + 1 };
};
exports.variablePostgress = (arrVariable) => {
  let resVariable = arrVariable.filter((item) => !item);
  return resVariable;
};
