# Test Backend

## Run Serve

serve by

"nodemon": "^3.0.2"

```bash
npm run start
```

## Run Test

test by

"jest": "^29.7.0",

```bash
npx jest --detectOpenHandles

# example result

    PASS  app/__test__/unit.test.js
    User Profiles
        getUserProfile
        √ should return user profile for a given user id (11 ms)
        getAllUserProfiles
        √ should return an array of user profiles (11 ms)
        createNewUserProfile
        √ should create a new user profile (19 ms)
    Comments
        addComment
        √ should add a new comment to a user (24 ms)
        likeComment
        √ should add a like to a comment (51 ms)
        getCommentsByUserId
        √ should return comments sorted by likes in descending order (34 ms)

    Test Suites: 1 passed, 1 total
    Tests:       6 passed, 6 total
    Snapshots:   0 total
    Time:        2.692 s, estimated 5 s
    Ran all test suites.

```

## API Documentation

### Profile

``` bash

-   All Profile

    GET: localhost:3000/api/profile

-   Detail Profile

    GET: localhost:3000/api/profile/:id

-   Create Profile

    POST: localhost:3000/api/profile
        -body   {
                "name": "John Doe",
                "description": "A new user",
                "mbti": "INFJ",
                "enneagram": "4w5",
                "variant": "sx/sp",
                "tritype": 459,
                "socionics": "IEI",
                "psyche": "MIND"
            }

-   All Comments

    GET: localhost:3000/api/comments/:postId


-   Create Comments

    POST: localhost:3000/api/comments/:userId
        -body   {
                comments: 'This is a test comment',
                nameComments: 'John doe',
                votingOptions: {
                    mbti: 'INFP',
                    enneagram: '1w2',
                    zodiac: 'Aries'
                }
            }

-   Like Comments # Like and Unlike

    PATCH: localhost:3000/api/comments/:postId
        -body   {
                name: 'John doe',
            }


```

## Non Api

### web

```bash
browser: http://localhost:3000/?ids=1

?ids= for get profile users
```
