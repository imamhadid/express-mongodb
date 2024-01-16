const User = require('../models/users');

exports.storeDataDummy = async () => {
    try {
        const dummyUser = new User({
            id: 1,
            profile: {
                name: "A Martinez",
                description: "Adolph Larrue Martinez III."
            },
            characteristic: {
                mbti: "ISFJ",
                enneagram: "9w3",
                variant: "sp/so",
                tritype: 725,
                socionics: "SEE",
                psyche: "FEVL",
                sloan: "RCOEN",
            },
            image: "https://soulverse.boo.world/images/1.png"
        });

        await dummyUser.save();
        console.log('Dummy data stored successfully in the database.');
    } catch (error) {
        console.error('Error storing dummy data:', error);
        throw error;
    }
};
