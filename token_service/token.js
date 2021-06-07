const Token = require('../common/repos/token');

const getToken = async (query) => {
  try {
    const token = await Token.findOne(query);
    if (!token) {
      throw Error('Unable to find a matching token');
    }
    return token;
  } catch (err) {
    throw Error(err);
  }
};

module.exports = { getToken };
