const router = require('express').Router();

const {
  verifiedFunction: ensure_auth,
  checkAdmin: check_admin
} = require('./verify_jwt_token');

const {
  registerUser,
  loginUser,
  verifyUserRegistration,
  resendVerificationToken,
  sendPasswordResetToken,
  passwordReset,
  changePassword
} = require('../common/controllers/auth_controllers');

const {
  getLoggedInUser,
  getAllUsers,
  getAllActiveUsers,
  getSingleUser,
  editUserAction,
  deleteUserAction
} = require('../common/controllers/user_controller');

const {
  getAllRoles,
  createRole
} = require('../common/controllers/role_controller');

const {
  createPermissonRole
} = require('../common/controllers/permission_controller');

const {
  createRolePermisson
} = require('../common/controllers/role_permission_controller');


const convert_int_to_month = require('../common/helpers/convert_int_to_month');
const user = require('../common/repos/user');

//auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify', verifyUserRegistration);
router.post('/resend-verification-token', resendVerificationToken);
router.post('/send-password-reset-token', sendPasswordResetToken);
router.post('/password-reset', passwordReset);
router.post('/change-password', ensure_auth, changePassword);

// Permission Roles
router.post('/add_permisson', createPermissonRole);

// Role Permission 
router.post('/add_role_permisson', createRolePermisson);


// Roles routes
router.get('/all', getAllRoles);
router.post('/add', createRole);

//user routes
router.get('/', ensure_auth, getAllUsers);
router.get('/me', ensure_auth, getLoggedInUser);
router.get('/active', ensure_auth, getAllActiveUsers);
router.get('/single/:id', getSingleUser);
router.get('/delete/:id', [ensure_auth, check_admin], deleteUserAction);
router.patch('/edit-user', ensure_auth, editUserAction);
router.get(
  '/group/group-by-month',
  [ensure_auth, check_admin],
  async (req, res) => {
    try {
      const users = await user.aggregate([
        {
          $group: {
            // _id: '$_id',
            _id: { month: { $month: '$date' } },
            count: { $sum: 1 }
          }
        }
      ]);

      const response = users.map((user) => ({
        month: convert_int_to_month(user._id.month),
        count: user.count
      }));

      return res.json(response);
      // console.log(user);
    } catch (err) {
      return res.status(400).json({ error_msg: err });
    }
  }
);

module.exports = router;
