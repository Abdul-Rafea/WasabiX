import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import pool from './db.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from "path";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { json } from 'stream/consumers';
import { get } from 'http';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {filesize: 2 * 1024 * 1024 }, //computer only understand bytes :(
    fileFilter: (req, file, cb) =>{
        const filetypes = /jpeg|jpg|png/; // Regex/search pattren
        const mimetype = filetypes.test(file.mimetype); // checks internal lable aka mimetype
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // checks actual extension

        if (mimetype && extname){
            return cb(null, true);
        } 

        cb(new Error("Error: file upload only supports images (jpeg, jpg, png), or make sure file size is under 2 mb"));
    }
});

//JWT token verifier: -
const auth = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token){
        return res.status(401);
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decodedPayload) =>{
        if (error){
            return res.status(403);
        }

        req.user = decodedPayload;
        next();
    });
}

app.get('/weather', async (req, res) => {
    const latitude = req.latitude;
        const longitude = req.longitude;

        //units handling: -
        const tempUnit = req.temUnit || "celcius";
        const windUnit = req.windUnit || "kph";
        const precipUnit = req.precipUnit || "mm";
        const isCelcius = null;
        const isKPH = null;
        const isMM = null;
        if(tempUnit === "celcius"){
            isCelcius = true;
        }
        else{
            isCelcius = false;
        }

        if(windUnit === "kph"){
            isKPH = true;
        }
        else{
            isKPH = false;
        }

        if(precipUnit === "mm"){
            isMM = true;
        }
        else{
            isMM = false;
        }

        const aqiAPI_key = process.env.AQI_API_KEY;
        const aqiResponseMsg = "";

        const getDayName = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { weekday: 'long' });
        };
    
    try{
        const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,sunrise,sunset,uv_index_max,temperature_2m_mean,temperature_2m_max,temperature_2m_min,surface_pressure_mean,wind_speed_10m_mean,precipitation_probability_mean,relative_humidity_2m_mean&current=temperature_2m,relative_humidity_2m,is_day,weather_code,surface_pressure,wind_speed_10m${!isKPH && "&wind_speed_unit=mph"}${isCelcius && "&temperature_unit=fahrenheit"}${isMM && "&precipitation_unit=inch"}`);
        const weatherData = weatherResponse.data;
        if(!weatherData){
            console.error("weather API error");
            res.status(404).json({message: "Weather data not found"});
        }
        
        const aqiResponse = await axios.get(`https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${aqiAPI_key}`);
        const aqiData = aqiResponse.data;
        if(!aqiData){
            console.error("AQI API error");
            aqiResponseMsg = "Air quality data not found";
        }
        
        //current data handling:-
        const currentData = {
            day: getDayName(weatherData.current.time),
            temp: weatherData.curent.temperature_2m,
            weatherCode: weatherData.current.weather_code,
            isDay: weatherData.curent.is_day,
            pressure: weatherData.current.surface_pressure,
            humidity: weatherData.current.relative_humidity_2m,
        }

        //Week data handling: -
        const weeekForecastData = weatherData.daily.time.map((date, index) => {});
        //precipitation data handling: -
        const precipData = weatherResponse.data.forecast.forecastday[0].hour.map((item) => ({
            time: item.time.split(' ')[1],
            precip: item.precip_mm
        }))        

        //Final data/JSON response: -
        res.json({
            city: weatherResponse.data.location.name,
            aqi: aqiResponse.data.data.aqi,
            weatherCode: weatherResponse.data.forecast.forecastday[0].day.condition.code,
            weatherText: weatherResponse.data.forecast.forecastday[0].day.condition.text,
            tempC: Math.round(weatherResponse.data.current.temp_c),
            tempF: Math.round(weatherResponse.data.current.temp_f),
            windSpeedMPH: weatherResponse.data.current.wind_mph,
            windSpeedKPH:weatherResponse.data.current.wind_kph,
            pressure: weatherResponse.data.current.pressure_mb,
            humidity: Math.round(weatherResponse.data.current.humidity),
            feelsLikeC: Math.round(weatherResponse.data.current.feelslike_c),
            feelsLikeF: Math.round(weatherResponse.data.current.feelslike_f),
            windKPH: Math.round(weatherResponse.data.current.wind_kph),
            windMPH: Math.round(weatherResponse.data.current.wind_mph),
            uv: weatherResponse.data.current.uv,
            timeOfDay: weatherResponse.data.current.is_day,
            day: dayName,
            icon: weatherResponse.data.current.condition.icon,
            precipData: precipData,
            sunrise: weatherResponse.data.forecast.forecastday[0].astro.sunrise,
            sunset: weatherResponse.data.forecast.forecastday[0].astro.sunset,
            weekData: forecastData,
        });
    }
    catch (error){
        console.error(error.message);
        res.status(500).json({message: "API error"});
    }
    });

app.get('/city-search', async (req, res) => {
    try{
        const geoAPI_key = process.env.GEO_API_KEY;
        const cityText = req.query.cityText;
        
        const geoResponse = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${cityText}&limit=5&format=json&apiKey=${geoAPI_key}`);
        
        const loactaions = geoResponse.data.results.map((item) => ({
            city: item.city,
            country: item.country,
            lat: item.lat,
            lon: item.lon,
        }));
        
        res.json(loactaions);
    }
    catch (error){
        console.error(error.message);
        res.status(500).json({message: "City search failed"});
    }
});

