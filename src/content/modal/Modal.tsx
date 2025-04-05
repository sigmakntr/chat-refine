import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { ModalProps } from '../../utils/types';

const ModalContainer = styled.div<{ top: number; left: number }>`
  position: fixed;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 10000;
`;

const ModalHeader = styled.div`
  padding: 12px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalContent = styled.div`
  padding: 12px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  margin-bottom: 12px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-left: 8px;

  &.primary {
    background: #4a90e2;
    color: white;
  }

  &.secondary {
    background: #eee;
    color: #333;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ConditionInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  originalText,
  onApply,
  position,
}) => {
  const [refinedText, setRefinedText] = useState(originalText);
  const [condition, setCondition] = useState('');
  const [isConditionVisible, setIsConditionVisible] = useState(false);

  useEffect(() => {
    setRefinedText(originalText);
  }, [originalText]);

  if (!isOpen) return null;

  return (
    <ModalContainer top={position.top} left={position.left}>
      <ModalHeader>
        <span>テキスト校正</span>
        <Button className="secondary" onClick={onClose}>
          ×
        </Button>
      </ModalHeader>
      <ModalContent>
        {isConditionVisible && (
          <ConditionInput
            type="text"
            placeholder="校正の条件を入力"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />
        )}
        <TextArea
          value={refinedText}
          onChange={(e) => setRefinedText(e.target.value)}
        />
        <ButtonContainer>
          <Button
            className="secondary"
            onClick={() => setIsConditionVisible(!isConditionVisible)}
          >
            条件を追加
          </Button>
          <Button className="primary" onClick={() => onApply(refinedText)}>
            適用
          </Button>
        </ButtonContainer>
      </ModalContent>
    </ModalContainer>
  );
}; 