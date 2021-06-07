// const {
//     getRoles
//   } = require('../../role_service/role');

const permissions = require('../repos/permission');
  
  
//   const getAllRoles = async (req, res) => {
//     try {
//       const totalRoles = await getRoles({});
  
//       return res.status(200).json({ data: totalRoles });
//     } catch (err) {
//       return res.status(400).json({ error_msg: err.message });
//     }
//   };

  const createPermissonRole = async (req, res) => {
    try {
      const permission_exist = await permissions.findOne({ name: req.body.name });
  
      if (permission_exist) {
        return res.status(409).json({ error_msg: 'Permission already exists' });
      }
   
      // Create a new permission
      const permission = new permissions(req.body);
      const saved_permission = await permission.save();
      
      return res.status(201).json({ id: saved_permission.id });
    } catch (err) {
      console.log({ err });
      return res.status(400).json({ error_msg: err.message });
    }
  };
  
  module.exports = {
    // getAllRoles,
    createPermissonRole
  };
  