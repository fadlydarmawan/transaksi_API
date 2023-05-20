const mysql2 = require("mysql2")
const konek = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "tokobuah"
})

//cek koneksi

konek.connect((err) => {
    if (err) {
        console.log ("coonect failed")
    } else {
        console.log("connect succesfully")
    }
})

module.exports = {konek}