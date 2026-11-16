const fields = ['goal', 'deliverable', 'sources', 'format', 'steps', 'constraints', 'acceptance'];
const form = document.querySelector('#brief-form');
const output = document.querySelector('#output-content');
const state = document.querySelector('#output-state');
const stateText = document.querySelector('#output-state-text');
const copyButton = document.querySelector('#copy-button');
const downloadButton = document.querySelector('#download-button');
const liveStatus = document.querySelector('#live-status');

const templates = {
  folder: {
    goal: '整理這學期的課程資料夾，讓我能快速找到講義、作業與參考資料。',
    deliverable: '建立清楚的分類資料夾，搬移檔案，並產生一份整理結果清單。',
    sources: '目前工作目錄中的課程檔案；先列出檔名與副檔名再判斷用途。',
    format: '分類資料夾名稱使用繁體中文；整理結果以 Markdown 清單回報。',
    steps: '1. 先掃描檔案並提出分類計畫。\n2. 等我確認計畫後再建立資料夾與搬移檔案。\n3. 完成後列出各類檔案數量及去向。',
    constraints: '不得刪除、覆寫或重新命名原始檔案。無法判斷用途的檔案放入「待確認」，不要自行猜測。',
    acceptance: '所有原始檔案都有明確去向；沒有檔案被刪除；「待確認」項目已單獨列出；回報清單中的路徑存在。'
  },
  research: {
    goal: '整理一組研究資料，做成可供期末報告使用的來源索引。',
    deliverable: '一份依主題分類的 Markdown 索引，每筆資料包含標題、來源路徑、摘要與可引用的重點。',
    sources: './research/ 資料夾內的 PDF、網頁摘錄與個人筆記。',
    format: '輸出到 ./research/index.md；使用繁體中文，原始標題保留原文。',
    steps: '1. 先列出可讀取的來源與檔案類型。\n2. 依共同主題分組，為每份來源寫一段摘要。\n3. 建立索引並附上可回到原始檔的相對路徑。',
    constraints: '不要補寫來源中沒有的事實。無法確認作者、日期或頁碼時標註「未提供」。不要修改原始資料。',
    acceptance: '每份可讀來源都出現在索引；各項摘要與來源能對應；所有連結使用相對路徑且可開啟；待確認資料已標記。'
  },
  website: {
    goal: '製作一個介紹系上成果發表會的單頁網站，讓訪客快速掌握活動資訊。',
    deliverable: '可在手機與桌面瀏覽的單頁網站原始碼，包含活動介紹、時間地點、流程與報名方式。',
    sources: '我提供的活動名稱、日期、地點、主辦單位、報名連結與活動流程。',
    format: '使用繁體中文；檔案放在 ./site/；入口為 index.html，樣式與互動程式分開存放。',
    steps: '1. 先整理缺少的活動資訊並向我確認。\n2. 提出頁面區塊與視覺方向。\n3. 確認後完成響應式頁面，並摘要列出修改的檔案。',
    constraints: '未提供的時間、地點、講者與報名資訊不得自行編造。使用原生 HTML、CSS、JavaScript，不加入外部追蹤。',
    acceptance: '手機寬度下沒有水平捲動；導覽連結可跳到對應區塊；重要活動資訊清楚；所有按鈕與連結都有實際作用。'
  }
};

function readBrief() {
  return Object.fromEntries(fields.map((id) => [id, document.querySelector('#' + id).value.trim()]));
}
function section(title, value) {
  return '## ' + title + '\n' + (value || '待補充：請提供此項資訊，避免 AI 自行猜測。');
}
function createBrief(data) {
  const summary = data.goal || '待補充：請說明希望完成的任務。';
  return [
    '# 任務單：' + summary, '',
    section('任務目標', data.goal), '',
    section('交付成果', data.deliverable), '',
    section('輸入資料', data.sources), '',
    section('格式與位置', data.format), '',
    section('執行方式', data.steps), '',
    section('限制與邊界', data.constraints), '',
    section('驗收條件', data.acceptance), '',
    '## 完成回報',
    '完成後請列出產出的檔案、執行結果、尚待確認的項目，以及每項驗收條件的狀態。'
  ].join('\n');
}
function updatePreview(announce = false) {
  const data = readBrief();
  const hasGoal = Boolean(data.goal);
  output.textContent = createBrief(data);
  copyButton.disabled = !hasGoal;
  downloadButton.disabled = !hasGoal;
  state.classList.toggle('is-ready', hasGoal);
  stateText.textContent = hasGoal ? '任務單已整理' : '等待輸入';
  if (announce && hasGoal) liveStatus.textContent = '任務單內容已更新。';
}

form.addEventListener('input', () => updatePreview());
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  updatePreview(true);
  output.focus();
});
form.addEventListener('reset', () => {
  window.setTimeout(() => {
    updatePreview();
    liveStatus.textContent = '表單已清空。';
  }, 0);
});
document.querySelectorAll('[data-template]').forEach((button) => {
  button.addEventListener('click', () => {
    const template = templates[button.dataset.template];
    if (!template) return;
    fields.forEach((id) => { document.querySelector('#' + id).value = template[id]; });
    updatePreview(true);
    document.querySelector('#goal').focus();
  });
});
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(output.textContent);
    liveStatus.textContent = '已複製任務單。';
  } catch {
    const temporary = document.createElement('textarea');
    temporary.value = output.textContent;
    temporary.setAttribute('readonly', '');
    temporary.style.position = 'fixed';
    temporary.style.opacity = '0';
    document.body.append(temporary);
    temporary.select();
    const copied = document.execCommand('copy');
    temporary.remove();
    liveStatus.textContent = copied ? '已複製任務單。' : '無法自動複製，請選取預覽區文字後複製。';
  }
});
downloadButton.addEventListener('click', () => {
  const blob = new Blob([output.textContent], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'AI-任務單.md';
  link.click();
  URL.revokeObjectURL(url);
  liveStatus.textContent = '已下載 Markdown 任務單。';
});
updatePreview();

