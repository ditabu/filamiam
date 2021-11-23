const mongoose = require("mongoose");
console.log(process.env.DATABASE_URL)
// mongoose.connect(
//   "mongodb://localhost:27017/filam", // < replace with your database name!
// )

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', function(err){
  console.log(`Mongodb error: ${err}`)
});