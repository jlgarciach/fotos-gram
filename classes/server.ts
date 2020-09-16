

import expres from 'express';

export default class Server {
    public app: expres.Application;
    public port: number = 3000;

    constructor () {
        this.app = expres();
    }

    start( callback: () => void ) {
        this.app.listen( this.port, callback );
    }

}