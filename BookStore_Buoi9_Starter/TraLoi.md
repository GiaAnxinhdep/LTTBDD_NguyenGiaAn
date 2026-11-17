# Trả lời câu hỏi bổ sung – Buổi 9 BookStore

## 1. Giá trị dẫn xuất

`errors` và `valid` được tính trực tiếp mỗi lần render vì chúng phụ thuộc vào các state đã có như `name`, `phone`, `address` và giỏ hàng, chứ không phải dữ liệu riêng biệt. Nếu dùng `useState` để lưu riêng thì mỗi khi thay đổi dữ liệu đầu vào phải cập nhật thêm state tương ứng. Nếu quên cập nhật ở một chỗ nào đó, trạng thái lỗi hoặc điều kiện hợp lệ có thể bị sai lệch so với dữ liệu thực tế. Vì vậy, tính trực tiếp giúp dữ liệu luôn đồng bộ.

## 2. Thứ tự gọi `clear()`

Nếu gọi `clear()` trước `await createOrder(...)`, giỏ hàng sẽ bị xoá ngay cả khi đơn hàng chưa được tạo thành công. Khi mất mạng, request bị lỗi và người dùng sẽ mất các sản phẩm đã chọn. Đặt `clear()` sau `createOrder(...)` sẽ hợp lý hơn vì chỉ xoá giỏ hàng khi server tạo đơn thành công; nếu có lỗi thì giỏ hàng vẫn được giữ nguyên.

## 3. PUT hay PATCH

Khi sử dụng `PUT /users/1` với dữ liệu `{ name, phone }`, toàn bộ thông tin của user sẽ bị thay thế bằng hai trường này. Những dữ liệu cũ như `email`, `password` và các trường khác sẽ bị mất, có thể gây lỗi khi đăng nhập. Trong khi đó, `PATCH` chỉ cập nhật những trường được gửi lên và giữ nguyên các thông tin còn lại. Vì vậy, bài này chọn `PATCH` để tránh làm mất dữ liệu không cần chỉnh sửa.

## 4. Cập nhật lạc quan

Nếu bỏ phần khôi phục `read: false` trong `catch`, khi mất mạng giao diện vẫn hiển thị thông báo đã đọc dù server chưa cập nhật thành công. Khi mở lại màn hình, trạng thái có thể trở về chưa đọc, gây nhầm lẫn cho người dùng. Một chức năng phù hợp để áp dụng cách này là thả tim hoặc thêm sản phẩm vào danh sách yêu thích vì thao tác đơn giản và có thể hoàn tác khi xảy ra lỗi. Ngược lại, thanh toán không nên dùng cách này vì cần xác nhận chính xác từ server, tránh trường hợp người dùng tưởng đã thanh toán thành công nhưng đơn hàng thực tế chưa được ghi nhận.

## 5. Code bổ sung – Bộ lọc trạng thái đơn hàng

Tạo thêm state `statusFilter` với giá trị mặc định là `"all"` để lưu trạng thái đang được chọn. Sử dụng `useMemo` để lọc danh sách đơn hàng theo trạng thái tương ứng. Sau đó, thay đổi thuộc tính `data` của `FlatList` từ danh sách `orders` ban đầu thành `visibleOrders`:

```tsx
const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

const visibleOrders = useMemo(
  () =>
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter),
  [orders, statusFilter]
);

<FlatList data={visibleOrders} ... />