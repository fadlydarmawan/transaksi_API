const db = require("../db/database");



function getVA(req, res){
    db.konek.query("SELECT * FROM virtual_account", function (err, result){
        if (err) {
            res.status(400).json({
                errStatus: true,
                msgerr: err.message,
            })
        } else {
            res.status(200).json({
                status: 200,
                data: result,
                message: "succesfully GET VA"
            })
        }
    })
}
module.exports = {getVA}