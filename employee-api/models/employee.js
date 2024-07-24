import oracledb from 'oracledb';
import db from '../config/db.js';

const findByNameAndAge = async (name, age) => {
    let connection;

    try {
        connection = await db.initialize();

        const result = await connection.execute(
            `BEGIN
                FindEmployeesByNameAndAge(:name, :age, :name_cursor, :age_cursor);
             END;`,
            {
                name,
                age: parseInt(age, 10),
                name_cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
                age_cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );

        const nameResultSet = result.outBinds.name_cursor;
        const ageResultSet = result.outBinds.age_cursor;
        const employeesByName = [];
        const employeesByAge = [];

        let row;

        // Fetch employees by name
        while ((row = await nameResultSet.getRow())) {
            employeesByName.push({
                id: row[0],
                name: row[1],
                age: row[2],
                email: row[3]
            });
        }
        await nameResultSet.close();

        // Fetch employees by age
        while ((row = await ageResultSet.getRow())) {
            employeesByAge.push({
                id: row[0],
                name: row[1],
                age: row[2],
                email: row[3]
            });
        }
        await ageResultSet.close();

        return { employeesByName, employeesByAge };
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Database Error');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Connection Close Error:', err);
            }
        }
    }
};

const findAll = async () => {
    let connection;

    try {
        connection = await db.initialize();

        const result = await connection.execute(
            `SELECT id, name, age, email FROM Employee`
        );

        const employees = result.rows.map(row => ({
            id: row[0],
            name: row[1],
            age: row[2],
            email: row[3]
        }));

        return employees;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Database Error');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Connection Close Error:', err);
            }
        }
    }
};
const add = async (id, name, age, email) => {
    let connection;

    try {
        connection = await db.initialize();

        await connection.execute(
            `INSERT INTO Employee (id, name, age, email)
             VALUES (:id, :name, :age, :email)`,
            {
                id,
                name,
                age,
                email
            }
        );

        await connection.commit();  // Commit the transaction

    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Database Error');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Connection Close Error:', err);
            }
        }
    }
};
export default {
    findByNameAndAge,
    findAll,
    add
};
