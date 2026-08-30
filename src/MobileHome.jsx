import { useState } from "react";
import "./mobile-home.css";

const Icon = ({ name }) => {
  const paths = {
    home: <path d="M3 10.8 12 3l9 7.8v8.7a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H4.5A1.5 1.5 0 0 1 3 19.5v-8.7Z" />,
    leaf: <><path d="M19.7 4.4C11 4.7 5.6 9.2 5.6 16.5c0 1.2.2 2.2.7 3.1 7.3-.8 12.6-5.8 13.4-13.3l.4-1.9Z" /><path d="M4.5 20.5c3.7-5.6 7.7-9.2 13.8-12.7" /></>,
    scan: <><path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3" /><path d="M8.2 12h7.6M12 8.2v7.6" /></>,
    history: <><path d="M3.5 12a8.5 8.5 0 1 0 2.1-5.6" /><path d="M3.5 5v4.3h4.3M12 7v5l3.2 2" /></>,
    profile: <><circle cx="12" cy="8" r="3.3" /><path d="M5.5 21c.5-3.5 2.7-5.3 6.5-5.3s6 1.8 6.5 5.3" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
};

export default function MobileHome() {
  const [active, setActive] = useState("Home");
  const [languageOpen, setLanguageOpen] = useState(false);
  const nav = [["Home", "home"], ["Advisory", "leaf"], ["Scan", "scan"], ["History", "history"], ["Me", "profile"]];
  return <main className="mobile-home"><section className="phone-screen" aria-label="Farmer's Companion home"><header className="home-header"><div className="app-brand"><span className="brand-avatar">👨🏾‍🌾</span><div><strong>Farmer's Companion</strong><small>Smarter Farming, Better Tomorrow</small></div></div><div className="lang-wrap"><button className="lang-button" type="button" onClick={() => setLanguageOpen(!languageOpen)}><span>🌐</span> English <b>⌄</b></button>{languageOpen && <div className="language-menu"><button>English</button><button>हिन्दी</button></div>}</div></header><section className="empty-home"><div className="sprout-art" aria-hidden="true"><i className="ground"/><i className="stem"/><i className="leaf-left"/><i className="leaf-right"/></div><h1>{active}</h1><p>{active === "Home" ? "Empty for now" : `${active} is ready for you`}</p></section><nav className="bottom-nav" aria-label="Main navigation">{nav.map(([label, icon]) => <button key={label} className={active === label ? "active" : ""} onClick={() => setActive(label)} type="button"><span className={label === "Scan" ? "scan-icon" : ""}><Icon name={icon} /></span><small>{label}</small></button>)}</nav></section></main>;
}
