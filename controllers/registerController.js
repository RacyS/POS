const mongoUtil = require('../config/db');
const bcrypt = require('bcrypt'); // นำเข้า bcrypt
const saltRounds = 10; // ความละเอียดในการเข้ารหัส

exports.FuncRegister = async (req, res) => {
    console.log("Body ที่ได้รับ:", req.body);
    const { Uemail, Upassword } = req.body;

    // 1. Validation เช็คค่าว่าง
    if (!Uemail || !Upassword) {
        return res.status(400).send("กรอกให้ครบ");
    }

    try {
        const db = mongoUtil.getDb();
        
        // 2. ตรวจสอบว่ามี Email นี้อยู่ในระบบหรือยัง (กันสมัครซ้ำ)
        const existingUser = await db.collection('LogandPass').findOne({ Email: Uemail });
        if (existingUser) {
            return res.status(400).send("Email นี้ถูกใช้งานแล้ว");
        }

        // 3. เข้ารหัสรหัสผ่าน (Hashing)
        const hashedPassword = await bcrypt.hash(Upassword, saltRounds);

        // 4. บันทึกลงฐานข้อมูล
        const result = await db.collection('LogandPass').insertOne({
            Email: Uemail,
            password: hashedPassword // เก็บตัวที่เข้ารหัสแล้วแทน
        });

        if (result.acknowledged) {
            res.status(200).send("Register Suc");
        } else {
            res.status(401).send("Not");
        }

    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).send("Server Error");
    }
};