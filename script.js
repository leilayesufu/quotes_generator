//get the text selector
const quoteselect = document.querySelector(".quoteinner");
const authorselect = document.querySelector(".quote-author");

//get the buttons
const refreshBtn = document.querySelector(".refresh-btn");
const speechBtn = document.querySelector(".sound-btn");
const copyBtn = document.querySelector(".copy-btn");
const tweetBtn = document.querySelector(".tweet-btn");

//create functions
let quotess=[]
//function to display quotes
function showQuote() {
  // Pick a random quote from array
  const quote = quotess[Math.floor(Math.random() * quotess.length)];
  // Check if Author field is blank and replace it with 'Unknown'
  if (!quote.Author) {
    authorselect.textContent = 'Author Unknown';
  } else {
    authorselect.textContent = "-" + quote.Author;
  }
  // Show quote
  quoteselect.textContent = quote.Quote;
  
}

//function to get quotes from api
async function getQuotes() {
  const apiLink = 'https://leilayesufu.github.io/api/data/quotes.json';
    try {
      const response = await fetch(apiLink);
      quotess = await response.json()
      showQuote();
    } catch (error) {
      // Catch Error Here
    }
  }


//generate the sound of the quote
function quoteToSound() {
  const text = quoteselect.textContent;
  const soundi = new SpeechSynthesisUtterance(
    text + " by " + authorselect.textContent.replace("-", "")
  );
  soundi.lang = "en-US";
  speechSynthesis.speak(soundi);
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteselect.innerText} - ${authorselect.innerText}`;
  window.open(twitterUrl, '_blank');
}

//copy quote to clipboard
function copyQuote() {
  //copy the quote to the clipboard
  const text = quoteselect.textContent;
  navigator.clipboard.writeText(text);

  //show the copy success message
  alert("copied to clipboard");
}
 
//run function on load
getQuotes()

//hook up event listeners
refreshBtn.addEventListener("click",getQuotes)
speechBtn.addEventListener("click", quoteToSound)
tweetBtn.addEventListener("click", tweetQuote)
copyBtn.addEventListener("click", copyQuote)

