import { useState, useEffect } from 'react';
import Modal from '@/components/Modal';

export default function Results() {
  const [results, setResults] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [participants, setParticipants] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);

  const [questionId, setQuestionId] = useState('');
  const [participantId, setParticipantId] = useState('');
  const [answer, setAnswer] = useState('');

  const fetchResults = async () => {
    const res = await fetch('/api/results');
    if (res.ok) {
      const data = await res.json();
      setResults(data);
    }
  };

  const fetchQuestionsAndParticipants = async () => {
    const [qRes, pRes] = await Promise.all([
      fetch('/api/questions'),
      fetch('/api/participants')
    ]);
    if (qRes.ok) setQuestions(await qRes.json());
    if (pRes.ok) setParticipants(await pRes.json());
  };

  useEffect(() => {
    fetchResults();
    fetchQuestionsAndParticipants();
  }, []);

  const handleOpenModal = (r = null) => {
    setCurrentResult(r);
    if (r) {
      setQuestionId(r.questionId);
      setParticipantId(r.participantId);
      setAnswer(r.answer || '');
    } else {
      setQuestionId(questions.length > 0 ? questions[0].id : '');
      setParticipantId(participants.length > 0 ? participants[0].id : '');
      setAnswer('');
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { questionId, participantId, answer };

    if (currentResult) {
      await fetch(`/api/results/${currentResult.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
    setIsModalOpen(false);
    fetchResults();
  };

  const handleDelete = async (id) => {
    if (confirm('Համոզվա՞ծ եք որ ցանկանում եք ջնջել:')) {
      await fetch(`/api/results/${id}`, { method: 'DELETE' });
      fetchResults();
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Արդյունքներ</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Նոր արդյունք</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Մասնակից</th>
              <th>Հարց</th>
              <th>Պատասխան</th>
              <th>Գործողություններ</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.participant?.fullName || `ID: ${r.participantId}`}</td>
                <td>{r.question?.text || `ID: ${r.questionId}`}</td>
                <td>{r.answer || '-'}</td>
                <td>
                  <div className="actions">
                    <button className="btn btn-outline" onClick={() => handleOpenModal(r)}>Խմբագրել</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(r.id)}>Ջնջել</button>
                  </div>
                </td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>Տվյալներ չկան</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentResult ? 'Խմբագրել արդյունքը' : 'Նոր արդյունք'}
      >
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Մասնակից</label>
            <select
              className="form-control"
              value={participantId}
              onChange={(e) => setParticipantId(e.target.value)}
              required
            >
              {participants.map(p => (
                <option key={p.id} value={p.id}>{p.fullName}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Հարց</label>
            <select
              className="form-control"
              value={questionId}
              onChange={(e) => setQuestionId(e.target.value)}
              required
            >
              {questions.map(q => (
                <option key={q.id} value={q.id}>{q.text}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Պատասխան</label>
            <input
              type="text"
              className="form-control"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
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
