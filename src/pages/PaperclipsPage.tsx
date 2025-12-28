/**
 * PaperclipsPage - Universal Paperclips game
 *
 * URL: /paperclips
 */

import { useNavigate } from 'react-router-dom';
import { PaperclipsGame } from '../games/PaperclipsGame';
import '../games/GameHub.css';

export function PaperclipsPage() {
  const navigate = useNavigate();

  return (
    <div className="game-container">
      <button className="back-button" onClick={() => navigate('/hub')}>
        ← Back to Hub
      </button>
      <PaperclipsGame />
    </div>
  );
}
