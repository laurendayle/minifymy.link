
const sumClicks = (clicksArray) => {
  console.log(clicksArray, 'clicksArray');
  if (clicksArray === "--") return "--";
  return clicksArray.reduce((sum, clickObj) => {
    return sum += clickObj.total;
  }, 0);
}

export default sumClicks;