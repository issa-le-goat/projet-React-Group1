import { useEffect, useState } from 'react';
import axios from 'axios';

export default function QuoteWidget() {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);

  useEffect(() => {
    const day = new Date().getDate();
    const quoteId = day === 31 ? Math.floor(Math.random() * 100) + 1 : day;

    axios.get(`https://dummyjson.com/quotes/${quoteId}`)
      .then(res => setQuote(res.data))
      .catch(err => console.error("Erreur widget citation", err));
  }, []);

  if (!quote) return null;

  return (
    <div className="quote-widget">
      <p className="quote-text">"{quote.quote}"</p>
      <p className="quote-author">— {quote.author}</p>
    </div>
  );
}