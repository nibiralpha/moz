// if our user.js file is at app/models/user.js
var Data = require('./data');

// create a new user called chris
var data = new User({
    pa: 456,
    da: 789,
    count: 123,
    link: 'password'
});

// call the built-in save method to save to the database
data.save(function (err, data) {
    if (err) throw err;
    console.log(data);
    
    console.log('User saved successfully!');
});
