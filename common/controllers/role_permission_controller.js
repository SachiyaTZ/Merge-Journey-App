// const {
//     getRoles
//   } = require('../../role_service/role');

const roles_permissions = require('../repos/roles_permission');
  
  
//   const getAllRoles = async (req, res) => {
//     try {
//       const totalRoles = await getRoles({});
  
//       return res.status(200).json({ data: totalRoles });
//     } catch (err) {
//       return res.status(400).json({ error_msg: err.message });
//     }
//   };

  const createRolePermisson = async (req, res) => {
    try {
      const role_permission_exist = await roles_permissions.findOne({ role_id: req.body.role_id });
  
      if (role_permission_exist) {
        // return res.status(409).json({ error_msg: 'Permission already exists' });
      }
   
      // Create a new permission
      const roles_permission = new roles_permissions(req.body);
      const saved_role_permission = await roles_permission.save();
      
      return res.status(201).json({ id: saved_role_permission.id });
    } catch (err) {
      console.log({ err });
      return res.status(400).json({ error_msg: err.message });
    }
  };
  
  module.exports = {
    // getAllRoles,
    createRolePermisson
  };
  