const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');
require('./employee');
require('./attendance');
require('./site');
require('./date');
require('./material');
require('./materialdate');
require('./equipment');
require('./vehicle');
require('./runningchart');
require('./transaction');
require('./chtransaction');
require('./qstask');
require('./dailywork');
require('./boqrecord');
require('./eqrecord');
