// controllers/authController.js

exports.getLoginPage = (req, res) => {
    // ย้าย Logic มาไว้ที่นี่
    res.render('auth', { title: 'LOGIN' });
};