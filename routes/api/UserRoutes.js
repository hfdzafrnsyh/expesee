const express = require('express');
const router = express();
const cors = require('cors');

const UserController = require('../../controllers/UserController');

router.use(cors());

router.get('/listuser', UserController.listUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;
