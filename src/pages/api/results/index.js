import { Result, Question, Participant } from '../../../db/models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const results = await Result.findAll({
        include: [
          { model: Question, as: 'question' },
          { model: Participant, as: 'participant' }
        ],
        order: [['id', 'DESC']]
      });
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const result = await Result.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  res.status(405).end();
}
