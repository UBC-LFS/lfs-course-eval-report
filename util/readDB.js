const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017/courseval'

const readDB = (collectionName) => new Promise((resolve, reject) => {
  MongoClient.connect(url, (err, db) => {
    if (err) reject(err)
    if (!db) {
      console.warn('No database found. Please ensure that mongo is started')
      return
    }
    const collection = db.collection(collectionName)
    collection.find({}).toArray((err, result) => {
      if (err) reject(err)
      resolve(result)
      db.close()
    })
  })
})

module.exports = readDB
