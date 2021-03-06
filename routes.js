const fs = require("fs");

const requestHandler =(req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Enter</button></form></body>');
        res.write('</html>');
       return res.end();
    }
    
    if( url === '/message' && method === "POST"){
        const body = [];
        req.on('data',(chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
      return  req.on('end',()=>{
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message = parseBody.split('=')[0];
           // fs.writeFileSync('message.txt', message);
           fs.writeFile('message.txt', message, err =>{
            res.statusCode = 302;
            res.setHeader('Location','/');
            return res.end();
           } );
           
        })
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js server</h1></body>');
    res.write('</html>');
    res.end();
}; 

//module.exports= requestHandler;

// module.exports = {
//     handler : requestHandler,
//     hardText : 'Hard coded Text'
// }

//exports.handler = requestHandler
//exports.hardText = 'Hard coded Text';

module.exports.handler = requestHandler;
module.exports.hardText = 'Hard coded Text';