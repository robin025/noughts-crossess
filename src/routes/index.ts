import * as express from "express";

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello World! This is Robin Singh");
});

module.exports = router;
