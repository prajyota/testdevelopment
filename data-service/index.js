const express = require('express')
const bodyParser = require('body-parser');
const redis = require('redis');

const app = express();
const port = 3002

app.use(express.json())

const redisClient = redis.createClient()
redisClient.connect();


redisClient.on('error', (err) => {
    console.error('Redis error--------------: ', err);
});

redisClient.on('connect', function () {
    console.log('Connected!');
});




app.post('/savedata', async (req, res) => {
    const data = req.body;

    if (data) {
        await redisClient.set('data', JSON.stringify(data));
        res.json({ success: true, message: 'Data saved successfully' });

    }
    res.json({ message: 'Error Saving Data' })

})



app.listen(port, () => console.log('Listing on port: ', port))

