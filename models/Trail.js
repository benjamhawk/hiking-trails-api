const mongoose = require('mongoose')
const { Schema } = mongoose

const TrailSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: Array,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('trails', TrailSchema)
