module.exports = function (options = {}) {
  return function uploadRes(req, res, next) {
    const baseUploadUrl = "http://localhost:3030/uploads/";

    res.json(req.files);
  };
};
