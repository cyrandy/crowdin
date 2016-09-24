// content of index.js
const http = require('http')  
const port = process.env.PORT || 3000
const content = require('./resources/zh/foo.json');

const requestHandler = (req, res) => {  
  res.end(JSON.stringify(content))
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})