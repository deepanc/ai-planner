// Database Configuration
module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/ai-planner",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
  },
};
