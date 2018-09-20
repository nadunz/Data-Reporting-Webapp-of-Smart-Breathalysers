# Smart-Breathalyzer 1.0

### Synopsis
  Smart Breathalyzer 1.0 is a project which is mainly targeted for the Police Department in Sri Lanka. Until now they use conventional balloon test to identify drunk drivers. Providing an easy, efficient and more secure IOT based solution to replace old conventional method our aim is to reduce vehicle accidents caused by drunken drivers and uplift the productivity and reliabilty of the Police Department. 
  
  Breathalyzer 1.0 comprised with an embedded part and network part. Hence it can communicate with a remote server sending Alcohol level, Vehicle number and Driver license ID. This device has its own unique id registered in the server. Once the police officer checks a driver breath alcohol level is displayed on the device display and if it is over the specified limit device will automatically prompt to enter Vehicle Number and Driver License ID. Then all the data is sent to remote server. Smart Breathalyzer device consists of an Arduino Mega board, a keypad, MQ3 alcohol sensor, LCD display, GSM/GPRS module. 
  
   A web app is also integrated in the process to access, organize and analyze data in the remote database. Web App is accessible only for authorized officers.
   

## Setup Preview

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

