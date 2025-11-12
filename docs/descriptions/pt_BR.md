# Descrição da Chrome Web Store (Português)

## Descrição curta (132 caracteres no máx.)

```
Alterne grupos de abas via URL. Use atalhos de teclado para troca instantânea com teclas rápidas.
```

Contagem de caracteres: 103 caracteres

## Descrição detalhada

```
Uma extensão do Chrome que permite alternar grupos de abas baseado em atalhos de teclado usando invocação de URL. Combine esta extensão com utilitários de atalhos de teclado para alternar instantaneamente entre grupos de abas do Chrome usando suas teclas de atalho favoritas.

【Por que esta extensão?】
O Chrome não fornece atalhos de teclado nativos para alternar entre grupos de abas. Esta extensão resolve esse problema permitindo que você acione trocas de grupos de abas via URLs, que podem então ser mapeadas para atalhos de teclado usando utilitários externos. Por exemplo, pressione Cmd+1 para pular para seu grupo "Trabalho", Cmd+2 para "Pessoal", e assim por diante.

【Recursos principais】
✓ Integração com atalhos de teclado
  Funciona perfeitamente com utilitários de atalhos de teclado para fornecer alternância de grupos de abas baseada em teclas de atalho

✓ Acionamento baseado em URL
  Navegue para https://extension.tabgroup-trigger/{nome-grupo} para alternar instantaneamente para o grupo de abas especificado

✓ Pop-up com lista de URLs
  Clique no ícone da extensão para visualizar todos os grupos de abas com suas URLs codificadas, facilmente copiáveis com um clique

【Como usar】
1. Crie grupos de abas no Chrome e dê nomes a eles
2. Clique no ícone da extensão para obter as URLs de cada grupo:
   - URLs codificadas são exibidas automaticamente
   - Clique no botão "Copiar URL" para copiar para a área de transferência
   - Clique na área de exibição da URL para selecionar o texto para cópia manual
3. Configure ações de abertura de URL em seu utilitário de atalhos de teclado
   Exemplo: Cmd+Shift+1 → https://extension.tabgroup-trigger/Work
4. Pressione sua tecla de atalho configurada para alternar instantaneamente os grupos de abas

【Exemplos de utilitários de atalhos de teclado】
• macOS: BetterTouchTool, Keyboard Maestro
• Windows: AutoHotkey, PowerToys (versão 0.79 ou posterior)

【Exemplo de configuração (BetterTouchTool)】
1. Crie um novo atalho de teclado (ex.: Cmd+Shift+1)
2. Defina a ação como "Open URL"
3. Insira a URL: https://extension.tabgroup-trigger/Work
4. Agora pressionar Cmd+Shift+1 alternará instantaneamente para seu grupo de abas "Work"

【Dicas】
• A extensão lembra qual aba estava ativa por último em cada grupo
• Quando você alterna para um grupo, ela ativará a aba que você estava visualizando por último
• Se não existir histórico de abas, ela ativa a primeira aba do grupo

【Limitações】
• Não é possível alternar para grupos de abas salvos (recurso "Salvar grupo" do Chrome que remove todas as abas mas mantém o rótulo do grupo)
  Nota: Grupos de abas recolhidos (onde as abas estão ocultas mas não removidas) funcionam bem
• Caracteres especiais em nomes de grupos (?, /, #, %, etc.) requerem codificação de URL
  Exemplo: "Question?Answer" → https://extension.tabgroup-trigger/Question%3FAnswer
  Use a interface pop-up da extensão para obter automaticamente URLs codificadas
• Se você executar 25+ trocas consecutivas de grupos de abas, abas mais antigas podem não ser restauráveis via Cmd+Shift+T devido ao limite do histórico de sessão do Chrome (chrome.sessions.MAX_SESSION_RESULTS = 25)

【Privacidade】
Esta extensão não coleta nenhum dado. Todo o processamento é feito localmente em seu dispositivo.

【Suporte】
Se você encontrar algum problema ou tiver solicitações de recursos, por favor, reporte-os em nossa página do GitHub Issues.
https://github.com/archelon-inc/TabGroup-Trigger/issues

---
Nota: Esta descrição foi traduzida por Claude AI.
```
