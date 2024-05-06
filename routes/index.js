const router = require("express").Router();
const PeopleRouter = require("./peopleRouter");

router.use("/people", PeopleRouter);

module.exports = router;
