
# 🚗 Car Finder App

A responsive and dynamic car listing web application built using **React.js**, **Tailwind CSS**, and **Axios**. This app allows users to **search, filter, sort**, and **wishlist** cars fetched from an external mock API. It also supports **dark mode** with theme persistence and responsive UI.

---

## 📸 Preview

![Car Finder App Preview](https://dummyimage.com/800x400/ccc/000&text=Preview+Screenshot)

---

## 🧰 Tech Stack

- ⚛️ React.js
- 🎨 Tailwind CSS
- 🌗 Dark Mode (with `localStorage` persistence)
- 🔁 Axios for API calls
- ❤️ Local Storage for Wishlist

---

## ✨ Features

- 🔍 Search by car name or brand
- 🛠 Filter by:
  - Brand
  - Fuel type (Gasoline/Diesel/Electric)
  - Estimated seats
  - Price range
- ⬇️ Sort by price (low to high, high to low)
- 🤍 Add/Remove cars to Wishlist
- 🌓 Toggle between Light and Dark themes
- 📱 Fully responsive for all screen sizes
- 🚫 Graceful UI messages when no results or wishlist is empty
- 🖼️ Image fallback if car image is unavailable

---

## 🔗 API Used

Data fetched from:  
`https://freetestapi.com/api/v1/cars`  
(Accessed through a proxy to handle CORS)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/car-finder-app.git
cd car-finder-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create or update `vite.config.js` for proxy (optional)

```js
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://freetestapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};
```

### 4. Run the app

```bash
npm run dev
```

---

## 🧪 Project Structure

```
src/
│
├── App.jsx            # Main component
├── index.css          # Tailwind base styles
├── main.jsx           # Entry point
└── assets/            # Static assets
```

---

## 🧱 Customization

Want to tweak the filters? Add more car details?  
You can easily extend the card component with more fields from the API, or add pagination control, detail pages, or modals.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙏 Credits

- API by [freetestapi.com](https://freetestapi.com/)
- UI powered by [Tailwind CSS](https://tailwindcss.com/)
- React logo © Meta

---
