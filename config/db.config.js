const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');
mongoose.connect(process.env.MONGODB_URI_GUEBS, {family:4,useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false, useCreateIndex:true })
  .then(ok => {
    console.log(`Connected to Mongo! Database name: "${ok.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

autoIncrement.initialize(mongoose.connection);

