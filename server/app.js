import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import auth_route from './routes/auth_route.js'

// Routes
const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

dotenv.config()

mongoose
  .connect(
    process.env.MONGO_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(
    () => app.listen(process.env.PORT,
    () => console.log(`listening at port ${process.env.PORT}`)))
    .catch((error) => console.log(error))

// usage of routes
app.use('/auth/', auth_route)