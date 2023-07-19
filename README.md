Here's a corrected version of the instructions with proper grammar and formatting:

# NewsLetter App Setup Guide

## Database Setup

To set up the database for the NewsLetter app, follow these steps:

1. Open an Apache server and MySQL.
2. Create your database.
3. Add the `{yourDistLink}/NewsLetter/Databae/NewsLetterDB.sql` file to the SQL field to create the necessary tables.

## Configuration Setup

To configure the app, follow these steps:

1. Create a `config.env` file based on the repository's example file.
2. Add your attributes to the `config.env` file.

## Running the Node Server

To run the Node server, follow these steps:

1. Open your terminal and navigate to the `NodeServer` directory using `cd {yourDistLink}/NewsLetter/NodeServer`.
2. Run `npm install`.
3. Run `npm start`.
4. Optionally, install `nodemon` globally using `npm i nodemon -g` to automatically run the code when it's saved.

## Angular App Setup

To set up the Angular app, follow these steps:

1. Open your terminal and navigate to the `AngularApp` directory using `cd {yourDistLink}/NewsLetter/AngularApp`.
2. Run `npm i --legacy-peer-deps`.
3. Change the `BaseLink` in `{yourDistLink}/NewsLetter/AngularApp/src/environments/environment.ts` to match your Node server's base link (e.g., `http://localhost:8000/`).
4. Run `ng serve -o` to start the app.
5. Enjoy using the NewsLetter app!

Please note that you may encounter grammar and formatting issues in this guide. If you have any questions or need further assistance, please feel free to ask.
