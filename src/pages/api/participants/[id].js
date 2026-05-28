import { Participant } from '../../../db/models';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const participant = await Participant.findByPk(id);
    if (!participant) return res.status(404).json({ error: 'Not found' });

    if (req.method === 'PUT') {
      await participant.update(req.body);
      return res.status(200).json(participant);
    } else if (req.method === 'DELETE') {
      await participant.destroy();
      return res.status(204).end();
    }
    return res.status(405).end();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
