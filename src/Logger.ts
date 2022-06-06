export class Logger {
    private static instance: Logger;

    private logger = require("pino")();

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }

        return Logger.instance;
    }

    public getLogger() {
        return this.logger;
    }
}
