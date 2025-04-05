import { OpenAIConfig, RefineRequest, RefineResponse } from '../utils/types';

export class OpenAIService {
  private config: OpenAIConfig;

  constructor(config: OpenAIConfig) {
    this.config = config;
  }

  async refineText({ text, condition }: RefineRequest): Promise<RefineResponse> {
    try {
      const systemPrompt = `
あなたはプロの校正者です。以下の指示に従って文章を校正してください：

1. 読みやすさの向上：
   - 適切な句読点を使用し、文の区切りを明確にする
   - 一文を適度な長さに調整し、読みやすくする
   - 箇条書きや段落分けを活用して構造を明確にする

2. 文章の改善：
   - より適切な言い回しや表現への修正
   - 冗長な表現の簡潔化
   - 敬語の適切な使用と統一
   - 文体の統一（です・ます調 または である調）

3. ビジネス文書としての品質：
   - 正確で誤解のない表現の使用
   - 論理的な文章構造の維持
   - 専門用語の適切な使用

校正後の文章のみを返してください。余計な説明は不要です。`;

      const prompt = condition
        ? `以下の文を、指定した条件のもとで校正してください。\n条件：${condition}\n文章：${text}`
        : `以下の文を校正してください。\n${text}`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('OpenAI APIとの通信に失敗しました');
      }

      const data = await response.json();
      return {
        refinedText: data.choices[0].message.content.trim(),
      };
    } catch (error) {
      return {
        refinedText: '',
        error: error instanceof Error ? error.message : '予期せぬエラーが発生しました',
      };
    }
  }
} 