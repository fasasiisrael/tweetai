const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management
 */

/**
 * @swagger
 * /api/posts/{autobotId}:
 *   get:
 *     summary: Get posts by Autobot
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: autobotId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the Autobot
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Server error
 */
router.get('/:autobotId', postController.getPostsByAutobot);

module.exports = router;
