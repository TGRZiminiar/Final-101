import express, {Application} from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import fs from "fs";

const morgan = require("morgan");
dotenv.config();

const app : Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use('/uploads',express.static(__dirname + '/uploads'));


fs.readdirSync("./Routes").map((r:any)=> app.use(("/api"), require(`./Routes/${r}`)));


const PORT = process.env.PORT || 5000;

const start = ():void => {
    const server = app.listen(PORT, (async() => {
        console.log(`SERVRER IS LISTENING ON PORT ${PORT}`);
        await mongoose.connect(process.env.DATABASE as string)
        .then(() => console.log("Connected To DB"))
        .catch((err) => console.log(`Server Error => ${err}`));
    }))
}

start();
