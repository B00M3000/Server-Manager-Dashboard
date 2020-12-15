const mongoose = require('mongoose')

module.exports = async () => {
  await mongoose.connect(process.env.MONGOPATH, {
  	keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  
  return mongoose.connection
}