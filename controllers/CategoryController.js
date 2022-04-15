const Model = require('../models/index');
const Category = Model.categories;


module.exports.getCategory = (req, res) => {

    Category.findAll()
        .then(category => {
            res.status(200).json({
                success: true,
                category: category
            })
        })
        .catch(err => {
            res.statu(500).json({
                success: false,
                message: "Internal Server Error",
                error: err
            })
        })

}

module.exports.createdCategory = (req, res) => {

    let Categories = {
        name: req.body.name,
        color: req.body.color
    }

    Category.create(Categories)
        .then(category => {
            res.status(201).json({
                success: true,
                category: category
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

module.exports.updateCategory = (req, res) => {


    let Categories = {
        name: req.body.name,
        color: req.body.color
    }


    Category.findOne({ where: { id: req.params.id } })
        .then(category => {
            if (!category) {
                res.status(404).json({
                    success: false,
                    message: "Nothing ategory Id"
                })
            }

            Category.update(Categories, { where: { id: req.params.id } })
                .then(category => {
                    res.status(200).json({
                        success: true,
                        category: category
                    })
                })
                .catch(err => {
                    res.status(400).json({
                        success: false,
                        message: "Error Bad Request",
                        error: err
                    })
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

module.exports.detailCategory = (req, res) => {

    Category.findOne({ where: { id: req.params.id } })
        .then(category => {
            if (!category) {
                res.status(404).json({
                    success: false,
                    message: "Nothing Id Category"
                })
            }
            res.status(200).json({
                success: true,
                category: category
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

