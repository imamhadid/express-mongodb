const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { storeDataDummy } = require('../fixtures');

let mongoServer;

exports.dbConnect = async () => {
    // Create a new instance of MongoMemoryServer
    mongoServer = await MongoMemoryServer.create();

    const uri = await mongoServer.getUri();

    const mongooseOpts = {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
    };

    await mongoose.connect(uri, mongooseOpts);

    // Store dummy data
    await storeDataDummy();
};

exports.dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
};
