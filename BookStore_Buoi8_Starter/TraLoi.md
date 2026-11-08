CÂU HỎI BỔ SUNG — BUỔI 8

Câu 1: Cờ ready trong useAutoPersist

Câu hỏi: Trong useAutoPersist, nếu bỏ điều kiện ready thì chuyện gì xảy ra với giỏ hàng đã lưu khi bạn mở lại app? Giải thích theo thứ tự các lần render.

Trả lời:

Lần render đầu tiên: Khi app vừa mở, Redux Store khởi tạo cart.items là mảng rỗng []. Trong khi đó, dữ liệu giỏ hàng cũ từ AsyncStorage vẫn đang được tải bất đồng bộ.

Nếu bỏ điều kiện ready: useEffect sẽ chạy ngay sau lần render đầu tiên và ghi mảng rỗng [] vào AsyncStorage, làm ghi đè dữ liệu giỏ hàng đã lưu trước đó.

Khi đọc dữ liệu hoàn tất: Giỏ hàng cũ có thể đã bị ghi đè nên người dùng không còn dữ liệu để khôi phục.

Vai trò của ready: Cờ này giúp đảm bảo dữ liệu chỉ được lưu sau khi quá trình đọc và khôi phục giỏ hàng (hydrateCart) hoàn tất.

Câu 2: Token giả và lưu trữ an toàn

Câu hỏi: Ở bài này app tự so mật khẩu và tự tạo token. Hãy nêu hai điểm không an toàn. Hệ thống thật thì ai kiểm tra mật khẩu, và token nên lưu ở đâu thay cho AsyncStorage?

Trả lời:

Hai điểm không an toàn:

Mật khẩu được lưu dưới dạng văn bản thông thường (Plain Text), không được băm (Hash), nên dễ bị lộ nếu dữ liệu bị truy cập trái phép.

Token được tạo trực tiếp từ phía client, không có chữ ký xác thực của server nên có thể bị giả mạo.

Trong hệ thống thực tế:

Kiểm tra mật khẩu: Được thực hiện ở phía Server. Server sử dụng các thuật toán như bcrypt hoặc Argon2 để kiểm tra mật khẩu với dữ liệu đã băm và cấp JWT hợp lệ.

Lưu trữ token: Nên sử dụng Expo SecureStore thay cho AsyncStorage vì SecureStore cung cấp cơ chế lưu trữ an toàn hơn thông qua Keychain trên iOS và Keystore trên Android.

Câu 3: Hai effect trong CartItemRow

Câu hỏi: Thử xóa effect đồng bộ setQty(item.quantity). Với thao tác nào thì số hiển thị trên nút bị lệch so với store?

Trả lời:

Khi xóa effect useEffect(() => { setQty(item.quantity); }, [item.quantity]), biến state qty sẽ không còn tự động cập nhật khi số lượng sản phẩm trong Redux Store thay đổi từ bên ngoài.

Một số thao tác có thể gây lệch số lượng hiển thị:

Khi khôi phục giỏ hàng từ AsyncStorage, số lượng trong Store được cập nhật nhưng state qty vẫn giữ giá trị cũ.

Khi người dùng vào trang chi tiết và thêm tiếp sản phẩm đã có trong giỏ hàng, số lượng trong Store tăng nhưng số hiển thị ở CartItemRow có thể chưa thay đổi.

Câu 4: Một nguồn state (Single Source of Truth)

Câu hỏi: Nếu HeartButton giữ trạng thái bằng useState riêng ở mỗi nơi, tim ở lưới và ở trang chi tiết sẽ khác nhau ra sao? Store giải quyết việc đó thế nào?

Trả lời:

Nếu sử dụng useState riêng: Mỗi HeartButton sẽ quản lý trạng thái yêu thích độc lập. Khi bấm tim ở trang chủ, nút tim ở trang chi tiết có thể vẫn hiển thị trạng thái chưa yêu thích, gây mất đồng bộ giao diện.

Giải pháp của Redux Store: Danh sách sách yêu thích (ids) được quản lý tập trung trong wishlistSlice. Các component sử dụng chung hook useWishlist() để đọc trạng thái và cập nhật thông qua action toggle(bookId). Nhờ đó, khi trạng thái yêu thích thay đổi, các component liên quan sẽ tự động cập nhật theo Store.

Câu 5: Code bổ sung — Ẩn/Hiện mật khẩu ở màn Đăng nhập

Đã cài đặt:

Thêm thuộc tính rightAccessory vào component FormField.tsx.

Khai báo state showPassword trong LoginScreen.tsx:

const [showPassword, setShowPassword] = useState(false);

Truyền thuộc tính secureTextEntry={!showPassword} cho ô Mật khẩu kèm nút bấm chuyển đổi icon:

<FormField
  label="Mật khẩu"
  value={password}
  onChangeText={setPassword}
  error={errors.password}
  secureTextEntry={!showPassword}
  rightAccessory={
    <Pressable
      onPress={() => setShowPassword((v) => !v)}
      hitSlop={8}
      accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
    >
      <Text style={{ fontSize: 18 }}>{showPassword ? "🙈" : "👁️"}</Text>
    </Pressable>
  }
/>

