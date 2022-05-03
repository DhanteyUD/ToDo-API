import mongoose from 'mongoose'
import app from './app'

const port = process.env.PORT
const url = process.env.MONGODB_URL as string

mongoose
  .connect(url)
  .then(() => {
    console.log('mongodb is live....')
  })
  .catch((err) => {
    console.log(`could not connect to mongodb ---- ${err}`)
  })

app.listen(port, () => {
  console.log(`app running on port ${port}...`)
})
