let data = require("../data");

const getPeople = (req, res) => {
  res.json({ message: "Success", data });
};

const getPeopleById = (req, res) => {
  const { id } = req.params;

  const person = data.find((row) => row.id === id);

  if (person) {
    res.json({ message: "Success", person });
  } else {
    res.status(404).json("Person not found");
  }
};

const postPerson = (req, res) => {
  const payload = req.body;
  data.push(payload);

  res.json({ message: "Success", data });
};

const updateData = (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    const index = data.findIndex(person => person.id === id);
    if (index !== -1) {
        data[index] = { ...data[index], ...newData };
        res.status(200).json({ message: 'Data updated successfully.' });
    } else {
        res.status(404).json({ message: 'Data not found.' });
    }
}

const deleteDataById = (req, res) => {
    const { id } = req.params;
    
    const index = data.findIndex(person => person.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        res.status(200).json({ message: 'Data deleted successfully.' });
    } else {
        res.status(404).json({ message: 'Data not found.' });
    }
}

module.exports = { getPeople, getPeopleById, postPerson, updateData, deleteDataById };
