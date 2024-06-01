let data = require("../data");
const cloudinary = require("../middlewares/cloudinary");

// GET /people/
// GET /people?name=Leanne
const getPeople = (req, res) => {
  const userQuery = req.query.name;

  if (userQuery) {
    const filteredData = data.filter((row) =>
      row.name.toLowerCase().includes(userQuery.toLowerCase())
    );

    if (filteredData == "") {
      res.status(404).json({ message: "Data not found." });
    } else {
      res.status(200).json({ message: "Success", filteredData });
    }
  } else {
    res.status(200).json({ message: "Success", data });
  }
};

// GET /people/10
const getPeopleById = (req, res) => {
  const userId = req.params.id;

  const person = data.find((row) => row.id == userId);
  if (person) {
    res.status(200).json({ message: "Success", person });
  } else {
    res.status(404).json({ message: "Data not found." });
  }
};

// POST /people/addPerson
const postPerson = (req, res) => {
  const payload = req.body;
  data.push(payload);

  res.status(200).json({ message: "Success", data });
};

// PATCH /people/10
const updateData = (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  const index = data.findIndex((person) => person.id == id);
  if (index !== -1) {
    data[index] = { ...data[index], ...newData };
    res.status(200).json({ message: "Data updated successfully.", data });
  } else {
    res.status(404).json({ message: "Data not found." });
  }
};

// DELETE /people/10
const deleteDataById = (req, res) => {
  const { id } = req.params;

  const index = data.findIndex((person) => person.id == id);
  if (index !== -1) {
    data.splice(index, 1);
    res.status(200).json({ message: "Data deleted successfully.", data });
  } else {
    res.status(404).json({ message: "Data not found." });
  }
};

// POST /people/upload
const uploadImagePeople = (req, res) => {
  const url = `/uploads/${req.file.filename}`;

  res.status(200).json({ message: "Uploaded!", url });
};

// POST /people/upload/cdn
const cdnUploadImagePeople = (req, res) => {
  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, (err, result) => {
    res.status(200).json({ message: "Uploaded!", url: result.url });
  });
};

const datas = () => {
  const people = data;

  return people;
};

module.exports = {
  getPeople,
  getPeopleById,
  postPerson,
  updateData,
  deleteDataById,
  uploadImagePeople,
  cdnUploadImagePeople,
  datas,
};
