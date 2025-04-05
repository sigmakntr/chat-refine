import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 16px;
`;

const Title = styled.h2`
  margin: 0 0 16px;
  font-size: 18px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #357abd;
  }
`;

export const Popup: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');

  useEffect(() => {
    chrome.storage.sync.get(['apiKey', 'model'], (result) => {
      setApiKey(result.apiKey || '');
      setModel(result.model || 'gpt-3.5-turbo');
    });
  }, []);

  const handleSave = () => {
    chrome.storage.sync.set({
      apiKey,
      model,
    }, () => {
      alert('設定を保存しました');
    });
  };

  return (
    <Container>
      <Title>ChatRefine 設定</Title>
      <FormGroup>
        <Label>OpenAI API Key</Label>
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
        />
      </FormGroup>
      <FormGroup>
        <Label>モデル</Label>
        <Select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
        </Select>
      </FormGroup>
      <Button onClick={handleSave}>保存</Button>
    </Container>
  );
}; 