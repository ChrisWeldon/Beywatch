### Beybladematch.com
[www.beybladematch.com](www.beybladematch.com)
This site is designed to find the best Beyblade parts for every Matchup. By measuring the stats determined by Hasbro and comparing to crowd-sourced match data, finding the best Beyblade parts should be relatively simple ...

Python3 was used for pretty much all the data collection and analysis. The database is using MySQL. The Webapp is built with a Node.js backend and a React.js frontend and NGINX proxy.

All the open source code for this project can be found [Here](https://github.com/ChrisWeldon/beywatch)
While reading the code, you will probably notice that I have cut a lot of corners and left a good bit a loose ends. This is one of my first more involved Full-Stack solo projects I have worked on, so I am actively trying to learn what corners I can cut and which aspects of code can be left sharp and unpolished so that I can publish a web app in minimal time.

The approach I am taking is modeled after the Marshmallow-Spaghetti experiment findings. If you are unfamiliar, here is an article [why-kindergartners-make-better-entrepreneurs-than-mbas-and-how-to-fix-it](https://www.forbes.com/sites/nathanfurr/2011/04/27/why-kindergartners-make-better-entrepreneurs-than-mbas-and-how-to-fix-it/#6de478e41394). Basically to sum it up, children can be better at solving complex problems better than educated adults because they try, fail, and learn from their mistakes over and over instead of overthinking the initial approach. You can never anticipate every variable, so the only thing to do is try over and over.

With that being said, here is the documentation.


## Overview
*This app is currently being worked on as of May 2019, so you should expect regular updates*

This app will be build on 3 main parts:
 - the API
 - the Client
 - the Database

## API
[api.beybladematch.com](api.beybladematch.com)
The backend's main driver is express.js. Pretty much all of the routing after the domain is done in `api/app.js`. I tried to keep all the routing in one place, but for the sake of security I did the base domain routing with NGINX.
The API is accessed using REST endpoints at [api.beybladematch.com](http://api.beybladematch.com).

The initial routes were created prior to having the "api." subdomain setup so pretty much all the queries (for the time being) happen through `api.beybladematch.com\api\<query here>`. Yeah, this is pretty ugly and will be patched shortly.
Right now the API effectively acts as a proxy for restricted SQL queries. The main queries that need to be placed are filter based. Most of the data that is needed can be asked through queries that look like this:

`api.beybladematch.com/part/:part_type/:query` (This looks a lot like a 'get' query!) I formatted all the queries to be with POSTs for production but for the sake of debugging I also made GET equivalents. The post looks like the GET just without the params: `api.beybladematch.com/part/`. This call returns all data points of select `part_type` filtered by query `query`. The SQL query looks pretty similar to this not accounting for injection protection `'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="'+<part type>+'" AND beywatch.abstract_stats.name_hasbro LIKE "' + <letters to Filter> + '%" ORDER BY beywatch.abstract_stats.abbr'`

Here are some additional calls that I threw in there:
`api.beybladematch.com/part/all` This just gets all the ids of all the parts for initial site landing
`api.beybladematch.com/match/` This is when the prediction model is run on the selected parts. The only thing that needs to put in this call is the ID's of the parts. I am trying to make the use of ID's more global throughout the app.

## CLIENT
[www.beybladematch.com](www.beybladematch.com)
The client is a pretty straightforward React.js frontend styled with Bootstrap.js. The prototype works but will need pretty big visual overhaul for the production build.

The landing page consists of 6 form text inputs with an associated scrollable-select input for each text box. As the textbox changes, it calls `api.beybladematch.com/part/` with the filter of whatever is in the textbox.

## Database
[pma.beybladematch.com](pma.beybladematch.com)
The Database is run on MySQL with a phpMyAdmin client. This database is designed to be accessible from both the dev server and the production server.

Usually this is a pretty poor idea given that a mistake on the dev server-app could ruin the production data. Also, this code being open source would blast the myql login credentials all over the web. With all this being said, I really did not want to have to setup a dev mysql server every time I worked on a different machine. Also, if I ever brought anyone onto this project, getting them up to speed would be a lot faster with one master mysql server.

By including an sql_config.json file, I could put all the secret bits in there as well as angle the associated API server to either the dev-database or the production-database. Then, just put it into the git ignore file and have different ones for each branch.
