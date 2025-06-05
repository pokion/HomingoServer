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

export default async function query<T extends RowDataPacket>(sql: string, values?: unknown[]): Promise<T[] | null>{
    try{
        const [rows] = values ? await pool.query<T[]>(sql, values) : await pool.query<T[]>(sql);
        return rows;
    }catch(err){
        if(process.env.NODE_ENV !== 'production'){
            console.error('MySQL query error:', err);
        }
        return null;
    }
}