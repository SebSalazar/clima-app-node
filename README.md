# App-Geolocation-Weather

The app allows you to search for a city and through a query of the Mapbox Geocoding API it makes the query for a limit of 5 cities with the indicated name, then with the latitude and longitude data, the OpenWeather API is asked to output the weather for that specific city.

It also has a history of the last searches for cities with a limit of 5. Data persistence is handled in database.json

# Notes

- It's necessary that you read the **example.env** so that you understand how to put your **keys** or **tokens** for the respective queries to the **APis**.

- To run the project, you need to install the following requirements with **npm installs**, then **npm start** to run the app:

# Requeriments

```
"axios": "^0.21.1",
"colors": "^1.4.0",
"dotenv": "^10.0.0",
"inquirer": "^8.1.0"
```
<img alt="NodeJS" src="https://img.shields.io/badge/Node-v14.17.0%20-%5B9E0B.svg?&style=for-the-badge&logo=javascript&logoColor=white"/>

# Example
<div align="center">
  <img src="https://i.imgur.com/dOHNYq1.png" height="283" width="645"></img>
</div>
<div align="center">
  <img src="https://i.imgur.com/lo9YcI6.png" height="244" width="422"></img>
</div>