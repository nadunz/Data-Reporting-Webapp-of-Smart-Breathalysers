# Data-Reporting-Webapp-of-Smart-Breathalyser
Backend server and front end web application for reporting statistics of issued data from smart-breathalysers

## Installation

- ### On windows :

    - Install `NodeJS`
    - Install `npm` and `npm install express-generator -g` to install express generator
    - Download all the files & go to webapp directory
    - Then, `npm install` as dependencies in to webapp directory
    - Then, type `set DEBUG=webapp:* & npm start`
    - Check `http://localhost:3000` in your browser
    
    #### Additional For npm :
     - `npm --save install mongoose` in to webapp directory
     - `npm --save install request` in to webapp directory
    
## Database

 - ### MongoDB :
    - Install `MongoDB`
    - Create Database `breathalyzer_db` on MongoDB
    
## Running
   - Start `MongoDB` server {command : `mongod` }
   - Start our app server {command : `npm start` @ webapp directory}
   #### To See Data
    - check `localhost:3000`
   #### To Store Data (by parameter parsing)
    - Hit on the browser `localhost:3000/caseFor?nic=930272645v&veh=86465&alco=85.5&lat=7.2906&lng=80.6337`
## Data Seeding
 If you want to seed some data to database,
  - Start `MongoDB` server
  - Then run `node cases_seeder.js` @ seed folder
  
## Google API Key
   - You have to get `Google Map API Key` & use it to 31 line of index.js @routes folder
