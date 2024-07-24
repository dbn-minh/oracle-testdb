import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING
};

class Database {
    static async initialize() {
        try {
            const connection = await oracledb.getConnection(dbConfig);
            return connection;
        } catch (err) {
            console.error('Error connecting to Oracle DB:', err);
            throw err;
        }
    }
}

export default Database;
