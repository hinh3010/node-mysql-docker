import express, { Request, Response, Application } from 'express';
import ip from 'ip';
import cors from 'cors';
import { HttpResponse } from './domain/response';
import { Code } from './enum/code.enum';
import { Status } from './enum/status.enum';
import patientRoutes from './routes/patient.r';


export class AppLoader {
    private readonly app: Application;
    private readonly APPLICATION_RUNNING = 'application is running on:';
    private readonly WELCOME = 'Welcome to the Patients API v1.0.0';
    private readonly ROUTE_NOT_FOUND = 'Route does not exist on the server';

    constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 3002) {
        this.app = express();
        this.middleware()
        this.routes()
    }

    listen(): void {
        this.app.listen(this.port);
        console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`);
    }

    middleware(): void {
        this.app.use(cors({ origin: '*' }));
        this.app.use(express.json());
    }
    routes(): void {
        this.app.use('/patient', patientRoutes)
        this.app.get('/', (_: Request, res: Response) =>
            res.status(200).send(new HttpResponse(Code.OK, Status.OK, this.WELCOME))
        );
        this.app.all('*', (_: Request, res: Response) =>
            res.status(404).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND))
        );
    }
}
