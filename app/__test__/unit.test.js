const {
    getUserProfile,
    getAllUserProfiles,
    createNewUserProfile
} = require('../controllers/users');

const {
    addComment,
    likeComment,
    getCommentsByUserId
} = require('../controllers/comments');

const { dbConnect, dbDisconnect } = require('../databases/config');

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe('User Profiles', () => {
    describe('getUserProfile', () => {
        test('should return user profile for a given user id', async () => {
            const userId = 1;
            const userProfile = await getUserProfile(userId);
            expect(userProfile).toBeDefined();
        });
    });

    describe('getAllUserProfiles', () => {
        test('should return an array of user profiles', async () => {
            const allUserProfiles = await getAllUserProfiles();
            expect(Array.isArray(allUserProfiles)).toBe(true);
        });
    });

    describe('createNewUserProfile', () => {
        test('should create a new user profile', async () => {
            const newProfileData = {
                name: 'John Doe',
                description: 'A new user',
                mbti: 'INFJ',
                enneagram: '4w5',
                variant: 'sx/sp',
                tritype: 459,
                socionics: 'IEI',
                psyche: 'MIND'
            };

            const newProfile = await createNewUserProfile(newProfileData);
            expect(newProfile).toBeDefined();
        });
    });
});

describe('Comments', () => {
    let userId;

    if (userId === undefined) userId = 1;

    describe('addComment', () => {
        test('should add a new comment to a user', async () => {
            const newCommentData = {
                comments: 'This is a test comment',
                nameComments: 'Commenter',
                votingOptions: {
                    mbti: 'INFP',
                    enneagram: '1w2',
                    zodiac: 'Aries'
                }
            };

            const newComment = await addComment(userId, newCommentData);
            expect(newComment).toBeDefined();
            expect(newComment.listComments).toHaveLength(1);
        });
    });

    describe('likeComment', () => {
        test('should add a like to a comment', async () => {
            const updatedUser = await getCommentsByUserId(userId);

            if (!updatedUser.listComments || updatedUser.listComments.length === 0) {
                console.log('Updated user does not have comments to like:', updatedUser);
                throw new Error('User does not have any comments to like.');
            }


            const newCommentData = {
                comments: 'This is a test comment',
                nameComments: 'Commenter',
                votingOptions: {
                    mbti: 'INFP',
                    enneagram: '1w2',
                    zodiac: 'Aries'
                }
            };

            const newComment = await addComment(userId, newCommentData);

            const commentId = newComment.listComments[0]._id.toString();


            if (!commentId) {
                console.log('Comments is null:', commentId);
                throw new Error('Comments is null.');
            }

            const likedComments = await likeComment(commentId, 'Liker');

            if (!likedComments) {
                console.log(commentId);
                console.log('Liked comments is null:', likedComments);
                throw new Error('Liked comments is null.');
            }

            expect(likedComments.like).toBeTruthy();
            expect(likedComments.like.listNameLike).toBeInstanceOf(Array);
            expect(likedComments.like.listNameLike).toHaveLength(1);
        });

    });


    describe('getCommentsByUserId', () => {
        test('should return comments sorted by likes in descending order', async () => {
            const user = await getUserProfile(userId);
            if (!user.listComments || user.listComments.length === 0 || user.listComments[0].like.listNameLike.length === 0) {
                const newCommentData = {
                    comments: 'This is a test comment',
                    nameComments: 'Commenter',
                    votingOptions: {
                        mbti: 'INFP',
                        enneagram: '1w2',
                        zodiac: 'Aries'
                    }
                };
                const newComment = await addComment(userId, newCommentData);
                await likeComment(newComment.listComments[0]._id, 'Liker');
                await likeComment(newComment.listComments[0]._id, 'AnotherLiker');
            }

            const sortedComments = await getCommentsByUserId(userId, 'likes', 'desc');
            expect(sortedComments).toBeDefined();
            const firstCommentLikes = sortedComments.listComments[0].like.listNameLike.length;
            const secondCommentLikes = sortedComments.listComments[1].like.listNameLike.length;
            expect(firstCommentLikes).toBeGreaterThanOrEqual(secondCommentLikes);
        });
    });

});
