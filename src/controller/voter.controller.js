import { pool } from '../models/db.js';



export const getVoters = async (req, res) => {
  try {
    const [voters] = await pool.query('SELECT * FROM voter');
    res.json(voters);
  } catch (error) {
    console.error('Error en getVoters:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}



export const getVoterById = async (req, res) => {
    try{
        const [voter] = await pool.query('SELECT * FROM voter WHERE id = ?', [req.params.id]);
        if (voter.length === 0) return res.status(404).json({ error: 'Votante no encontrado' });
        res.json(voter[0]);
    }catch (error) {
        console.error('Error en getVoterById:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
}
}



export const postVoter = async (req, res) => {
  try {
    const { name, email } = req.body;
    const [existing] = await pool.query('SELECT * FROM voter WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ error: 'Email ya registrado' });
    await pool.query('INSERT INTO voter (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).json({ message: 'Votante registrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



export const deleteVoter = async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await pool.query('SELECT * FROM voter WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ error: 'Votante no encontrado' });
    await pool.query('DELETE FROM voter WHERE id = ?', [id]);
    res.status(200).json({ message: 'Votante eliminado' });
    
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
}