import { useState } from "react";
import MobileHome from "./MobileHome.jsx";

const Leaf = () => <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M39 7C20 8 10 18 10 34c0 3 1 5 2 7 14-1 24-10 25-26l2-8Z" fill="currentColor"/><path d="M10 40c6-10 13-16 25-23" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>;
const Scan = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3M8 12h8M12 8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

function LandingPage() {
  const [started, setStarted] = useState(false);
  return <main className="app-shell">
    <header className="topbar"><a className="brand" href="#home"><span className="brand-mark"><Leaf /></span><span>KRISHI<span>AI</span></span></a><div className="topbar-right"><span className="online"><i/> AI advisory online</span><button className="language" type="button">EN <b>⌄</b></button></div></header>
    <section className="hero" id="home"><div className="copy"><div className="eyebrow"><span className="pulse"/> SMART FARMING, SIMPLIFIED</div><h1>Grow smarter.<br/><em>Harvest better.</em></h1><p>Set up your digital farm in minutes and get timely, personalized guidance for every crop cycle.</p><div className="actions"><button className="primary" type="button" onClick={() => setStarted(true)}>{started ? 'Farm setup started' : 'Set up my farm'} <Arrow /></button><button className="play" type="button"><span>▶</span> See how it works</button></div>{started && <div className="toast"><span>✓</span> Great — let’s add your farm details.</div>}<div className="trust"><div className="avatars"><i>R</i><i>S</i><i>A</i><i>+</i></div><span>Trusted by <b>20,000+ farmers</b><br/>across India</span></div></div>
      <aside className="insight-card"><div className="insight-head"><span><Scan /> FIELD INSIGHTS</span><b>Live</b></div><div className="score"><div className="ring"><strong>86</strong><small>/100</small></div><div><b>Farm health looks good</b><p>Based on soil, weather and crop data</p></div></div><div className="metrics"><div><span>◒</span><small>Weather</small><b>28°C</b></div><div><span>⌁</span><small>Soil moisture</small><b>Healthy</b></div><div><span>↗</span><small>Yield outlook</small><b>+14%</b></div></div></aside></section>
    <section className="features" aria-label="Krishi AI benefits"><article><span className="feature-icon">◎</span><div><b>Crop intelligence</b><p>Personalized recommendations</p></div><Arrow /></article><article><span className="feature-icon">⚡</span><div><b>Early alerts</b><p>Stay ahead of risks</p></div><Arrow /></article><article><span className="feature-icon">↗</span><div><b>Better returns</b><p>Decisions backed by data</p></div><Arrow /></article></section>
    <img className="farmer" src="/farmer-modern.png" alt="Farmer using a tablet" />
  </main>;
}

function App() {
  return window.location.pathname === "/home" ? <MobileHome /> : <LandingPage />;
}

export default App;
