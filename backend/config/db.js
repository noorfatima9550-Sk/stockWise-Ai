const mongoose = require("mongoose");
const dns = require("dns");

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (err) {
  // Ignore DNS set failure if restricted
}

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/stationery_db";
  const fallbackUri = "mongodb://127.0.0.1:27017/stationery_db";

  try {
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
  } catch (error) {
    console.warn(`Primary MongoDB Connection failed: ${error.message}`);
    if (primaryUri !== fallbackUri) {
      console.log(`Attempting fallback to local MongoDB: ${fallbackUri}...`);
      try {
        const fallbackConn = await mongoose.connect(fallbackUri, {
          serverSelectionTimeoutMS: 5000
        });
        console.log(`Fallback Local MongoDB Connected: ${fallbackConn.connection.host} / ${fallbackConn.connection.name}`);
        return;
      } catch (fallbackError) {
        console.error(`Local MongoDB fallback also failed: ${fallbackError.message}`);
      }
    }
    console.error("MongoDB Connection could not be established. Ensure local MongoDB or Atlas IP whitelist is configured.");
    process.exit(1);
  }
};

module.exports = connectDB;
