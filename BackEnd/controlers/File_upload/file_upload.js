const HttpError = require("../../error/http-error");
const Busboy = require("busboy");
const fs = require("fs");
const File = require("../../models/file");

// an thelo na kano save kati sto database i thelo na kano autetication kai exo kaie me to database pada xrisimoipo async theoritka
// stin apli tou ekdosi to sigkeirmepono code dne xriazete async ala ego to vazo soe periptosi pou to xriasto sto melon

const uploadFile = async (req, res, next) => {
  // boro na kano edo ola ta checks gia to an file iparxei an o xrisiosts ta exei kanei ola sosta kai meta na perimeno na do an tha kano save to file
  console.log("File size:" + req.headers["content-length"] / 1024 + "KB");

  var busboy = new Busboy({ headers: req.headers });
  let myFileName;
  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    myFileName = filename;
    console.log("MineType", mimetype);
    if (
      mimetype === "application/pdf" ||
      mimetype === "text/plain" ||
      mimetype === "image/png"
    ) {
      console.log("Right Format");
      // var saveTo = path.join('.', filename);
      let saveTo = `${__dirname}/../../uploads/${filename}`;
      console.log("saveTo", saveTo);
      file.pipe(fs.createWriteStream(saveTo));
    } else {
      busboy.emit("error", new Error("Wrong file type"));
      return;
    }
  });
  busboy.on("error", function (err) {
    console.error("Error while parsing the form: ", err);
    // edo emfanizete to erro pou exo kai boro na valo next na pao sto mieddlware pou thelo para poli orea doulevei !!!
    const error = new HttpError("Uploading the file failed ", 500);
    return next(error);
  });
  // to express den bori na kanie access form data mono json to body parser episeis den voithatei gia na kano access sto req.body  se form data xriazome i to multer i to busboy https://stackoverflow.com/questions/66048312/busboy-upload-file-and-accessing-req-body
  // https://isamatov.com/node-js-busboy-reading-both-file-and-text-form-parameters/
  // gia afto xrisimopio to on "field" gia na kano manually parse the data, opote ftiaxn omonos mou ena adistixo req.body pou einai arxiaka ena adia json object kai gia afto exo to onfield kai kano manually loop ola ta field name kai ta adistixa val kai ta vazo meas sto body object to ftianxo to json object exkso ao to busboy.on oste na to exo access sto busboy on finis kai etsi tha exo ola ta stixia pou thelo na kano save sto database kai tha ta xrisimopsio sto busboy.on finisih
  let body = {};
  busboy.on(
    "field",
    function (
      fieldName,
      val,
      fieldnameTruncated,
      valTruncated,
      encoding,
      mimetype
    ) {
      body[fieldName] = val;
    }
  );

  busboy.on("finish", function () {
    console.log("Req.body", body);
    const random_number = Math.random();
    if (random_number < 0.5) {
      console.log("Removing");
      path = `${__dirname}/../../uploads/${myFileName}`;
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          const error = new HttpError("Uploading the file failed ", 500);
          return next(error);
        }

        //file removed
      });
    }
    console.log("Upload complete", random_number, myFileName);
    // res.writeHead(200, { 'Connection': 'close' });
    // res.end("That's all folks!");
    res.json({ message: "File was uploaded successfully" });
  });
  return req.pipe(busboy);
};

module.exports = uploadFile;
