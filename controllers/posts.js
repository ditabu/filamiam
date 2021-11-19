const Post = require("../models/post");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();
const { v4: uuidv4 } = require("uuid");

const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
    create,
    index,
    deletePost
};

async function deletePost(req, res) {
  try {     
      const post = await Post.findOne({'post._id': req.params.id, 'post.username': req.user.username});
      post.remove(req.params.id) // mutating a document
      // req.params.id is the like id 
      await post.save() // after you mutate a document you must save
      res.json({data: 'post removed'})
  } catch(err){ 
      res.status(400).json({err})
  }
}

function create(req, res) {
    console.log(req.body, "<------- req.body", req.file, "<+++++ req.file", req.user, " <======req.user");
  
    //Upload the file to AWS
    const filePath = `${uuidv4()}/${req.file.originalname}`;
    const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };
    console.log(filePath, "<-----------filePath", params, "<======params")
    s3.upload(params, async function (err, data) {
      console.log(err, " < - error from aws in the post create");
  
      try {
        const post = await Post.create({
          description: req.body.description,
          photoUrl: data.Location,
          user: req.user
        });
        console.log(post, "<----------success")
        res.status(201).json({ post: post });
      } catch (err) {
        res.status(400).json({ err });
      }
    });
}

async function index(req, res) {
    try {
      // this populates the user when you find the posts
      // so you'll have access to the users information
      // when you fetch the posts
      const posts = await Post.find({}).populate("user").exec();
      res.status(200).json({ posts: posts });
    } catch (err) {
      res.status(400).json({ err });
    }
}
  