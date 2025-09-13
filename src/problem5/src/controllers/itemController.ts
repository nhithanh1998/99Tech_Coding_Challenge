import { Request, Response } from "express";
import Item from "../models/itemModel";
import { FilterQuery } from "mongoose";
import { ItemDocument } from "../models/itemModel"; // adjust to your model type

/**
 * Creates a new Item and saves it to the database.
 *
 * @param {Request} req - Express request object. Expects `name`, `category`, and `price` in `req.body`.
 * @param {Response} res - Express response object.
 *
 * Validations:
 * - name and price are required.
 * - price must be a number.
 * - category is optional.
 * Responses:
 * - 201: Successfully created the item.
 * - 400: Bad request (validation errors).
 * - 500: Internal server error (database or unexpected errors).
 */
export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, category, price } = req.body;
    // Validate name
    if (name == null || price == null) {
      return res.status(400).json({ error: "Name and price are required!" });
    }

    // Validate price type
    if (typeof price !== "number" || isNaN(price)) {
      return res.status(400).json({ error: "Price must be a valid number!" });
    }

    const newItem = new Item({ name, category, price });

    // Save to database
    const savedItem = await newItem.save();

    return res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error creating item:", error);
    return res.status(500).json({ error: "Failed to create item." });
  }
};

/**
 * Get a list of items from the database with optional filters and pagination.
 *
 * Query Parameters:
 * - category (string): filter by item category.
 * - isDeleted (string "true"|"false"): filter by deletion status.
 * - name (string): item name.
 * - page (number, default=1): page number for pagination (must be >= 1).
 * - limit (number, default=10): number of items per page (must be >= 1).
 *
 * Responses:
 * - 200: Successfully get the items with pagination metadata.
 * - 400: Invalid query parameters.
 * - 500: Internal server error.
 */
export const getItems = async (req: Request, res: Response) => {
  try {
    const { category, isDeleted, name, page = "1", limit = "10" } = req.query;

    // Validate pagination parameters
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (isNaN(pageNum) || pageNum < 1) {
      return res
        .status(400)
        .json({ error: "Invalid 'page'. Must be a positive integer." });
    }

    if (isNaN(limitNum) || limitNum < 1) {
      return res
        .status(400)
        .json({ error: "Invalid 'limit'. Must be a positive integer." });
    }

    const filters: FilterQuery<ItemDocument> = {};

    if (category) filters.category = category;
    if (isDeleted !== undefined) {
      filters.deletedAt = isDeleted === "true" ? { $ne: null } : null;
    }
    if (name) {
      filters.name = { $regex: new RegExp(name as string, "i") };
    }

    const skip = (pageNum - 1) * limitNum;

    // Fetch items and total count
    const [items, total] = await Promise.all([
      Item.find(filters).skip(skip).limit(limitNum),
      Item.countDocuments(filters),
    ]);

    return res.status(200).json({
      data: items,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    return res.status(500).json({ error: "Failed to fetch items." });
  }
};

/**
 * Fetches a single item by its ID.
 *
 * @param {Request} req - Express request object. Expects `id` in `req.params`.
 * @param {Response} res - Express response object.
 *
 * Responses:
 * - 200: Successfully retrieved the item.
 * - 404: Item not found.
 * - 500: Internal server error.
 */
export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid item ID format." });
    }

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ error: `Item with id ${id} not found.` });
    }

    return res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    return res.status(500).json({ error: "Failed to get item." });
  }
};

/**
 * Fully updates an existing item by replacing its fields.
 *
 * @param {Request} req - Expects `id` in params and `name`, `category`, `price` in body.
 * @param {Response} res
 *
 * Responses:
 * - 200: Updated item.
 * - 400: Invalid input.
 * - 404: Item not found.
 * - 500: Internal server error.
 */
export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, price } = req.body;

    if (!name || price === undefined || typeof price !== "number") {
      return res
        .status(400)
        .json({ error: "Name and valid price are required." });
    }

    const item = await Item.findByIdAndUpdate(
      id,
      { name, category, price },
      { new: true, runValidators: true }
    );

    if (!item) return res.status(404).json({ error: "Item not found." });

    return res.status(200).json(item);
  } catch (error) {
    console.error("Error updating item:", error);
    return res.status(500).json({ error: "Failed to update item." });
  }
};

/**
 * Partially updates an existing item.
 * Only fields provided in the request body are updated.
 *
 * @param {Request} req - Expects `id` in params and any subset of item fields in body.
 * @param {Response} res
 *
 * Responses:
 * - 200: Updated item.
 * - 404: Item not found.
 * - 500: Internal server error.
 */
export const patchItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const item = await Item.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!item) return res.status(404).json({ error: "Item not found." });

    return res.status(200).json(item);
  } catch (error) {
    console.error("Error patching item:", error);
    return res.status(500).json({ error: "Failed to patch item." });
  }
};

/**
 * Soft deletes an item by setting its `deletedAt` timestamp.
 *
 * @param {Request} req - Expects `id` in params.
 * @param {Response} res
 *
 * Responses:
 * - 204: Item successfully deleted.
 * - 404: Item not found.
 * - 500: Internal server error.
 */
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await Item.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );

    if (!item) return res.status(404).json({ error: "Item not found." });

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).json({ error: "Failed to delete item." });
  }
};
