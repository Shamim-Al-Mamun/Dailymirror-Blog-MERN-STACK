const Contact = require("../models/contact.model");

exports.postContact = async (req, res) => {
  try {
    console.log(req.body);
    const contact = await new Contact(req.body).save();
    res.status(200).json({
      Message: "Contact was inserted successfully!",
      New_contact: contact,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json({
      Message: "Contacts were fetched successfully!",
      contacts: contact,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};
