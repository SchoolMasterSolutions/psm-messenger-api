import {
    Schema,
    model
} from 'mongoose';

export const ResultsModel = model(
    'Results',
    Schema({
        student_id: {
            type: Schema.Types.ObjectId,
            required: true
        },

        school_id: {
            type: Schema.Types.ObjectId,
            required: true
        },

        term: {
            type: String,
            required: true
        },

        year: {
            type: String,
            required: true
        },

        assessments: [
            {
                category: {
                    type: String,
                    required: true,
                    enum: ['BOT', 'MT', 'EOT', 'Overall']
                },

                results: [
                    {
                        subject_id: Schema.Types.ObjectId,
                        subject_paper: String,
                        mark: Number,
                        score: String,
                        comment: String
                    }
                ]

            }
        ],

        overall: {
            total: Number,
            average: Number,
            division: String,
            class_teacher_comment: String,
            head_teacher_comment: String,
            house_master_comment: String
        }

    }, {
        timestamps: true,
    },),
);