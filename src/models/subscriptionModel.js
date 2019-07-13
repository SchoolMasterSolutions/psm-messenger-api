import {
    Schema,
    model
} from 'mongoose';

export const SubscriptionModel = model(
    'Subscription',
    Schema({
        category: {
            type: String,
            enum: ['school', 'parent', 'open']
        },
        school_id: {
            type: Schema.Types.ObjectId
        },

        user_id: {
            type: Schema.Types.ObjectId
        },

        status: {
            type: String,
            required: true,
            enum: ['active', 'inactive', 'trial']
        },

        expires_on: {
            type: Date
        },

        features: [String],
        receive_reminders: Boolean,

        payments: [{
            date_of_payment: {
                type: Date,
                required: true
            },

            mode_of_payment: {
                type: String,
                required: true,
                enum: ['MobileMoney', 'Bank', 'Cash']
            },

            amount: {
                type: Number,
                required: true
            }
        }]

    }, {
        timestamps: true,
    },),
);