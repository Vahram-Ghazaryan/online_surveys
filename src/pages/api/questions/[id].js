import { Question } from '../../../db/models';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const question = await Question.findByPk(id);
    if (!question) return res.status(404).json({ error: 'Not found' });

    if (req.method === 'PUT') {
      await question.update(req.body);
      return res.status(200).json(question);
    } else if (req.method === 'DELETE') {
      await question.destroy();
      return res.status(204).end();
    }
    return res.status(405).end();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
