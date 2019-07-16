import {
    Schema,
    model
} from 'mongoose';

export const StudentModel = model(
    'Student',
    Schema({
        name: {type: String, required: true},
        gender: {type: String, required: true, enum: ['male', 'female']},
        status: {type: String, required: true, enum: ['current', 'left']},
        internal_reference: {type: String},
        school_id: {type: Schema.Types.ObjectId, required: true},
        date_of_birth: {type: Date, required: false},
        photo: {type: Buffer, required: false},
        house: {type: String, required: false},

        class_history: [
            {
                year: {
                    type: String,
                    required: true
                },

                term: {
                    type: String,
                    required: true
                },

                class: {
                    type: String,
                    required: true
                },

                stream: {
                    type: String,
                    required: true
                }
            }
        ],
    }, {
        timestamps: true,
    },),
);