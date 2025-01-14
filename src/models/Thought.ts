import { Schema, Types, model, ObjectId, type Document } from 'mongoose';


interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: ObjectId[];
};

const reactionSchema = new Schema<IThought>(
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
        
        timestamps: true
    }
);


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

const Thought = model('thought', thoughtSchema);

export default Thought ;
