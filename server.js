const http = require('http');
const port = 3002;
const server = http.createServer();


server.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server is listening on port ${port}`)
})
