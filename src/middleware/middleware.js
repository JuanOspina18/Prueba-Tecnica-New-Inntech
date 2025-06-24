import { pool } from '../models/db.js';

export const validateExclusiveRole = async (req, res, next) => {
  try {
    if (req.method !== 'POST' || !req.body?.name) return next();

    const { name } = req.body;

    const [asVoter] = await pool.query('SELECT id FROM voter WHERE name = ?', [name]);
    const [asCandidate] = await pool.query('SELECT id FROM candidate WHERE name = ?', [name]);

    if (asVoter.length > 0 && req.originalUrl.includes('/candidates')) {
      return res.status(400).json({ error: 'Esta persona ya está registrada como votante, no puede ser candidato.' });
    }

    if (asCandidate.length > 0 && req.originalUrl.includes('/voters')) {
      return res.status(400).json({ error: 'Esta persona ya está registrada como candidato, no puede ser votante.' });
    }

    next();
  } catch (error) {
    console.error('Error en validación de rol exclusivo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
export default validateExclusiveRole;