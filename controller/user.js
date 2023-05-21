const bcrypt = require("bcrypt");
const db = require("../db/database");
const jwt = require("jsonwebtoken");

function signup(req, res) {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
  console.log(hash);
  console.log(req.body.password);
  db.konek.query(
    `INSERT INTO user (username,password) VALUES ("${req.body.username}","${hash}")`,
  
    function (err, result) {
      if (err) {
        res.status(400).send({
          status: 400,
          message: "username or password invalid",
        });
      } else {
        res.status(200).send({
          status: 200,
          data: result,
          message: "username valid",
        });
      }
    }
  );
}

function signin(req, res) {
  const { username} = req.body;
  console.log(username);
  db.konek.query(
    `SELECT * FROM user WHERE username = '${username}'`,

    function (err, result) {
      if(err) throw err;
      
      if(result.length === 0) {
        res.status(400).json({
          message: "Username Not found"
        })
      } else {
        console.log(result[0])
        if(bcrypt.compareSync(req.body.password.toString(), result[0].password)) {
          const token = jwt.sign({
            username: result[0].username,
          },`secret_key`,{expiresIn: 60})
          res.status(200).json({
            token: token,
            message: "succesfully Login",
            data: result[0]
          })
        } else {
          res.status(400).json({
            message: "Wrong Password"
          })
        }
      }
      });
  }

  module.exports = {signup, signin}
