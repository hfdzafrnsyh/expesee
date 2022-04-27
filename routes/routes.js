'use strict'

const UserRoutes = require('./api/UserRoutes');
const TodoRoutes = require('./api/TodoRoutes');
const CategoryRoutes = require('./api/CategoryRoutes');

const routes = (router) => {

    router.use('/api', CategoryRoutes);
    router.use('/api', TodoRoutes);
    router.use('/api', UserRoutes);

    router.get('/', (req, res) => {
        res.send("Hello World");
    })

}

module.exports = routes;
