const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SHA256} = require('crypto-js');

const password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

const hashedPassword = '$2a$10$lMicNL/cKUOC3oiwiz4yZujxGtg0Z0MMJQ' +
  'T54vCISOM9zHOx1XH8m';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});


// const data = {
//   id: 10,
// };

// const token = jwt.sign(data, '123abc');
// console.log(token);

// const decoded = jwt.verify(token, '123abc');
// console.log(decoded);

// const message = 'I am user number 3';
// const hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// const data = {
//   id: 4,
// };
// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString(),
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();

// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//   console.log('TRUST');
// } else {
//   console.log('DONT TRUST');
// }
