const router = require("express").Router();
const {
  getPeople,
  getPeopleById,
  postPerson,
  updateData,
  deleteDataById,
  cdnUploadImagePeople,
  uploadImagePeople,
} = require("../services/peopleServices");
const upload = require("../middlewares/uploadHandler");
const cdnUpload = require("../middlewares/cdnUploadHandler");

const idChecker = (req, res, next) => {
  const { id } = req.params;
  const newId = +id;

  if (newId > 0) {
    next();
  } else {
    res.status(400).json({ message: "ID tidak valid" });
  }
};

router.get("/", getPeople);
router.get("/:id", idChecker, getPeopleById);
router.post("/addPerson", postPerson);
router.post("/upload", upload.single("image"), uploadImagePeople);
router.post("/upload/cdn", cdnUpload.single("image"), cdnUploadImagePeople);
router.patch("/:id", updateData);
router.delete("/:id", deleteDataById);

module.exports = router;
