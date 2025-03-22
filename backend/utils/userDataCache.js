const userDataCache = {};

module.exports = {
  setUserData: (username, data) => {
    userDataCache[username] = {
      ...(userDataCache[username] || {}),
      ...data
    };
  },
  getUserData: (username) => userDataCache[username] || {},
  getAllCache: () => userDataCache
};
