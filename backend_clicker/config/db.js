import mongoose from 'mongoose';

export const connectDB = async ()=>{
   try{
    await mongoose.connect(`${process.env.MONGO_URI}/clicker-game`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("database connected");
    })

   }catch(err){
    console.log(err);
   }
}