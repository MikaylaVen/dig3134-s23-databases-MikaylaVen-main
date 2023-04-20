import express from 'express';
import path from 'path';
import db from './models/index.js';

import mysql from 'mysql2/promise'

import dbConfig from './config/db-config.js'


const PORT = 3000
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(import.meta.url, 'public')));

(async () => {
  await db.sequelize.sync();
})();


const connection = await mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE
});

app.use(function (req, res, next) {
  console.log('This is global middleware!');
  next();
});



app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}!`)
})

// routes

// GET route to retrieve data from the database
app.get('/posts', async (req, res) => {
  try {
    const [rows] = await connection.execute(`SELECT * FROM ${dbConfig.TABLE_NAME}`);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});
// GET Returns an array of posts by a given author
app.get('/posts/:author', async (req, res) =>{
  const author = req.params.author
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM ${dbConfig.TABLE_NAME} WHERE author = ?`,
      [author]
      );
      res.send(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal server error')
  }

})

//GET Retrieves a single post object based on postId
app.get('/post/:postId', async (req, res) =>{
  const postId = req.params.postId;

  try {
    const [rows] = await connection.execute(
      `SELECT * FROM ${dbConfig.TABLE_NAME} WHERE postId = ?`,
      [postId]
    )
    if (rows.length === 0) {
      res.status(404).send('Post not found')
    } else {
      res.send(rows[0])
    }
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal server error')
    }
  }
)
// POST Accepts a JSON object as the body of the request containing all post fields and saves to the database.
app.post('/posts', async (req, res) => {
  let { title, date, postId, author } = req.body;

  title = title || null;
  date = date || null;
  postId = postId || null;
  author = author || null;

  try {
    await connection.execute(
      `INSERT INTO ${dbConfig.TABLE_NAME} (title, date, postId, author) VALUES (?, ?, ?, ?)`,
      [title, date, postId, author]
    );
    res.status(201).send('Post created');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});
// DELETE Removes the post from the database based on the postId field.
app.delete('/post/:postId', async (req, res) =>{
  const postId = req.params.postId;
 
  try {
    await connection.execute(
      `DELETE FROM ${dbConfig.TABLE_NAME} WHERE postId = ?`,
      [postId]
    );
    res.status(200).send('Post deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// POST Adds a comment to the end of the post and returns the commentId
app.post('/post/:PostId/comment', async (req, res) =>{
  let { comments } = req.body;
  let { postId } = req.params;

 
  comments = comments|| null;
  postId = postId || null;
 
  try {
    const result = await connection.execute(
      `INSERT INTO ${dbConfig.TABLE_NAME} (postId, comments) VALUES (?, ?)`,
      [postId, comments]
    );
    const commentId = result.insertId;
    res.status(201).json({ commentId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
})
// GET Returns all comments associated with a given postId
app.get('/post/:PostId/comments', async (req, res) =>{
  const { postId } = req.params;

  try {
    const [rows] = await connection.execute(
      `SELECT * FROM ${dbConfig.TABLE_NAME} WHERE postId = ?`,
      [postId]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
})

//DELETE Deletes the comment with the provided commentId on the post with the postId
app.delete('/post/:postId/comment/:commentId', async (req, res) => {
  const { postId, comments } = req.params;

  try {
    
    const [post] = await connection.execute(`SELECT * FROM ${dbConfig.TABLE_NAME} posts WHERE id = ?`, [postId]);

    if (!post.length) {
      return res.status(404).json({ error: 'Post not found' });
    }

   
    const [comment] = await connection.execute(`SELECT * FROM ${dbConfig.TABLE_NAME} comments WHERE id = ?`, [comments]);

    if (!comment.length) {
      return res.status(404).json({ error: 'Comment not found' });
    }

   
    await pool.execute('DELETE FROM comments WHERE id = ?', [comments]);

    return res.sendStatus(204); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})