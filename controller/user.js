const bcrypt = require("bcrypt");
const db = require("../db/database");

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
  const { username, password } = req.body;
  console.log(username);
  db.konek.query(
    `SELECT * FROM user WHERE username = '${username}'`,
    function (err, result) {
      if (err) {
        res.status(400).send({
          status: 400,
          message: "Username or Password invalid",
        });
      } else {
        console.log(req.body.password);
        console.log(result[0].password);
        const passwordChecking = bcrypt.compareSync(
          password,
          result[0].password
        );
        console.log(passwordChecking);
        if (passwordChecking) {
          res.status(201).send({
            status: 201,
            data: result,
            message: "Username or Password Valid",
          });
        } else {
          res.status(400).send({
            status: 400,
            message: "Username or Password InCorrect, Check Again",
          });
        }
      }
    }
  );
}

module.exports = { signup, signin };

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
