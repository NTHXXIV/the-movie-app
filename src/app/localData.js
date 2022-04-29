const addToFavorite = (id, userID) => {
  const data = getData("favorite");
  if (!data[userID].includes(id)) {
    data[userID].push(id);
  }
  saveData("favorite", data);
  alert("Success");
};
const removeFromFavorite = (id, userID) => {
  const data = getData("favorite");
  data[userID] = data[userID].filter((e) => e !== id);
  saveData("favorite", data);
  alert("Success");
};
const getData = (key) => {
  const rawData = window.localStorage.getItem(key);
  return JSON.parse(rawData);
};
const saveData = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

const createFavoriteList = (userID) => {
  const rawData = window.localStorage.getItem("favorite");
  let data = {};
  if (rawData) {
    // if favorite key !exists => create {} else read from storage
    data = JSON.parse(rawData);
  }
  if (!data[userID]) {
    // if user !exists in favorite, create empty array for user
    data[userID] = [];
  }
  window.localStorage.setItem("favorite", JSON.stringify(data));

  return data[userID];
};

export { createFavoriteList, removeFromFavorite, addToFavorite };
