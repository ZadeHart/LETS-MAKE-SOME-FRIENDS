import { Schema, model, ObjectId } from 'mongoose';

interface IUser {
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
};

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],

        friends: [
                {
                type: Schema.Types.ObjectId,
                ref: 'User',
                },
            ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true,
            
    },
);

userSchema

    .virtual('friendCount')
    .get(function () {
        return this.friends?.length || 0;
});

const User = model<IUser>('User', userSchema);

export default User;
