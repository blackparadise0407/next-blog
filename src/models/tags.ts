import mongoose, { Schema, model } from 'mongoose';

const TagSchema = new Schema<ITag>(
    {
        name: {
            type: String,
            required: true,
            min: 3,
            max: 20,
        },
        description: {
            type: String,
            required: true,
            max: 250,
        },
        used_score: {
            type: Number,
            default: 0,
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

TagSchema.virtual('id').get(function (this: { _id: any }) {
    return this._id.toHexString();
});

export default mongoose.models.Tag || mongoose.model('Tag', TagSchema);
