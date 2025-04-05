// Service Workerのセットアップ
self.addEventListener('install', (event: Event) => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event: Event) => {
  console.log('Service Worker activated');
});

// 拡張機能がインストールされたときの処理
chrome.runtime.onInstalled.addListener(() => {
  // デフォルト設定を保存
  chrome.storage.sync.set({
    model: 'gpt-3.5-turbo',
    apiKey: '',
  });
});

// メッセージリスナー
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_SETTINGS') {
    chrome.storage.sync.get(['apiKey', 'model'], (result) => {
      sendResponse(result);
    });
    return true;
  }
}); 