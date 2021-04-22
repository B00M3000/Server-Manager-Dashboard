const mongoose = require('mongoose')

module.exports = class Database {
  constructor(mongouri) {
    this.mongouri = mongouri
  }
  async connect(){
    this.connection = await mongoose.connect(this.mongouri, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      setDefaultsOnInsert: true,
    })
    return this.connection
  }
  async load_schemas_folder(folderpath){
    const folder = require(`./${folderpath}`)
  }
  async get_prefix(){

  }
  get_URI(){
    return this.mongouri
  }
}