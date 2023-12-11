const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);

router.post('/users/login', userController.loginUser);

router.post('/users/logout', auth, userController.logoutUser);

router.post('/users/logoutAll', auth, userController.logoutAllUsers);

router.get('/users/me', auth, userController.getProfile);

router.patch('/users/me', auth, userController.updateProfile);

router.delete('/users/me', auth, userController.deleteProfile);

router.post('/users/me/avatar', auth, userController.uploadAvatar);

router.delete('/users/me/avatar', auth, userController.deleteAvatar);

router.get('/users/:id/avatar', userController.getAvatar);

router.post('/users/passwordReset', userController.sendPasswordReset);

module.exports = router;
