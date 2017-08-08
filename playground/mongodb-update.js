const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({ 
  //   _id: new ObjectId('59891bf475f0be03681118db')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((doc) => {
  //   console.log(doc);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectId('59890fe1b5376508cac166f2')
  }, {
    $set: {
      name: 'Luis Alfonso'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((doc) => {
    console.log(doc);
  });

  db.close();
});