const IncomingForm = require("formidable").IncomingForm;
const path = require("path");
const fs = require("fs");
const mv = require("mv");

const APP_UPLOADS = appDir + "/public/uploads";

exports.upload = (req, res, next) => {
  var form = new IncomingForm();
  form.uploadDir = APP_UPLOADS;

  form.parse(req, function(err, fields, files) {
    let newFileName;
    const isoDate = new Date(files.file.lastModifiedDate);
    const date = {
      year: isoDate.getFullYear(),
      month: ("0" + (isoDate.getMonth() + 1)).slice(-2),
      day: ("0" + isoDate.getDate()).slice(-2),
      hours: isoDate.getHours(),
      minutes: isoDate.getMinutes(),
      seconds: isoDate.getSeconds()
    };

    if (path.join(APP_UPLOADS, files.file.name)) {
      const fileName = files.file.name.substring(
        0,
        files.file.name.indexOf(".")
      );
      const fileExtension = files.file.name.substring(
        files.file.name.indexOf(".") + 1
      );
      newFileName = `${fileName}-${date.year}${date.month}${date.day}${date.hours}${date.minutes}${date.seconds}.${fileExtension}`;
    }
    mv(files.file.path, path.join(APP_UPLOADS, newFileName), function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Upload success!");
      }
    });

    res.json({
      status: "SUCCESS",
      file: newFileName
    });
  });
};
