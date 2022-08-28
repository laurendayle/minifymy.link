
const sumClicks = (clicksArray) => {
  console.log(clicksArray, 'clicksArray');
  if (clicksArray === "--") return "--";
  return clicksArray.reduce((sum, clickObj) => {
    return sum += clickObj.total;
  }, 0);
}

const getTotalClicks = (links) => {
  console.log(links, 'links');
  return links.reduce((sum, link) => {
    return sum += link.clicks;
  }, 0);
}

export { sumClicks, getTotalClicks };