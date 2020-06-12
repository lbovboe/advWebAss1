const CSVToJSON = require('csvtojson');

// convert users.csv file to JSON array
CSVToJSON().fromFile('student.csv')
    .then(student => {

        // users is a JSON array
        // log the JSON array
        console.log(student);

        
    }).catch(err => {
        // log error if any
        console.log(err);
    });