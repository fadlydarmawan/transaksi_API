const db = require("../db/database");

function getListtransaksi(req, res) {
    db.konek.query(" SELECT * FROM list_buah", function (err, result){
        if (err) {
            res.status(400).json({
                errStatus: true,
                msgerr: err.message,
            })
        } else{
             res.status(200).json({
                status: 200,
                data: result,
                message: "succesfully GET list_buah",
            })
        }
    })
} 

module.exports = {getListtransaksi}