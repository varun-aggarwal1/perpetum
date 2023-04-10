import { React, useEffect, useState } from "react";
import "./App.css";

async function fetchNews(q = null) {
  const API_KEY = "34b6058858114968895e27785f213bbe";
  if (q) {
  }
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`,
    {
      method: "GET",
    }
  );
  const body = await response.json();
  console.log(body);
  return body.articles;
}

function App() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);
  useEffect(() => {
    console.log("data");
    fetchNews();
    fetchNews().then(setList);
  }, []);

  return (
    <div className="app">
      {!list ? (
        <div class="loader"></div>
      ) : list.length === 0 ? (
        <div class="loader"></div>
      ) : (
        <ul>
          {list.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}

function Item({ item }) {
  const separateWords = (s) => s.replace(/[A-Z][a-z]+/g, "$& ").trim();
  const formatDate = (s) =>
    new Date(s).toLocaleDateString(undefined, { dateStyle: "long" });

  return (
    <li className="item">
      {item.urlToImage && (
        <img className="thumbnail" alt="" src={item.urlToImage} />
      )}

      <h2 className="title">
        <a href={item.url}>{item.title}</a>
      </h2>

      <p className="description">{item.description}</p>

      <div className="meta">
        <span>{formatDate(item.publishedAt)}</span>

        <span className="provider">{item.source.name}</span>

        {item.category && <span>{separateWords(item.category)}</span>}
      </div>
    </li>
  );
}

export default App;
