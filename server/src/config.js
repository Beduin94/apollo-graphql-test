const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/apolloGraphqlTestDB';

mongoose
    .connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));