import mongoose, { Schema } from 'mongoose';

const AttachmentSchema = new Schema<IAttachment>(
    {},
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

AttachmentSchema.virtual('id').get(function (this: { _id: any }) {
    return this._id.toHexString();
});

export default mongoose.models.Attachment ||
    mongoose.model<IAttachment>('Attachment', AttachmentSchema);
