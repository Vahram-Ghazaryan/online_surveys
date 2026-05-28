import { Question } from '../../../db/models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const questions = await Question.findAll({ order: [['id', 'DESC']] });
      return res.status(200).json(questions);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const question = await Question.create(req.body);
      return res.status(201).json(question);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  res.status(405).end();
}
