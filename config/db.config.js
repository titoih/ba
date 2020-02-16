const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');
// mongodb://localhost/buenanuncio
mongoose.connect('mongodb://heroku_vt44qfs2:pnndglaenko6bh5saftt6as461@ds049854.mlab.com:49854/heroku_vt44qfs2', {family:4,useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false, useCreateIndex:true })
  .then(ok => {
    console.log(`Connected to Mongo! Database name: "${ok.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

autoIncrement.initialize(mongoose.connection);

