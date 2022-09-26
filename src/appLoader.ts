import express, { Request, Response, Application } from 'express';
import ip from 'ip';
import cors from 'cors';


export class AppLoader {
    private readonly app: Application;
    private readonly APPLICATION_RUNNING = 'application is running on:';
    private readonly ROUTE_NOT_FOUND = 'Route does not exist on the server';

    constructor(private readonly port: (string | number) = process.env.PORT || 3002) {
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
        this.app.use('/adu', (req, res, next) => {
            res.json({ adu: 'adu' })
        })
        this.app.get('/', (_: Request, res: Response) =>
            res.status(200).json({ message: 'ok' })
            // .send(new HttpResponse(200, 'OK', 'Welcome to the Patients API v1.0.0'))
        );
        this.app.all('*', (_: Request, res: Response) =>
            res.status(404).json({ message: this.ROUTE_NOT_FOUND })
            // .send(new HttpResponse(404, 'NOT_FOUND', this.ROUTE_NOT_FOUND))
        );
    }
}
