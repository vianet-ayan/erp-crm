export interface IPlugin {
    name: string;
    version: string;
    description: string;
    initialize(): void;
    execute(): void;
    terminate(): void;
    listenToEvents(): void;
    hooks: {
        beforeInitialize?: () => void;
        afterInitialize?: () => void;
        beforeExecute?: () => void;
        afterExecute?: () => void;
        beforeTerminate?: () => void;
        afterTerminate?: () => void;
    };  
}
