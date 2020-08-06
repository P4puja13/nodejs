const http = require("http");

const routes = require('./routes');

// const server = http.createServer((req, res) =>{
//     //process.exit();
// });

console.log(routes.hardText);
const server = http.createServer(routes.handler);
server.listen(5000);