import mongoose from "mongoose";

export const dbConnection = async () => {
    try{
        //await mongoose.connect( "mongodb+srv://hesolanoar:1234@heinerscluster.wkqiq.mongodb.net/ecommerce" );

        await mongoose.connect( "mongodb://hesolanoar:1234@heinerscluster-shard-00-00.wkqiq.mongodb.net:27017,heinerscluster-shard-00-01.wkqiq.mongodb.net:27017,heinerscluster-shard-00-02.wkqiq.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-5ufujq-shard-0&authSource=admin&appName=HeinersCluster" );

        console.log('DB Online');
    } catch ( error ) {
        console.log( error );
        throw new Error(error.message);

    }
}



