// controllers/authController.js
const mongoUtil = require('../config/db');
exports.FuncLogin= async (req, res) => {

    try{
        const db = mongoUtil.getDb();
        const{Uemail,Upassword} = req.body;
        console.log("Check",Uemail, Upassword);

        const user = await db.collection('LogandPass').findOne({
            Email:Uemail,
            password:Upassword
        });
        if(user){
            res.status(200).send("Login Suc");
        }else{
            res.status(401).send("incorrect");
        }
    }catch(err){
        console.error(err);
        res.status(500).send("Server Error")
    }
};