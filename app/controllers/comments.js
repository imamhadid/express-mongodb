const User = require('../models/users');

exports.addComment = async (id, newCommentData) => {
    try {
        const listComments = {
            ...newCommentData
        };
        const newComment = await User.findOneAndUpdate({ id: id },
            { $push: { listComments: listComments } }, {
            new: true
        }).select('listComments');
        return newComment;
    } catch (error) {
        console.error(error);
        throw error;
    };
};

exports.likeComment = async (commentId, name) => {
    try {
        const user = await User.findOne({ "listComments._id": commentId });

        if (!user) {
            return null;
        };

        const comment = user.listComments.find(c => c._id.toString() === commentId);

        if (!comment) {
            return null;
        };

        const existingLikeIndex = comment.like.listNameLike.findIndex(like => like.name === name);

        if (existingLikeIndex === -1) {
            comment.like.listNameLike.push({ name });
        } else {
            comment.like.listNameLike.splice(existingLikeIndex, 1);
        };

        await user.save();

        return comment;
    } catch (error) {
        console.error('Error in likeComment:', error);
        throw error;
    }
};

exports.getCommentsByUserId = async (userId, sortBy, sortOrder) => {
    try {
        const user = await User.findOne({ id: userId }).select('listComments');

        if (!user) {
            return null;
        };

        let sortedComments = user.listComments;

        if (sortBy === 'mbti' || sortBy === 'enneagram' || sortBy === 'zodiac') {
            sortedComments = sortedComments.sort((a, b) => {
                const aValue = a.votingOptions[sortBy];
                const bValue = b.votingOptions[sortBy];
                return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            });
        } else if (sortBy === 'likes') {
            sortedComments = sortedComments.sort((a, b) => {
                const aLikes = a.like.listNameLike.length;
                const bLikes = b.like.listNameLike.length;
                return sortOrder === 'asc' ? aLikes - bLikes : bLikes - aLikes;
            });
        } else if (sortBy === 'timestamp') {
            sortedComments = sortedComments.sort((a, b) => {
                const aTimestamp = a.createdAt.getTime();
                const bTimestamp = b.createdAt.getTime();
                return sortOrder === 'asc' ? aTimestamp - bTimestamp : bTimestamp - aTimestamp;
            });
        }

        const commentsWithTotalLike = sortedComments.map(comment => {
            const totalLike = comment.like.listNameLike.length;
            return { ...comment.toObject(), totalLike };
        });

        return { ...user.toObject(), listComments: commentsWithTotalLike };
    } catch (error) {
        console.error(error);
        throw error;
    };
};

