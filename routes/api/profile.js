// routes/users.js
const express = require('express');
const { getUserProfile, getAllUserProfiles, createNewUserProfile } = require('../../app/controllers/users');
const router = express.Router();

module.exports = function () {

    router.get('/profile/:id?', async function (req, res, next) {
        try {
            const userId = req.params.id;
            const userData = userId ? await getUserProfile(userId) : await getAllUserProfiles();

            if (!userData || (Array.isArray(userData) && userData.length === 0)) {
                return res.status(404).json({
                    statusCode: 404,
                    error: userId ? 'User not found' : 'No users found'
                });
            }

            return res.status(200).json({ statusCode: 200, profile: userData });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                statusCode: 500,
                error: 'Internal Server Error'
            });
        }
    });

    router.post('/profile', async function (req, res, next) {
        try {
            const newProfileData = req.body;
            console.log(newProfileData)
            const newProfile = await createNewUserProfile(newProfileData);

            return res.status(201).json({ statusCode: 201, profile: newProfile });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                statusCode: 500,
                error: 'Internal Server Error'
            });
        }
    });

    return router;
};
