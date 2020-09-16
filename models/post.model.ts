

import { Schema, Document, model } from 'mongoose';

const postSchema = new Schema({
    created: {
        type: Date
    },
    mensaje: {
        type: String
    },
    imgs: [{
        type: String
    }],
    coords: {
        type: String // latitud y longitud ( -13.333333, 12.55481515)
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe existir una referncaia a un usuaro' ]
    }
});

postSchema.pre<IPost>('save', function( next ){
    this.created = new Date();
    next();
});

interface IPost extends Document {
    created: Date;
    mensaje: string;
    imgs: string[];
    coords: string;
    usuario: string;
}

export const Post = model<IPost>( 'Post', postSchema );