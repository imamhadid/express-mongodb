'use strict';

const express = require('express');
const router = express.Router();
const User = require('../app/models/users');

module.exports = function () {

  router.get('/', async function (req, res, next) {
    try {

      console.log(req.query.ids)
      { req.query.ids === undefined ? req.query.ids = 1 : req.query.ids }
      const dummyUser = await User.findOne({ id: req.query.ids });

      const { profile, characteristic, id, image } = dummyUser;

      res.render('profile_template', {
        profile: {
          name: profile.name,
          description: profile.description,
          mbti: characteristic.mbti,
          enneagram: characteristic.enneagram,
          variant: characteristic.variant,
          tritype: characteristic.tritype,
          socionics: characteristic.socionics,
          psyche: characteristic.psyche,
          sloan: characteristic.sloan,
          temperaments: characteristic.temperaments,
          id,
          image
        }
      });
    } catch (error) {
      console.log(error)
      res.status(404).json({
        statusCode: 404,
        error: `user not found`
      });
    }
  });

  return router;
}

