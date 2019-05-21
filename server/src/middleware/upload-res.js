module.exports = function (options = {}) {
  return function uploadRes(req, res, next) {
    const baseUploadUrl = "http://localhost:3030/uploads/";

    let output = req.files.map((item) => {
      return {
        ...item,
        url : baseUploadUrl + item.filename
      }
    })

    res.json(output);
  };
};
