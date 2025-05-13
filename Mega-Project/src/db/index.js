import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

// its more good to write db call in db folder. 
async function connectDb(){
     try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) ;
        console.log(`Mongodb Connected || db host :${connectionInstance}`)
    } catch (error) {
        console.log(`Error to connect MongoDb :: ${error}`);
        process.exit(1)
    }
}
export default connectDb