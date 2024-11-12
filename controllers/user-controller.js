const User = require("../models/user-model");


exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    User.create(user, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        }
        res.status(201).send(data);
    });
};


exports.getAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        }
        res.send(data);
    });
};


exports.getById = (req, res) => {
    const userId = req.params.id;

    User.getById(userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `User with ID ${userId} not found.`
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with ID " + userId
            });
        }
        res.send(data);
    });
};




exports.updateById = (req, res) => {
    const userId = req.params.id;

    if (!req.body) {
        return res.status(400).send({
            message: "Content to update cannot be empty!"
        });
    }

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    User.updateById(userId, user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `User with ID ${userId} not found.`
                });
            }
            return res.status(500).send({
                message: "Error updating user with ID " + userId
            });
        }
        res.send(data);
    });
};


exports.deleteById = (req, res) => {
    const userId = req.params.id;

    User.deleteById(userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `User with ID ${userId} not found.`
                });
            }
            return res.status(500).send({
                message: "Error deleting user with ID " + userId
            });
        }
        res.send({
            message: `User with ID ${userId} was deleted successfully.`
        });
    });
};

