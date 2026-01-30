const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
let _db;

module.exports = {
    connectToServer: async function (){
        try{
            const client = await MongoClient.connect(url);
            _db = client.db(dbName);
            console.log("เชื่อมต่อสำเร็จ");
        }catch (err){
            console.error("เชื่อมต่อไม่สำเร็จ",err);
            process.exit(1);
        }
    },getDb: function(){
        return _db;
    }
};