# Installing

1. Install rethinkDB from http://rethinkdb.com/docs/install/ and either put it in your path or in this folder
2. Install Node.js from https://nodejs.org/en/ (4.4 or higher)
3. Install Horizon with Node.js command `npm install horizon -g`

# Configure

1. Go to /chat_server/.hz/config.toml and change the `THE.SERVER.IP.ADDRESS` to the ip address of the server
2. If port 28015 is taken, then change `driver-port` in the rethinkdb.conf file and change `connect` in the .hz/config.toml file
3. If port 8181 is taken, then change `port` in .hz/config.toml and tell me because we'll have to change that in the app too
4. If port 9191 is taken, then change `http-port` in rethinkdb.conf and tell me so I mess with the admin panel during development

# Starting the Server

1. in a console window navigate to this folder (/chat_server)
2. run the file `startRethinkDB.bat`
3. open another console to this folder
4. run the file `startHorizon.bat`
5. go to http://localhost:9191 to ensure the admin panel is there and the server is running

---------------------------------------------------------------
###### created by Matthew Caswell <mattpcaswell@gmail.com> 2016