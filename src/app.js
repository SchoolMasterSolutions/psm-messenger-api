import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import path from 'path';
import morgan from 'morgan';
import rfs from 'rotating-file-stream';
import passport from 'passport'

require('./config/passport')(passport)

import {
  swaggerDefinition
} from './public/docs/swagger.options';

import {
  router
} from './routes';
import database from './config/database';

require('dotenv').config();

const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.use(passport.initialize())

// add swagger documentation
const swaggerSpec = swaggerJsDoc(swaggerDefinition);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(swaggerSpec);
});

app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/docs/redocs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'docs', 'index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'docs', 'index.html'));
});

app.use(cors());

const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'log'),
});

app.use(morgan('combined', {
  stream: accessLogStream,
}));

// use static files
app.use(express.static('./public'));

// parse requests of Content-Type application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// parse requests of Content-Type application/json
app.use(bodyParser.json());

io.origins('*:*')
io.on('connection', socket => {
  socket.emit('connections', Object.keys(io.sockets.connected).length);

  socket.on('disconnect', () => {
    console.log("A user disconnected");
  });

  socket.on('chat-message', (data) => {
    io.emit('chat-message', (data));
  });

  socket.on('typing', (data) => {
    socket.broadcast.to(data).emit('typing', (data));
  });

  socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping');
  });

  socket.on('joined', (data) => {
    socket.broadcast.emit('joined', (data));
  });

  socket.on('leave', (data) => {
    socket.broadcast.emit('leave', (data));
  });
})

// add routers
router(app);

// mongo database connection
database.connect(process.env.DB_CONNECTION)
  .then(() => {
    const server = http.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}...`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app;
