import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/response';
import cors from 'cors';

const app: Express = express();

/** Logging */
app.use(morgan('dev'));

/** Parse the request */
app.use(express.json({ limit: '200mb' }));
app.use(
  express.urlencoded({
    limit: '200mb',
    extended: true,
    parameterLimit: 1000000,
  })
);

/** use CORS */
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

/** RULES OF OUR API */
app.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');

  // set the CORS headers
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );

  // set the CORS method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    return res.status(200).json({});
  }

  next();
});

/** Routes */
app.use('/', routes);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error('Not found');

  return res.status(404).json({
    message: error.message,
  });
});

/** Server */
const httpServer = http.createServer(app);

const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
