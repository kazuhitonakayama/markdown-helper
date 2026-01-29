// GitHubのtextareaを監視してボタンを追加
function addMarkdownButtons() {
  // GitHubのツールバー（H, B, I などのボタンがある場所）を探す
  const toolbars = document.querySelectorAll('[role="toolbar"][aria-label="Formatting tools"]');

  toolbars.forEach(toolbar => {
    // 既にボタンが追加されているかチェック
    if (toolbar.dataset.markdownHelperAdded) return;
    toolbar.dataset.markdownHelperAdded = 'true';

    // 対応するtextareaを探す
    const container = toolbar.closest('form, [class*="comment"]');
    const textarea = container?.querySelector('textarea');

    if (!textarea) return;

    // ボタンコンテナを作成
    const buttonContainer = createButtonContainer(textarea);

    // 最後のグループの後ろに追加
    const lastGroup = toolbar.querySelector('.Toolbar-module__group--dOhAD:last-of-type');

    if (lastGroup) {
      // 最後のグループの後に新しいグループとして追加
      const newGroup = document.createElement('div');
      newGroup.className = 'Toolbar-module__group--dOhAD';
      newGroup.appendChild(buttonContainer);
      lastGroup.after(newGroup);
    } else {
      // フォールバック: ツールバーに直接追加
      toolbar.appendChild(buttonContainer);
    }
  });
}

// ボタンコンテナを作成
function createButtonContainer(textarea) {
  const container = document.createElement('div');
  container.className = 'markdown-helper-toolbar';
  container.style.display = 'inline-flex';
  container.style.gap = '2px';
  container.style.alignItems = 'center';

  const buttons = [
    {
      label: '📋',
      title: 'Details/Summaryブロックを挿入',
      snippet: '<details>\n<summary>クリックして展開</summary>\n\n内容をここに記入\n\n</details>'
    },
    {
      label: '📊',
      title: 'テーブルを挿入',
      snippet: '| 項目1 | 項目2 | 項目3 |\n|-------|-------|-------|\n| 内容1 | 内容2 | 内容3 |\n| 内容4 | 内容5 | 内容6 |'
    },
    {
      label: '💡',
      title: 'Noteブロックを挿入',
      snippet: '> [!NOTE]\n> 補足情報をここに記入'
    },
    {
      label: '⚠️',
      title: 'Warningブロックを挿入',
      snippet: '> [!WARNING]\n> 警告内容をここに記入'
    }
  ];

  buttons.forEach(btn => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'markdown-helper-btn prc-Button-ButtonBase-9n-Xk ToolbarButton-module__iconButton--o0jFl prc-Button-IconButton-fyge7';
    button.setAttribute('data-component', 'IconButton');
    button.setAttribute('data-loading', 'false');
    button.setAttribute('data-no-visuals', 'true');
    button.setAttribute('data-size', 'medium');
    button.setAttribute('data-variant', 'invisible');
    button.textContent = btn.label;
    button.title = btn.title;
    button.tabIndex = -1;
    button.addEventListener('click', (e) => {
      e.preventDefault();
      insertSnippet(textarea, btn.snippet);
    });
    container.appendChild(button);
  });

  return container;
}

// スニペットを挿入
function insertSnippet(textarea, snippet) {
  if (!textarea || textarea.tagName !== 'TEXTAREA') return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;

  // カーソル位置にスニペットを挿入
  const before = text.substring(0, start);
  const after = text.substring(end);
  textarea.value = before + snippet + after;

  // カーソル位置を調整
  const newCursorPos = start + snippet.length;
  textarea.setSelectionRange(newCursorPos, newCursorPos);
  textarea.focus();

  // Reactの変更イベントをトリガー（GitHubのUIを更新）
  const event = new Event('input', { bubbles: true });
  textarea.dispatchEvent(event);
}

// 初期実行
addMarkdownButtons();

// 動的に追加されるtextareaにも対応（MutationObserver）
const observer = new MutationObserver((mutations) => {
  addMarkdownButtons();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
