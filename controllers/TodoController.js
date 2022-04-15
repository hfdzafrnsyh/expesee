const Model = require('../models/index');
const Category = Model.categories;
const Todo = Model.todos;

module.exports.todos = (req, res) => {

    Todo.findAll({ include: ['categories'] })
        .then(todo => {
            res.status(200).json({
                success: true,
                todos: todo
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err
            })
        })

}


module.exports.createdTodo = async (req, res) => {

    let categoryId = await Category.findOne({ where: { id: req.body.categoryId } })


    if (!categoryId) {
        res.status(404).json({
            success: false,
            message: "No Category Id"
        })
    }

    let Todos = {
        name: req.body.name,
        note: req.body.note,
        categoryId: req.body.categoryId
    }


    Todo.create(Todos)
        .then(todo => {
            res.status(201).json({
                success: true,
                'message': "Created Success",
                todos: todo
            })
        })
        .catch(err => {
            res.status(500).json({
                sucess: false,
                message: "Internal  Server Error",
                error: err
            })
        })

}

module.exports.updateTodo = async (req, res) => {

    let categoryId = await Category.findOne({ where: { id: req.body.categoryId } });


    if (!categoryId) {
        res.status(404).json({
            success: false,
            message: "No Category Id"
        })
    }

    let Todos = {
        name: req.body.name,
        note: req.body.note,
        categoryId: req.body.categoryId
    }


    Todo.findOne({ where: { id: req.params.id } })
        .then(todos => {
            if (!todos) {
                res.status(404).json({
                    success: false,
                    message: 'Nothing Id Todo'
                })
            }
            Todo.update(Todos, { where: { id: req.params.id } })
                .then(todo => {
                    res.status(200).json({
                        success: true,
                        todos: todo
                    })
                })
                .catch(err => {
                    res.status(400).json({
                        succes: false,
                        message: "Bad Request Failed Update",
                        error: err
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                mesage: "Internal Server Error",
                error: err
            })
        })

}


module.exports.detailTodo = (req, res) => {

    Todo.findOne({ where: { id: req.params.id }, include: ['categories'] })
        .then(todo => {
            if (!todo) {
                res.status(404).json({
                    success: false,
                    message: "Nothing Id Todo"
                })
            }
            res.status(200).json({
                success: true,
                todos: todo
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err
            })
        })

}

module.exports.removeTodo = (req, res) => {

    Todo.destroy({ where: { id: req.params.id } })
        .then(todo => {
            if (!todo) {
                res.status(404).json({
                    success: false,
                    message: "Error Nothing Id"
                })
            }
            res.status(200).json({
                success: true,
                message: "Delete Successfully"
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err
            })
        })

}