const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Cho phép gọi từ FE
app.use(express.json()); // Để parse JSON body

// In-memory data: thay bằng DB (MySQL/Mongo...) trong thực tế
let tenants = {
  "localhost:3001": {
    theme: {
      brandName: "Tenant 1",
      layoutType: "layoutA",
      themeID: "themeA",
    },
    promotions: [
      { title: "Buy 1 Get 1 Free", desc: "Áp dụng tuần này" },
      { title: "Giảm 20%", desc: "Cho khách hàng mới" },
    ],
  },
  "localhost:3002": {
    theme: {
      brandName: "Tenant 2",
      layoutType: "layoutB",
      themeID: "themeB",
    },
    promotions: [
      { title: "Sale 30%", desc: "Chỉ trong 2 ngày" },
      { title: "Free Shipping", desc: "Cho đơn trên 500k" },
    ],
  },
  default: {
    theme: {
      brandName: "Default Tenant",
      layoutType: "none",
    },
    promotions: [],
  },
};

// Lấy config cho 1 tenant (domain)
app.get("/api/tenants/:domain", (req, res) => {
  const domain = req.params.domain;
  const tenantConfig = tenants[domain] || tenants["default"];
  return res.json(tenantConfig);
});

// Cập nhật config cho 1 tenant (VD: PUT /api/tenants/tenant1.mydomain.com)
app.put("/api/tenants/:domain", (req, res) => {
  const domain = req.params.domain;
  const data = req.body; // { theme: {...}, promotions: [...] }

  // Cập nhật (trong thực tế, bạn sẽ update DB)
  tenants[domain] = data;
  return res.json({ message: "Updated successfully", tenant: tenants[domain] });
});

// Tạo mới tenant
app.post("/api/tenants", (req, res) => {
  // Giả sử req.body = { domain: "tenant3.mydomain.com", theme: {...}, promotions: [...] }
  const { domain, theme, promotions } = req.body;
  if (!domain) {
    return res.status(400).json({ error: "Missing domain" });
  }
  if (tenants[domain]) {
    return res
      .status(400)
      .json({ error: "Tenant with this domain already exists" });
  }

  tenants[domain] = { theme, promotions };
  return res.json({ message: "Tenant created", tenant: tenants[domain] });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Backend listening on port", PORT);
});
