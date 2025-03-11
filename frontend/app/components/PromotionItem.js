// components/PromotionItem.js (ví dụ)
export default function PromotionItem({ promotion, theme }) {
  // Lấy các thuộc tính từ theme
  const {
    promotionBgColor = "#EEE",
    promotionTitleColor = "#000",
    promotionTextColor = "#666",
  } = theme || {};

  return (
    <div
      style={{
        margin: "1rem 0",
        padding: "1rem",
        backgroundColor: promotionBgColor,
      }}
    >
      <h3 style={{ color: promotionTitleColor, marginBottom: "0.5rem" }}>
        {promotion.title}
      </h3>
      <p style={{ color: promotionTextColor }}>{promotion.desc}</p>
    </div>
  );
}
