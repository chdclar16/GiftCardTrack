const express = require('express');
const { login, register, logOut, getProfile } = require('../controllers/authController')
const router = express.Router();
const cors = require('cors');


router.use(
    cors({
        credentials:true,
        origin: 'http://localhost:5173'
    })
)

// Registration Route
router.post('/register', register);

// Login Route
router.post('/login', login)

// Logout Route
router.delete('/', logOut);

// Profile Route
router.get('/profile', getProfile)

router.get('/', (req, res)=> {
    res.json('working')
})


module.exports = router;
