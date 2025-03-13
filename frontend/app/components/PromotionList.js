// components/PromotionList.js
import PromotionItem from "./PromotionItem";

export default function PromotionList({ promotions }) {
  if (!promotions || promotions.length === 0) {
    return <p>Không có khuyến mãi.</p>;
  }

  return (
    <div>
      {promotions.map((promo, idx) => (
        <PromotionItem key={idx} promotion={promo} />
      ))}
    </div>
  );
}