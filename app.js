var express     = require("express"),
    app         = express(),
    aws = require('aws-sdk'),
    bodyParser  = require("body-parser"),
    multer = require('multer'),
    multerS3 = require('multer-s3'),
    mongoose    = require("mongoose"),
    usePushEach = true,
    multer=require('multer'),
    path= require('path'),
    ejs= require('ejs'),
    passport    = require("passport"),
    cookieParser = require("cookie-parser"),
    LocalStrategy = require("passport-local"),
    flash        = require("connect-flash"),
    shortid = require('shortid'),
    User        = require("./models/user"),
    session = require("express-session"),
    methodOverride = require("method-override"),
    MongoStore = require("connect-mongo")(session),
    request = require('request'),
    randomize = require('randomatic');
    
// configure dotenv
require('dotenv').load();

//requiring routes
var indexRoutes = require("./routes/index");
var userRoutes = require("./routes/user");
var couponCodeRoutes = require("./routes/couponCode");
var itemRoutes = require("./routes/item");
var inventoryRoutes = require("./routes/inventory");
let orders = require("./routes/orders");
let suppliers = require("./routes/supplier");

// mongoose.connect("mongodb://chaudharyt1997:tushar1997@ds121593.mlab.com:21593/apnicare", {
//     useMongoClient: true
// });
mongoose.connect("mongodb://apnicare:apnicare12345@ds151292.mlab.com:51292/apnicare",{ useMongoClient: true });    
//mongoose.connect("mongodb://localhost/apnicare",{ useMongoClient: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("database conected!");
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/.well-known"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

//require moment
app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "apmiCare",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    cookie:{ maxAge: 60 * 60 * 1000 * 24 * 30 }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.session = req.session;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/coupon-code", couponCodeRoutes);
app.use("/item", itemRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/orders", orders);
app.use("/supplier", suppliers);

app.listen(8000, function(){
   console.log("server started at 8000");
});

// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("server started");
// });
 
