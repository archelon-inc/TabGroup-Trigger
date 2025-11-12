# Chrome Web Store Açıklaması (Türkçe)

## Kısa Açıklama (132 karakter maks.)

```
URL ile sekme gruplarını değiştirin. Anında geçiş için klavye kısayolları kullanın.
```

Karakter sayısı: 91 karakter

## Detaylı Açıklama

```
URL çağrısını kullanarak klavye kısayolu tabanlı sekme grubu değiştirmeyi etkinleştiren bir Chrome uzantısı. Bu uzantıyı klavye kısayolu araçlarıyla birleştirerek favori kısayol tuşlarınızı kullanarak Chrome sekme grupları arasında anında geçiş yapın.

【Neden Bu Uzantı?】
Chrome, sekme grupları arasında geçiş yapmak için yerel klavye kısayolları sağlamaz. Bu uzantı, URL'ler aracılığıyla sekme grubu değişikliklerini tetiklemenize izin vererek bu sorunu çözer ve bu URL'ler daha sonra harici araçlar kullanılarak klavye kısayollarına eşlenebilir. Örneğin, "İş" grubunuza atlamak için Cmd+1'e, "Kişisel" için Cmd+2'ye basın ve böyle devam edin.

【Ana Özellikler】
✓ Klavye Kısayolu Entegrasyonu
  Kısayol tuşu tabanlı sekme grubu değiştirme sağlamak için klavye kısayolu araçlarıyla sorunsuz çalışır

✓ URL Tabanlı Tetikleme
  Belirtilen sekme grubuna anında geçmek için https://extension.tabgroup-trigger/{grup-adı} adresine gidin

✓ URL Listesi Açılır Penceresi
  Uzantı simgesine tıklayarak tüm sekme gruplarını URL kodlu URL'leriyle birlikte görüntüleyin, tek tıklamayla kolayca kopyalanabilir

【Nasıl Kullanılır】
1. Chrome'da sekme grupları oluşturun ve onlara isimler verin
2. Her grup için URL'leri almak için uzantı simgesine tıklayın:
   - URL kodlu URL'ler otomatik olarak görüntülenir
   - Panoya kopyalamak için "URL'yi Kopyala" düğmesine tıklayın
   - Manuel kopyalama için metni seçmek üzere URL görüntü alanına tıklayın
3. Klavye kısayolu aracınızda URL açma eylemleri ayarlayın
   Örnek: Cmd+Shift+1 → https://extension.tabgroup-trigger/Work
4. Sekme gruplarını anında değiştirmek için yapılandırılmış kısayol tuşunuza basın

【Klavye Kısayolu Aracı Örnekleri】
• macOS: BetterTouchTool, Keyboard Maestro
• Windows: AutoHotkey, PowerToys (sürüm 0.79 veya üzeri)

【Kurulum Örneği (BetterTouchTool)】
1. Yeni bir klavye kısayolu oluşturun (örn.: Cmd+Shift+1)
2. Eylemi "Open URL" olarak ayarlayın
3. URL'yi girin: https://extension.tabgroup-trigger/Work
4. Şimdi Cmd+Shift+1'e basmak "Work" sekme grubunuza anında geçiş yapacaktır

【İpuçları】
• Uzantı, her grupta hangi sekmenin en son aktif olduğunu hatırlar
• Bir gruba geçiş yaptığınızda, en son görüntülediğiniz sekmeyi etkinleştirir
• Sekme geçmişi yoksa, gruptaki ilk sekmeyi etkinleştirir

【Sınırlamalar】
• Kaydedilmiş sekme gruplarına geçiş yapılamaz (Chrome'un tüm sekmeleri kaldıran ancak grup etiketini koruyan "Grubu kaydet" özelliği)
  Not: Daraltılmış sekme grupları (sekmelerin gizlendiği ancak kaldırılmadığı) düzgün çalışır
• Grup adlarındaki özel karakterler (?, /, #, %, vb.) URL kodlaması gerektirir
  Örnek: "Question?Answer" → https://extension.tabgroup-trigger/Question%3FAnswer
  Otomatik olarak URL kodlu URL'ler almak için uzantının açılır pencere arayüzünü kullanın
• 25+ ardışık sekme grubu değişikliği gerçekleştirirseniz, Chrome'un oturum geçmişi sınırı (chrome.sessions.MAX_SESSION_RESULTS = 25) nedeniyle eski sekmeler Cmd+Shift+T ile geri yüklenemeyebilir

【Gizlilik】
Bu uzantı herhangi bir veri toplamaz. Tüm işlemler cihazınızda yerel olarak yapılır.

【Destek】
Herhangi bir sorunla karşılaşırsanız veya özellik talepleriniz varsa, lütfen bunları GitHub Issues sayfamızda bildirin.
https://github.com/archelon-inc/TabGroup-Trigger/issues

---
Not: Bu açıklama Claude AI tarafından çevrilmiştir.
```
