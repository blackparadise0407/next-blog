import mongoose, { model, Schema } from 'mongoose';

const BlogSchema = new mongoose.Schema<IBlog>(
    {
        thumbnail: String,
        title: {
            type: String,
        },
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: 'tags',
            },
        ],
        path: {
            type: String,
            required: true,
        },
        likeCount: { type: Number, default: 0 },
        commentCount: { type: Number, default: 0 },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Blog', BlogSchema);
