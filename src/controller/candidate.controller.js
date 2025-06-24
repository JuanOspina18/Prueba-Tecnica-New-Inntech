import { pool } from '../models/db.js';

export const getCandidates = async (req, res) => {
  try {
    const [candidates] = await pool.query('SELECT * FROM candidate');
    res.json(candidates);
  } catch (error) {
    console.error('Error en getCandidates:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export const getCandidateById = async (req, res) => {
  try {
    const [candidate] = await pool.query('SELECT * FROM candidate WHERE id = ?', [req.params.id]);
    if (candidate.length === 0) return res.status(404).json({ error: 'Candidato no encontrado' });
    res.json(candidate[0]);
  } catch (error) {
    console.error('Error en getCandidateById:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export const postCandidate = async(req,res)=>{
    try {
        const { name, party } = req.body;
        const [existing] = await pool.query('SELECT * FROM candidate WHERE name = ?', [name]);
        if (existing.length > 0) return res.status(400).json({ error: 'Candidato ya registrado' });
        await pool.query('INSERT INTO candidate (name, party) VALUES (?, ?)', [name, party || null]);
        res.status(201).json({ message: 'Candidato registrado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al registrar el candidato'});
    }
}


export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await pool.query('SELECT * FROM candidate WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ error: 'Candidato no encontrado' });
    await pool.query('DELETE FROM candidate WHERE id = ?', [id]);
    res.status(200).json({ message: 'Candidato eliminado' });
    
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
}