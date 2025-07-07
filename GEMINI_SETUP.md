# Hướng Dẫn Cấu Hình Gemini AI Chatbot

## 1. Lấy API Key Gemini

### Bước 1: Truy cập Google AI Studio
1. Mở trình duyệt và truy cập: https://makersuite.google.com/app/apikey
2. Đăng nhập bằng tài khoản Google của bạn

### Bước 2: Tạo API Key
1. Nhấn nút "Create API Key"
2. Chọn "Create API Key in new project" hoặc chọn project có sẵn
3. Đặt tên cho API Key (ví dụ: "Charity Website Chatbot")
4. Nhấn "Create API Key"
5. **Sao chép API Key** - bạn sẽ cần dán vào code

## 2. Cấu Hình API Key

### Bước 1: Mở file script.js
Mở file `WEB MOI2/WEB MOI/script.js` trong editor

### Bước 2: Thay thế API Key
Tìm dòng này (khoảng dòng 2725):
```javascript
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
```

Thay thế `'YOUR_GEMINI_API_KEY'` bằng API Key thực tế của bạn:
```javascript
const GEMINI_API_KEY = 'AIzaSyC...'; // API Key thực tế của bạn
```

## 3. Tính Năng Chatbot

### Các tính năng có sẵn:
- ✅ Giao diện chat kiểu Messenger
- ✅ Hỗ trợ đa ngôn ngữ (Việt, Anh, Trung, Nhật, Hàn)
- ✅ Tích hợp Gemini AI thông minh
- ✅ Lưu lịch sử chat (10 tin nhắn gần nhất)
- ✅ Hiệu ứng typing indicator
- ✅ Xử lý lỗi kết nối
- ✅ Responsive design

### Cách sử dụng:
1. Nhấn nút 💬 ở góc phải dưới màn hình
2. Chatbot sẽ hiển thị tin nhắn chào mừng
3. Nhập câu hỏi và nhấn Enter hoặc nút "Gửi"
4. AI sẽ trả lời dựa trên ngữ cảnh của website từ thiện

## 4. Tùy Chỉnh Nâng Cao

### Thay đổi prompt cho AI:
Tìm hàm `sendToGemini` và thêm system prompt vào `requestBody`:

```javascript
const requestBody = {
  contents: [
    {
      role: 'user',
      parts: [{ text: `Bạn là AI Assistant của trang web từ thiện. Hãy trả lời bằng tiếng ${currentLang === 'vi' ? 'Việt' : 'English'}. ${userMessage}` }]
    }
  ],
  // ... rest of config
};
```

### Thay đổi cấu hình AI:
```javascript
generationConfig: {
  temperature: 0.7,    // Độ sáng tạo (0-1)
  topK: 40,           // Số lượng token xem xét
  topP: 0.95,         // Độ đa dạng
  maxOutputTokens: 1024, // Độ dài tối đa câu trả lời
}
```

## 5. Bảo Mật

### Lưu ý quan trọng:
- ⚠️ **KHÔNG** commit API Key lên Git
- ⚠️ **KHÔNG** chia sẻ API Key công khai
- ✅ Sử dụng environment variables trong production
- ✅ Giới hạn quota API để tránh chi phí cao

### Cách bảo vệ API Key:
```javascript
// Sử dụng environment variable
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'your-api-key';
```

## 6. Xử Lý Lỗi Thường Gặp

### Lỗi "API Key không hợp lệ":
- Kiểm tra lại API Key đã sao chép đúng chưa
- Đảm bảo API Key chưa bị xóa hoặc vô hiệu hóa

### Lỗi "Quota exceeded":
- Kiểm tra quota trong Google AI Studio
- Tăng quota hoặc chờ reset hàng tháng

### Lỗi "Network error":
- Kiểm tra kết nối internet
- Kiểm tra firewall/antivirus có chặn không

## 7. Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra Console trong Developer Tools
2. Xem log lỗi chi tiết
3. Đảm bảo đã cấu hình đúng theo hướng dẫn

---

**Lưu ý**: API Gemini có thể tính phí sau khi vượt quá quota miễn phí. Hãy theo dõi usage trong Google AI Studio. 