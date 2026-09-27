// GIỜ 5 — Bài tập 2 (1 dòng trong màn Giỏ hàng)
// Kỹ thuật: row với 3 vùng tỉ lệ khác nhau — ảnh cố định, tên flex:1 (co giãn),
// số lượng+giá width cố định. Khác BookRowCard (Giờ 1): ở đây giá KHÔNG neo đáy
// cột, mà nằm ngang hàng với tên, bên phải cùng.
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { CartItem } from "../data";

export function CartLineItem({ item }: { item: CartItem }) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: item.book.cover }} style={styles.thumb} />

      {/* flex:1 -> chiếm hết phần rộng còn lại sau ảnh, đẩy khối số lượng/giá
          sang tận bên phải dù tên sách ngắn hay dài. */}
      <Text style={styles.title} numberOfLines={1}>
        {item.book.title}
      </Text>

      <View style={styles.meta}>
        <Text style={styles.qty}>x{item.quantity}</Text>
        <Text style={styles.price}>{(item.book.price * item.quantity).toLocaleString()} đ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,

    // 👇 làm card nhẹ
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,

    // 👇 shadow nhẹ (web + mobile)
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  thumb: {
    width: 50,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#EEF2F7",
  },

  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  meta: {
    width: 100, // rộng hơn chút cho thoáng
    alignItems: "flex-end",
    justifyContent: "center",
  },

  qty: {
    fontSize: 12,
    color: "#6B7280",
  },

  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563EB", // xanh cho nổi
    marginTop: 2,
  },
});
