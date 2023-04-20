import express from "express"
import { MongoClient } from "mongodb"
import { connectToDb, getDb } from './db.js'

import posts from "./data/posts.json" assert {type: 'json'}

const app = express()
const PORT = 3000
app.use(express.urlencoded({ extended: true }))

export const DB_NAME= "enter your database name"
const COLLECTION_NAME= "enter your collection name"


const MONGODB_URL = `mongodb://localhost:37017/${DB_NAME}`
let client = new MongoClient(`${MONGODB_URL}`)



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

})

//GET AUTHOR PARAMETER
app.get("/posts/author/:author", async (req, res) => {
  //find all the comments posted by a specific author

})



//POST 
app.post("/posts", async (req, res) => {
  //creates a new post and sends it to the main array

})



//DELETE
app.delete("/delete/:postId", async (req, res) => {
  //deletes a post from the main array

})



//POST COMMENT ID
//creates a comment a person posted within the comment array
app.post("/posts/:postId/comments/", async (req, res) => {

  
})



//GET COMMENTS ARRAY FROM SPECIFIC POSTER
//displays all the comment the poster has posted
app.get("/posts/:postId/comment/", async (req, res) => {

})



//DELETES A COMMENT FROM A POST
app.delete("/posts/:postId/comment/:id", async (req, res) => {

})


// ----------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}!`)
  //console.log(posts)
})
