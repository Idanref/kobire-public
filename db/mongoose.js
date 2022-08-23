const mongoose = require('mongoose');

// const URI = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.zhh9e.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});
