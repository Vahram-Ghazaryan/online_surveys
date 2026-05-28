import { Participant } from '../../../db/models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const participants = await Participant.findAll({ order: [['id', 'DESC']] });
      return res.status(200).json(participants);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const participant = await Participant.create(req.body);
      return res.status(201).json(participant);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  res.status(405).end();
}
