const userDataCache = {};

module.exports = {
  setUserData: (username, data) => {
    userDataCache[username] = {
      ...(userDataCache[username] || {}),
      ...data
    };
  },
<<<<<<< HEAD
  getUserData: (username) => userDataCache[username]  || {},
  getAllCache: () => userDataCache
};
=======
  getUserData: (username) => userDataCache[username] || {},
  getAllCache: () => userDataCache
};
>>>>>>> origin/sri
