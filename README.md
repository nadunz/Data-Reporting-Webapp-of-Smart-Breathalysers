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
   - Start our app server {command : `npm start` @ webapp directory}
   #### To See Data
    - check `localhost:3000`
   
## Data Seeding
 If you want to seed some data to database,
  - Start `MongoDB` server
  - Then run `node cases_seeder.js` @ seed folder
  
## Google API Key
   - You have to get `Google Map API Key` & use it to 31 line of index.js @routes folder
   
## Web URL

https://smart-breathalyzer-web-app.herokuapp.com/

   ### Snapshots
   
   ![bmslogin](https://user-images.githubusercontent.com/34955038/62452094-22956a80-b78d-11e9-9668-5af1721059c1.PNG)
   
   ![bmsdashboard](https://user-images.githubusercontent.com/34955038/62452333-92a3f080-b78d-11e9-8cf6-1c601073f6a6.PNG)

   
