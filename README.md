# D&D Wrapper

**D&D Wrapper** is a dynamic drag-and-drop application built with React + TypeScript + Vite.  
It allows users to create and manage a hierarchical structure of **Sections**, **Subsections**, and **Fields**, with real-time JSON visualization.

---

## ✨ Features

- 📦 **Add / Remove / Reorder Sections**
- 🗂️ **Add Fields and Subsections inside Sections**
- 🧩 **Add Fields under Subsections** (both by button and drag-and-drop)
- 🖱️ **Drag-and-Drop interface** for smooth reordering
- 📜 **Live JSON Viewer** of the entire structure
- 🔥 **Fast Refresh** with Vite
- 🛠️ **Built with React + TypeScript + Vite**

---

## 🚀 Usage

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dd-wrapper.git
cd dd-wrapper
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Start adding, reordering, and dragging Sections, Subsections, and Fields.
- Watch the live JSON update on the side!

---

## 🛠️ Technical Details

- **Framework**: React (with Vite + TypeScript)
- **Drag-and-Drop**: Native HTML5 Drag API
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Components**:
  - `SectionWrapper` — handles Sections and Subsections
  - `FieldWrapper` — handles Fields inside Sections/Subsections
- **Live JSON Viewer**: Automatically updates based on current structure
- **Project Structure**:
  - `src/components/` — UI Components
  - `src/hooks/` — (if any) Custom React Hooks
  - `src/utils/` — Utilities and helper functions

---

## 📋 Functionality Overview

| Action            | Description                                                |
| :---------------- | :--------------------------------------------------------- |
| ➕ Add Section    | Create a new top-level Section                             |
| ➕ Add Field      | Add fields inside Sections or Subsections                  |
| ➕ Add Subsection | Create a Subsection inside a Section                       |
| 🔃 Reorder        | Drag and drop to reorder Sections, Subsections, and Fields |
| 🗑️ Remove         | Easily delete any Section, Subsection, or Field            |
| 📜 JSON Viewer    | Real-time structure of your Form displayed live            |

---

## 🤝 Contributing

Contributions are welcome!  
If you'd like to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🎯 Future Improvements (Coming Soon)

- Validation rules per field
- Export structure as JSON file
- Import existing JSON structures
- Field types customization (input, checkbox, select, etc.)

---

Let me know if you also want me to generate a **project folder structure tree view** (like a visual map)! 🌟  
Would you like that too? 📂👀  
_(It'll make the repo look even more professional!)_ 🚀
