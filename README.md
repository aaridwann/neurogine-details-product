# Neurogine Details Product Module

A dedicated, isolated feature module responsible for rendering and managing the **Product Details Screen** within the Neurogine mobile ecosystem. Engineered under micro-module principles, this repository handles comprehensive product information rendering, gallery/media presentation, dynamic attribute specifications, and seamless navigation triggers.

---

## 🏛️ Module Responsibility

As part of the **Neurogine Micro-Module Architecture**, this repository acts as an independent feature library:

* **Primary Screen:** Serves the Product Details view (Secondary Screen triggered from the Catalog list).
* **Data Presentation:** Fetches and displays granular product specifications, pricing, inventory status, and media elements.
* **Isolated Scope:** Encapsulates its own screen views, localized state, API interactions, and component-level types without coupling business logic to the host application.

---

## 🛠️ Tech Stack & Standards

| Category | Technologies |
| :--- | :--- |
| **Framework & Language** | React Native, TypeScript |
| **Package Manager** | Yarn |
| **Styling & Design System** | Styled Components (`styled-components/native`) |

---

## 📁 Directory Structure

```text
neurogine-details-product/
├── src/
│   ├── Screens/       # Product details screen views and layout containers
│   ├── Shared/        # Local reusable components dedicated to details UI
│   ├── Types/         # Module-specific TypeScript interfaces and types
│   ├── API/           # Axios / Query fetchers for detailed product endpoints
│   ├── Services/      # Business logic and payload mapping operations
│   ├── Utils/         # Detail helpers, price formatters, and spec parsers
│   ├── Constants/     # Action types, route parameters, and view constants
├── package.json
└── tsconfig.json