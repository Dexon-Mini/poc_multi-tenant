// app/page.js
import { headers } from "next/headers";
import PromotionList from "./components/PromotionList";
import LayoutA from "./components/LayoutA";
import LayoutB from "./components/LayoutB";
import NoLayout from "./components/NoLayout";

export default async function HomePage() {
  const h = await headers();
  const host = h.get("host") || "default";

  const res = await fetch(`http://localhost:4000/api/tenants/${host}`, {
    cache: "no-store",
  });
  const tenantData = await res.json();
  const { theme, promotions } = tenantData;

  // Chọn layout dựa trên layoutType
  let ChosenLayout;
  switch (theme?.layoutType) {
    case "layoutA":
      ChosenLayout = LayoutA;
      break;
    case "layoutB":
      ChosenLayout = LayoutB;
      break;
    case "none":
    default:
      ChosenLayout = NoLayout;
      break;
  }

  // Nếu theme.themeID không tồn tại hoặc rỗng, containerClass sẽ là chuỗi rỗng,
  // do đó không gán lớp nào, và CSS sẽ dùng giá trị mặc định từ :root.
  const containerClass = theme.themeID ? theme.themeID : "";

  return (
    <div className={containerClass}>
      <ChosenLayout>
        <h1>{theme.brandName || "Tenant (No Layout)"}</h1>
        <PromotionList promotions={promotions} />
      </ChosenLayout>
    </div>
  );
}