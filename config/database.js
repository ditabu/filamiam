const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb://localhost:27017/filam", // < replace with your database name!
// )

mongoose.connect("mongodb://localhost:27017/filam") 
// DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }, () => {
//   console.log("connected to db")
// });

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', function(err){
  console.log(`Mongodb error: ${err}`)
});