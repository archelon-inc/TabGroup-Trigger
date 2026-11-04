"""Mac の Chrome で空タブの試験用グループを分離し、作成したものだけ片付ける。"""

import json
import subprocess
import sys
import time


def apple(script):
    return subprocess.check_output(['osascript', '-e', script], text=True).strip()


if len(sys.argv) != 2:
    raise SystemExit('usage: python3 test/chrome-live.py <読み込み済みの拡張ID>')
extension = sys.argv[1]
if len(extension) != 32 or any(char not in 'abcdefghijklmnop' for char in extension):
    raise SystemExit('拡張IDは chrome://extensions に表示される a〜p の32文字です')
created = apple('tell application "Google Chrome"\nset w to make new window\n'
                f'set URL of active tab of w to "chrome-extension://{extension}/popup.html"\n'
                'return id of w\nend tell')
window = int(float(created))


def evaluate(code):
    return apple(f'tell application "Google Chrome" to execute active tab of window id {window} javascript {json.dumps(code, ensure_ascii=False)}')


def wait_value(code):
    deadline = time.monotonic() + 10
    while time.monotonic() < deadline:
        raw = evaluate(code)
        if raw and raw != 'missing value':
            value = json.loads(raw)
            if value is not None:
                if 'error' in value:
                    raise RuntimeError(value['error'])
                return value
        time.sleep(0.1)
    raise RuntimeError('Chrome の試験操作が10秒で完了しませんでした')


try:
    popup = json.dumps(f'chrome-extension://{extension}/popup.html')
    wait_value(f"JSON.stringify(location.href === {popup} && document.readyState === 'complete' ? {{ready:true}} : null)")
    script = json.dumps(f'chrome-extension://{extension}/test/chrome-fixture.js')
    evaluate(f"(() => {{ const script=document.createElement('script'); script.src={script}; document.head.append(script); return 'started'; }})()")
    result = wait_value("document.documentElement.dataset.tgtLiveResult || 'null'")
    print('PASS:', result)
finally:
    apple(f'tell application "Google Chrome" to close window id {window}')
