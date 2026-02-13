// controllers/authController.js
const mongoUtil = require('../config/db');

const bcrypt = require('bcrypt');
exports.FuncLogin= async (req, res) => {
 try {
        const { Uemail, Upassword } = req.body; // รับค่าจากฟอร์ม Login

        // 1. เช็คค่าว่าง
        if (!Uemail || !Upassword) {
            return res.status(400).send("กรุณากรอกข้อมูลให้ครบ");
        }
        const db = mongoUtil.getDb();

        // 2. ค้นหา User จาก Email
        const user = await db.collection('LogandPass').findOne({ Email: Uemail });

        if (!user) {
            // ถ้าไม่เจอ Email นี้ในระบบ
            return res.status(401).send("ไม่พบผู้ใช้งานนี้");
        }
        // 3. เปรียบเทียบรหัสผ่าน (ใช้ bcrypt.compare)
        // ตัวแปรแรกคือ รหัสที่พิมพ์มา (Plain text)
        // ตัวแปรที่สองคือ รหัสที่อยู่ใน DB (Hashed)
        const isMatch = await bcrypt.compare(Upassword, user.password);

        if (isMatch) {
            // รหัสถูกต้อง
            req.session.userId = user._id
            req.session.userEmail = user.Email;
            console.log("Login Success for:", Uemail);
            return res.status(200).send({redirectUrl:'/dashboard'});
        } else {
            // รหัสผิด
            return res.status(401).send("รหัสผ่านไม่ถูกต้อง");
        }

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).send("Server Error");
    }
}