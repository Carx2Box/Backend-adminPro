// Requires
const express = require('express');
const connection = require('./models/connection');
const bodyParser = require('body-parser');

const app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Import routes
const appRoutes = require('./routes/app');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const hospitalRoutes = require('./routes/hospital');
const doctorRoutes = require('./routes/doctor');
const searcherRoutes = require('./routes/searcher');
const uploadRouters = require('./routes/upload');
const imagesRoutes = require('./routes/images');
const countryRoutes = require('./routes/contry');

// Connection to database
connection.connect()
    .then(result => {
        console.log('Database \x1b[32m%s\x1b[0m', 'online');
    })
    .catch(error => {
        throw err;
    });

// Server index config
// const serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'));
// app.use('/uploads', serveIndex(__dirname + '/assets'));

app
// Body parser
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    // Use routes
    .use('/login', loginRoutes)
    .use('/user', userRoutes)
    .use('/hospital', hospitalRoutes)
    .use('/doctor', doctorRoutes)
    .use('/search', searcherRoutes)
    .use('/upload', uploadRouters)
    .use('/img', imagesRoutes)
    .use('/country', countryRoutes)
    // Default route
    .use('/', appRoutes);

app.listen(3000, () => {
    console.log('Server express http://localhost:3000: \x1b[32m%s\x1b[0m', 'online');
});