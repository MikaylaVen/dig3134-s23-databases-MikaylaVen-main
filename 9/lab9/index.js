import express from "express"
import { MongoClient, ObjectId } from "mongodb"
import { connectToDb, getDb } from './db.js'

import posts from "./data/posts.json" assert {type: 'json'}

const app = express()
const PORT = 3000
app.use(express.urlencoded({ extended: true }))

export const DB_NAME= "lab9"s
const COLLECTION_NAME= "articles"


const MONGODB_URL = `mongodb://localhost:37017/${DB_NAME}`
let client = new MongoClient(`${MONGODB_URL}`)

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}!`)
  console.log(posts)
})


//db connection
 let db = client.db()
connectToDb(()=>{
  if(!err){
    app.listen(PORT, () => {
      console.log(`the server is running on ${PORT}!`)
    })
    db = getDb()
  }
})


//GET POSTS
app.get("/posts", async (req, res)   => {
  client = await MongoClient.connect(MONGODB_URL)
  const db = await client.db(DB_NAME)

  const collection = db.collection(COLLECTION_NAME);
  const posts = await collection.find().toArray();

  res.json(posts);
})

//GET ID PARAMETER
app.get("/posts/:postId", async (req, res) => {
  //finds the specific postid then shares the post
  const postId = req.params.postId
  client = await MongoClient.connect(MONGODB_URL)
  const db = await client.db(DB_NAME)
  const collection = db.collection(COLLECTION_NAME);
  const post = await collection.findOne({ postId: postId});
  res.json(post)

})

//GET AUTHOR PARAMETER
app.get("/posts/author/:author", async (req, res) => {
  //find all the comments posted by a specific author
  const author = req.params.author
  client = await MongoClient.connect(MONGODB_URL)
  const db = await client.db(DB_NAME)
  const collection = db.collection(COLLECTION_NAME);
  const post = await collection.findOne({ author: author});
  res.json(post)
})



//POST 
app.post("/posts", async (req, res) => {
  //creates a new post and sends it to the main array
  client = await MongoClient.connect(MONGODB_URL)
  const db = await client.db(DB_NAME)
  const collection = db.collection(COLLECTION_NAME);
  const newPost = req.body
  const results = await collection.insertOne(newPost);
  res.json(results)
})



//DELETE
app.delete("/delete/:postId", async (req, res) => {
  //deletes a post from the main array
  const postId = req.params.postId
  client = await MongoClient.connect(MONGODB_URL)
  const db = await client.db(DB_NAME)
  const collection = db.collection(COLLECTION_NAME);
  const deletion = await collection.deleteOne({postId: postId})
  if (deletion.deletedCount === 0) {
    res.status(404).send("Could not find post");
  } else {
    res.status(200).send("Post deleted ");
  }
});




//POST COMMENT ID
//creates a comment a person posted within the comment array
app.post("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId
  const comment = req.body.comments
  client = await MongoClient.connect(MONGODB_URL)
  const db = await client.db(DB_NAME)
  const collection = db.collection(COLLECTION_NAME);
  const result = await collection.updateOne(
  { _id: postId },
  { $push: { comments: comment }}
  )
  if (result.modifiedCount === 0) {
    res.status(404).send("Post not found");
  } else {
    res.status(200).send("Comment added successfully");
  }
});



//GET COMMENTS ARRAY FROM SPECIFIC POSTER
//displays all the comment the poster has posted
app.get("/post/:postId/comments", async (req, res) => {
  const postId = req.params.postId
  client = await MongoClient.connect(MONGODB_URL)
  const db = await client.db(DB_NAME)
  const collection = db.collection(COLLECTION_NAME);
  const post = await collection.findOne({ _id: ObjectId(postId) });
  if (post) {
    const comments = post.comments;
    res.json(comments);
  } else {
    res.status(404).send("Post not found");
  }
});



//DELETES A COMMENT FROM A POST
app.delete("/posts/:postId/comment/:commentId", async (req, res) => {
  const postId = req.params.postId
  const commentId = req.params.commentId
  client = await MongoClient.connect(MONGODB_URL)
  const db = await client.db(DB_NAME)
  const collection = db.collection(COLLECTION_NAME);
  const result = await collection.updateOne(
    { _id: ObjectId(postId) },
    { $pull: { comments: { _id: ObjectId(commentId) } } }
  );
  if (result.modifiedCount === 0) {
    res.status(404).send("Comment could not found");
  } else {
    res.status(200).send("Comment deleted ");
  }
});




