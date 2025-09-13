import { Router } from "express";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  patchItem,
  deleteItem,
} from "../controllers/itemController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the item
 *           example: 64d2f0c5e4b0a12f34abcd56
 *         name:
 *           type: string
 *           description: Name of the item
 *           example: Laptop
 *         category:
 *           type: string
 *           description: Item category
 *           example: Electronics
 *         price:
 *           type: number
 *           description: Price of the item
 *           example: 999.99
 *         isDeleted:
 *           type: boolean
 *           description: Soft delete flag
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-13T10:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-13T10:00:00.000Z
 *     PaginatedItems:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 *         pagination:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 50
 *             page:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             totalPages:
 *               type: integer
 *               example: 5
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: List all items with optional filters, pagination
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Partial match on item name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: isDeleted
 *         schema:
 *           type: boolean
 *         description: Filter soft-deleted items
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of items with pagination
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedItems'
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Server error
 */
router.get("/", getItems);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get a single item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
router.get("/:id", getItemById);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Validation error
 */
router.post("/", createItem);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Fully update an item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Item not found
 */
router.put("/:id", updateItem);

/**
 * @swagger
 * /items/{id}:
 *   patch:
 *     summary: Partially update an item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Item not found
 */
router.patch("/:id", patchItem);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Soft delete an item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted
 *       404:
 *         description: Item not found
 */
router.delete("/:id", deleteItem);

export default router;
