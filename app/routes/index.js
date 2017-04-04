var express = require('express');
var router = express.Router();
var controller = require('../controllers/main');

/* GET home page. */
router.get('/', controller.index);
router.get('/accounts', controller.accounts);
router.get('/transactions', controller.transactions);
router.get('/reports', controller.reports);

module.exports = router;
