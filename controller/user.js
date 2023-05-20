const bcrypt = require('bcrypt');
const db = require("..db/database");


function signup(req, res) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

function signup(req, res) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(req.body.password, saltRounds);

    db.konek.query(`INSERT INTO user (nama,username,password) VALUES ("${req.body.nama}","${req.body.username}")`),
    function (err, result){
        if (err){
            res.status(400).send({
                status:400,
                message:"username or password invalid"
            })
        } else {
            res.status(200).send({
                status:200,
                data: true,
                message : "username invalid"
            })
        }
    }
}
}

module.exports = {signup}

// user
// const createdUser = 
// }
// if (err) {
//     res.status(400).json({
//         errStatus: true,
//         msgerr : err.message
//     })
// }else { res.status(200).json({
//     error: result.array(),
//     message:"succesfully"
//   }) }
