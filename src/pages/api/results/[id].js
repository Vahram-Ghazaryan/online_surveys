import { Result } from '../../../db/models';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const result = await Result.findByPk(id);
    if (!result) return res.status(404).json({ error: 'Not found' });

    if (req.method === 'PUT') {
      await result.update(req.body);
      return res.status(200).json(result);
    } else if (req.method === 'DELETE') {
      await result.destroy();
      return res.status(204).end();
    }
    return res.status(405).end();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
