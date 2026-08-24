const dotenv = require("./dotenv.js");

dotenv.config().then(() => {
  console.log(process.env.PORT);
  console.log(process.env.TOKEN);
});
