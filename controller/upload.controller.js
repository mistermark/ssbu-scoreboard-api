const IncomingForm = require("formidable").IncomingForm;
const path = require("path");
const fs = require("fs");

exports.upload = (req, res, next) => {
  var form = new IncomingForm();

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

    if (path.join(uploadDir, files.file.name)) {
      const fileName = files.file.name.substring(
        0,
        files.file.name.indexOf(".")
      );
      const fileExtension = files.file.name.substring(
        files.file.name.indexOf(".") + 1
      );
      newFileName = `${fileName}-${date.year}${date.month}${date.day}${date.hours}${date.minutes}${date.seconds}.${fileExtension}`;
    }
    fs.rename(files.file.path, path.join(uploadDir, newFileName), function(
      err
    ) {
      if (err) {
        console.error(err);
      } else {
        console.log("success!");
      }
    });

    res.json({
      status: "SUCCESS",
      file: newFileName
    });
  });
};
