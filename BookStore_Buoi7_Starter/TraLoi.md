# TRẢ LỜI CÂU HỎI BỔ SUNG – BUỔI 7

## Câu 1. Cấu trúc điều hướng

BookDetail được đặt trong Stack Navigator vì đây là màn hình hiển thị thông tin chi tiết của một cuốn sách, không phải màn hình chức năng chính. Khi mở BookDetail, màn hình này sẽ nằm phía trên các tab và ẩn thanh Tab Bar. Đồng thời, Stack Navigator hỗ trợ nút quay lại (←) để người dùng trở về màn hình trước đó.

Nếu đưa BookDetail vào Bottom Tab thì nó sẽ được xem như một tab độc lập, thanh điều hướng phía dưới vẫn xuất hiện và không có cơ chế quay lại tự động như Stack. Ngoài ra, người dùng có thể truy cập BookDetail mà không truyền `bookId`, dẫn đến việc không xác định được cuốn sách cần hiển thị.

## Câu 2. Redux

Đối tượng `state` trong reducer thực chất là một bản nháp được Immer cung cấp, chứ không phải state gốc của ứng dụng. Vì vậy, khi sử dụng `state.items.push(...)`, thao tác chỉ tác động lên bản nháp. Immer sẽ tự xử lý các thay đổi và tạo ra một state mới theo nguyên tắc bất biến, không làm thay đổi trực tiếp dữ liệu ban đầu.

Nếu loại bỏ `useMemo` khỏi `useCart`, ứng dụng vẫn cho kết quả tính toán chính xác vì các phép tính tổng số lượng và tổng tiền không thay đổi. Tuy nhiên, những phép tính này sẽ được thực hiện lại mỗi khi component render, ngay cả khi danh sách `items` vẫn giữ nguyên. Do đó, `useMemo` được sử dụng để hạn chế các lần tính toán không cần thiết, đặc biệt khi dữ liệu giỏ hàng có số lượng lớn.

## Câu 3. Promise.all

Trong trường hợp `getCategories()` xảy ra lỗi nhưng `getBooks()` vẫn lấy dữ liệu thành công, màn hình Home vẫn hiển thị `ErrorView` và không hiển thị danh sách sách. Nguyên nhân là `Promise.all` sẽ chuyển sang trạng thái reject nếu có ít nhất một Promise bị lỗi.

Một phương án khác là sử dụng `Promise.allSettled`. Khi đó, chương trình có thể kiểm tra kết quả riêng của từng API thông qua thuộc tính `status`. Nếu kết quả là `"fulfilled"` thì lấy dữ liệu thành công, còn nếu là `"rejected"` thì xử lý lỗi tương ứng.

Cách làm này giúp ứng dụng vẫn có thể hiển thị danh sách sách dù API danh mục gặp sự cố. Tuy nhiên, phần xử lý sẽ phức tạp hơn vì phải quản lý lỗi cho từng API và xác định cách hiển thị giao diện khi một phần dữ liệu không được tải, chẳng hạn vẫn hiển thị sách nhưng không có danh mục để lựa chọn.

## Câu 4. Debounce

Nếu gọi `setTimeout` trực tiếp bên trong `onChangeText`, mỗi lần người dùng nhập một ký tự sẽ tạo ra một bộ hẹn giờ mới. Do không có cơ chế hủy các bộ hẹn giờ trước đó nên nhiều lần lọc dữ liệu vẫn được thực hiện, chỉ khác là chúng đều bị trì hoãn 400 ms.

Việc sử dụng hàm cleanup `return () => clearTimeout(t)` giúp hủy bộ hẹn giờ cũ mỗi khi giá trị tìm kiếm thay đổi. Nhờ vậy, chỉ thao tác nhập cuối cùng mới được thực hiện sau khoảng thời gian chờ.

Ngoài ra, cleanup còn giúp ngăn các bộ hẹn giờ tiếp tục chạy khi component đã bị hủy, hạn chế những lần cập nhật state không cần thiết và tránh trường hợp kết quả từ lần tìm kiếm cũ ảnh hưởng đến kết quả mới.

## Câu 5. Code bổ sung: Sắp xếp sách theo giá

Để bổ sung chức năng sắp xếp sách theo giá, trước tiên cần tạo state `sort` nhằm lưu trạng thái sắp xếp hiện tại. Sau đó, cập nhật phần tính toán `visibleBooks` trong file `src/screens/HomeScreen.tsx` để kết hợp việc lọc và sắp xếp dữ liệu.

Khi sắp xếp, cần sử dụng `[...filtered]` để tạo một mảng mới trước khi gọi `sort()`, vì phương thức `sort()` sẽ thay đổi trực tiếp mảng ban đầu. Nếu sắp xếp trên mảng gốc có thể làm ảnh hưởng đến dữ liệu đang được sử dụng ở những vị trí khác.

Bên cạnh đó, bổ sung hai nút **Giá tăng dần** và **Giá giảm dần**. Khi người dùng nhấn lại nút đang được chọn, trạng thái sắp xếp sẽ trở về `null`, tức là tắt chế độ sắp xếp.

```tsx
const [sort, setSort] = useState<"asc" | "desc" | null>(null);

const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
  if (sort === null) return filtered;
  return [...filtered].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
}, [books, debouncedKeyword, categoryId, priceRange, sort]);
```

**Ảnh chụp màn hình kết quả:** Đính kèm ảnh giao diện sau khi hoàn thành chức năng sắp xếp.

## Thử thách BT7.C1. Vì sao thay đổi thư viện quản lý state mà không cần chỉnh sửa giao diện?

Nguyên nhân là các component giao diện không làm việc trực tiếp với Redux mà thông qua các custom hook. Ví dụ, trong `BookDetailScreen`, chương trình chỉ sử dụng `useWishlist()` để lấy các giá trị `isFavorite`, `toggle` và không cần import trực tiếp `useSelector`, `useDispatch` hay `wishlistSlice`.

Phần xử lý liên quan đến Redux được tập trung trong file `src/store/hooks.ts`. File này đóng vai trò trung gian giữa giao diện và thư viện quản lý state.

Vì vậy, nếu muốn chuyển từ Redux sang Zustand, chỉ cần thay đổi phần triển khai store và nội dung bên trong hook `useWishlist()`. Chỉ cần hook vẫn cung cấp đầy đủ các giá trị và chức năng như `ids`, `isFavorite`, `toggle` thì những component giao diện hiện tại không cần phải chỉnh sửa.