import { Button } from './Button';

interface LessonModalProps {
  lesson: string;
  onClose: () => void;
}

export function LessonModal({ lesson, onClose }: LessonModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content lesson-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-icon">📚</div>
        <h3 className="modal-title">Economics Lesson</h3>
        <p className="lesson-text">{lesson}</p>
        <Button onClick={onClose} fullWidth>
          Got it! ✓
        </Button>
      </div>
    </div>
  );
}
