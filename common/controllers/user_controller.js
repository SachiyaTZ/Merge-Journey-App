const {
  getUser,
  getUsers,
  getActiveUsers,
  getSingleUserService,
  getAndEditUser
} = require('../../user_service/user');

const User = require('../../common/repos/user');


// const { userEditValidation } = require('../utils/validation');

const { userEditValidation } = require('../helpers/validation');

const validation = {
  editUser: userEditValidation
};

const handleValidation = (body, res, type) => {
  const { error } = validation[type](body);

  if (error) {
    throw Error(error.details[0].message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const totalUsers = await getUsers({});

    return res.status(200).json({ data: totalUsers });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const getAllActiveUsers = async (req, res) => {
  try {
    const users = await getActiveUsers({ status: true });
    return res.status(200).json({ data: users });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id})
    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    const user = await getSingleUserService({ _id: req.user._id });
    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const editUserAction = async (req, res) => {
  try {
    handleValidation(req.body, res, 'editUser');
    const { _id } = req.body;
    const user = await getAndEditUser({ _id }, req.body);
    return res.json({ data: user });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const deleteUserAction = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id})
    console.log(user);
    await user.deleteOne({_id: req.params.id});;
    return res.json({ data: 'Sucess' });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

module.exports = {
  getAllUsers,
  getAllActiveUsers,
  getLoggedInUser,
  getSingleUser,
  editUserAction,
  deleteUserAction
};
