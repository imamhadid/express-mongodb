const users = require('../models/users');

const parseUserProfile = (user) => {
    if (!user) return null;

    const { profile, characteristic, id, image } = user;

    return {
        id,
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
        image
    };
};

exports.getUserProfile = async (userId) => {
    try {
        const userProfile = await users.findOne({ id: userId })
            .select('profile characteristic id image');
        return parseUserProfile(userProfile);
    } catch (error) {
        // Handle errors
        console.error(error);
        throw error;
    }
};

exports.getAllUserProfiles = async () => {
    const allUsersData = await users.find({})
        .select('profile characteristic id image');
    return allUsersData.map(parseUserProfile);
};

exports.createNewUserProfile = async (profile) => {
    const newProfileData = {
        profile: {
            name: profile.name,
            description: profile.description
        },
        characteristic: {
            mbti: profile.mbti,
            enneagram: profile.enneagram,
            variant: profile.variant,
            tritype: profile.tritype,
            socionics: profile.socionics,
            psyche: profile.psyche
        }
    };

    const newUser = await users.create(newProfileData);
    return parseUserProfile(newUser);
};