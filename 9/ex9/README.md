This exercise should be completed after you have completed “Query Data from MongoDB” in 9: Use Document Databases with NodeJS. The goal is to practice using the MongoDB native driver to perform basic queries and operations. These functions resemble the type of work done by routes in Express.

# Specifications

- 9-1. Insert the single object passed in as argument ("doc" parameter) into the "books" collection.
  Return the created document.
- 9-2. Insert an array of documents passed in as only argument ("doc" parameter) into the "books" collection.
  Return the array of created documents.
- 9-3. Assume that there are an array of books in the "books" collection.
  Return an array of documents based on the field provided as the argument.
  The order should be ascending if the second argument is true, descending otherwise.

  - **_field_** string containing the field to sort on.
  - **_ascending_** boolean containing whether the list should be ascending or descending.

- 9-4. Retrieve the oldest document from the "books" collection based on the "published" field.
  You can assume "published" is a Date type.
- 9-5. Retrieve all documents as an array that contain part of the string provided in
  the "title" field. This means using a regular expression created based on the
  string.
  - **titleQuery** Has the string that should be matched across all documents in the
    "title" field.

You can assume all tests will insert data into the database prior to querying it, and delete any existing data in the books collection prior to testing. If you test with your own test data, you should add your data to it yourself.

# Submission

Submit your code to repository, and if a jest test is made available, include a screenshot of the code alongside the tests passing. The functions should perform as described.
