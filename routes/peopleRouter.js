const router = require("express").Router();
const {
  getPeople,
  postPerson,
  getPeopleById,
  updateData,
} = require("../services/peopleServices");

const idChecker = (req, res, next) => {
  const { id } = req.params;
  const newId = +id;

  if (newId > 0) next();

  res.status(400).json({ message: "ID tidak valid" });
};

router.get("/", getPeople);
router.get("/:id", idChecker, getPeopleById);
router.post("/", postPerson);
router.patch("/:id", updateData);
router.delete("/:id", updateData);

module.exports = router;
