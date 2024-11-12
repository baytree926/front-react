import React, { useState } from 'react';
import Modal from './Modal';
import './App.css';
import logo from './logo.png';

function App() {
  const [vocabularies, setVocabularies] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUIModal, setShowUIModal] = useState(false);
  const [newVocab, setNewVocab] = useState({ title: '', description: '' });

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const openUIModal = () => setShowUIModal(true);
  const closeUIModal = () => setShowUIModal(false);

  const handleSubmitVocabulary = () => {
    if (newVocab.title) {
      setVocabularies([...vocabularies, { ...newVocab, id: Date.now(), wordCount: 0 }]);
      setNewVocab({ title: '', description: '' });
      closeAddModal();
    } else {
      alert("제목을 입력해 주세요.");
    }
  };

  return (
    <div className="container">
      <header>
        <div className="header-left">
          <img src={logo} alt="Logo" className="logo" />
          <button className="add-button" onClick={openAddModal}>+</button>
          <button className="add-button" onClick={openUIModal}>UI 설정</button> {/* add-button 스타일 적용 */}
        </div>
        <div className="learning-rate">
          <p>학습률 통계 섹션</p>
        </div>
      </header>

      <main>
        <section className="vocab-list">
          {vocabularies.map((vocab) => (
            <div key={vocab.id} className="vocab-item">
              <h2>{vocab.title} ({vocab.wordCount} 단어)</h2>
              <p className="description">{vocab.description}</p>
            </div>
          ))}
        </section>
      </main>

      {showAddModal && (
        <Modal title="단어장 추가" onClose={closeAddModal}>
  <label>제목:</label>
  <input
    type="text"
    value={newVocab.title}
    onChange={(e) => setNewVocab({ ...newVocab, title: e.target.value })}
    className="input-field"
  />
  <label>설명:</label>
  <textarea
    value={newVocab.description}
    onChange={(e) => setNewVocab({ ...newVocab, description: e.target.value })}
    className="textarea-field"
  />
  <button onClick={handleSubmitVocabulary} className="submit-button">제출</button>
</Modal>

)}

      {showUIModal && (
        <Modal title="UI 설정" onClose={closeUIModal}>
          <p>UI 설정 요소를 추가할 공간</p>
          <button onClick={closeUIModal}>완료</button>
        </Modal>
      )}
    </div>
  );
}

export default App;
