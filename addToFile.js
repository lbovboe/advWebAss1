var fs = require('fs');

//append content at the end of the file:
fs.appendFile('student.txt', ' This is my text. \n' , function (err) {
  if (err) throw err;
  console.log('Updated!');
});
