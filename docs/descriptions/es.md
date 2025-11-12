# Descripción de Chrome Web Store (Español)

## Descripción breve (132 caracteres máx.)

```
Cambia grupos de pestañas mediante URL. Usa atajos de teclado para cambio instantáneo con teclas rápidas.
```

Recuento de caracteres: 113 caracteres

## Descripción detallada

```
Una extensión de Chrome que permite cambiar grupos de pestañas mediante atajos de teclado usando invocación de URL. Combina esta extensión con utilidades de atajos de teclado para cambiar instantáneamente entre grupos de pestañas de Chrome usando tus teclas de acceso rápido favoritas.

【¿Por qué esta extensión?】
Chrome no proporciona atajos de teclado nativos para cambiar entre grupos de pestañas. Esta extensión resuelve ese problema permitiéndote activar cambios de grupos de pestañas mediante URLs, que luego pueden mapearse a atajos de teclado usando utilidades externas. Por ejemplo, presiona Cmd+1 para saltar a tu grupo "Trabajo", Cmd+2 para "Personal", y así sucesivamente.

【Características principales】
✓ Integración con atajos de teclado
  Funciona perfectamente con utilidades de atajos de teclado para proporcionar cambio de grupos de pestañas mediante teclas de acceso rápido

✓ Activación basada en URL
  Navega a https://extension.tabgroup-trigger/{nombre-grupo} para cambiar instantáneamente al grupo de pestañas especificado

✓ Ventana emergente con lista de URLs
  Haz clic en el icono de la extensión para ver todos los grupos de pestañas con sus URLs codificadas, fácilmente copiables con un clic

【Cómo usar】
1. Crea grupos de pestañas en Chrome y ponles nombres
2. Haz clic en el icono de la extensión para obtener las URLs de cada grupo:
   - Las URLs codificadas se muestran automáticamente
   - Haz clic en el botón "Copiar URL" para copiar al portapapeles
   - Haz clic en el área de visualización de URL para seleccionar el texto para copiado manual
3. Configura acciones de apertura de URL en tu utilidad de atajos de teclado
   Ejemplo: Cmd+Shift+1 → https://extension.tabgroup-trigger/Work
4. Presiona tu tecla de acceso rápido configurada para cambiar instantáneamente de grupo de pestañas

【Ejemplos de utilidades de atajos de teclado】
• macOS: BetterTouchTool, Keyboard Maestro
• Windows: AutoHotkey, PowerToys (versión 0.79 o posterior)

【Ejemplo de configuración (BetterTouchTool)】
1. Crea un nuevo atajo de teclado (ej.: Cmd+Shift+1)
2. Establece la acción como "Open URL"
3. Ingresa la URL: https://extension.tabgroup-trigger/Work
4. Ahora presionar Cmd+Shift+1 cambiará instantáneamente a tu grupo de pestañas "Work"

【Consejos】
• La extensión recuerda qué pestaña estuvo activa por última vez en cada grupo
• Cuando cambias a un grupo, activará la pestaña que estabas viendo por última vez
• Si no existe historial de pestañas, activa la primera pestaña del grupo

【Limitaciones】
• No puede cambiar a grupos de pestañas guardados (la función "Guardar grupo" de Chrome que elimina todas las pestañas pero mantiene la etiqueta del grupo)
  Nota: Los grupos de pestañas colapsados (donde las pestañas están ocultas pero no eliminadas) funcionan bien
• Los caracteres especiales en nombres de grupos (?, /, #, %, etc.) requieren codificación URL
  Ejemplo: "Question?Answer" → https://extension.tabgroup-trigger/Question%3FAnswer
  Usa la interfaz emergente de la extensión para obtener automáticamente URLs codificadas
• Si realizas 25+ cambios consecutivos de grupos de pestañas, las pestañas más antiguas pueden no ser restaurables mediante Cmd+Shift+T debido al límite del historial de sesión de Chrome (chrome.sessions.MAX_SESSION_RESULTS = 25)

【Privacidad】
Esta extensión no recopila ningún dato. Todo el procesamiento se realiza localmente en tu dispositivo.

【Soporte】
Si encuentras algún problema o tienes solicitudes de funciones, repórtalos en nuestra página de GitHub Issues.
https://github.com/archelon-inc/TabGroup-Trigger/issues

---
Nota: Esta descripción fue traducida por Claude AI.
```
