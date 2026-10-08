# VEDA Technology Internship — Task 8: Random Quote Generator

A clean, responsive, and lightweight **Random Quote Generator** web application developed as part of the VEDA Technology Internship.

---

## 📌 Description

The **Random Quote Generator** presents users with inspirational and thought-provoking quotes at the click of a button. Built strictly using vanilla front-end web technologies (HTML5, CSS3, and JavaScript), the application features a modern light theme, smooth typography, and seamless quote sharing functionality.

---

## 🎯 Objective

The objective of this task is to demonstrate core JavaScript proficiency, DOM manipulation techniques, array manipulation, event listener usage, and responsive UI design without relying on any external libraries, frameworks, or APIs.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic structure, accessibility (`aria-*`), and layout markup.
- **CSS3**: Custom properties (variables), Flexbox, clean typography (`Inter`), subtle hover effects, and responsive breakpoints.
- **JavaScript (ES6+)**: Internal array storage, DOM updates, event listeners, `Math.random()` selection logic, and Web Share / Clipboard API integration.

---

## ✨ Features

- 📖 **15 Built-in Quotes**: A curated array of inspirational quotes with respective authors stored locally in JavaScript.
- 🎲 **Random Quote Selection**: Instantly displays a random quote upon clicking the **New Quote** button or loading the page.
- 🔄 **Consecutive Duplicate Prevention**: Intelligent tracking ensures the same quote is never displayed twice in a row.
- 📲 **Native Share & Clipboard Fallback**:
  - Uses the native **Web Share API** (`navigator.share`) on supported mobile and desktop browsers.
  - Gracefully falls back to copying the formatted quote to the clipboard with visual toast feedback if native sharing is unavailable.
- 🎨 **Light, Clean & Professional UI**: Off-white background with crisp white quote cards, blue accents, and readable typography.
- 📱 **Fully Responsive Layout**: Optimized for mobile devices, tablets, and desktop displays.

---

## 🧮 How Random Quote Selection Works

Quote selection is handled dynamically in JavaScript using the native `Math.random()` function:

1. `Math.random()` generates a floating-point pseudo-random number between `0` (inclusive) and `1` (exclusive).
2. Multiplying by `quotes.length` scales the range to `[0, quotes.length)`.
3. `Math.floor()` rounds down to the nearest integer, giving a valid random index corresponding to an object in the `quotes` array.

```javascript
let newIndex = Math.floor(Math.random() * quotes.length);
```

---

## 🛡️ How Consecutive Duplicate Quotes Are Prevented

To prevent the exact same quote from appearing back-to-back when clicking **New Quote**:

1. A global variable `currentQuoteIndex` tracks the index of the quote currently rendered on screen.
2. A `do...while` loop continuously generates a candidate index until it produces an index that is **different** from `currentQuoteIndex`:

```javascript
function getRandomQuoteIndex() {
  if (quotes.length <= 1) return 0;
  
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * quotes.length);
  } while (newIndex === currentQuoteIndex);

  return newIndex;
}
```

This guarantees a fresh quote experience on every click while maintaining purely random selection across the full dataset.

---

## 🚀 How to Run the Project

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/dharmarayank946/Syntechhub_Portfolio_Website.git
   ```

2. **Navigate to the Project Folder**:
   ```bash
   cd Task8-Random-Quote-Generator
   ```

3. **Open in Browser**:
   - Double-click `index.html` to open it directly in any web browser (Chrome, Firefox, Edge, Safari).
   - Alternatively, serve using VS Code Live Server or python http server:
     ```bash
     python -m http.server 8000
     ```
     Then open `http://localhost:8000` in your browser.

---

## 📁 Project Structure

```
Task8-Random-Quote-Generator/
├── index.html   # Main HTML structure
├── style.css    # Responsive styles and design tokens
├── script.js     # Quotes array, random selection logic, DOM manipulation & sharing
└── README.md    # Project documentation
```
