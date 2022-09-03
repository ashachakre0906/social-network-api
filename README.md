![License Badge](https://img.shields.io/badge/License-MIT-orange)  

## Description
Your challenge is to build an API for a social network web application where users can share their thoughts, react to friends and create thoughts, add/remove a friend. we are using Express.js for routing, a MongoDB database, and the Mongoose ODM.Additionally, we are using JavaScript date library or the native JavaScript Date object to format timestamps. 

## [Solution URL](https://github.com/ashachakre0906/social-network-api)

## User Story
```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```
## Acceptance Criteria
```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```
## Table of Contents
- [Description](#description)
- [Solution URL](#solution-url)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Table of Contents](#table-of-contents)
- [Application Demo](#application-demo)
- [Code Examples](#code-examples)
- [Technologies Used](#technologies-used)
- [Credits](#credits)
- [Questions](#questions)


## Application Demo
This application demonstrates the database for a social networking application. API routes are tested through Insomnia. Following demo's show various functionalities of the application.The walkthrough video shows the below API routes.



- User-Routes
 [Screencastify link](https://watch.screencastify.com/v/H1B24H16KkrkWs7sCFOW)
 - Thought-Routes
   [Screencastify link](https://watch.screencastify.com/v/hgvwDpav1snzBknZDtFb)

  `/api/users`
  * GET all users
  * POST a new user:
  
  `/api/users/:id`
  * GET a single user by its _id and populated thought and friend data
  * PUT to update a user by its _id
  * DELETE to remove user by its _id
  
  `/api/users/:userId/friends/:friendId`
  * POST to add a new friend to a user's friend list
  * DELETE to remove a friend from a user's friend list

  `/api/thoughts`
  * GET to get all thoughts
  * POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  
  `/api/thoughts/:id`
  * GET to get a single thought by its _id
  * PUT to update a thought by its _id
  * DELETE to remove a thought by its _id

  `/api/thoughts/:thoughtId/reactions`
 * POST to create a reaction stored in a single thought's reactions array field
  `/api/thoughts/:thoughtId/reactions/:reactionId`
 * DELETE to pull and remove a reaction by the reaction's reactionId value

## Code Examples
 - Below example shows how I have created my thoughts model where reactions will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.we are using a getter method to format the timestamp on query through moment.js.

```js
const ThoughtsSchema = new Schema(
{
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //from Moment
        get: (createdAt) => moment(createdAt).format('MMM DD, YYYY [at] hh:mm a'),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionsSchema],
},
```
***POST route to create a new thought by method `findOneAndUpdate()`.`req.body` allows to access data in a string and push operator which is going to append the thought to the thoughts array***
```js
createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.id },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(thoughtsData => {
        if (!thoughtsData) {
          res.status(404).json({ message: "Thought id is not valid" });
          return;
        }
        res.json(thoughtsData);
      })
      .catch((err) => res.json(err));
  },
```

## Technologies Used
![Javascript Badge](https://img.shields.io/badge/language-Javascript-blue.svg)
![Express Badge](https://img.shields.io/badge/backend-Express-yellow.svg)
![Node Badge](https://img.shields.io/badge/backend-Node-orange.svg)
![Mongoose Badge](https://img.shields.io/badge/ODM-Mongoose-magenta.svg)
![MongoDB Badge](https://img.shields.io/badge/database-Mongo-green.svg)
![Moment Badge](https://img.shields.io/badge/NPM-Moment.js-purple.svg)

## Credits
Thank you all TA's especially Matthew Kaus for debugging the root of the problem in my codebase and helped me fixing it and made sure my api routes are up and running.Thank you for your help and patience !

## Questions
Please reach out to me:<br>
Email Address: chourpagar.asha@gmail.com <br>
Github Repo URL:[GitHub](https://github.com/ashachakre0906)

























