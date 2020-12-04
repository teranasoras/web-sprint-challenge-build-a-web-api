const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const actionRouter = require('./actions/actions-router')
const projectRouter = require('./projects/projects-router')


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
