import {
    Schema,
    model
} from 'mongoose';

export const SchoolModel = model(
    'School',
    Schema({
        name: {type: String, required: true},
        curricula: [{
            type: String,
            required: true,
            enum: ['local', 'international']
        }],

        category: {
            type: String,
            required: true,
            enum: ['pre-primary', 'kindergarten', 'primary', 'secondary']
        },

        classes: [
            {
                id: {
                    type: Number,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                streams: [String],
                level: {
                    numeric: {
                        type: Number,
                        required: true
                    },

                    label: {
                        type: String,
                        enum: ['pre-primary', 'primary', 'o-level', 'a-level']
                    },

                    class_teacher: {
                        id: {
                            type: Schema.Types.ObjectId
                        },
                        name: {type: String}
                    }
                }
            }
        ],

        houses: [String],
        address: {
            district: String,
            region: {
                type: String,
                enum: ['east', 'west', 'north', 'south', 'central']
            },
            website: String,
            email: String,
            coordinates: {
                latitude: String,
                longitude: String
            }
        },

        signup_status: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true,
    },),
);