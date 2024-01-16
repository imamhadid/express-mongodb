'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { dbConnect, dbDisconnect } = require('./app/databases/config');

app.use(express.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

dbConnect()
    .then(() => {
        console.log('Connected to the database');

        app.use('/', require('./routes/profile')());

        app.use('/api', require('./routes/api/profile')());

        app.use('/api', require('./routes/api/commnet')());

        const server = app.listen(port, () => {
            console.log(`Express started. Listening on ${port}`);
        });

        process.on('SIGINT', async () => {
            console.log('Stopping the server...');
            await dbDisconnect();
            server.close(() => {
                console.log('Server stopped.');
                process.exit(0);
            });
        });
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });