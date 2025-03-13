// components/PromotionItem.js
export default function PromotionItem({ promotion }) {
    return (
      <div className="promotion">
        <h3>{promotion.title}</h3>
        <p>{promotion.desc}</p>
      </div>
    );
  }