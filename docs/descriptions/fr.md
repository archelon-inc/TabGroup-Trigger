# Description du Chrome Web Store (Français)

## Description courte (132 caractères max.)

```
Changez les groupes d'onglets via URL. Utilisez des raccourcis clavier pour un changement instantané.
```

Nombre de caractères : 105 caractères

## Description détaillée

```
Une extension Chrome qui permet le changement de groupes d'onglets basé sur des raccourcis clavier en utilisant l'invocation d'URL. Combinez cette extension avec des utilitaires de raccourcis clavier pour changer instantanément entre les groupes d'onglets Chrome en utilisant vos touches de raccourci favorites.

【Pourquoi cette extension ?】
Chrome ne fournit pas de raccourcis clavier natifs pour changer entre les groupes d'onglets. Cette extension résout ce problème en vous permettant de déclencher des changements de groupes d'onglets via des URLs, qui peuvent ensuite être mappées à des raccourcis clavier en utilisant des utilitaires externes. Par exemple, appuyez sur Cmd+1 pour accéder à votre groupe "Travail", Cmd+2 pour "Personnel", et ainsi de suite.

【Fonctionnalités principales】
✓ Intégration des raccourcis clavier
  Fonctionne parfaitement avec les utilitaires de raccourcis clavier pour fournir un changement de groupes d'onglets basé sur des touches de raccourci

✓ Déclenchement basé sur URL
  Naviguez vers https://extension.tabgroup-trigger/{nom-groupe} pour changer instantanément vers le groupe d'onglets spécifié

✓ Pop-up avec liste d'URLs
  Cliquez sur l'icône de l'extension pour afficher tous les groupes d'onglets avec leurs URLs encodées, facilement copiables en un clic

【Comment utiliser】
1. Créez des groupes d'onglets dans Chrome et donnez-leur des noms
2. Cliquez sur l'icône de l'extension pour obtenir les URLs de chaque groupe :
   - Les URLs encodées sont automatiquement affichées
   - Cliquez sur le bouton "Copier l'URL" pour copier dans le presse-papiers
   - Cliquez sur la zone d'affichage de l'URL pour sélectionner le texte pour une copie manuelle
3. Configurez des actions d'ouverture d'URL dans votre utilitaire de raccourcis clavier
   Exemple : Cmd+Shift+1 → https://extension.tabgroup-trigger/Work
4. Appuyez sur votre touche de raccourci configurée pour changer instantanément de groupe d'onglets

【Exemples d'utilitaires de raccourcis clavier】
• macOS : BetterTouchTool, Keyboard Maestro
• Windows : AutoHotkey, PowerToys (version 0.79 ou ultérieure)

【Exemple de configuration (BetterTouchTool)】
1. Créez un nouveau raccourci clavier (par ex. : Cmd+Shift+1)
2. Définissez l'action sur "Open URL"
3. Entrez l'URL : https://extension.tabgroup-trigger/Work
4. Maintenant, appuyer sur Cmd+Shift+1 changera instantanément vers votre groupe d'onglets "Work"

【Conseils】
• L'extension se souvient de quel onglet était actif en dernier dans chaque groupe
• Lorsque vous changez vers un groupe, il activera l'onglet que vous consultiez en dernier
• Si aucun historique d'onglets n'existe, il active le premier onglet du groupe

【Limitations】
• Impossible de changer vers des groupes d'onglets enregistrés (la fonction "Enregistrer le groupe" de Chrome qui supprime tous les onglets mais conserve l'étiquette du groupe)
  Remarque : Les groupes d'onglets réduits (où les onglets sont masqués mais non supprimés) fonctionnent bien
• Les caractères spéciaux dans les noms de groupes (?, /, #, %, etc.) nécessitent un encodage URL
  Exemple : "Question?Answer" → https://extension.tabgroup-trigger/Question%3FAnswer
  Utilisez l'interface pop-up de l'extension pour obtenir automatiquement des URLs encodées
• Si vous effectuez 25+ changements consécutifs de groupes d'onglets, les onglets plus anciens peuvent ne pas être restaurables via Cmd+Shift+T en raison de la limite de l'historique de session de Chrome (chrome.sessions.MAX_SESSION_RESULTS = 25)

【Confidentialité】
Cette extension ne collecte aucune donnée. Tout le traitement est effectué localement sur votre appareil.

【Support】
Si vous rencontrez des problèmes ou avez des demandes de fonctionnalités, veuillez les signaler sur notre page GitHub Issues.
https://github.com/archelon-inc/TabGroup-Trigger/issues

---
Note : Cette description a été traduite par Claude AI.
```
