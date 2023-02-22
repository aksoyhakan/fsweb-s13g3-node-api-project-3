const express = require("express");
const usersRouter = require("./users/users-router");

const server = express();
server.use("/api/users", usersRouter);

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

module.exports = server;
