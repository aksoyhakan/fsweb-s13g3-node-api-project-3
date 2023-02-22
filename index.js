// require your server and launch it
const server = require("./api/server");

const PORT = 8000;

server.listen(PORT, () => {
  console.log("server listening on port ", PORT);
});
