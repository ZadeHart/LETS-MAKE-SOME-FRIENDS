import { Types, Schema, model, Document } from 'mongoose';
import reactionSchema from './Reaction.js';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Types.Subdocument[];
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
            getter: (timestamp: Date) => timestamp.toLocaleString(), 
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
            getters: true
        },
    },
);

thoughtSchema

    .virtual('reactionCount')
    .get(function () {
        return this.reactions?.length || 0;
});

const Thought = model<IThought>('thought', thoughtSchema);

export default Thought;
