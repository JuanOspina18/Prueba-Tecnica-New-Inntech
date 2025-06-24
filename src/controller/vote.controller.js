import { pool } from '../models/db.js';


export const getVotes = async (req, res) => {
  try {
    const [votes] = await pool.query('SELECT * FROM vote');
    res.json(votes);
  } catch (error) {
    console.error('Error en getVotes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}


export const getVoteStatistics = async (req, res) => {
    try {
        const [candidates] = await pool.query('SELECT id, name, votes FROM candidate');
        const [totalVoters] = await pool.query('SELECT COUNT(*) as total FROM voter WHERE has_voted = TRUE');
        const totalVotes = totalVoters[0].total;
        const stats = candidates.map(c => ({
            id: c.id,
            name: c.name,
            votes: c.votes,
            percentage: totalVotes > 0 ? ((c.votes / totalVotes) * 100).toFixed(2) : '0.00'
        }));
        res.json({
            total_votes: totalVotes,
            statistics: stats
        });
    }catch (error) {
        console.error('Error en getVoteStatistics:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


export const postVote = async (req, res) => {
  try {
    const { voter_id, candidate_id } = req.body;


    const [voter] = await pool.execute('SELECT * FROM voter WHERE id = ?', [voter_id]);
    if (voter.length === 0) return res.status(404).json({ error: 'Votante no encontrado' });
    if (voter[0].has_voted) return res.status(400).json({ error: 'El votante ya ha emitido su voto' });

    const [candidate] = await pool.execute('SELECT * FROM candidate WHERE id = ?', [candidate_id]);
    if (candidate.length === 0) return res.status(404).json({ error: 'Candidato no encontrado' });


    await pool.execute('INSERT INTO vote (voter_id, candidate_id) VALUES (?, ?)', [voter_id, candidate_id]);


    await pool.execute('UPDATE voter SET has_voted = TRUE WHERE id = ?', [voter_id]);

    await pool.execute('UPDATE candidate SET votes = votes + 1 WHERE id = ?', [candidate_id]);

    res.status(201).json({ message: 'Voto emitido correctamente' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'El votante ya ha emitido un voto' });
    }
    res.status(500).json({ err: 'Error interno del servidor' });
  }
}