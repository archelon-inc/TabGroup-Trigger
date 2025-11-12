# Mô tả Chrome Web Store (Tiếng Việt)

## Mô tả ngắn (132 ký tự tối đa)

```
Chuyển đổi nhóm tab Chrome qua lời gọi URL. Kết hợp với tiện ích phím tắt để chuyển đổi tức thì bằng phím nóng.
```

Số ký tự: 118 ký tự

## Mô tả chi tiết

```
Một tiện ích mở rộng Chrome cho phép chuyển đổi nhóm tab dựa trên phím tắt bằng cách sử dụng lời gọi URL. Kết hợp tiện ích mở rộng này với các công cụ phím tắt để chuyển đổi tức thì giữa các nhóm tab Chrome bằng các phím nóng yêu thích của bạn.

【Tại sao cần tiện ích mở rộng này?】
Chrome không cung cấp phím tắt gốc để chuyển đổi giữa các nhóm tab. Tiện ích mở rộng này giải quyết vấn đề đó bằng cách cho phép bạn kích hoạt chuyển đổi nhóm tab thông qua URL, sau đó có thể được ánh xạ tới phím tắt bằng các tiện ích bên ngoài. Ví dụ, nhấn Cmd+1 để chuyển đến nhóm "Công việc", Cmd+2 cho "Cá nhân", v.v.

【Tính năng chính】
✓ Tích hợp phím tắt
  Hoạt động liền mạch với các tiện ích phím tắt để cung cấp chuyển đổi nhóm tab dựa trên phím nóng

✓ Kích hoạt dựa trên URL
  Điều hướng đến https://extension.tabgroup-trigger/{tên-nhóm} để chuyển đổi tức thì sang nhóm tab được chỉ định

✓ Cửa sổ bật lên danh sách URL
  Nhấp vào biểu tượng tiện ích mở rộng để xem tất cả các nhóm tab với URL đã mã hóa, dễ dàng sao chép chỉ với một cú nhấp chuột

【Cách sử dụng】
1. Tạo nhóm tab trong Chrome và đặt tên cho chúng
2. Nhấp vào biểu tượng tiện ích mở rộng để lấy URL cho mỗi nhóm:
   - URL đã mã hóa được hiển thị tự động
   - Nhấp vào nút "Sao chép URL" để sao chép vào clipboard
   - Nhấp vào vùng hiển thị URL để chọn văn bản để sao chép thủ công
3. Thiết lập hành động mở URL trong tiện ích phím tắt của bạn
   Ví dụ: Cmd+Shift+1 → https://extension.tabgroup-trigger/Work
4. Nhấn phím nóng đã cấu hình để chuyển đổi nhóm tab tức thì

【Ví dụ về tiện ích phím tắt】
• macOS: BetterTouchTool, Keyboard Maestro
• Windows: AutoHotkey, PowerToys (phiên bản 0.79 trở lên)

【Ví dụ thiết lập (BetterTouchTool)】
1. Tạo phím tắt mới (ví dụ: Cmd+Shift+1)
2. Đặt hành động thành "Open URL"
3. Nhập URL: https://extension.tabgroup-trigger/Work
4. Bây giờ nhấn Cmd+Shift+1 sẽ chuyển đổi tức thì sang nhóm tab "Work" của bạn

【Mẹo】
• Tiện ích mở rộng ghi nhớ tab nào đã hoạt động lần cuối trong mỗi nhóm
• Khi bạn chuyển đến một nhóm, nó sẽ kích hoạt tab mà bạn đã xem lần cuối
• Nếu không có lịch sử tab, nó sẽ kích hoạt tab đầu tiên trong nhóm

【Hạn chế】
• Không thể chuyển đổi sang nhóm tab đã lưu (tính năng "Lưu nhóm" của Chrome xóa tất cả các tab nhưng giữ lại nhãn nhóm)
  Lưu ý: Nhóm tab đã thu gọn (trong đó các tab bị ẩn nhưng không bị xóa) hoạt động bình thường
• Ký tự đặc biệt trong tên nhóm (?, /, #, %, v.v.) yêu cầu mã hóa URL
  Ví dụ: "Question?Answer" → https://extension.tabgroup-trigger/Question%3FAnswer
  Sử dụng giao diện bật lên của tiện ích mở rộng để tự động lấy URL đã mã hóa
• Nếu bạn thực hiện 25+ lần chuyển đổi nhóm tab liên tiếp, các tab cũ hơn có thể không khôi phục được qua Cmd+Shift+T do giới hạn lịch sử phiên của Chrome (chrome.sessions.MAX_SESSION_RESULTS = 25)

【Quyền riêng tư】
Tiện ích mở rộng này không thu thập bất kỳ dữ liệu nào. Tất cả xử lý được thực hiện cục bộ trên thiết bị của bạn.

【Hỗ trợ】
Nếu bạn gặp bất kỳ vấn đề nào hoặc có yêu cầu tính năng, vui lòng báo cáo trên trang GitHub Issues của chúng tôi.
https://github.com/archelon-inc/TabGroup-Trigger/issues

---
Lưu ý: Mô tả này được dịch bởi Claude AI.
```
