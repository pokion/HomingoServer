import mysql, {Pool, RowDataPacket} from 'mysql2/promise';

const pool: Pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export async function query<T extends RowDataPacket>(sql: string, values?: unknown[]): Promise<T[] | null>{
    try{
        const [rows] = values ? await pool.execute<T[]>(sql, values) : await pool.execute<T[]>(sql);
        return rows;
    }catch(err){
        if(process.env.NODE_ENV !== 'production'){
            console.error('MySQL query error:', err);
        }
        return null;
    }
}

export async function transaction<U,T extends RowDataPacket>(
    inTransaction: (conn: mysql.PoolConnection) => Promise<U>, 
    afterCommit?: (conn: mysql.PoolConnection, data: U) => Promise<T[]>
): Promise<T[] | null>{

    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        const dataToPass = await inTransaction(connection)
        await connection.commit();
        if(afterCommit){
            return await afterCommit(connection, dataToPass);
        }
        return null;
    }catch(err){
        await connection.rollback();
        if(process.env.NODE_ENV !== 'production'){
            console.error('MySQL query error:', err);
        }
        throw err;
    }finally{
        connection.release();
    }
}
