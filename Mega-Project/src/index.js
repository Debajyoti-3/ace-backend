// require('dotenv').config()

import dotenv from "dotenv";
import connectDb from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  
  path: "./env",
});

connectDb()       // async function generally returns Promise
  .then(() => {
    app.on("Error", (error) => {
      console.log(`Error is: ${error}`);
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Listening at Port ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log(` MongoDb Connection Error ::`);
  });




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
