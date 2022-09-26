import { Request, Response } from 'express';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { connection } from '../config/mysql.config';
import { HttpResponse } from '../domain/response';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { Patient } from '../interfaces/patient.i';
import { QUERY_PATIENT } from '../querys/patient.q';


type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];


export const getPatients = async (req: Request, res: Response): Promise<Response<Patient[]>> => {
    console.info(`
        [${new Date().toLocaleString()}] 
        Incoming ${req.method}${req.originalUrl} 
        Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}
    `);
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY_PATIENT.SELECT_PATIENTS);
        return res.status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'Patients retrieved', result[0]));
    } catch (error: unknown) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};