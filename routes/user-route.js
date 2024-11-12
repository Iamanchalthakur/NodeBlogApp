module.exports = app =>  {

    const users = require("../controllers/user-controller.js")

    var router = require("express").Router();

    router.post("/createuser", users.create);
    router.get('/users', users.getAll);
    router.get('/users/:id', users.getById);
    router.put('/users/:id', users.updateById);
    router.delete('/users/:id', users.deleteById);
    app.use('/', router);
}

