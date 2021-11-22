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
        toJSON: {
            transform: (_, ret) => {
                delete ret._id;
                return ret;
            },
            virtuals: true,
        },
    }
);

BlogSchema.virtual('id').get(function (this: { _id: any }) {
    return this._id.toHexString();
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
