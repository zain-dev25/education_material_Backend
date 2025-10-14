import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `mongodb+srv://${process.env.DATA_BASE_NAME}:${process.env.DATA_BASE_KEY}@authenticate.2z87mtw.mongodb.net/?retryWrites=true&w=majority&appName=Authenticate`
        );
        console.log(
            `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};

export default connectDB;