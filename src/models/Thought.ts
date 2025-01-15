import { Schema, model, ObjectId } from 'mongoose';
import reactionSchema from './Reaction';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: ObjectId[];
};


const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 280,
        },
        
        createdAt: {
            type: Date,
            default: Date.now,
        },

        username: {
            type: String,
            required: true,
        },

        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true,
    },
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length;
});

const Thought = model<IThought>('thought', thoughtSchema);

export default Thought;
