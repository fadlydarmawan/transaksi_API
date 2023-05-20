const db = require("../db/database");
const { v4: uuidv4 } = require("uuid");

function getTransaksi(req, res) {
  db.konek.query("SELECT * FROM transaksi", function (err, result) {
    if (err) {
      res.status(400).json({
        errStatus: true,
        msgerr: err.message,
      });
    } else {
      res.status(201).json({
        status: 201,
        data: result,
        message: "succesfully GET transaksi",
      });
    }
  });
}

function createdTransaksi(req, res) {
  const {transaksi_Id} = uuidv4();
  const { nama_toko,paket_buah,harga_paket,jumlah_paket,total_harga,trx_nama,trx_number,customer_nama,payAt,status} = req.body

db.konek.query(
  `INSERT INTO transaksi (transaksi_id,nama_toko,paket_buah,harga_paket,jumlah_paket,total_harga ,trx_nama,trx_number,customer_nama,payAt,status) VALUES ("${transaksi_Id}","${nama_toko}","${paket_buah}","${harga_paket}","${jumlah_paket}","${total_harga}","${trx_nama}","${trx_number}","${customer_nama}","${payAt}","pending")`,
  function (err, result) {
    if (err) {
      {
        res.status(400).json({
          status: 200,
          errstatus: true,
          message: err.message,
        });
      }
    } else {
      return res.status(201).json({
        status: 201,
        data: result,
        message: "succesfully Created transaksi",
      });
    }
  }
);
}


function updateTransaksi(res, req){
  const {transaksi_Id} = req.params;

  if (transaksi_Id === null) {
    res.status(400).json({
      message: "id kosong"
    })
  } else {
    db.konek.query(
      `UPDATE transaksi SET status = "sukses" WHERE transaksi_id = "${transaksi_Id}`,
      function (err, result){
        if (err) {
          res.status(400).json({
            status:400,
            errstatus: true,
            message:err.message,
          });
        }else {
          res.status(201).json({
            status: 201,
            message: "update succesfuly"
          }
          )
        }
      }
    )
  }
}

module.exports = { getTransaksi,createdTransaksi,updateTransaksi};
