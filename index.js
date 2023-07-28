import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const database = client.db('shopping-app')
const products = database.collection('products')

client.connect()
console.log('connected to mongo')
const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => console.log('API running on port 4040'))

app.get('/', async (req, res) => {
  const allProducts = await products.find().toArray()
  res.json('here there ')
})

app.post('/', async (req, res) => {
  await products.insertOne(req.body)
  res.json('Item was added')
})

app.delete('/', async (req, res) => {
  await products.findOneAndDelete(req.query)
  res.json('Item was deleted')
})

// PUT - like a delete, then like a POST
app.put('/', async (req, res) => {
  await products.findOneAndUpdate(req.query, { $set: req.body })
  res.json('Item was updated with special field')
})
