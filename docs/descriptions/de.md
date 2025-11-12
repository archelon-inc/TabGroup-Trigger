# Chrome Web Store Beschreibung (Deutsch)

## Kurzbeschreibung (132 Zeichen max.)

```
Wechseln Sie Chrome-Tab-Gruppen über URL-Aufruf. Kombinieren Sie mit Tastaturkürzel-Tools für sofortigen Wechsel per Hotkey.
```

Zeichenzahl: 127 Zeichen

## Detaillierte Beschreibung

```
Eine Chrome-Erweiterung, die Tastaturkürzel-basiertes Wechseln von Tab-Gruppen durch URL-Aufruf ermöglicht. Kombinieren Sie diese Erweiterung mit Tastaturkürzel-Tools, um sofort zwischen Chrome-Tab-Gruppen mit Ihren bevorzugten Hotkeys zu wechseln.

【Warum diese Erweiterung?】
Chrome bietet keine nativen Tastaturkürzel zum Wechseln zwischen Tab-Gruppen. Diese Erweiterung löst dieses Problem, indem sie Ihnen ermöglicht, Tab-Gruppen-Wechsel über URLs auszulösen, die dann mit externen Tools auf Tastaturkürzel gemappt werden können. Drücken Sie zum Beispiel Cmd+1, um zu Ihrer "Arbeit"-Gruppe zu springen, Cmd+2 für "Persönlich" usw.

【Hauptfunktionen】
✓ Tastaturkürzel-Integration
  Funktioniert nahtlos mit Tastaturkürzel-Tools, um Hotkey-basiertes Wechseln von Tab-Gruppen bereitzustellen

✓ URL-basierte Auslösung
  Navigieren Sie zu https://extension.tabgroup-trigger/{Gruppenname}, um sofort zur angegebenen Tab-Gruppe zu wechseln

✓ URL-Listen-Popup
  Klicken Sie auf das Erweiterungssymbol, um alle Tab-Gruppen mit ihren URL-codierten URLs anzuzeigen, einfach mit einem Klick kopierbar

【Verwendung】
1. Erstellen Sie Tab-Gruppen in Chrome und geben Sie ihnen Namen
2. Klicken Sie auf das Erweiterungssymbol, um die URLs für jede Gruppe zu erhalten:
   - URL-codierte URLs werden automatisch angezeigt
   - Klicken Sie auf die Schaltfläche "URL kopieren", um in die Zwischenablage zu kopieren
   - Klicken Sie auf den URL-Anzeigebereich, um den Text für manuelles Kopieren auszuwählen
3. Richten Sie URL-Öffnungsaktionen in Ihrem Tastaturkürzel-Tool ein
   Beispiel: Cmd+Shift+1 → https://extension.tabgroup-trigger/Work
4. Drücken Sie Ihren konfigurierten Hotkey, um sofort Tab-Gruppen zu wechseln

【Beispiele für Tastaturkürzel-Tools】
• macOS: BetterTouchTool, Keyboard Maestro
• Windows: AutoHotkey, PowerToys (Version 0.79 oder höher)

【Einrichtungsbeispiel (BetterTouchTool)】
1. Erstellen Sie ein neues Tastaturkürzel (z.B. Cmd+Shift+1)
2. Setzen Sie die Aktion auf "Open URL"
3. Geben Sie die URL ein: https://extension.tabgroup-trigger/Work
4. Jetzt wechselt das Drücken von Cmd+Shift+1 sofort zu Ihrer "Work"-Tab-Gruppe

【Tipps】
• Die Erweiterung merkt sich, welcher Tab in jeder Gruppe zuletzt aktiv war
• Wenn Sie zu einer Gruppe wechseln, wird der Tab aktiviert, den Sie zuletzt angesehen haben
• Wenn keine Tab-Historie existiert, wird der erste Tab in der Gruppe aktiviert

【Einschränkungen】
• Kann nicht zu gespeicherten Tab-Gruppen wechseln (Chromes "Gruppe speichern"-Funktion, die alle Tabs entfernt, aber das Gruppenlabel behält)
  Hinweis: Zusammengeklappte Tab-Gruppen (bei denen Tabs ausgeblendet, aber nicht entfernt sind) funktionieren einwandfrei
• Sonderzeichen in Gruppennamen (?, /, #, %, etc.) erfordern URL-Codierung
  Beispiel: "Question?Answer" → https://extension.tabgroup-trigger/Question%3FAnswer
  Verwenden Sie die Popup-Benutzeroberfläche der Erweiterung, um automatisch URL-codierte URLs zu erhalten
• Wenn Sie 25+ aufeinanderfolgende Tab-Gruppen-Wechsel durchführen, können ältere Tabs möglicherweise nicht über Cmd+Shift+T wiederhergestellt werden, aufgrund von Chromes Sitzungsverlauf-Limit (chrome.sessions.MAX_SESSION_RESULTS = 25)

【Datenschutz】
Diese Erweiterung sammelt keine Daten. Die gesamte Verarbeitung erfolgt lokal auf Ihrem Gerät.

【Support】
Wenn Sie Probleme haben oder Feature-Wünsche haben, melden Sie diese bitte auf unserer GitHub Issues-Seite.
https://github.com/archelon-inc/TabGroup-Trigger/issues

---
Hinweis: Diese Beschreibung wurde von Claude AI übersetzt.
```
