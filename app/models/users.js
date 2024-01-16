const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    profile: {
        name: String,
        description: String
    },
    characteristic: {
        mbti: String,
        enneagram: String,
        variant: String,
        tritype: Number,
        socionics: String,
        psyche: String,
        sloan: String,
        temperaments: String
    },
    image: {
        type: String,
        default: 'https://soulverse.boo.world/images/1.png'
    },
    listComments: [{
        createdAt: { type: Date, default: Date.now },
        comments: String,
        nameComments: String,
        like: {
            listNameLike: [{
                name: String
            }]
        },
        votingOptions: {
            mbti: {
                type: String,
                enum: [
                    'INFP',
                    'INFJ',
                    'ENFP',
                    'ENFJ',
                    'INTJ',
                    'INTP',
                    'ENTP',
                    'ENTJ',
                    'ISFP',
                    'ISFJ',
                    'ESFP',
                    'ISTP',
                    'ISTJ',
                    'ESTP',
                    'ESTJ'
                ]
            },
            enneagram: {
                type: String,
                enum: [
                    '1w2',
                    '2w3',
                    '3w2',
                    '3w4',
                    '4w3',
                    '4w5',
                    '5w4',
                    '5w6',
                    '6w5',
                    '6w7',
                    '7w6',
                    '7w8',
                    '8w7',
                    '8w9',
                    '9w8',
                    '9w1'
                ]
            },
            zodiac: {
                type: String,
                enum: [
                    'Aries',
                    'Taurus',
                    'Gemini',
                    'Cancer',
                    'Leo',
                    'Virgo',
                    'Libra',
                    'Scorpio',
                    'Sagittarius',
                    'Capricorn',
                    'Aquarius',
                    'Pisces'
                ]
            }
        }
    }],
});

userSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    try {
        const lastUser = await this.constructor.findOne({}, { id: 1 }, { sort: { id: -1 } });
        this.id = lastUser ? lastUser.id + 1 : 1;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = model('User', userSchema);
