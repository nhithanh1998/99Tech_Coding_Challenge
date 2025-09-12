import { Router } from "express";
import {
  listItems,
  getItemById,
  createItem,
  updateItem,
  patchItem,
  deleteItem,
} from "../controllers/itemController";

const router = Router();

/**
 * @route   GET /items
 * @desc    List all items with optional filters
 * @query   name?: string - partial match on item name
 *          category?: string - filter by category
 *          isDeleted?: boolean - filter soft-deleted items
 */
router.get("/", listItems);

/**
 * @route   GET /items/:id
 * @desc    Get a single item by its ID
 */
router.get("/:id", getItemById);

/**
 * @route   POST /items
 * @desc    Create a new item
 */
router.post("/", createItem);

/**
 * @route   PUT /items/:id
 * @desc    Fully update an item (all fields)
 */
router.put("/:id", updateItem);

/**
 * @route   PATCH /items/:id
 * @desc    Partially update an item (only provided fields)
 */
router.patch("/:id", patchItem);

/**
 * @route   DELETE /items/:id
 * @desc    Soft delete an item (set deletedAt timestamp)
 */
router.delete("/:id", deleteItem);

export default router;
