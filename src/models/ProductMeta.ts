import mongoose, { Schema, Document } from 'mongoose';

export interface IFeature {
  title: string;
  description: string;
  iconSvg?: string;
}

export interface IAccordion {
  title: string;
  content: string;
}

export interface IProductMeta extends Document {
  shopifyHandle: string;
  shopifyId: string;
  features: IFeature[];
  accordions: IAccordion[];
  isFeatured: boolean;
  stockWarningOverride?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FeatureSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  iconSvg: { type: String },
});

const AccordionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const ProductMetaSchema: Schema = new Schema(
  {
    shopifyHandle: { type: String, required: true, unique: true, index: true },
    shopifyId: { type: String, required: true, unique: true },
    features: [FeatureSchema],
    accordions: [AccordionSchema],
    isFeatured: { type: Boolean, default: false },
    stockWarningOverride: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.ProductMeta || mongoose.model<IProductMeta>('ProductMeta', ProductMetaSchema);
