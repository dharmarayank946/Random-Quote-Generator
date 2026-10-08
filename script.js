/**
 * Task 8 — Random Quote Generator
 * VEDA Technology Internship
 *
 * Requirements:
 * - Array of quote objects (at least 10 quotes)
 * - Math.random() for selection
 * - No consecutive duplicate quotes
 * - DOM manipulation & event listeners
 * - Optional Web Share API with graceful fallback
 */

// Array of quote objects stored internally in JavaScript
const quotes = [
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    quote: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    quote: "What you do today can improve all your tomorrows.",
    author: "Ralph Marston"
  },
  {
    quote: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt"
  },
  {
    quote: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama"
  },
  {
    quote: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky"
  },
  {
    quote: "Act as if what you do makes a difference. It does.",
    author: "William James"
  },
  {
    quote: "Keep your face always toward the sunshine—and shadows will fall behind you.",
    author: "Walt Whitman"
  },
  {
    quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  },
  {
    quote: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    quote: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci"
  }
];

// Track the index of the currently displayed quote to prevent consecutive repeats
let currentQuoteIndex = -1;

// DOM Element References
const quoteTextEl = document.getElementById("quote-text");
const quoteAuthorEl = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const shareQuoteBtn = document.getElementById("share-quote-btn");
const toastEl = document.getElementById("toast");
const toastMessageEl = document.getElementById("toast-message");

/**
 * Returns a random quote index ensuring no consecutive duplicates.
 * Uses Math.random() as required.
 */
function getRandomQuoteIndex() {
  if (quotes.length <= 1) return 0;
  
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * quotes.length);
  } while (newIndex === currentQuoteIndex);

  return newIndex;
}

/**
 * Updates the DOM with a new random quote.
 */
function displayRandomQuote() {
  const index = getRandomQuoteIndex();
  currentQuoteIndex = index;
  
  const selectedQuote = quotes[index];

  // Subtle opacity transition for smooth quote updates
  quoteTextEl.style.opacity = '0';
  quoteAuthorEl.style.opacity = '0';

  setTimeout(() => {
    quoteTextEl.textContent = selectedQuote.quote;
    quoteAuthorEl.textContent = selectedQuote.author;
    quoteTextEl.style.opacity = '1';
    quoteAuthorEl.style.opacity = '1';
  }, 150);
}

/**
 * Displays a temporary toast notification message.
 * @param {string} message 
 */
function showToast(message) {
  toastMessageEl.textContent = message;
  toastEl.setAttribute("aria-hidden", "false");
  toastEl.classList.add("show");

  setTimeout(() => {
    toastEl.classList.remove("show");
    toastEl.setAttribute("aria-hidden", "true");
  }, 3000);
}

/**
 * Handles sharing the current quote.
 * Uses Web Share API if available; otherwise falls back gracefully to Clipboard API.
 */
async function shareCurrentQuote() {
  if (currentQuoteIndex === -1) return;

  const currentQuote = quotes[currentQuoteIndex];
  const shareData = {
    title: "Inspirational Quote",
    text: `"${currentQuote.quote}" — ${currentQuote.author}`
  };

  // 1. Try Web Share API (Mobile browsers & supported desktop environments)
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      // Ignore AbortError when user cancels the share sheet
      if (err.name !== "AbortError") {
        fallbackCopyToClipboard(shareData.text);
      }
    }
  } else {
    // 2. Graceful fallback to Clipboard copy
    fallbackCopyToClipboard(shareData.text);
  }
}

/**
 * Fallback to copy quote to clipboard when Web Share API is unavailable.
 * @param {string} text 
 */
function fallbackCopyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => {
        showToast("Quote copied to clipboard!");
      })
      .catch(() => {
        showToast("Unable to copy quote.");
      });
  } else {
    // Ultimate fallback for legacy contexts
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
      document.execCommand("copy");
      showToast("Quote copied to clipboard!");
    } catch (err) {
      showToast("Sharing is not supported on this browser.");
    }
    document.body.removeChild(tempTextArea);
  }
}

// Event Listeners
newQuoteBtn.addEventListener("click", displayRandomQuote);
shareQuoteBtn.addEventListener("click", shareCurrentQuote);

// Initial quote display when DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  displayRandomQuote();
});
