import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';


export default class FileSystem {
    constructor() {}

    guardarImangeTemporal( file: FileUpload, userId: string ) {

        return new Promise( (resolve, reject) => {
            // Crear carpetas
            const path = this.crearCarpetaUsuario( userId );
            // Nombre del archivo
            const nombreArchivo = this.generarNombreUnico( file.name );
            console.log( file.name );
            console.log( nombreArchivo );
            // Moveer el archivo del Temp a nuestra carpeta
            file.mv( `${ path }/${ nombreArchivo}`, (err: any) => {
                if ( err ) {
                    // No se pudo mover
                    reject( err );
                } else {
                    // TODO salió bien!!!!
                    resolve();
                }
            });
        }); 
    }

    private generarNombreUnico( nombreOriginal: string ) {
        // dgd_copy.jpg
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[ nombreArr.length - 1 ];
        // pare generar un nombre unico ejecutar: npm install uniqid (hay que importarlo)
        const idUnico = uniqid();
        return `${ idUnico}.${ extension }`;
    }

    private crearCarpetaUsuario( userId: string ) {
        const pathUser = path.resolve( __dirname, '../uploads', userId );
        const pathUserTemp = pathUser +  '/temp';
        //console.log(pathUser);
        //onsole.log(pathUserTemp);

        const existe = fs.existsSync( pathUser);
        if ( !existe ) {
            fs.mkdirSync( pathUser );
            fs.mkdirSync( pathUserTemp );
        }

        return pathUserTemp;
    }

    imagenesDeTepmHaciaPost( userId: string ) {
        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp' );
        const pathPost = path.resolve( __dirname, '../uploads/', userId, 'posts' );
        if ( !fs.existsSync( pathTemp ) ) { return [];}
        if ( !fs.existsSync( pathPost ) ) {
            fs.mkdirSync( pathPost);
        }
        const imagenesTemp = this.obtenerImagenesEnTemp( userId );
        imagenesTemp.forEach( imagen => {
            fs.renameSync(`${ pathTemp }/${ imagen }`,`${ pathPost }/${ imagen }`);
        });
        return imagenesTemp;
    }

    private obtenerImagenesEnTemp( userId: string ) {
        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp' );
        return fs.readdirSync( pathTemp ) || [];
    }

    getFotoUrl( userId: string, img: string ) {
        // path POSTs
        const pathFoto = path.resolve( __dirname, '../uploads', userId, 'posts', img );

        // si la imagen existe
        const existe = fs.existsSync( pathFoto );
        if ( !existe ) {
            return path.resolve( __dirname, '../assets/400x250.jpg');
        }

        return pathFoto;
    }


}