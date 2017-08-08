const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // // Delete many
  // db.collection('Todos').deleteMany({ text: 'Eat lunch' }).then((result) => {
  //   console.log(result);
  // });

  // // Delete one
  // db.collection('Todos').deleteOne({ text: 'Eat lunch' }).then((result) => {
  //   console.log(result);
  // });

  // // Find one and delete
  // db.collection('Todos').findOneAndDelete({ text: 'Eat lunch' }).then((doc) => {
  //   console.log(doc);
  // });

  db.collection('Users').deleteMany({ name: 'Luis Alfonso' });

  db.collection('Users').findOneAndDelete({ 
    _id: new ObjectId('59890e567c0a2d08bf38253f') 
  }).then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
  });

  db.close();
});