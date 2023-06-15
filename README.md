# Almabetter Capstone Project Two Backend Bookmyshow

This project aims to create a simple movie booking website similar to BookMyShow. It consists of three servers: one for the backend, one for the frontend, and one for the database to store movie bookings.

## Installation
1. Clone the repository to your local machine.
2. Navigate to the client directory and run npm install to install the frontend dependencies.
3. Navigate to the main directory and run npm install to install the backend dependencies.


#### Database Server
The database server is responsible for storing movie bookings. The connection with the local server is established in connection.js. Use the provided code to connect to your local database server.
Ensure that you store your data according to the schema defined in Schema.js.
Backend Server
The backend server is an Express server that listens on port 8080. It exposes the following endpoints:

**Endpoint:** /api/booking 
 1. Method: POST
    - Body: movie: Name of the movie , seats: Object containing seat information (e.g., {A1: 2, A2: 1, B3: 4}), slot: Time slot for the booking
    - This endpoint is used to make a new booking. It should return a 200 status code on successful booking.

**Endpoint:** /api/booking 

 2. Method: GET
    - This endpoint retrieves the last booking made. If there is no previous booking, it returns a response with the message "no previous booking found."

## Frontend Server (Client)
The client directory contains the code for the frontend React server. To start the frontend server, navigate to the client directory and run npm start.
proving this project.

## Backend Server 
The main directory contains the code for the frontend node server. To start the backend server, navigate to the client directory and run npm run dev.
proving this project.

## Changelog
- Version 1.0.0 (June 14, 2023): Initial release
