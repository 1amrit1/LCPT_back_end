module.exports = ({
    // USE ONE OF THE EITHER VARIABLES

    /** FOR LOCAL MACHINE - USE HANISH DATABASE */
        MONGO_URL : 'mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    /** FOR SIT ENV - USE BELOW DATABASE */
        //MONGO_URL : 'mongodb+srv://root:root@cluster0.kvvuifk.mongodb.net/?retryWrites=true&w=majority',

    /** FOR LOCALHOST */
        CLIENT_URL : 'http://localhost:3000',
    /** FOR SIT ENV */
        //CLIENT_URL : 'https://lcpt-webportal.herokuapp.com/',

    /*** For Mongoose URL only in server.js */
        /*****  FOR LOCAL MACHINE - USE HANISH DATABASE */
        MONGOOSE_MONGO_URL : 'mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/LCPT?retryWrites=true&w=majority',
        /******  FOR SIT ENV - USE BELOW DATABASE */
        //MONGOOSE_MONGO_URL : 'mongodb+srv://root:root@cluster0.kvvuifk.mongodb.net/LCPT?retryWrites=true&w=majority',

});