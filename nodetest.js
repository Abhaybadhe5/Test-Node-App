const express = require('express');
const axios = require('axios');

const app = express();

app.get('/burn', async (req, res) => {

    for (let i = 0; i < 5000; i++) {

        axios.get('https://httpbin.org/delay/2')
            .then(() => {})
            .catch(() => {});

    }

    res.send('Started generating outbound connections');
});

app.listen(3000, () => {
    console.log('App started');
});