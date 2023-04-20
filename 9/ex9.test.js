/**
 * @jest-environment node
 */
import e from "express"
import {
  insertDoc,
  insertDocs,
  getSortedDocs,
  getOldestBook,
  getBookByTitle,
  connectToDatabase,
  client,
} from "./ex9/databaseOperations"

let db
let collection
beforeAll(async () => {
  try {
    db = await connectToDatabase()
    collection = db.collection("books")
    await collection.deleteMany({})
  } catch (err) {
    console.error(err)
  }
})

afterEach(async () => {
  await collection.deleteMany({})
})
afterAll(async () => {
  client.close()
})
it("9-1 insertDoc", async () => {
  for (let i = 0; i < 5; i++) {
    const docToInsert = { id: 123 * i, name: "Of mice and men " + i }
    await insertDoc(docToInsert)
    const foundDoc = await collection.findOne({ id: 123 * i })
    docToInsert._id = foundDoc._id
    expect(foundDoc).toEqual(docToInsert)
  }
})
it("9-2 insertDocs", async () => {
  const docs = []
  for (let i = 0; i < 5; i++) {
    const docToInsert = { id: 123 * i, name: "Of mice and men " + i }
    docs.push(docToInsert)
  }
  await insertDocs(docs)
  docs.forEach(async (doc) => {
    const foundDoc = await collection.findOne({ id: doc.id })
    doc._id = foundDoc._id
    expect(doc).toEqual(foundDoc)
  })
})
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
it("9-3 getSortedDocs", async () => {
  // Test on "rank" with integers
  let docs = []
  for (let i = 0; i < 5; i++) {
    const docToInsert = {
      id: 123 * i,
      name: "Of mice and men " + i,
      rank: getRandomInt(20),
    }
    docs.push(docToInsert)
  }
  await collection.insertMany(docs)
  let sortedDocs = await getSortedDocs("rank", true)
  // Make sure _id match
  expect(sortedDocs.length == docs.length)
  console.log(sortedDocs)
  docs = docs.map((doc) => {
    let docFound = sortedDocs.find((d) => d.id == doc.id)
    console.log(docFound)
    doc._id = docFound._id
    return docFound
  })
  console.log(sortedDocs)
  let docsA = [...docs].sort((a, b) => a.rank - b.rank)
  console.log(sortedDocs[0])
  expect(sortedDocs).toEqual(docsA)
  sortedDocs = await getSortedDocs("rank", false)
  // Make sure _id match
  expect(sortedDocs.length == docs.length)
  console.log(sortedDocs)
  docs = docs.map((doc) => {
    let docFound = sortedDocs.find((d) => d.id == doc.id)
    console.log(docFound)
    doc._id = docFound._id
    return docFound
  })
  console.log(sortedDocs)
  let docsB = [...docs].sort((a, b) => b.rank - a.rank)
  console.log(sortedDocs[0])
  expect(sortedDocs).toEqual(docsB)
})
it("9-4 getOldestBook", async () => {
  // Test on "rank" with integers
  let docs = []
  for (let i = 0; i < 5; i++) {
    const docToInsert = {
      id: 123 * i,
      published: new Date(
        getRandomInt(2000),
        getRandomInt(12),
        getRandomInt(28)
      ),
      rank: getRandomInt(20),
    }
    docs.push(docToInsert)
  }
  await collection.insertMany(docs)
  let oldestBook = await getOldestBook("published")
  expect(oldestBook).toEqual(
    [...docs]
      .sort(
        (date1, date2) => date1.published.getTime() - date2.published.getTime()
      )
      .shift()
  )
})
it("9-5 getBookByTitle", async () => {
  // Test on "rank" with integers
  let docs = []
  let titles = [
    "Anna Karenina",
    "Of Mice And Men",
    "All the King's Men",
    "Frankenstein",
    "Catcher in the Rye",
  ]
  for (let i = 0; i < 5; i++) {
    const docToInsert = { id: 123 * i, title: titles[i] }
    docs.push(docToInsert)
  }
  let queries = ["the", "Men", "Anna"]
  let results = queries.map((q) => {
    return { q, titles: titles.filter((t) => new RegExp(q).test(t)) }
  })
  await collection.insertMany(docs)
  for (let query of queries) {
    let books = await getBookByTitle(query)
    let targetBooks = docs.filter((d) =>
      results.find((rq) => rq.q == query).titles.includes(d.title)
    )
    expect(books).toEqual(targetBooks)
  }
})
