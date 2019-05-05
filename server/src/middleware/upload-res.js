module.exports = function (options = {}) {
  return function uploadRes(req, res, next) {
    res.json(req.files);
  };
};
