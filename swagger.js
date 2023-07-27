const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./src/routes/auth.js",
  "./src/routes/category.js",
  "./src/routes/transaction.js",
  "./src/routes/wallet.js",
];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require("./index.js");
});
