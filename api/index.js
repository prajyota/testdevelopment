const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/authenticate', async (req, res) => {

    console.log(req.body)
    try {
        const response = await axios.post('http://auth-service:3001/authenticate', req.body);
        // const response = await axios.post('http://localhost:3001/authenticate', req.body);

        res.json(response.data);
    } catch (error) {
        console.log(error)
        res.json(error);
    }

    console.log('done')
});

app.post('/postdata', async (req, res) => {
    console.log(req.body)

    try {
        const response = await axios.post('http://data-service:3002/savedata', req.body);
        // const response = await axios.post('http://localhost:3002/savedata', req.body);

        res.json(response.data);
    } catch (error) {
        res.json(error);
    }
});

app.listen(port, () => {
    console.log(`API Gateway listening at http://localhost:${port}`);
});