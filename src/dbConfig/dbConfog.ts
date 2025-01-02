import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export default async function db() {
  if (isConnected) {
    console.log('Already connected to the database.');
    return;
  }
  try {
    // Use await to ensure the connection is successful before proceeding
    await mongoose.connect(process.env.MONGO_URL!, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if no server is found
      socketTimeoutMS: 45000,  
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB is running successfully! :)");
      isConnected = true;
    });

    connection.on("error", (err) => {
      console.error("MongoDB connection error: " + err);
      process.exit(1); // Exit the process in case of connection error
    });

    // Event listener for disconnection
    connection.on("disconnected", () => {
      console.warn("MongoDB connection is disconnected.");
      isConnected = false; 
    });
  } catch (error) {
    console.error(
      "Something went wrong during the database connection process!"
    );
    console.error(error);
  }
}
