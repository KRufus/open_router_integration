import express from 'express';
import crypto from 'crypto';
import { pool } from '../config/database';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT ak.*, u.email as created_by_email,
        (SELECT COUNT(*) FROM usage_logs ul WHERE ul.api_key_id = ak.id) as current_usage
      FROM api_keys ak
      LEFT JOIN users u ON ak.created_by = u.id
      ORDER BY ak.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch API keys' });
  }
});

router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  const { name, provider, usageLimit } = req.body;
  
  try {
    const key = crypto.randomBytes(32).toString('hex');
    const keyHash = await crypto.createHash('sha256').update(key).digest('hex');
    
    const result = await pool.query(
      `INSERT INTO api_keys (name, key_hash, provider, usage_limit, created_by)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, provider, usage_limit`,
      [name, keyHash, provider, usageLimit, req.user?.id]
    );
    
    res.json({ ...result.rows[0], key });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create API key' });
  }
});

export default router;