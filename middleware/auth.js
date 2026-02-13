exports.checkLogin = (req, res, next) => {
    if (req.session.userId) {
        next(); // มี Session ไปต่อได้
    } else {
        res.redirect('/login'); // ไม่มี Session ให้กลับไปหน้า login
    }
};