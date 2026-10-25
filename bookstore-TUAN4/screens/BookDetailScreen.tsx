// GIỜ 4 — Bài tập 2: Màn hình Chi tiết sách
// Cấu trúc 3 vùng giống Home: phần cố định trên (ảnh bìa) không bắt buộc ở đây vì
// ảnh nằm trong luồng cuộn cùng mô tả — CHỈ CÓ thanh "Thêm vào giỏ" dưới cùng là
// cố định thật sự, nằm ngoài ScrollView.
import React from "react";
import { View, ScrollView, Text, Image, Pressable, StyleSheet } from "react-native";
import { Book } from "../data";

export function BookDetailScreen({
  book,
  onBack,
  onAddToCart,
}: {
  book: Book;
  onBack: () => void;
  onAddToCart: () => void;
}) {
  return (
    <View style={styles.screen}>
      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← Quay lại</Text>
      </Pressable>

      {/* ScrollView flex:1 chứa TOÀN BỘ nội dung dài (ảnh + tên + mô tả) để phần
          mô tả dài không đẩy tràn thanh "Thêm vào giỏ" cố định phía dưới. */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Image
          source={{ uri: book.cover }}
          // alignSelf:'center' ghi đè alignItems của View cha (nếu cha không
          // center sẵn) để riêng ảnh này được căn giữa theo chiều ngang.
          style={styles.cover}
        />
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
        <Text style={styles.description}>{book.description}</Text>
      </ScrollView>

      {/* Thanh dưới cùng: row, 2 đầu cách xa nhau, KHÔNG nằm trong ScrollView
          -> luôn đứng yên một chỗ dù nội dung mô tả dài bao nhiêu. */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomPrice}>{book.price.toLocaleString()} đ</Text>
        <Pressable style={styles.addButton} onPress={onAddToCart}>
          <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9FAFB", // nhẹ hơn trắng tinh
  },

  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  backText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 14,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  cover: {
    alignSelf: "center",
    width: "70%",
    aspectRatio: 3 / 4,
    borderRadius: 14,
    backgroundColor: "#EEF2F7",

    // 👇 shadow nhẹ cho ảnh
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },

  author: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
  },

  price: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "800",
    color: "#DC2626", // đỏ cho nổi
  },

  description: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 22,
    color: "#374151",
  },

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20,
    paddingVertical: 14,

    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",

    // 👇 tạo cảm giác nổi
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 5,
  },

  bottomPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },

  addButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});