# Descrizione Chrome Web Store (Italiano)

## Descrizione breve (132 caratteri max.)

```
Cambia gruppi di schede via URL. Usa scorciatoie da tastiera per cambio istantaneo con tasti rapidi.
```

Conteggio caratteri: 106 caratteri

## Descrizione dettagliata

```
Un'estensione Chrome che abilita il cambio di gruppi di schede basato su scorciatoie da tastiera usando l'invocazione URL. Combina questa estensione con utilità di scorciatoie da tastiera per cambiare istantaneamente tra gruppi di schede Chrome usando i tuoi tasti rapidi preferiti.

【Perché questa estensione?】
Chrome non fornisce scorciatoie da tastiera native per cambiare tra gruppi di schede. Questa estensione risolve quel problema permettendoti di attivare cambi di gruppi di schede tramite URL, che possono poi essere mappate a scorciatoie da tastiera usando utilità esterne. Ad esempio, premi Cmd+1 per saltare al tuo gruppo "Lavoro", Cmd+2 per "Personale", e così via.

【Funzionalità principali】
✓ Integrazione scorciatoie da tastiera
  Funziona perfettamente con utilità di scorciatoie da tastiera per fornire cambio di gruppi di schede basato su tasti rapidi

✓ Attivazione basata su URL
  Naviga a https://extension.tabgroup-trigger/{nome-gruppo} per cambiare istantaneamente al gruppo di schede specificato

✓ Popup con elenco URL
  Fai clic sull'icona dell'estensione per visualizzare tutti i gruppi di schede con i loro URL codificati, facilmente copiabili con un clic

【Come usare】
1. Crea gruppi di schede in Chrome e dai loro dei nomi
2. Fai clic sull'icona dell'estensione per ottenere gli URL per ogni gruppo:
   - Gli URL codificati vengono visualizzati automaticamente
   - Fai clic sul pulsante "Copia URL" per copiare negli appunti
   - Fai clic sull'area di visualizzazione URL per selezionare il testo per la copia manuale
3. Imposta azioni di apertura URL nella tua utilità di scorciatoie da tastiera
   Esempio: Cmd+Shift+1 → https://extension.tabgroup-trigger/Work
4. Premi il tuo tasto rapido configurato per cambiare istantaneamente gruppo di schede

【Esempi di utilità di scorciatoie da tastiera】
• macOS: BetterTouchTool, Keyboard Maestro
• Windows: AutoHotkey, PowerToys (versione 0.79 o successiva)

【Esempio di configurazione (BetterTouchTool)】
1. Crea una nuova scorciatoia da tastiera (es.: Cmd+Shift+1)
2. Imposta l'azione su "Open URL"
3. Inserisci l'URL: https://extension.tabgroup-trigger/Work
4. Ora premere Cmd+Shift+1 cambierà istantaneamente al tuo gruppo di schede "Work"

【Suggerimenti】
• L'estensione ricorda quale scheda era attiva per ultima in ogni gruppo
• Quando cambi a un gruppo, attiverà la scheda che stavi visualizzando per ultima
• Se non esiste cronologia schede, attiva la prima scheda del gruppo

【Limitazioni】
• Non può cambiare a gruppi di schede salvati (la funzione "Salva gruppo" di Chrome che rimuove tutte le schede ma mantiene l'etichetta del gruppo)
  Nota: I gruppi di schede compressi (dove le schede sono nascoste ma non rimosse) funzionano bene
• I caratteri speciali nei nomi dei gruppi (?, /, #, %, ecc.) richiedono codifica URL
  Esempio: "Question?Answer" → https://extension.tabgroup-trigger/Question%3FAnswer
  Usa l'interfaccia popup dell'estensione per ottenere automaticamente URL codificati
• Se esegui 25+ cambi consecutivi di gruppi di schede, le schede più vecchie potrebbero non essere ripristinabili tramite Cmd+Shift+T a causa del limite della cronologia sessioni di Chrome (chrome.sessions.MAX_SESSION_RESULTS = 25)

【Privacy】
Questa estensione non raccoglie alcun dato. Tutta l'elaborazione viene eseguita localmente sul tuo dispositivo.

【Supporto】
Se riscontri problemi o hai richieste di funzionalità, segnalali sulla nostra pagina GitHub Issues.
https://github.com/archelon-inc/TabGroup-Trigger/issues

---
Nota: Questa descrizione è stata tradotta da Claude AI.
```
