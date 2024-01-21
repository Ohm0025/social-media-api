//middle ware สำหรับการ upload
const multer = require("multer");

const storage = multer.diskStorage({
  //ตำแหน่งเก็บ file - ในตัวอย่างจะเก็บไว้ใน folder public ของ root project
  destination: (req, file, cb) => {
    //ใน callback ของ multor จะรับ parameter ตัวแรกเป็น err ซึ่งถ้าให้ไม่มี error ก็ใส่เป็น null
    cb(null, "public/images"); //ไม่ใส่ / หน้าสุดหมายถึง relate กับ root path
  },
  //ชื่อ file ที่เก็บ
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getTime() +
        "" +
        Math.round(Math.random() * 10000000) +
        "." +
        file.mimetype.split("/")[1]
    );
    //เอาเวลา upload * กับเลขที่สุ่มมาตั้งชื่อ (เอาชื่ออะไรก็ได้ที่ไม่ซ้ำกัน)
  },
});
//function นี้สามารถกำหนดตำแหน่งที่เราจะเก็บ file ที่ upload มาได้

module.exports = multer({ storage }); //จะได้เป็น function middle ware ตัวหนึ่ง
