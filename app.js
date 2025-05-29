// env file setup
if(process.env.NODE_ENV != "production" ){
    require('dotenv').config(); 
}

const Listing = require("./models/listings");

const express =  require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride =  require('method-override');
const ejsMate = require('ejs-mate');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');


//functions
const ExpressError = require('./utils/ExpressError');


app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));

app.use(express.static(path.join(__dirname , 'public')))
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());

app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

const port = 3000;
const ListingRouter = require('./routes/listings.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');
const { error } = require('console');



//define sessions

const store = MongoStore.create({
    mongoUrl : process.env.ATLASDB_URL ,
    crypto : {
        secret : process.env.SECRET
    },
    touchAfter : 24 * 3600,
});

store.on("error" , () => {
    console.log("error on session store" , error);
})

const sessionOptions = {
    store : store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        maxAge : Date.now() + 7 * 24 * 60 * 60 * 1000,
        expression : Date.now() + 7 * 24 * 60 * 60 * 1000 , 
        httpOnly : true
    }
}

app.use(session(sessionOptions));
app.use(flash());



//passport config

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req , res , next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
})



async function main() {
    await mongoose.connect(process.env.ATLASDB_URL);
}

main().then(() => {
    console.log("Database was Connected ");
}).catch(err  => console.log(err))



//*  all routes use

app.use('/Listings/:id/review' , reviewRouter);
app.use('/', ListingRouter);
app.use('/', userRouter );

// search listings 

app.get('/search-suggestions', async (req, res) => {
  const query = req.query.q;

  if (!query) return res.json([]);

      const results = await Listing.find({
          location : { $regex: query, $options: 'i' } // case-insensitive match
      }).limit(5); // limit suggestions
      res.json(results.map(item => item.title));
 
});

app.post("/Listings/search" , async (req , res ) => {
    let title =  req.body.title;
    const listing = await Listing.find({title});
    return res.render("listings/show.ejs", { listing : listing[0] });
});

// *  actual Middleware routes


app.all('*' , (req , res , next) => {
    next(new ExpressError (404 , " Page Not Found !"))
})

app.use((err , req , res , next) => {
    let {statusCode = 500 , message = "Somthing went WRONG !" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render('listings/error.ejs' , {message})
});




app.listen(port , () => {
    console.log(`Server is running on http://localhost:${port}/Listings`);
});





