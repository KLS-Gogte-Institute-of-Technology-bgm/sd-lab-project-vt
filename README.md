# Pigo Auto [[Video Demo]](https://youtu.be/GDnBJLxG7as)
Pigo Auto is a classified ads and online marketplace for pre-used motorcycles and scooters. The main purpose of this building this application was to increase the reach of Pigo Auto Pvt Ltd, a Belgaum based company. 

## Components
1. Landing page.
2. A Display page for all the vehicles available.
3. A separate section for all the featured vehicles or paid advertisements.
4. A component to display the vehicles individually.
5. A form which will be used by the people who are interested in selling/buying a vehicle. To prevent spam, OTP will be sent to user's phone number which has to be verified before the form can be submitted

## Workflow
1. Users interested to sell their vehicle will submit the Sell Form. The details of the seller and the vehicle are stored in cloud database.
2. All the vehicles in the database are accessible in the admin panel. Through the admin panel, additional details for the vehicle can be added. The details of the users are also available using which the employees of Pigo Auto Pvt Ltd can contact them and finalize the deal. The functionality to list or delist a vehicle from sale is also available in the admin panel.
3. Users interested in buying a vehicle can browse for all the available vehicles from the 'Buy' section and then submit their details to which the employees of Pigo Auto Pvt Ltd shall contact them to sell the vehicle.
4. A separated section for featured vehicles is available where the best deals can be displayed.


<p align="center">
  <row>
    <col>
      <img width="400" height="400" src="https://github.com/KLS-Gogte-Institute-of-Technology-bgm/sd-lab-project-vt/blob/vaibhavmuchandi-dev/Use%20case%20diagram.jpg">
    </col>
    <col>
      <img width="800" height="400" src="https://github.com/KLS-Gogte-Institute-of-Technology-bgm/sd-lab-project-vt/blob/vaibhavmuchandi-dev/Sequence%20Diagram.png">
    </col>
  </row>
</p>


## How to run the application using source code
1. Clone the repository.
2. ``` npm install ``` in both Frontend and Backend directories.
3. In two seprate terminals, ``` npm start ``` from the respective directories.
4. Frontend instance will be available at localhost:4000

## Technology Stack
1. React JS
2. Nodejs (ExpressJS)
3. MongoDB Atlas
4. Google Cloud Storage (Buckets)
5. Google Cloud App Engine

## Authors
1. ***Vaibhav Mahesh Muchandi*** - 2GI18CS172
2. ***Tarun Satish Bagewadi*** - 2GI18CS170
