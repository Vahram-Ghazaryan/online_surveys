import { useState, useEffect } from 'react';
import Modal from '@/components/Modal';

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const [text, setText] = useState('');
  const [hasOptions, setHasOptions] = useState(false);
  const [category, setCategory] = useState('Ընդհանուր');
  const [options, setOptions] = useState(['', '']);
  const [viewOptionsModal, setViewOptionsModal] = useState(null);

  const fetchQuestions = async () => {
    const res = await fetch('/api/questions');
    if (res.ok) {
      const data = await res.json();
      setQuestions(data);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleOpenModal = (q = null) => {
    setCurrentQuestion(q);
    if (q) {
      setText(q.text);
      setHasOptions(q.type && q.type !== 'text');
      setCategory(q.category || 'Ընդհանուր');
      const parsedOptions = q.options ? (typeof q.options === 'string' ? JSON.parse(q.options) : q.options) : [];
      setOptions(parsedOptions.length > 0 ? parsedOptions : ['', '']);
    } else {
      setText('');
      setHasOptions(false);
      setCategory('Ընդհանուր');
      setOptions(['', '']);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      text,
      type: hasOptions ? 'radio' : 'text',
      category,
      options: hasOptions ? options.filter(o => o.trim() !== '') : null
    };

    if (currentQuestion) {
      await fetch(`/api/questions/${currentQuestion.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
    setIsModalOpen(false);
    fetchQuestions();
  };

  const handleDelete = async (id) => {
    if (confirm('Համոզվա՞ծ եք որ ցանկանում եք ջնջել:')) {
      await fetch(`/api/questions/${id}`, { method: 'DELETE' });
      fetchQuestions();
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Հարցեր</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Նոր հարց</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Հարց</th>
              <th>Կատեգորիա</th>
              <th>Տարբերակներ</th>
              <th>Գործողություններ</th>
            </tr>
          </thead>
          <tbody>
            {questions.map(q => (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td>{q.text}</td>
                <td>{q.category}</td>
                <td>
                  {q.options && q.options.length > 0 ? (
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }} onClick={() => setViewOptionsModal(typeof q.options === 'string' ? JSON.parse(q.options) : q.options)}>
                      Դիտել տարբերակները
                    </button>
                  ) : '-'}
                </td>
                <td>
                  <div className="actions">
                    <button className="btn btn-outline" onClick={() => handleOpenModal(q)}>Խմբագրել</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(q.id)}>Ջնջել</button>
                  </div>
                </td>
              </tr>
            ))}
            {questions.length === 0 && (
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
        title={currentQuestion ? 'Խմբագրել հարցը' : 'Նոր հարց'}
      >
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Հարցը</label>
            <input
              type="text"
              className="form-control"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="hasOptions"
              checked={hasOptions}
              onChange={(e) => setHasOptions(e.target.checked)}
            />
            <label htmlFor="hasOptions" className="form-label" style={{ marginBottom: 0, cursor: 'pointer' }}>
              Ընտրովի տարբերակներով հարց
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">Կատեգորիա</label>
            <input
              type="text"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          {hasOptions && (
            <div className="form-group">
              <label className="form-label">Տարբերակներ</label>
              {options.map((opt, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    value={opt}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                    placeholder={`Տարբերակ ${index + 1}`}
                    required
                  />
                  {options.length > 2 && (
                    <button type="button" className="btn btn-danger" onClick={() => {
                      setOptions(options.filter((_, i) => i !== index));
                    }}>X</button>
                  )}
                </div>
              ))}
              <button type="button" className="btn btn-outline" style={{ marginTop: '0.5rem' }} onClick={() => setOptions([...options, ''])}>
                + Ավելացնել տարբերակ
              </button>
            </div>
          )}
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Չեղարկել</button>
            <button type="submit" className="btn btn-primary">Պահպանել</button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={viewOptionsModal !== null}
        onClose={() => setViewOptionsModal(null)}
        title="Հարցի տարբերակները"
      >
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
          {viewOptionsModal && viewOptionsModal.map((opt, i) => (
            <li key={i} style={{ marginBottom: '0.5rem' }}>{opt}</li>
          ))}
        </ul>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={() => setViewOptionsModal(null)}>Փակել</button>
        </div>
      </Modal>
    </div>
  );
}
