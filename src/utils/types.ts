interface OpenAIConfig {
  apiKey: string;
  model: string;
}

interface ChatworkMessage {
  text: string;
  element: HTMLTextAreaElement;
}

interface RefineRequest {
  text: string;
  condition?: string;
}

interface RefineResponse {
  refinedText: string;
  error?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  onApply: (text: string) => void;
  position: {
    top: number;
    left: number;
  };
}

export type {
  OpenAIConfig,
  ChatworkMessage,
  RefineRequest,
  RefineResponse,
  ModalProps,
}; 