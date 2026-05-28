import { useState, useEffect } from 'react';
import Modal from '@/components/Modal';

export default function Participants() {
  const [participants, setParticipants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const fetchParticipants = async () => {
    const res = await fetch('/api/participants');
    if (res.ok) {
      const data = await res.json();
      setParticipants(data);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleOpenModal = (p = null) => {
    setCurrentParticipant(p);
    if (p) {
      setFullName(p.fullName);
      setEmail(p.email);
    } else {
      setFullName('');
      setEmail('');
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { fullName, email };

    if (currentParticipant) {
      await fetch(`/api/participants/${currentParticipant.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch('/api/participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
    setIsModalOpen(false);
    fetchParticipants();
  };

  const handleDelete = async (id) => {
    if (confirm('Համոզվա՞ծ եք որ ցանկանում եք ջնջել:')) {
      await fetch(`/api/participants/${id}`, { method: 'DELETE' });
      fetchParticipants();
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Մասնակիցներ</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Նոր մասնակից</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Անուն Ազգանուն</th>
              <th>Էլ․ հասցե</th>
              <th>Գործողություններ</th>
            </tr>
          </thead>
          <tbody>
            {participants.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.fullName}</td>
                <td>{p.email}</td>
                <td>
                  <div className="actions">
                    <button className="btn btn-outline" onClick={() => handleOpenModal(p)}>Խմբագրել</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>Ջնջել</button>
                  </div>
                </td>
              </tr>
            ))}
            {participants.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>Տվյալներ չկան</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentParticipant ? 'Խմբագրել մասնակցին' : 'Նոր մասնակից'}
      >
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Անուն Ազգանուն</label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Էլ․ հասցե</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Չեղարկել</button>
            <button type="submit" className="btn btn-primary">Պահպանել</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
