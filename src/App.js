import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Loader } from "react-feather"; // Importing the Loader component
import "./App.css";

function App() {
  // Quotes API URL
  const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";
  
  // State for storing quotes and loading status
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch quotes from API
  const fetchQuotes = async () => {
    try {
      setLoading(true); // Set loading to true while fetching
      const response = await fetch(quotesUrl);
      const data = await response.json();
      setQuotes(data); // Store fetched quotes in state
    } catch (error) {
      console.error("Error fetching quotes:", error); // Log errors if any
    } finally {
      setLoading(false); // Set loading to false once fetching is complete
    }
  };

  // Run fetchQuotes when component loads
  useEffect(() => {
    fetchQuotes();
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <div className="App">
      <Header />
      <main>
        {/* If loading is true, display Loader, otherwise show fetched quotes */}
        {loading ? (
          <Loader />
        ) : (
          <pre>{JSON.stringify(quotes, null, 2)}</pre> // Temporarily displaying quotes in raw JSON format
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
