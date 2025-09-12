import mongoose, { Schema, Document } from "mongoose";

/**
 * Mongoose document interface for an Item.
 *
 * @interface ItemDocument
 * @extends Document
 * @property {string} name - The name of the item (required).
 * @property {string} [category] - The category of the item (optional).
 * @property {number} price - The price of the item (required).
 * @property {Date} createdAt - Timestamp when the item was created.
 * @property {Date} updatedAt - Timestamp when the item was last updated.
 * @property {Date} [deletedAt] - Optional timestamp for soft deletion.
 */
export interface ItemDocument extends Document {
  name: string;
  category?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

/**
 * Item schema definition with timestamps.
 * - Includes `name`, `category`, and `price` fields.
 * - Automatically manages `createdAt` and `updatedAt` fields.
 */
const ItemSchema: Schema<ItemDocument> = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);


export default mongoose.model<ItemDocument>("Item", ItemSchema);
