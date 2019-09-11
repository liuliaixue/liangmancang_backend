import path from 'path';
import express from 'express';
import httpError from 'http-errors';
import logger from '../tools/logger';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { IReq } from './passport';
import { any } from 'joi';

import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

import fs from 'fs';
const schemaFile = path.resolve(__dirname, '../graphql/schema.graphql');
const schemaText = fs.readFileSync(schemaFile, 'utf8');
const schema = buildSchema(schemaText);

import graphqlRoot from '../graphql/index';
import passport from './passport';

import routes from '../routes/index.route';
import config from './config';

const app = express();

// todo add logger for router
// if (config.env === 'development') {
//     app.use(logger('dev'));
// }

// Choose what fronten framework to serve the dist from
var distDir = '../../dist/';
if (config.frontend == 'react') {
  distDir = '../../node_modules/material-dashboard-react/dist';
} else {
  distDir = '../../dist/';
}

//
app.use(express.static(path.join(__dirname, distDir)));
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + '/index.html'));
});

// console.log(distDir);
//React server
app.use(
  express.static(
    path.join(__dirname, '../../node_modules/material-dashboard-react/dist')
  )
);
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
app.use(
  '/api/graphql',
  passport.verifyUser,
  graphqlHTTP({
    schema: schema,
    rootValue: graphqlRoot,
    graphiql: true
  })
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = httpError(404);
  return next(err);
});

// error handler, send stacktrace only during development
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // customize Joi validation errors
    if (err.isJoi) {
      err.message = err.details.map((e: Error) => e.message).join('; ');
      err.status = 400;
    }

    res.status(err.status || 500).json({
      message: err.message
    });
    logger.error({ _from: 'error', message: err.message });
    next(err);
  }
);

export default app;
