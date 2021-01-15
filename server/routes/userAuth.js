import express from 'express';

const router = express.Router();

// Controllers
import { getUser, login, register } from '../controllers/userAuth.js';

router.post('/register', register);
router.post('/login', login);
router.get('/getUser', getUser);

export default router;