const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require('uuid');
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

const BUCKET_NAME = process.env.BUCKET_NAME 
console.log(BUCKET_NAME, "bucket_name working")
module.exports = {
  signup,
  login
};

async function signup(req, res) {
  console.log('hitting signup router')
  console.log(req.body, req.file, " <req.body, req.file in our signup, because we have multer");

  // generate a unique fileName
  const filePath = `${uuidv4()}/${req.file.originalname}`;
  // generate our options object for aws
  const params = {
    Bucket: BUCKET_NAME, 
    Key: filePath,
    Body: req.file.buffer,
  };
  console.log(params, "is this working")
  s3.upload(params, async function (err, data) {
    // data -> successful response from aws, the file location will be in data.Location


    const user = new User({...req.body, photoUrl: data.Location});
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
      // Probably a duplicate email
      console.log(err, " <- err signup controller function");
      res.status(400).json({err});
    }
  });
}


async function login(req, res) {
 
  try {
    const user = await User.findOne({email: req.body.email});
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
