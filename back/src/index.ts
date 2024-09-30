import express  from "express";
import { PORT } from "./config/envs";
import app from "./server";
import morgan from "morgan";
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";

app.use(express.json());
app.use(morgan("dev"));

AppDataSource.initialize()
.then(res => {
    console.log(`Succes conection to DB `);
    
    app.listen(PORT, ()=>{
        console.log(`Server listening on port: http://localhost:${PORT}`);
    })
})
.catch((err) => {
    console.error("Error during Data Source initialization:", err)
}) 

