const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017/courseval'

const readDB = (collectionName) => new Promise((resolve, reject) => {
  MongoClient.connect(url, (err, db) => {
    if (err) reject(err)
    const collection = db.collection(collectionName)
    collection.find({}).toArray((err, result) => {
      if (err) reject(err)
      resolve(result)
      db.close()
    })
  })
})

module.exports = readDB
