const {Schema, model} = require('mongoose')

const schema = new Schema({
  guid: {type: String, required: true}, 
  title: {type: String, required: true},
  link: {type: String, required:true},
  contentSnippet: {type: String, required:true},
  categories: {type: Array, required:true},
  content: {type: String, required: false, default: "" },
  isoDate: {type: Date, required: true, default: Date.now, index: true},
  creator: {type: String, required: true }
})

module.exports = model('posts', schema)