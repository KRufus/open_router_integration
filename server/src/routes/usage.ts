import express from 'express';
import { pool } from '../config/database';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/stats', authenticate, requireAdmin, async (req, res) => {
  const { startDate, endDate } = req.query;
  
  try {
    const result = await pool.query(`
      SELECT 
        m.name as model_name,
        DATE_TRUNC('day', ul.created_at) as date,
        SUM(ul.tokens_used) as total_tokens,
        SUM(ul.cost) as total_cost
      FROM usage_logs ul
      JOIN models m ON ul.model_id = m.id
      WHERE ul.created_at BETWEEN $1 AND $2
      GROUP BY m.name, DATE_TRUNC('day', ul.created_at)
      ORDER BY date DESC
    `, [startDate, endDate]);
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch usage statistics' });
  }
});

router.post('/log', authenticate, async (req, res) => {
  const { modelId, apiKeyId, tokensUsed, cost } = req.body;
  
  try {
    await pool.query(
      `INSERT INTO usage_logs (user_id, model_id, api_key_id, tokens_used, cost)
       VALUES ($1, $2, $3, $4, $5)`,
      [req.user?.id, modelId, apiKeyId, tokensUsed, cost]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Failed to log usage' });
  }
});

export default router;