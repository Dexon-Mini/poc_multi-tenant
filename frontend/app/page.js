import { headers } from "next/headers";
import PromotionList from "./components/PromotionList";
import LayoutA from "./components/LayoutA";
import LayoutB from "./components/LayoutB";
import NoLayout from "./components/NoLayout";

export default async function HomePage() {
  // Thêm 'await' trước headers()
  const h = await headers();
  // Lấy host
  const host = h.get("host") || "default";

  // Gọi API Backend hoặc làm gì tuỳ ý
  const res = await fetch(`http://localhost:4000/api/tenants/${host}`, {
    cache: "no-store",
  });
  const tenantData = await res.json();
  const { theme, promotions } = tenantData;

  // 2) Dựa vào layoutType, chọn component layout
  // 2) Kiểm tra layoutType
  let ChosenLayout;
  switch (theme?.layoutType) {
    case "layoutA":
      ChosenLayout = LayoutA;
      break;
    case "layoutB":
      ChosenLayout = LayoutB;
      break;
    // Trường hợp "none" hoặc undefined → dùng NoLayout
    case "none":
    default:
      ChosenLayout = NoLayout;
      break;
  }

  const { brandName, primaryColor, backgroundColor } = theme || {};

  return (
    <ChosenLayout>
      <h1 style={{ color: theme.primaryColor }}>
        {theme.brandName || "Tenant (No Layout)"}
      </h1>
      <PromotionList promotions={promotions} theme={theme} />
    </ChosenLayout>
  );
}
