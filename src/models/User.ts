import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
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
            trimmed: true
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
    .get(function (this: IUser) {
        return this.friends?.length;
});

const User = model('User', userSchema);

User
    .create({
        username: 'ZadeHart',
        email: 'pumpkinboy@midnight.com',
        thoughts: 'I like pizza',
        friends: 'Me, myself, and I'
    })

export default User;