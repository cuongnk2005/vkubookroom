# 📚 VKU Study Room Booking App

Ứng dụng di động hỗ trợ sinh viên và giảng viên trường **Đại học CNTT & Truyền thông Việt - Hàn (VKU)** tìm kiếm, lọc và đặt lịch phòng học, phòng lab, phòng thảo luận nhóm một cách nhanh chóng, trực quan và không bị trùng lịch.

* **🌐 Live Web App:** [https://vkubookroom.vercel.app](https://vkubookroom.vercel.app)
* **💻 GitHub Repo:** [https://github.com/cuongnk2005/vkubookroom](https://github.com/cuongnk2005/vkubookroom)

---

## 🚀 Tính năng chính

* 🔍 **Tìm kiếm thời gian thực:** Lọc tức thì ngay khi gõ từ khóa tên phòng hoặc tòa nhà.
* 🏢 **Lọc đa tiêu chí:** Lọc đồng thời theo 5 tòa nhà (*A3, B1, Thư viện, Innovation Center, Student Union*) và theo 4 khoảng sức chứa (*1-10, 10-20, 20-35, 35+ chỗ*).
* 📅 **Chọn ngày linh hoạt:** Thanh cuộn chọn ngày trong vòng 14 ngày tới.
* ⏰ **Chống trùng lịch:** Tự động phát hiện và khóa các khung giờ đã có người đặt trên từng ngày cụ thể.
* 📱 **Quản lý đặt phòng:** Xem danh sách vé phòng đã đặt, bấm vào để xem lại chi tiết phòng và hỗ trợ hủy phòng an toàn.
* 💾 **Lưu trữ Offline:** Sử dụng Zustand + AsyncStorage, dữ liệu không bị mất khi đóng app.

---

## 🛠️ Công nghệ sử dụng

* **Framework:** React Native (Expo SDK 57, Expo Router)
* **Ngôn ngữ:** TypeScript (Strict Mode)
* **Quản lý State:** Zustand + AsyncStorage & TanStack React Query
* **UI & Hiệu ứng:** React Native Reanimated, Lucide Icons, Linear Gradient

---

## 💻 Hướng dẫn cài đặt & Khởi chạy

```bash
# 1. Clone dự án
git clone https://github.com/cuongnk2005/vkubookroom.git
cd vkubookroom

# 2. Cài đặt thư viện
npm install --legacy-peer-deps

# 3. Chạy ứng dụng
npx expo start -c
```

* **Điện thoại:** Quét mã QR hiển thị trên Terminal bằng app **Expo Go**.
* **Máy ảo Android:** Nhấn phím `a`.
* **Trình duyệt Web:** Nhấn phím `w` hoặc chạy `npm run build`.

---

## 📖 Hướng dẫn sử dụng

1. **Tìm & Lọc phòng:** Tìm theo tên hoặc chọn chip Tòa nhà / Sức chứa tại tab **Browse**.
2. **Đặt phòng:** Bấm vào phòng muốn đặt $\rightarrow$ Chọn ngày $\rightarrow$ Chọn khung giờ trống (màu xanh) $\rightarrow$ Bấm **Reserve Space**.
3. **Xem & Hủy lịch:** Chuyển sang tab **My Bookings** để xem lại thông tin phòng hoặc bấm icon thùng rác để hủy.

---

**Tác giả:** Ngô Khắc Cường — MSV: 23IT032 — VKU
