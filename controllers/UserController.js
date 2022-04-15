const Model = require('../models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = Model.users;

module.exports.listUser = (req, res) => {

    User.findAll({
        attributes: ['name', 'email']
    })
        .then(user => {
            res.status(200).json({
                success: true,
                users: user
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

module.exports.register = (req, res) => {


    let Users = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone
    }


    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                Model.users.create(Users)
                    .then(users => {
                        res.status(201).json({
                            success: true,
                            message: "Register Successfully",
                            users: users
                        })
                    })
                    .catch(err => {
                        res.status(400).json({
                            success: false,
                            message: "Error Bad Request",
                            error: err
                        })
                    })
            } else {
                res.status(400).json({
                    success: false,
                    message: "User Already Exist"
                })
            }

        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err
            })
        })

}


module.exports.login = (req, res) => {


    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                res.status(404).json({
                    success: false,
                    message: "Nothing Users"
                })
            } else if (user && bcrypt.compareSync(req.body.password, user.password)) {

                const token = jwt.sign({
                    userId: user.id
                },
                    'secret'
                    ,
                    {
                        expiresIn: '1d'
                    }
                );

                const users = ({ email: user.email, token: token })

                res.status(200).json({
                    success: true,
                    users: users
                })

            } else {
                res.status(400).json({
                    success: false,
                    message: "Email or Password!"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err
            })
        })


}