const express = require('express');
const router = express.Router();
const autobotController = require('../controllers/AutobotController');

/**
 * @swagger
 * tags:
 *   name: Autobots
 *   description: Autobot management
 */

/**
 * @swagger
 * /api/autobots:
 *   get:
 *     summary: Get all Autobots
 *     tags: [Autobots]
 *     parameters:
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
 *         description: List of Autobots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Autobot'
 */
router.get('/', autobotController.getAutobots);

/**
 * @swagger
 * /api/autobots/create:
 *   post:
 *     summary: Create new Autobots
 *     tags: [Autobots]
 *     responses:
 *       201:
 *         description: Autobots created successfully
 *       500:
 *         description: Server error
 */
router.post('/create', autobotController.createAutobot);

module.exports = router;
