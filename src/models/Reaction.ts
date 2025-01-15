import { Schema, Types } from 'mongoose';


// interface IReaction extends Document {
//     reactionId: ObjectId,
//     reactionBody: string,
//     username: string,
//     createdAt: Date

// };

const reactionSchema = new Schema/*<IReaction>*/(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            ref: 'reaction_id',
            default: () => new Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },

        username: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {

        toJSON: {
            virtuals: true,
            getters: true
        },

        timestamps: true,
        id: false
    }
);

export default reactionSchema