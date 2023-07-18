const { default: mongoose } = require("mongoose");

const connect = async () => {
  try {
    console.info("Starting database connection...");
    mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info("Database successfully connected!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  connect,
};
