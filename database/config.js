import mongoose from "mongoose";

export const dbConnection = async () => {
    try{
        //await mongoose.connect( "mongodb+srv://hesolanoar:1234@heinerscluster.wkqiq.mongodb.net/ecommerce" );

         await mongoose.connect( "mongodb://josue:123@ac-lkydia6-shard-00-00.rrgllf7.mongodb.net:27017,ac-lkydia6-shard-00-01.rrgllf7.mongodb.net:27017,ac-lkydia6-shard-00-02.rrgllf7.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-9kurrn-shard-0&authSource=admin&appName=Cluster0" );

        console.log('DB Online');
    } catch ( error ) {
        console.log( error );
        throw new Error(error.message);

    }
}



