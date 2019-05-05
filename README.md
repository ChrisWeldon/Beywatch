### Beybladematch.com
A site dedicated to finding the best Beyblade parts for every Matchup. By measuring the stats decided by the creators and comparing that to crowd-sourced match data, finding the best Beyblade parts should be relatively simple ...

All the open source code for this project can be found here

## Overview
*This app is currently being worked on as of May 2019, so you should expect regular updates*


This app will be build on 3 main parts:
 - the API
 - the Client
 - the Database

## API
//TODO

## CLIENT
The client is a pretty straightforward React JS frontend. The prototype works but will need pretty big visual overhaul for the production build.

## Database
The Database is run on MySQL with a phpMyAdmin client. This database is designed to be accessible from both the dev server and the production server.

Usually this is a pretty poor idea given that a mistake on the dev server-app could ruin the production data. Also, this code being open source would blast the myql login credentials all over the web. With all this being said, I really did not want to have to setup a dev mysql server every time I worked on a different machine. Also, if I ever brought anyone onto this project, getting them up to speed would be a lot faster with one master mysql server.

By including an sql_config.json file, I could put all the secret bits in there as well as angle the associated API server to either the dev-database or the production-database. Then, just put it into the git ignore file and have different ones for each branch.
