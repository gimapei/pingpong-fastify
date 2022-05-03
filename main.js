#!/usr/bin/env node
const fastify = require('fastify')({logger: true});
const nopt = require("nopt");


fastify.get('/', (req, reply) => {
    return {payload:"pong"};
});

const start = async (port) => {
    try {
        await fastify.listen(port);
    } catch(e) {
        fastify.logger.error(e);
        process.exit(0);
    }
}

let knownOpts = {
    "port": Number,
    "title": String
};

var shortHands = {
    "p":["--port"],
    "t":["--help"]
};
nopt.invalidHandler = function(k,v,t) {
    console.log(k);
}

let parsedArgs = nopt(knownOpts, shortHands, process.argv,2)

let port = parsedArgs.port || 6000;

start(port);