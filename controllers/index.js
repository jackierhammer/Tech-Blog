// this is where dashboard routes, home routes, and api routes will be added to the router

// imports router
const router = require('express').Router();

// import statements for routes 
const apiRoutes = require("./api")
const dashboardRoutes = require('./dashboard-routes.js');
const homeRoutes = require('./home-routes');

// connects routes to their paths
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);

// exports updated router
module.exports = router;