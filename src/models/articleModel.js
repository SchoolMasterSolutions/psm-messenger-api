import {
    Schema,
    model
} from 'mongoose';

export const ArticleModel = model(
    'Article',
    Schema({
        author_id: {
            type: String,
            required: true
        },

        school_id: {
            type: String
        },

        audience: {
            type: [String],
            enum: ['parents', 'teachers', 'admin']
        },

        title: {
            type: String,
            required: true
        },

        details: {
            type: String,
            required: true
        },

        attachments: [{
            file_name: {
                type: String,
                required: true
            },

            file: {
                type: Buffer,
                required: true
            }
        }]

    }, {
        timestamps: true,
    },),
);