require("dotenv").config();

const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave: false
}))

const path = require ('path');
const hbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'hbs');
app.use(express.static('public'));



const articleControllerClass = require('./controllers/article.js');
const articleController = new articleControllerClass();

const authorControllerClass = require('./controllers/author.js');
const authorController = new authorControllerClass();

const userControllerClass = require('./controllers/user.js');
const userController = new userControllerClass();

const articleRoutes = require('./routes/articles.js')(articleController);
const authorRoutes = require('./routes/authors.js')(authorController);
const userRoutes = require('./routes/users.js')(userController);

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.isAdmin = req.session.user?.role === "admin";
    next();
});

app.use('/', articleRoutes);
app.use('/author', authorRoutes);
app.use('/users', userRoutes);

app.listen(4013, "0.0.0.0", ()=>{
    console.log('App is started at http://localhost:4013')
})
