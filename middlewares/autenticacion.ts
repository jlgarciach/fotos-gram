/*
    Un middleware es una función común y corriente que hace algo especifico 
*/

import { Response, Request, NextFunction } from 'express';
import Token from '../classes/token';

export const verificaToken = (req: any, res: Response, next: NextFunction) => {
    const userToken = req.get('x-token') || '';

    Token.comporobaToken(userToken)
        .then((decoded: any) => {
            console.log('Decode .. ', decoded);
            req.usuario = decoded.usuario;
            next();
        })
        .catch(err => {
            res.json({
                ok: false,
                mensaje: 'Token no es correcto'
            });
        });
}