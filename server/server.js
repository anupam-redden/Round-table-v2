// Get dependencies
const  appObj=require('./bin/app.js')
const app = appObj.app;
const express =appObj.express;
//const express =require('express');
//const app = express();

const connection=require('./bin/db/models')

const path = require('path');
const http = require('http');

const bodyParser = require('body-parser');


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Get our API routes
const router = require('./router');
router(appObj,connection);




// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
//app.use('/api', api);

    // Catch all other routes and return the index file
/*app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
});*/

connection.db.sync({force: false}).then(function() {

  console.log('DataBase Connection and tables syncronization done.');


  //INSERT DEFAULT ROWS
  connection.user.findOne({where:{
    email:'admin@g.com'
  }}).then(function(todo){

      if(todo==null || todo=='' || todo=='null')
      {
          var setDefault=require('./defaultRows.js');
          setDefault(connection);
      }

  })
    

    /**
     * Get port from environment and store in Express.
     */
    const port = process.env.PORT || '5200';
    app.set('port', port);

    /**
     * Create HTTP server.
     */
    const server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, () => console.log(`API running on localhost:${port}`));
})