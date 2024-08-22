const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const xBtn = document.getElementById('x');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

//Show loading
function showloadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true; 
}

//Hide loading
function removeLoadingSpinner() {
    if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
    }
}

//Show new quote
function newQuote() {
    showloadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with 'unknow'
    if (!quote.author) {
        authorText.textContent ='Unoknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Che quote length to determine styling 
    if (quote.text.length > 80) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text; 
    removeLoadingSpinner();
}

// Get quotes from API
async function getQuotes () {
    showloadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        
    }
}

//X Quote
function tweetQuote() {
     const xUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(xUrl, '_blank');
}

//Even listeners
newQuoteBtn.addEventListener('click', newQuote);
xBtn.addEventListener('click', tweetQuote);

getQuotes();

cd ZT