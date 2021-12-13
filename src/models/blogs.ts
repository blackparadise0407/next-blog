import mongoose, { Schema } from 'mongoose';

const BlogSchema = new mongoose.Schema<IBlog>(
    {
        thumbnail: {
            type: Schema.Types.ObjectId,
            ref: 'Attachment',
        },
        title: {
            type: String,
            required: true,
        },
        tags: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'tags',
                },
            ],
            validate: [
                tagsValidator,
                '{PATH} must have at least 1 tag and less than 4 tags',
            ],
        },
        path: {
            type: String,
            required: true,
        },
        like_count: { type: Number, default: 0 },
        comment_count: { type: Number, default: 0 },
        content: {
            type: String,
            required: true,
        },
        user_id: {
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

function tagsValidator(val: any) {
    return val.length >= 1 && val.length <= 4;
}

BlogSchema.virtual('id').get(function (this: { _id: any }) {
    return this._id.toHexString();
});

export default mongoose.models.Blog ||
    mongoose.model<IBlog>('Blog', BlogSchema);
