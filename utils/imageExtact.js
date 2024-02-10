const imageEx = (picArrTag) => {
  let finalImageArr = picArrTag.map((item) => {
    return `<img src= ${item}>`;
  });
  return finalImageArr;
};

module.exports = imageEx;
