const express = require('express');
const UserRoute = require('./User.routes');
const AdminRoute = require('./Admin.routes');
const router = express.Router();

const defaultRoutes = [
  {
    path: 'admin',
    route: AdminRoute,
    public: false,
  },
  {
    path: 'user',
    route: UserRoute,
    public: false,
  },
];

defaultRoutes.forEach((route) => {
  router.use(`/api/v1/${route.path}`, route.route);
});


module.exports = router;