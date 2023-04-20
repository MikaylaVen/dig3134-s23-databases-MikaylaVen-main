// Imports
import Redis from "ioredis"
import express from "express"
import fetch from "node-fetch"
import fs from "fs"

//Variables
const app = express()
const expressPORT = 3000
const redisPORT = 7379
const CACHE_KEY = "cachedData"


// Have express listen in on the specified PORT
app.listen(expressPORT, () => {
  console.log("Listening on expressPORT: " + expressPORT)
})
// Have redis listen in on the specified PORT to the redis database
const redisClient = new Redis({ port: redisPORT })

// Write your Redis script below
async function getAssetData() {
  const apiRes = await fetch('https://api.coincap.io/v2/assets')
  const convRes = await apiRes.text()
  return convRes
}

app.get("/assets/:name", async (req, res) => {
  const reqAsset = req.params.name
  const cacheData = await redisClient.get(reqAsset)
  if (cacheData) {
    const ttl = await redisClient.ttl(reqAsset)
    if (ttl > 0) {
      res.send(cacheData)
      return
    }
  }
  const apiData = await getAssetData()
  try {
    await redisClient.setex(reqAsset, 30, apiData)
    res.send(apiData)
  } catch (err) {
    console.log(err)
  }
})