# 交辦小教練｜AI 任務單產生器

把模糊想法整理成 AI 看得懂、做得到、也驗收得了的工作說明。這是一個以第九週「Agentic Work 與 AI 工作現場」課堂概念為起點的單頁互動網站，透過任務目標、交付成果、輸入資料、執行方式、限制和驗收條件，產生可複製或下載的 Markdown 任務單。

## 使用方式
1. 開啟網站，選一個情境範例，或直接填寫任務欄位。
2. 描述要完成的目標，並補上成果形式、資料來源、工作步驟、限制與驗收條件。
3. 在右側預覽檢查任務單；缺少的資訊會明確顯示為「待補充」。
4. 按「複製任務單」貼給 AI，或下載 Markdown 檔案留存。

網站只負責整理文字，不會呼叫 AI、讀寫檔案或上傳表單內容。使用者輸入只在目前瀏覽器頁面處理。

## 檔案地圖
| 檔案 | 用途 |
| --- | --- |
| index.html | 網頁結構、繁體中文內容、表單欄位和預覽面板 |
| styles.css | 色彩系統、版面、手機響應式樣式和焦點狀態 |
| app.js | 範例資料、任務單生成、複製與 Markdown 下載 |
| AGENTS.md | AI 延續開發時需遵守的目的、結構、命名與修改規則 |
| .github/workflows/pages.yml | GitHub Pages 自動發布流程 |
| hand-in.md | 作業提交說明範本；發布後填入實際連結與個人資料 |

## 本機預覽
可直接用瀏覽器開啟 index.html。若要以本機 HTTP 方式預覽，請在此資料夾執行：

~~~powershell
python -m http.server 8000
~~~

再瀏覽 http://localhost:8000。

## 發布到 GitHub Pages
專案已附上 .github/workflows/pages.yml。建立 repository 並推送後，在 GitHub 的 Settings → Pages → Build and deployment 選擇 GitHub Actions。此後每次推送到 main，GitHub Actions 會將 index.html、styles.css 和 app.js 複製到 dist/ 再發布。第一次發布完成後，從 Pages 設定頁複製實際網站網址，填入 hand-in.md。

## 延伸開發
- 在 app.js 的 templates 物件新增情境範例。
- 需要新增欄位時，同步更新 index.html、fields 清單、範例資料和任務單產生器。
- 修改樣式時先沿用 styles.css 頂端的 CSS 變數，並檢查桌面與窄螢幕版面。
- 開始每次 AI 開發工作前，請先讀根目錄的 AGENTS.md。

更多延伸方向、內容規則、檔案路徑、互動方式和人工檢查項目，都記錄在 AGENTS.md。
