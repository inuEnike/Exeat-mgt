import mongoose from "mongoose";

let MONGO_URI =
  "mongodb+srv://George:Ennygenius@cluster0.m7hacoz.mongodb.net/Exeat";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URI);
    console.log(`Mongodb connected successfully,`);
  } catch (error) {
    throw new Error(error);
  }
};

export default connectDb;
