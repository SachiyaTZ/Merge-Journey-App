const {
    getRoles
  } = require('../../role_service/role');

const roles = require('../repos/roles');
  
  
  const getAllRoles = async (req, res) => {
    try {
      const totalRoles = await getRoles({});
  
      return res.status(200).json({ data: totalRoles });
    } catch (err) {
      return res.status(400).json({ error_msg: err.message });
    }
  };

  const createRole = async (req, res) => {
    try {
      const role_exist = await roles.findOne({ name: req.body.name });
  
      if (role_exist) {
        return res.status(409).json({ error_msg: 'Role already exists' });
      }
   
      // Create a new role
      const role = new roles(req.body);
      const saved_role = await role.save();
      
      return res.status(201).json({ id: saved_role.id });
    } catch (err) {
      console.log({ err });
      return res.status(400).json({ error_msg: err.message });
    }
  };
  
  module.exports = {
    getAllRoles,
    createRole
  };
  