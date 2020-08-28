import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
import passport from 'passport';
// import moment from 'moment';
import flash from 'express-flash';
// import { MONGODB_URI } from './utils/secrets';

// Controllers (route handlers)
import * as homeController from './controllers/home';
import * as userController from './controllers/user';
// import * as campgroundController from './controllers/campground';
// import * as commentController from './controllers/comment';
// import * as contactController from './controllers/contact';

// API keys and Passport configuration
// import * as passportConfig from './config/passport';

// Create Express server
const app = express();

// Connect to MongoDB
// const mongoUrl = MONGODB_URI;
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
//   () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
// ).catch(err => {
//   console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
//   // process.exit();
// });

// view engine, bodyParser, methodOverride, moment
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(express.static(__dirname + '/public'));
// passport configuration
app.use(session({
  secret: "Tiantian is the cutest girl in the world!",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

/**
 * Primary app routes.
 */
app.get("/", homeController.index);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);

export default app;