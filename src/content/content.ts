import { OpenAIService } from '../services/openai';
import { ChatworkService } from '../services/chatwork';
import { OpenAIConfig } from '../utils/types';

let openAIService: OpenAIService;
let originalText: string = ''; // 校正前のテキスト
let refinedText: string = ''; // 校正後のテキスト
let isShowingRefined: boolean = false; // 現在校正後のテキストを表示しているかどうか

// OpenAI APIの設定を初期化
const config: OpenAIConfig = {
  apiKey: process.env.OPENAI_API_KEY || '',
  model: 'gpt-4o',
};

// デバッグ用のログ出力
console.log('API Key:', config.apiKey ? 'Set' : 'Not set');
console.log('Model:', config.model);

openAIService = new OpenAIService(config);

// ボタンのテキストを更新
const updateButtonText = (undoButton: HTMLButtonElement, redoButton: HTMLButtonElement) => {
  if (isShowingRefined) {
    undoButton.innerHTML = '元の文章に戻す';
    redoButton.innerHTML = '校正';
    redoButton.style.display = 'none';
  } else {
    undoButton.innerHTML = '校正前に戻す';
    redoButton.innerHTML = '校正後の文章に戻す';
    redoButton.style.display = refinedText ? 'block' : 'none';
  }
};

// リファインボタンと履歴ボタンを作成
const createButtons = () => {
  const buttonContainer = document.createElement('div');
  buttonContainer.style.position = 'fixed';
  buttonContainer.style.display = 'flex';
  buttonContainer.style.gap = '8px';
  buttonContainer.style.alignItems = 'center';
  buttonContainer.style.height = '24px';
  buttonContainer.style.zIndex = '1000';

  // 元に戻すボタン
  const undoButton = document.createElement('button');
  undoButton.className = 'chat-undo-button';

  // 校正後に戻すボタン
  const redoButton = document.createElement('button');
  redoButton.className = 'chat-redo-button';

  // 校正ボタン
  const refineButton = document.createElement('button');
  refineButton.innerHTML = '校正';
  refineButton.className = 'chat-refine-button';

  // ボタンの位置を設定
  const position = ChatworkService.getTextAreaPosition();
  if (position) {
    buttonContainer.style.top = `${position.top}px`;
    buttonContainer.style.left = `${position.left}px`;
  }

  // 元に戻すボタンのクリックイベント
  undoButton.addEventListener('click', () => {
    if (isShowingRefined && originalText) {
      ChatworkService.updateMessage(originalText);
      isShowingRefined = false;
    } else if (!isShowingRefined && originalText) {
      ChatworkService.updateMessage(originalText);
      originalText = '';
      refinedText = '';
    }
    updateButtonText(undoButton, redoButton);
  });

  // 校正後に戻すボタンのクリックイベント
  redoButton.addEventListener('click', () => {
    if (refinedText) {
      ChatworkService.updateMessage(refinedText);
      isShowingRefined = true;
      updateButtonText(undoButton, redoButton);
    }
  });

  // 校正ボタンのクリックイベント
  refineButton.addEventListener('click', async () => {
    const message = ChatworkService.getCurrentMessage();
    if (!message || !message.text.trim()) {
      console.log('テキストが入力されていません');
      return;
    }

    try {
      originalText = message.text;
      const response = await openAIService.refineText({ text: message.text });
      if (response.error) {
        alert(response.error);
        return;
      }
      refinedText = response.refinedText;
      ChatworkService.updateMessage(refinedText);
      isShowingRefined = true;
      updateButtonText(undoButton, redoButton);
    } catch (error) {
      alert('エラーが発生しました');
    }
  });

  buttonContainer.appendChild(undoButton);
  buttonContainer.appendChild(redoButton);
  buttonContainer.appendChild(refineButton);
  
  // 初期状態のボタンテキストを設定
  updateButtonText(undoButton, redoButton);
  
  return buttonContainer;
};

// テキストエリアの監視を開始
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      const textarea = ChatworkService.getCurrentMessage()?.element;
      if (textarea && !document.querySelector('.chat-refine-button')) {
        const buttons = createButtons();
        document.body.appendChild(buttons);
        break;
      }
    }
  }
});

// 監視を開始
observer.observe(document.body, {
  childList: true,
  subtree: true
}); 