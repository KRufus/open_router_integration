import express from 'express';
import { pool } from '../config/database';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT m.*, mc.name as category_name
      FROM models m
      LEFT JOIN model_categories mc ON m.category_id = mc.id
      WHERE m.is_enabled = true
      ORDER BY mc.order_position, m.name
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch models' });
  }
});

router.post('/', authenticate, requireAdmin, async (req, res) => {
  const {
    name,
    provider,
    modelId,
    icon,
    description,
    categoryId,
    contextLength,
    costPer1kTokens
  } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO models (
        name, provider, model_id, icon, description,
        category_id, context_length, cost_per_1k_tokens
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [name, provider, modelId, icon, description, categoryId, contextLength, costPer1kTokens]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create model' });
  }
});

export default router;