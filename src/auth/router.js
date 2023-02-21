'use strict';

const express = require('express');
const { userModel } = require('./models/index');
const bcrypt = require('bcrypt');
const basicAuth = require('./middleware/basic');


const router = express.Router();


router.post('/signup', async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await userModel.create(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});


router.post('/signin', basicAuth, async (req, res, next) => {
  res.status(200).json(req.user);
});


module.exports = router;
