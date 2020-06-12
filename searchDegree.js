const CSVToJSON = require('csvtojson');

// convert users.csv file to JSON array
CSVToJSON().fromFile('student.csv')
    .then(student => {

        // users is a JSON array
        // log the JSON array
        console.log(student);
        //console.log(student.indexOf("CAI"));
        var index = student.findIndex(function(info,index){
            if(info.degree === "computer science") 
            var result = JSON.stringify(student[index]);
            console.log(result);
        });
        //console.log(index);
        // console.log(student[index]);
        
    }).catch(err => {
        // log error if any
        console.log(err);
    });