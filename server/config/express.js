const path = require('path');
const express = require('express');
const httpError = require('http-errors');
// const logger = require('morgan');
require('../tools/logger')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql'); 
const fs = require('fs')
const schemaFile = path.resolve(__dirname, '../graphql/schema.graphql')
const schemaText = fs.readFileSync(schemaFile, 'utf8')
const schema = buildSchema(schemaText)
const graphqlRoot = require('../graphql/index')
const passport = require('./passport')


const routes = require('../routes/index.route');
const config = require('./config');

const app = express();


// todo add logger for router
// if (config.env === 'development') {
//     app.use(logger('dev'));
// }

// Choose what fronten framework to serve the dist from
var distDir = '../../dist/';
if (config.frontend == 'react') {
    distDir = '../../node_modules/material-dashboard-react/dist'
} else {
    distDir = '../../dist/';
}

// 
app.use(express.static(path.join(__dirname, distDir)))
app.use(/^((?!(api)).)*/, (req, res) => {
    res.sendFile(path.join(__dirname, distDir + '/index.html'));
});

// console.log(distDir);
//React server
app.use(express.static(path.join(__dirname, '../../node_modules/material-dashboard-react/dist')))
app.use(/^((?!(api)).)*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
// app.use(compress());
// app.use(methodOverride());

// secure apps by setting various HTTP headers
// app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());


// API router
app.use('/api/', routes);
app.use('/api/graphql', passport.verifyUser, graphqlHTTP({
    schema: schema,
    rootValue: graphqlRoot,
    graphiql: true,
}))

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new httpError(404)
    return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {

    // customize Joi validation errors
    if (err.isJoi) {
        err.message = err.details.map(e => e.message).join("; ");
        err.status = 400;
    }

    res.status(err.status || 500).json({
        message: err.message
    });
    next(err);
});

module.exports = app;
