var express = require("express"),
    app = express(),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    seeds = require("./seeds");

// require routes
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");

// setup mongodb connection.
mongoose.connect('mongodb://localhost/YelpCamp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// view engine, bodyParser, methodOverride
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public/"));

// seed the database
seeds.init();

// passport configuration
app.use(session({
    secret: "Tiantian is the cutest girl in the world!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// setup routers.
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started!");
});

