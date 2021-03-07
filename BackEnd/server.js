const express = require("express");
const fs = require("fs");

const cors = require("cors");
const connectDB = require("./database_config");

// kano import to router gia to file upload
const fileUploadRouter = require("./routes/file_upload_router");
// kano import ta routes gia to folder
const Folder = require("./routes/folder_route");

const app = express();
app.use(cors());

// xrisimopio to build in express body parser den xriazete na kataevaso ksexorito package
app.use(express.json()); //Used to parse JSON bodies

// Kano connect to database
connectDB();

// gia na boro na stelno apo to react edoles adi na xrisimiopioou sato cors package
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

// dimoiorgo to endpoint gia to file upload edo exo route /uploads kai epidi exo "/" sto file uplaod route simeni otan pao sto /upload trexei to
// controler pou exei sxesi gia to upload file logic
app.use("/upload", fileUploadRouter);

// ta endopoint gia ta folder routes
app.use("/folder", Folder);

app.get("/download", function (req, res) {
  const file = `${__dirname}/uploads/${filename}`;
  res.download(file); // Set disposition and send it.
});

//#####################################
//to functionality apo edo kai kato to kratao opos exi to proto komati eiani gia to error middleware kai to alo eaini gia na kano connect to database sto server
//####################################

//Den tha ftiakso dimou error middleware tha xrisimopio mono to error classs pou exo fitaksi. Tora gia na stilo to error piso tha xirismopio to build in functionality pou exei to express. Afto to functionality mou epitrpeie na tsekaro an exo idi stili rpesons sto frontend an den exo stili tha simeni oti exo error kai an exo eror tha stelno piso to error code pou exo sto error class mou kai an den exo kanei specify error code tha stelno 500 kai episis tha stelno to minima pou exo sto error class an den exo minima tha stelno "an unknown error"
// middleare gia error handling. Afto to middleware perni 4 arguments ! Ara afto tha ekteleisthi mono se rueqest pou exoun 4 argumetns  ara mono sta requerest pou exoun error attached
// edo pera exo to logic gia na kano role back (delete ) diladi image pou exo idi kanei save an exo error sto reqeust
app.use((error, req, res, next) => {
  // tsekaro an sto reqeust exo file an exo file kai exo error (gia na exo ftasie se afto to simio exo error) tote tehlo me to unlick na kano delete to image pou molis ekana save sto server
  // afot eian poli simadiko simio an kano save kapio file sto computer mou thelo na to diagrapso an sti sinexia tou idou request exo kapio error. gia pardigam an kano signup kapion mou stili ti fotografia tou to piaso me to multer middleware kai meta do oti o user idi iparxi tote kano return erro kai paralila thelo na diagrapos kai to file pou molis ekana save me to middelware
  //to req.file to exo epidi xrisimopio multer genika den eiparxi sto request
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  // tsekaro an exo idi stilei to respeond kai an afto exi gini tote apla kano forward to error (Boro na stilo mono ena response opote kati exo kain kai idi exo stili respons pithatnotata xoris na prepei)
  if (res.headerSent) {
    return next(error);
  }
  //   tsekaro an exo idi kanei specify to status code gia to repsonse an den to exo kanei tha stilo ena geniko status code oti iparxi provlima kai afto einai 500
  res.status(error.code || 500);
  //   thelo na stilo piso to error message pou ekana define otan ekana throw to error se ena apo ta middlware kai an den to exo kanei specify ekei tote na stilo an unkonw erorr
  res.json({ message: error.message || "an unknown error" });
});
// SIMADIKO PADA KANO THROW ERROR  me to neo mou class i kalitera na exo async function an kano new ERROR me to neo mou eror class kai meta na kano return next(to_instnace_error_pou_Eftiksa)

app.listen(5000, () => console.log("Server Started..."));
