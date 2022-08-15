const functions = require("firebase-functions");

const express = require("express");
const app = express();

const { getAllDrivers, getDriver, voteForDriver, retractVote, getUsersVote, getCurrentUser } = require('./handlers/drivers');

const { signup, login } = require('./handlers/users');

const firebaseAuth = require('./util/firebaseAuth');

const { db } = require('./util/admin');


// Signup route
app.post("/signup", signup);

// Login route
app.post("/login", login);


//Get list od drivers
app.get("/drivers", getAllDrivers);

// Get specific driver by id
app.get('/driver/:driverId', getDriver);

// Vote for driver
app.get('/driver/:driverId/vote', firebaseAuth, voteForDriver);

// Retract vote 
app.get('/driver/:driverId/retractVote', firebaseAuth, retractVote);

// Get users vote
app.get('/usersVote', firebaseAuth, getUsersVote)

// Get current user
app.get('/currentUser', firebaseAuth, getCurrentUser)




exports.api = functions.region("europe-west6").https.onRequest(app);
