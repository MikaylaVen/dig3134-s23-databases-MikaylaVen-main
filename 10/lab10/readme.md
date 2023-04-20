# jaden's how to guide (mysql edition)

This is guide will be a little more tricky than the mongoDB guide because of the nature of mySQL and their GUI mySQL Workbench. 
I based the tutorial off a specific video so if you are confused watch it: https://www.youtube.com/watch?v=kphq2TsVRIs&ab_channel=DatabaseStar


## Prequisites  
Download mySQL, mySQL Workbench and run a mySQL image on Docker Desktop

```
docker run --name some-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql
```

Once you see the mySQL container in Docker Desktop make sure its running. If its not, click the start button. 

### Connecting to mySQL WorkBench  

In mySQL WorkBench create a new connection by clicking the plus sign.

When connecting to mySQL Workbench make sure all of your config credentials match up.
-Name the connection name anything you want.
-Make sure the port is the first four digits of your container port (ex: 3306)
-Make sure you enter root as your username
-Make sure your password is the SQL password. (ex: password)

Click test connection to make sure everything is set up and if not. 
Now click OK.

### Creating your mySQL Database

Look on the left and click on the schemas section of the navigator.

Right click on the Schema sidebar and press Create Schema. (A schema is a database)
Name your schema whatever is in the config/db-config.js file and then press apply.

nice now you have your database.

### Importing JSON to your mySQL Database

**IMPORTANT: If you want to import JSON to your database, make sure that your JSON file is formatted exactly like the JSON file in this repo's data folder.**

Right click on your database and press Table Data Import Wizard

Enter your file path and make sure it is searching for JSON instead of CSV
Before you click create new table make sure the table is named whatever is in the config/db-config.js file.
Now click next until the pop up is gone.


## Steps to start your live server  

Run these commands in your terminal:
1. npm install i
2. npm run start

### Postman
Enter the GET route: http://localhost:3000/posts

Now that everything is supposedly working you can now begin working on your express routes!