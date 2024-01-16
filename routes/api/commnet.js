const express = require('express');
const {
    addComment,
    likeComment,
    editComment,
    deleteComment,
    getCommentsByUserId
} = require('../../app/controllers/comments');

const router = express.Router();

module.exports = function () {

    // Add a new comment
    router.post('/comments/:id', async function (req, res, next) {
        try {
            const newCommentData = req.body;
            const { id } = req.params
            const newComment = await addComment(id, newCommentData);
            return res.status(201).json({ statusCode: 201, comment: newComment });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                statusCode: 500,
                error: 'Internal Server Error'
            });
        }
    });

    router.patch('/comments/:commentId', async function (req, res, next) {
        try {
            const { commentId } = req.params;
            const { name } = req.body;
            const likedComment = await likeComment(commentId, name);
            if (likedComment === null) return res.status(404).json({
                statusCode: 404,
                error: 'Comment not found'
            });
            return res.status(200).json({ statusCode: 200, comment: likedComment });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                statusCode: 500,
                error: 'Internal Server Error'
            });
        }
    });

    router.get('/comments/:userId', async function (req, res, next) {
        try {
            const { userId } = req.params;
            const { sortBy, sortOrder } = req.query;
            const userComments = await getCommentsByUserId(userId, sortBy, sortOrder);
            if (userComments === null) return res.status(404).json({
                statusCode: 404,
                error: 'User not found'
            });
            return res.status(200).json({ statusCode: 200, comments: userComments });
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
