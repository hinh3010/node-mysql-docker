import { AppLoader } from './appLoader';

const start = (): void => {
    const app = new AppLoader();
    app.listen();
}

start();
