const express = require('express');
const router = express.Router();
const path = require('path');
const templates = path.join(__dirname , "../templates/views")
const usercontroller = require('../db/newAdmissionForm');

router.get('/newAdmissionForm' ,usercontroller.view);

module.exports = router;