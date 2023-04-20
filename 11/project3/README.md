# jaden's how to guide

This is a guide on how to connect MongoDB compass with with your app.

## Prequisites  
Make sure MongoDB compass is installed and your MongoDB image is installed in Docker Desktop. 
To download the image type this code into the terminal:

```
docker run --name mongodb -p 37017:27017 -d mongo
```

Once you see the MongoDB container in Docker Desktop click the start button. 

## Steps to start your live server  
Inside MongoDB compass make sure your connection is mongodb://localhost:37017.
Then create a database and collection for your json objects. 

Look inside the index.js file and replace your DB_NAME and COLLECTION_NAME variables with your respective database and collection name.

Run these commands in your terminal:
1. npm install i
2. npm run start

Now that everything is supposedly working you can now begin working on your express routes!