const express = require("express");
const app = express();
const tokobuahController = require("./controller/transaksi");
const tokobuah = require("./controller/list_buah");
const VA = require("./controller/virtual_account");
const body = require("body-parser");
const user = require("./controller/user");

app.use(body.urlencoded({ extended: true}));
app.get("/get-transaksi",tokobuahController.getTransaksi);
app.get("/get-listBuah",tokobuah.getListtransaksi);
app.get("/get-VA",VA.getVA);
app.post("/created-transaksi",tokobuahController.createdTransaksi);
app.put("/update-transaksi/:transaksi",tokobuahController.updateTransaksi);
app.post("/signup",user.signup);
app.post("/signin",user.signin);





app.listen(3000)