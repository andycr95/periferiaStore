import express from 'express'
import productRouter from './routes/products'
import userRouter from './routes/users'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.static('./src/public'))
app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT || 5000

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
