// You may need to comment out the function calls below when you're not running that specific test.
import {
  connectToDatabase,
  insertDoc,
  insertDocs,
  getSortedDocs,
  getOldestBook,
  getBookByTitle,
  disconnectFromDatabase,
  client,
} from "./databaseOperations.js"
// This function will allow you to condense the output that mongodb provides to the specific properties/values you want. Just replace the json property and values if needed.
function printBook(book) {
  console.log(`${book.title}: ${book.rank}: ${book.published}`)
}
async function start() {
  let db = await connectToDatabase()
  /**You should test your functions here with appropriate values. You may want to comment out the functions you're not going to test for.
   * IMPORTANT! If you run any of the jest tests, they will erase any data that may been stored in your database previous to running that test.
   */
  // 9-1
  const docToInsert = {
    title: "Little Women",
    rank: 1,
    published: "2021-11-20T00:54:21Z",
  }

  await insertDoc(docToInsert) = [
    {
      "title": "Gimme Shelter",
      "rank": 19,
      "published": "2022-07-17T20:26:41Z"
    },
    {
      "title": "Story of Louis Pasteur, The",
      "rank": 6,
      "published": "2022-07-30T01:07:17Z"
    },
    {
      "title": "Last Witness, The",
      "rank": 7,
      "published": "2022-10-19T07:22:31Z"
    },
    {
      "title": "Colombiana",
      "rank": 16,
      "published": "2022-06-16T20:33:31Z"
    },
    {
      "title": "Prime Suspect 7: The Final Act",
      "rank": 2,
      "published": "2021-12-31T00:54:21Z"
    },
    {
      "title": "River Murders, The",
      "rank": 5,
      "published": "2022-10-12T14:01:39Z"
    },
    {
      "title": "No Deposit, No Return",
      "rank": 11,
      "published": "2022-04-09T07:33:58Z"
    },
    {
      "title": "Maria's Lovers",
      "rank": 17,
      "published": "2022-03-10T11:34:40Z"
    },
    {
      "title": "Of Mice and Men",
      "rank": 14,
      "published": "2022-07-15T03:55:00Z"
    },
    {
      "title": "Canvas",
      "rank": 15,
      "published": "2022-06-12T02:49:56Z"
    }
  ]
  // 9-2

  // 9-3
  await getSortedDocs('title', true)

  // 9-4
  // 9-5

  //Runs function that closes the database after data retrieval
  disconnectFromDatabase()
  console.log("Disconnected")
}

start()
