// import { register } from "../controllers/usersControllers";
const register = require('../controllers/usersControllers');
const router = require('express').Router();

router.post('/register',register.register);

module.exports = router;