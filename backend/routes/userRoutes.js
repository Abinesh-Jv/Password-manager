const User = require('../controllers/usersControllers');
const router = require('express').Router();
const cors = require('cors');

router.post('/register',User.register)
router.post('/login',User.login)

module.exports = router;