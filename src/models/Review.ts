import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  shopifyHandle: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  isVerifiedPurchase: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    shopifyHandle: { type: String, required: true, index: true }, // Foreign key to Shopify product
    userId: { type: String, required: true, index: true },       // Foreign key to Better-Auth user
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isVerifiedPurchase: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

// Calculate average ratings automatically if needed
ReviewSchema.index({ shopifyHandle: 1, status: 1 });

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
