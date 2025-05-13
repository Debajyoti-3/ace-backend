// require('dotenv').config()

import dotenv from "dotenv";
import connectDb from "./db/index.js";

dotenv.config({ //
  path: "./env",
});

connectDb();


// This 2nd approach, but the 1st approach (upper one) is better
/*
;(async ()=>{           // IIFE
    try {
       mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) 
       app.on("error",(error)=>{
        console.log("ERROR: ",error)
        throw error
       })

       app.listen(process.env.PORT , ()=>{
        console.log(`app is listening on https:localhost:${process.env.PORT}`)
       })
    } catch (error) {
       console.error("ERROR : ",error) 
    }
})()
*/
