const User = require('../common/repos/user');

const getUser = async (query) => {
  try {
    const user = await User.findOne(query).select('+password');
    if (!user || !user.status) {
      throw Error('User not found');
    }

    return user;
  } catch (err) {
    throw Error(err);
  }
};

const getAndEditUser = async (query, newData) => {
  try {
    const user = await User.findOneAndUpdate(query, newData, {
      new: true,
      runValidators: true
    });

    return user;
  } catch (err) {
    throw Error(err);
  }
};

const getSingleUserService = async (query) => {
  try {
    const user = await User.findOne(query).select('+password');
    return user;
  } catch (err) {
    throw Error(err);
  }
};

const getUsers = async (query) => {
  try {
    const users = await User.find({});
    return users;
  } catch (err) {
    throw Error(err);
  }
};

const getActiveUsers = async (query) => {
  try {
    const user = await User.find(query).find({ status: true });
    return user;
  } catch (err) {
    throw Error(err);
  }
};

module.exports = {
  getUser,
  getUsers,
  getActiveUsers,
  getSingleUserService,
  getAndEditUser
};
