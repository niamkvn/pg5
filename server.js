const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const ejs = require("ejs");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
const bodyParser = require("body-parser");
const History = require("./api/models/historyModel");
const serialPort = require("serialport");
// Open the port
const sp = new serialPort("COM4", {
  baudRate: 9600
});

// const twitterBot = require("./twitter/twitterBot");
// const exec = require("child_process").exec;
// const fs = require("fs");

mongoose.connect("mongodb://localhost/datapg5");
mongoose.connection
  .once("open", () => {
    console.log("[v] Connected to the database");
  })
  .on("error", err => {
    console.log("[x] Failed to connect to the database");
  });

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

//handle cors error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin-Headers", "*");
  if (res.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  }
  next();
});

app.use("/", require("./api/routes/router"));

//handle error 404
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// handle any error in the app
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
  });
});

const formatDate = date => {
  let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
  let months = [
    "January",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "Sebtember",
    "Oktober",
    "Novemver",
    "Desember"
  ];

  let _hari = date.getDay();
  let _bulan = date.getMonth();
  let tanggal = date.getDate();
  let _tahun = date.getYear();
  let jam = date.getHours();
  let menit = date.getMinutes();
  let detik = date.getSeconds();

  let hari = days[_hari];
  let bulan = months[_bulan];
  let tahun = _tahun < 1000 ? _tahun + 1900 : _tahun;

  return (
    hari +
    ", " +
    tanggal +
    " " +
    bulan +
    " " +
    tahun +
    " " +
    jam +
    ":" +
    menit +
    " WIB"
  );
};

let numUSers = 0;
sp.on("open", () => {
  let buffer = "";
  let a;
  console.log("serialport is connected");

  // parser.on("data", chunk => {
  //   let today = new Date();

  //   io.sockets.emit("data", {
  //     time: today.getHours() + ":" + today.getMinutes(),
  //     data: chunk
  //   });
  // });

  sp.on("data", function(chunk) {
    buffer += chunk;
    let answers = buffer.split(/\r?\n/); // Split data by new line character or smth-else
    buffer = answers.pop(); // Store unfinished data
    console.log(buffer);
    let inten = buffer;

    if (buffer > 1000) {
      a = new Date();
      let history = new History({
        date: formatDate(a)
      });
      history
        .save()
        .then(docs => {
          console.log("Saving data", docs);

          let today = new Date();
          io.sockets.emit("data", {
            time: today.getHours() + ":" + today.getMinutes(),
            data: inten
          });

          // // ==POSTING KE TWITTER==
          // // EKSEKUSI COMMAND
          // const cmd = "processing-java --sketch=`pwd`/graph --run";
          // exec(cmd, () => console.log("Grafik terbentuk"));
          // // BACA GAMBAR
          // let params = {
          //   encoding: "base64"
          // };
          // let content = fs.readFileSync("grapgh/image.png", params);
          // // POSTING
          // twitterBot.postContent(content, "terjadi getaran! " + docs.date);

          // // STREAM WEBSITE
          if (numUSers > 0) {
            io.sockets.emit("updateData", [docs]);
          }
        })
        .catch(err => {
          throw err;
        });
    }
  });

  // let count = 0;
  io.on("connection", socket => {
    let addedUser = false;

    socket.on("addUser", () => {
      if (addedUser) return;

      ++numUSers;
      console.log("made socket connection" + numUSers, socket.id);
      History.find({})
        .then(docs => {
          io.sockets.emit("updateData", docs);
        })
        .catch(err => {
          throw err;
        });
    });
    socket.on("disconnect", () => {
      if (addedUser) --numUSers;
    });
  });
});
