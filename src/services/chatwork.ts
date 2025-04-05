import { ChatworkMessage } from '../utils/types';

export class ChatworkService {
  private static TEXTAREA_SELECTOR = '#_chatText';

  static getCurrentMessage(): ChatworkMessage | null {
    const textarea = document.querySelector(this.TEXTAREA_SELECTOR) as HTMLTextAreaElement;
    if (!textarea) return null;

    return {
      text: textarea.value,
      element: textarea,
    };
  }

  static updateMessage(text: string): void {
    const textarea = document.querySelector(this.TEXTAREA_SELECTOR) as HTMLTextAreaElement;
    if (!textarea) return;

    textarea.value = text;
    // Chatworkのテキストエリアの変更イベントを発火
    const event = new Event('input', { bubbles: true });
    textarea.dispatchEvent(event);
  }

  static getTextAreaPosition(): { top: number; left: number } | null {
    const textarea = document.querySelector(this.TEXTAREA_SELECTOR) as HTMLTextAreaElement;
    if (!textarea) return null;

    const rect = textarea.getBoundingClientRect();
    return {
      top: rect.bottom - 30, // テキストエリアの下から20px上
      left: rect.right - 200, // テキストエリアの右から160px左（DeepLボタンとの間隔を確保）
    };
  }
} 