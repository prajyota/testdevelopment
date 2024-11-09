const express = require ('express')
const bodyParser = require('body-parser');
const redis = require('redis');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001

app.use(bodyParser.json());


const redisClient = redis.createClient()

// console.log(redisClient)

redisClient.connect();


redisClient.on('error', (err) => {
    console.error('Redis error--------------: ', err);
});

  redisClient.on('connect', function() {
    console.log('Connected!');
  });

const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';


app.post('/authenticate',(req,res)=> {
    const {username, password} = req.body;   

    if(username === 'admin' && password === 'admin123'){
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        redisClient.set(token, username, 'EX', 3600) //Set token with expiry of 1 hour
        return res.json({success: true, message: 'Authenticated', token : token})
    }
    res.json({message: 'Invalid Credentials'})
})

app.listen(port, () => console.log('Listing on port: ',port))