app.post('/signup', async (req, res) => {
    const {email, password, username, terms} = req.body;
    const sqlQuery = `
            INSERT INTO users (email, password, username, terms)
            VALUES ($1, $2, $3, $4)
            RETURNING id, email, created_at, username;
        `;
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(sqlQuery, [email, hashedPassword, username, terms]);
        const userData = result.rows[0];

        //Creating a JWT token here: -
        const payload = {
            userId: userData.id,
            username: username,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "24h"});

        res.status(201).json({
            token: token,
            userId: userData.id,
            username: userData.username,
            message: "User sucessfully registred",
        });
    }
    catch (err){
        let errorMessage = "";

        console.error(err);

        if(err.code == '23505'){
            errorMessage = "Email or username already exists";
        }
        else{
            errorMessage = "Unable to register User";
        }

        res.status(500).json({
            message: errorMessage,
        });
    }
});

app.post('/login', async (req, res) => { 
    const {email, password, username, useEmail} = req.body;
    let value = null;
    let userQuery = null;
    let isPasswordValid = false;

    if (useEmail){
        userQuery = `SELECT * FROM users WHERE email = $1`;
        value = email;
    }
    else{
        userQuery = `SELECT * FROM users WHERE username = $1`;
        value = username;
    }
    
    try{
        const result = await pool.query(userQuery, [value]);

        if (result.rows.length === 0){
            return res.status(401).json({
                message: "User does not exist",
            });
        }

        const user = result.rows[0];

        if (user){
            isPasswordValid = await bcrypt.compare(password, user.password);
        }

        if (!isPasswordValid){
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        
        //Creating a JWT token: -
        const payload = {
            userId: user.id,
            userName: user.username
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "24h"});
        
        //converting avatar back: -
        let imageBase64 = null;
        if(user.avatar_path){
            imageBase64 = `data:image/png;base64,${user.avatar_path.toString('base64')}`;
        }

        res.status(200).json({
            username: user.username,
            token: token,
            message: "Loged In successfully",
            avatar: imageBase64,
        });
    }
    catch (err){
        console.error(err.message);
        res.status(500).json({
            message: "Server Error",
        });
    }
});

app.post('/change-avatar', auth, upload.single('avatar'), async (req, res) =>{
    try{
        const avatar = req.file.buffer;
        const userId = req.user.userId;

        const result = await pool.query(`
            UPDATE users
            SET avatar_path = $1 WHERE id = $2
            RETURNING avatar_path;
        `, [avatar, userId]);

        const user = result.rows[0];
        
        if(!user){
            res.status(404).jsom({
                message: "User not found",
            });
        }

        let imageBase64 = null;
        if(user.avatar_path){
            imageBase64 = `data:image/png;base64,${user.avatar_path.toString('base64')}`;
        }
        res.status(200).json({
            message: "Avatar sucessfully changed",
            avatar: imageBase64,
        });
    }
    catch (err){
        console.error(err);
        res.status(500).json({
            message: "Failed to change avatar",
        });
    }
});

app.post('/update-username', auth, async (req, res) =>{
    try{
        const username = req.user.userName;
        const newUsername = req.body.newUsername;
        const password = req.body.password;

        const result = await pool.query(`SELECT password_hash FROM users WHERE username = $1`, [username]);
        
        if (result.rows.length === 0){
            return res.status(401).json({
                message: "Incorrect password",
            });
        }

        const checkPasswordHash = await bcrypt.compare(password, result.rows[0].password_hash);
        
        if (!checkPasswordHash){
            return res.status(401).json({
                message: "Incorrect password",
            });
        }

        const result2 = await pool.query(`UPDATE users SET username = $1 WHERE username = $2
            RETURNING username`, [newUsername, username]);

        //Updating JWT token with new username: -
        const newToken = jwt.sign({
            userId: req.user.userId,
            userName: result2.rows[0].username,
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn: "24h"}
        );
        
        res.status(200).json({
            message: "Username updated successfully",
            newUsername: result2.rows[0].username,
            token: newToken,
        });
    }
    catch (err){
        console.error(err);
        res.status(500).json({
            message: "Failed to change username",
        });
    }
});

app.get('/user-count', async (res, req) =>{
    try{
        const result = await pool.query(`SELECT COUNT(*) FROM users`);
        const totalUsers = result.rows[0].count;
        
        res.status(200).json({
            totalUsers: parseInt(totalUsers)
        });
    }
    catch (err){
        console.error("Failed to fetch user count:", err.message);
        res.status(500).json({
            message:"Server Error"
        });
    }

});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)});


// netstat -ano | findstr :5000
// taskkill /F /PID 1234