const role = require('../common/repos/roles');

const getRoles = async (query) => {
  try {
    const roles = await role.find({status: true})
    if (!roles) {
      throw Error('Roles not found or not active');
    }

    return roles;
  } catch (err) {
    throw Error(err);
  }
};



module.exports = {
  getRoles
};
