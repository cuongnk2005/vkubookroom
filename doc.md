# BÁO CÁO KỸ THUẬT MINI-PROJECT (MINI-PROJECT SHORT TECHNICAL REPORT)
**Học phần:** Phát triển ứng dụng di động đa nền tảng (Cross-Platform Mobile App Development - VKU)  
**Tên Mini-Project:** Mini-Project 3 — Ứng dụng Đặt phòng học & Phòng Lab (Study Room Booking App)  
**Họ và tên sinh viên:** Ngô Khắc Cường  
**Ngày nộp báo cáo:** 26/09/2026  

---

## 1. THÔNG TIN CHUNG & ĐƯỜNG DẪN SẢN PHẨM (GENERAL INFORMATION & DELIVERABLE LINKS)
* **Thành viên thực hiện:**
  1. Ngô Khắc Cường — Mã sinh viên: [23IT032]
* **🔗 Đường dẫn Live Demo:** [https://vkubookroom.vercel.app](https://vkubookroom.vercel.app)
* **💻 Kho lưu trữ GitHub:** [https://github.com/cuongnk2005/vkubookroom](https://github.com/cuongnk2005/vkubookroom)
* **🎥 Video Demo (Tuỳ chọn):** [https://youtu.be/xxx]

---

## 2. BẢNG KIỂM TRA HIỆN THỰC TÍNH NĂNG (FEATURE IMPLEMENTATION CHECKLIST)

| # | Tính năng yêu cầu | Trạng thái | Chi tiết hiện thực kỹ thuật & Mức độ đáp ứng |
|:---:|---|:---:|---|
| 1 | **Duyệt danh sách & Tìm kiếm thời gian thực (Room Search)** | ✅ Hoàn thành | Tìm kiếm tức thì theo từng ký tự (real-time filtering sau mỗi lần gõ phím), không phân biệt hoa thường, áp dụng trên 20 phòng học & phòng lab chuẩn hóa của trường đại học. |
| 2 | **Lọc phòng đa tiêu chí (Multi-Parameter Filter)** | ✅ Hoàn thành | Bố trí 2 hàng chip lọc cuộn ngang: theo 5 toà nhà (*Tòa A3, Tòa B1, Thư viện trung tâm, Trung tâm đổi mới sáng tạo, Nhà văn hóa sinh viên*) và theo 4 khoảng sức chứa (*1–10, 10–20, 20–35, 35+ chỗ*). Kết hợp đồng thời toán tử `AND` và có nút bấm 1 chạm xoá nhanh bộ lọc. |
| 3 | **Thanh chọn ngày trực quan (Interactive 14-Day Date Strip)** | ✅ Hoàn thành | Cho phép người dùng chọn đặt lịch trước trong vòng 14 ngày tới dạng cuộn ngang (*Hôm nay, Thứ, Ngày, Tháng*), có hiệu ứng active màu Indigo nổi bật và tự động kiểm tra lại trạng thái khung giờ theo ngày đó. |
| 4 | **Chọn khung giờ & Ngăn chặn trùng lịch (Conflict Prevention)** | ✅ Hoàn thành | Hỗ trợ 4 khung giờ: 08:00–10:00, 10:00–12:00, 13:00–15:00, 15:00–17:00. Kiểm tra tính duy nhất theo bộ 3 `(Mã phòng, Ngày, Khung giờ)`. Khung giờ đã có người đặt sẽ hiển thị "Reserved", gạch ngang chữ và vô hiệu hóa nút bấm để triệt tiêu xung đột lịch. |
| 5 | **Quản lý trạng thái & Lưu trữ cục bộ (Local Persistence)** | ✅ Hoàn thành | Sử dụng Zustand kết hợp middleware `persist` và `@react-native-async-storage/async-storage`. Tất cả các lượt đặt phòng được lưu trữ bền vững trên bộ nhớ máy, không bị mất khi thoát hay tải lại ứng dụng. |
| 6 | **Tầng dữ liệu bất đồng bộ (TanStack React Query)** | ✅ Hoàn thành | Tích hợp `@tanstack/react-query` với dịch vụ API mô phỏng (`fetchRooms`). Hiển thị vòng xoay đang tải (Loading), màn hình báo lỗi kèm nút "Thử lại" (Retry), và hỗ trợ tính năng vuốt xuống để làm mới (Pull-to-refresh). |
| 7 | **Lịch sử đặt phòng & Xem lại chi tiết (My Bookings)** | ✅ Hoàn thành | Hiển thị danh sách vé đặt phòng trực quan dạng Ticket card. Người dùng có thể nhấn vào bất kỳ thẻ nào để mở lại trang Chi tiết phòng (`/room/[id]`). Có nút huỷ đặt phòng tách biệt kèm hộp thoại xác nhận bảo vệ (`Alert.alert`). |
| 8 | **Giao diện tương thích & Vùng đệm an toàn (Responsive & Safe Area)** | ✅ Hoàn thành | Hook `useResponsiveLayout` tự động điều chỉnh số cột (1 cột trên điện thoại, đa cột trên máy tính bảng). Tích hợp `useSafeAreaInsets` tính toán đệm đáy thông minh, giải quyết triệt để lỗi bị thanh cử chỉ Android (Gesture Bar) che khuất nội dung. |
| 9 | **Giao diện cao cấp & Hiệu ứng chuyển động (Polished UI & Animations)** | ✅ Hoàn thành | Áp dụng thư viện `react-native-reanimated` (hiệu ứng xuất hiện so le `FadeInDown`, hiệu ứng lò xo khi chạm `withSpring`), icon đồ hoạ vector `lucide-react-native`, dải màu `expo-linear-gradient`, và tông màu Indigo (`#4F46E5`) hiện đại. |

---

## 3. KIẾN TRÚC KỸ THUẬT & CẤU TRÚC DỰ ÁN (TECHNICAL ARCHITECTURE & PROJECT STRUCTURE)

### 3.1 Cấu trúc thư mục dự án
Ứng dụng được tổ chức chặt chẽ theo mô hình định tuyến tập tin của **Expo Router**:
```text
vkubookroom/
├── assets/                     # Biểu tượng ứng dụng, ảnh splash và tài nguyên tĩnh
├── src/
│   ├── app/                    # Hệ thống định tuyến màn hình (Expo Router)
│   │   ├── (tabs)/             # Nhóm màn hình thanh điều hướng Tab dưới đáy
│   │   │   ├── _layout.tsx     # Cấu hình Tab Bar, tích hợp Safe Area Insets đáy
│   │   │   ├── index.tsx       # Màn hình Browse Rooms (Tìm kiếm, Bộ lọc kép)
│   │   │   ├── bookings.tsx    # Màn hình My Bookings (Xem vé, Xem chi tiết, Huỷ phòng)
│   │   │   └── profile.tsx     # Màn hình Hồ sơ sinh viên, Thống kê giờ học & Quy chế
│   │   ├── room/
│   │   │   └── [id].tsx        # Màn hình Chi tiết phòng (Ảnh HD, Tiện nghi, Chọn ngày, Đặt giờ)
│   │   ├── _layout.tsx         # Layout gốc (QueryClientProvider & SafeAreaProvider)
│   │   └── booking-confirmation.tsx # Màn hình Modal hoá đơn xác nhận đặt phòng thành công
│   ├── components/             # Các thành phần giao diện tái sử dụng
│   │   ├── RoomCard.tsx        # Thẻ phòng hiển thị trạng thái, tiện ích, ảnh & hiệu ứng lò xo
│   │   └── SearchBar.tsx       # Thanh tìm kiếm thời gian thực kèm nút xoá nhanh (X)
│   ├── data/
│   │   └── mockRooms.ts        # Bộ dữ liệu 20 phòng học & phòng lab chuẩn hóa kèm ảnh Unsplash
│   ├── hooks/
│   │   └── useResponsiveLayout.ts # Hook tự động tính toán độ rộng và số cột thích ứng
│   ├── services/
│   │   └── roomService.ts      # Dịch vụ fetch dữ liệu phòng học bất đồng bộ
│   └── store/
│       └── useBookingStore.ts  # Zustand store quản lý đặt phòng, chống trùng lịch & AsyncStorage
├── app.json                    # Cấu hình dự án Expo
├── package.json                # Danh sách thư viện phụ thuộc và mã lệnh npm
├── tsconfig.json               # Cấu hình TypeScript (chế độ kiểm tra kiểu nghiêm ngặt)
└── README.md                   # Báo cáo kỹ thuật dự án
```

### 3.2 Luồng quản lý trạng thái (State Management Flow)
1. **Server State (TanStack Query):** Quản lý qua `useQuery({ queryKey: ['rooms'], queryFn: fetchRooms })`. Đảm bảo dữ liệu phòng được lưu đệm (cache), xử lý trạng thái đang tải (Loading), báo lỗi kết nối và đồng bộ lại khi người dùng vuốt xuống làm mới màn hình.
2. **Client State (Zustand + AsyncStorage):** Quản lý qua `useBookingStore`. Lưu trữ danh sách đơn đặt phòng hiện tại. Cung cấp các hành động `addBooking()` (thêm đặt phòng), `removeBooking()` (huỷ phòng) và hàm kiểm tra trùng lặp thời gian thực `isSlotBooked(roomId, date, timeSlot)`.
3. **Navigation State (Expo Router):** Định tuyến dựa trên tập tin chuẩn mực, truyền tham số an toàn giữa các màn hình bằng `useLocalSearchParams` (ví dụ: chuyển từ thẻ đặt phòng sang `/room/[id]`).

### 3.3 Chiến lược xử lý lỗi & Ngoại lệ (Exception Handling)
- **Triệt tiêu đặt lịch trùng:** Nút chọn khung giờ tự động chuyển trạng thái `disabled` và gạch ngang chữ nếu `isSlotBooked()` trả về `true` cho ngày và phòng đang chọn.
- **Bảo vệ thao tác huỷ:** Khi bấm huỷ đặt phòng, ứng dụng kích hoạt hộp thoại hệ thống `Alert.alert` yêu cầu người dùng xác nhận, tránh trường hợp vô tình chạm nhầm xoá mất dữ liệu.
- **Dự phòng lỗi mạng:** Trường hợp không tải được danh sách phòng, hệ thống hiển thị màn hình thông báo lỗi trực quan kèm nút bấm "Thử lại" (Retry).
- **Màn hình rỗng thân thiện (Empty States):** Khi tìm kiếm không có kết quả hoặc người dùng chưa có đơn đặt phòng nào, ứng dụng luôn hiển thị hình minh hoạ trực quan kèm nút bấm điều hướng nhanh *"Reset All Filters"* hoặc *"Explore Available Rooms"*.

---

## 4. HÌNH ẢNH MINH CHỨNG THỰC NGHIỆM (EMPIRICAL EVIDENCE & SCREENSHOTS)

| 1. Tìm kiếm & Lọc đa tiêu chí | 2. Chi tiết phòng & Chọn ngày | 3. Quản lý Đặt phòng (My Bookings) | 4. Hồ sơ Sinh viên (Profile) |
|:---:|:---:|:---:|:---:|
| ![Màn hình Tìm kiếm](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80) | ![Chi tiết phòng](https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80) | ![Lịch sử đặt phòng](https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80) | ![Hồ sơ sinh viên](https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80) |
| *Tìm kiếm thời gian thực, lọc theo toà nhà và sức chứa* | *Thanh chọn ngày 14 ngày tới & kiểm tra khung giờ trống* | *Thẻ vé đặt phòng, click xem lại phòng & nút huỷ an toàn* | *Thống kê số giờ học, đơn đặt hoạt động & quy chế mượn phòng* |

*(Lưu ý: Bạn có thể thay thế các đường link ảnh minh hoạ phía trên bằng ảnh chụp màn hình trực tiếp từ máy điện thoại thật hoặc máy ảo Android của bạn).*

---

## 5. THỬ THÁCH KỸ THUẬT & GIẢI PHÁP KHẮC PHỤC (TECHNICAL CHALLENGES & RESOLUTIONS)

### Thử thách 1: Thanh cử chỉ hệ thống Android (Gesture Bar) che khuất Tab Bar
* **Vấn đề gặp phải:** Trên các dòng điện thoại Android đời mới bật chế độ điều hướng cử chỉ toàn màn hình (như Xiaomi HyperOS/MIUI, Samsung OneUI, Google Pixel), thanh gạch ngang màu đen ở đáy màn hình đè lên chữ và icon của thanh điều hướng (*Browse, My Bookings, Profile*).
* **Nguyên nhân gốc rễ:** Chiều cao thanh Tab Bar trước đây bị gán cứng cố định (`height: 64`) với khoảng đệm tĩnh, không tự co giãn theo vùng đệm cửa sổ an toàn (Window Insets) của hệ điều hành.
* **Giải pháp khắc phục:** 
  Tích hợp hook `useSafeAreaInsets` từ thư viện `react-native-safe-area-context` vào `src/app/(tabs)/_layout.tsx`, tính toán khoảng đệm an toàn động cho Android:
  ```typescript
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 24 : 8);
  const tabHeight = 62 + bottomInset;
  ```
  Nhờ đó, toàn bộ icon và nhãn văn bản được nâng cao cách biệt hoàn toàn khỏi thanh cử chỉ của Android, đồng thời phần nền trắng vẫn tràn đều xuống sát cạnh đáy máy.

### Thử thách 2: Ngăn ngừa xung đột đặt phòng theo ngày linh hoạt (Cross-Date Conflict Prevention)
* **Vấn đề gặp phải:** Ban đầu, hệ thống chỉ hỗ trợ đặt phòng trong ngày hiện tại (`today`). Khi mở rộng cho phép sinh viên đặt trước phòng cho các ngày trong tuần tiếp theo, nếu chỉ kiểm tra theo mã phòng và khung giờ thì việc đặt phòng ở ngày hôm nay sẽ vô tình khoá luôn cả các ngày khác trong tương lai.
* **Nguyên nhân gốc rễ:** Trạng thái kiểm tra xung đột thiếu trường ngày (`date`) cấu thành chỉ mục ghép 3 thành phần `(Mã phòng + Ngày + Khung giờ)`.
* **Giải pháp khắc phục:** 
  1. Nâng cấp logic `isSlotBooked` trong Zustand Store kiểm tra tính hợp lệ trên cả 3 trường dữ liệu: `(b.roomId === roomId && b.date === date && b.timeSlot === timeSlot)`.
  2. Xây dựng thanh chọn ngày cuộn ngang 14 ngày tới tại màn hình `src/app/room/[id].tsx`. Khi sinh viên chuyển đổi sang ngày khác, giao diện lập tức phản hồi và cập nhật lại trạng thái trống/đã đặt của từng khung giờ trong tích tắc.
