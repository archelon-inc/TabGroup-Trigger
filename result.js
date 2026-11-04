/** 外部の自動操作が表示先の窓を識別できるよう、結果を URL と画面の両方へ出す。 */
const result = new URLSearchParams(location.hash.slice(1));
document.getElementById('result').textContent = result.has('error')
  ? result.get('error')
  : `Opened in window ${result.get('window')}`;
