import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowRight, Menu, X, Pause, Play, RotateCcw, Sun, Moon } from 'lucide-react';
import { profile, featuredProjects, socials } from './data/portfolioData';
import { themes, getTheme } from './data/themes';
import ObservatoryFallback from './components/ObservatoryFallback';
const Sculpture = lazy(() => import('./components/Sculpture'));
const chapters = [
  {name:'Connect', tag:'01 / NETWORK ENGINEERING', title:'Good things start with a connection.', text:'My foundation is network engineering: connecting people and keeping the systems behind them running.', note:'Networks → connections'},
  {name:'Create', tag:'02 / WEBSITES & PRODUCTS', title:'Then, turn an idea into something useful.', text:'I take that problem-solving mindset into building websites. From the first idea to the details that make it work.', note:'Ideas → experiences'},
  {name:'Explore', tag:'03 / PRACTICAL AI', title:'Stay curious. See what comes next.', text:'I experiment with AI to solve everyday problems. PlantRx is one of those ideas, brought to life.', note:'Curiosity → possibilities'},
];
function FallbackArt({chapter=0}){return <ObservatoryFallback chapter={chapter}/>}
export default function App(){
  const [theme,setTheme]=useState(() => getTheme(document.documentElement.dataset.theme).id);
  useEffect(()=>{
    document.documentElement.dataset.theme=theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',getTheme(theme).background);
    try { localStorage.setItem('theme',theme); } catch { /* Theme still works without storage. */ }
  },[theme]);
  const [chapter,setChapter]=useState(0), [paused,setPaused]=useState(false), [reset,setReset]=useState(0);
  const [menu,setMenu]=useState(false), [reduced,setReduced]=useState(false), [sceneReady,setSceneReady]=useState(null);
  const dialog=useRef(null),trigger=useRef(null), tabs=useRef([]);
  useEffect(()=>{const q=matchMedia('(prefers-reduced-motion: reduce)'); const change=()=>setReduced(q.matches); change();q.addEventListener('change',change);return()=>q.removeEventListener('change',change)},[]);
  useEffect(()=>{if(menu){dialog.current.showModal();const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous;}}else if(dialog.current.open){dialog.current.close();trigger.current?.focus()}},[menu]);
  const [activeSection,setActiveSection]=useState('home');
  const headerRef=useRef(null);
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      frame=0;
      const ids=['home','work','about','contact'];
      const marker=window.innerHeight*.35;
      let active='home';
      for(const id of ids){if(document.getElementById(id)?.getBoundingClientRect().top<=marker)active=id;}
      if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-4)active='contact';
      setActiveSection(active);
      const range=document.documentElement.scrollHeight-window.innerHeight;
      headerRef.current?.style.setProperty('--page-progress',String(range>0?window.scrollY/range:0));
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
    update();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule)};
  },[]);
  const project=featuredProjects[0];
  function tabKey(e,index){let next;if(e.key==='ArrowRight')next=(index+1)%3;if(e.key==='ArrowLeft')next=(index+2)%3;if(e.key==='Home')next=0;if(e.key==='End')next=2;if(next!==undefined){e.preventDefault();setChapter(next);tabs.current[next].focus()}}
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header ref={headerRef} className="header">
      <div className="shell header-inner">
        <a href="#home" className="brand" aria-label="Gajendra Rajput home"><span className="brand-symbol" aria-hidden="true">g<span>r</span><i/></span><span>Gajendra Rajput<small>Engineer. Maker. Curious human.</small></span></a>
        <nav className="nav-dock" aria-label="Main navigation">
          {[['Home','home'],['Work','work'],['About','about'],['Contact','contact']].map(([label,id])=><a key={id} href={'#'+id} aria-current={activeSection===id?'location':undefined}>{label}<span aria-hidden="true"/></a>)}
        </nav>
        <div className="header-actions"><label className="theme-picker"><span className="theme-swatch" aria-hidden="true"/><span className="sr-only">Color theme</span><select aria-label="Color theme" value={theme} onChange={e=>setTheme(e.target.value)}>{themes.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></label><button ref={trigger} className="menu-trigger icon-button" aria-label="Open menu" aria-expanded={menu} aria-controls="mobile-navigation" onClick={()=>setMenu(true)}><Menu/></button></div>
      </div><span className="header-progress" aria-hidden="true"/>
    </header>
    <dialog ref={dialog} id="mobile-navigation" className="mobile-menu" aria-label="Site navigation" onCancel={()=>setMenu(false)} onClose={()=>setMenu(false)}><div className="menu-top"><span className="eyebrow">TAKE A LOOK AROUND</span><button className="icon-button" aria-label="Close menu" onClick={()=>setMenu(false)}><X/></button></div><nav aria-label="Mobile navigation">{[['Home','home'],['Selected work','work'],['About me','about'],['Let’s talk','contact']].map(([label,id],i)=><a key={id} href={'#'+id} aria-current={activeSection===id?'location':undefined} onClick={()=>setMenu(false)}><small>0{i+1}</small>{label}<ArrowUpRight/></a>)}</nav></dialog>
    <main id="main" tabIndex={-1}>
      <section id="home" className="hero shell" aria-labelledby="hero-title">
        <div className="hero-kicker"><p className="eyebrow"><span className="status-dot"/> INDEPENDENT MIND. CONNECTED WORLD.</p><span className="location">Pune, India ↗</span></div>
        <div className="hero-main">
          <div className="hero-copy"><h1 id="hero-title">Curiosity,<br/><span>made real.</span></h1><p className="intro">I’m Gajendra. An engineer who builds for the web, experiments with AI, and makes room for a little creativity.</p><div className="hero-actions"><a className="button primary" href="#work">Discover my work <ArrowDown size={19}/></a><a className="quiet-link" href="#about">The person behind it <ArrowUpRight size={18}/></a></div><p className="hero-note"><span aria-hidden="true">✳</span> Engineering roots. No single box.</p></div>
          <div className="hero-art"><div className="orbit-guide" aria-hidden="true"/><span className="art-coordinate art-coordinate-top" aria-hidden="true">THE MAKER’S OBSERVATORY / 0{chapter+1}</span><div className="scene-wrap"><Suspense fallback={<FallbackArt chapter={chapter}/>}><Sculpture theme={theme} chapter={chapter} paused={paused||reduced} reset={reset} onReady={setSceneReady} fallback={<FallbackArt chapter={chapter}/>}/></Suspense></div><div className="scene-toolbar"><span>{sceneReady?'Yours to play with. Drag to rotate.':'Three interests. One curious mind.'}</span>{sceneReady&&<div><button className="icon-button" aria-label="Reset sculpture rotation" onClick={()=>setReset(v=>v+1)}><RotateCcw size={16}/></button><button className="icon-button" aria-label={paused||reduced?'Play sculpture animation':'Pause sculpture animation'} aria-pressed={paused||reduced} onClick={()=>{setPaused(!(paused||reduced));setReduced(false)}}>{paused||reduced?<Play size={16}/>:<Pause size={16}/>}</button></div>}</div></div>
        </div>
        <div className="story-strip"><div className="story-label"><span className="eyebrow">A FEW SIDES OF ME</span><span>Pick a chapter <ArrowRight size={16}/></span></div><div className="chapter-tabs" role="tablist" aria-label="Explore my story">{chapters.map((c,i)=><button key={c.name} ref={el=>tabs.current[i]=el} id={'chapter-'+i} role="tab" aria-selected={chapter===i} aria-controls="chapter-panel" tabIndex={chapter===i?0:-1} onClick={()=>setChapter(i)} onKeyDown={e=>tabKey(e,i)}><small>0{i+1}</small>{c.name}<ArrowUpRight size={18}/></button>)}</div><div id="chapter-panel" role="tabpanel" aria-labelledby={'chapter-'+chapter} className="chapter-panel" tabIndex={0}><p className="eyebrow">{chapters[chapter].tag}</p><p>{chapters[chapter].text}</p></div></div>
      </section>
      <section id="work" className="work shell section" aria-labelledby="work-title">
        <div className="section-topline"><p className="eyebrow">01 / SELECTED WORK</p><span>A thought, turned into a thing.</span></div>
        <div className="section-title"><h2 id="work-title">Small ideas.<br/><span className="muted">Real possibilities.</span></h2><p>Useful things for everyday life.<br/>Made with care, built with curiosity.</p></div>
        <article className="project">
          <a className="project-art" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label="Open PlantRx in a new tab"><div className="project-art-top"><span className="project-logo"><span aria-hidden="true">✳</span> PlantRx</span><span className="pill">A little care. A little AI.</span></div><div className="plant-orbit" aria-hidden="true"/><div className="browser-frame"><div className="browser-bar"><span aria-hidden="true">● ● ●</span><span>PlantRx / Your plant-care companion</span><ArrowUpRight size={16}/></div><img src={project.image} alt={project.imageAlt} loading="lazy" width="1270" height="714"/></div><span className="project-open" aria-hidden="true"><ArrowUpRight size={30}/></span><span className="project-image-label">INDEPENDENT PROJECT / WEB APPLICATION</span></a>
          <div className="project-info"><div><p className="eyebrow">01 — DESIGN & DEVELOPMENT</p><h3>Plant care,<br/>without the guesswork.</h3></div><div className="project-description"><p>A photo of a struggling plant becomes a likely diagnosis and a practical care plan. An exploration of making AI useful in everyday life.</p><div className="project-actions"><a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">Try PlantRx <ArrowUpRight size={19}/></a><a className="text-link secondary" href={project.repoUrl} target="_blank" rel="noreferrer">View source <ArrowUpRight size={19}/></a></div><details className="project-details"><summary>Behind the build <span aria-hidden="true">+</span></summary><div><p><strong>My role</strong>Product design and development, from the photo-upload experience to the diagnosis flow.</p><p><strong>Built with</strong>React · Vite · Tailwind CSS · Gemini API</p></div></details></div></div>
        </article>
        <a className="creator-feature" href={socials.youtube.url} target="_blank" rel="noreferrer" aria-label="Visit Artwork. Productions on YouTube"><div className="creator-visual" aria-hidden="true"><div className="video-line video-line-one"/><div className="video-line video-line-two"/><span className="creator-word">PRESS<br/><i>PLAY.</i></span><span className="creator-play"><Play size={30} fill="currentColor"/></span><span className="creator-caption">ARTWORK. PRODUCTIONS</span><span className="record-dot"/></div><div className="creator-copy"><p className="eyebrow">02 — A CREATIVE OUTLET</p><h3>Beyond<br/>the browser.</h3><p>Different medium. Same curiosity. Find another side of me on Artwork. Productions, my YouTube channel.</p><span className="text-link">Explore the channel <ArrowUpRight size={20}/></span></div></a>
      </section>
      <section id="about" className="about section" aria-labelledby="about-title"><div className="shell"><div className="section-topline"><p className="eyebrow">02 / THE HUMAN PART</p><span>Always a work in progress.</span></div><div className="about-grid"><div className="about-intro"><h2 id="about-title">Good with systems.<br/><span>Better with<br/>possibilities.</span></h2><a className="text-link" href={profile.resume.url} target="_blank" rel="noreferrer">Read my résumé <ArrowUpRight size={19}/></a></div><div className="about-copy"><p className="about-lead">Engineer by profession.<br/>Maker by instinct.</p><p>I’m Gajendra Rajput, a Senior Network Engineer at PHN Technology in Pune. My day job is about keeping people connected.</p><p>Beyond that, I follow ideas into websites, AI experiments, and videos. I like understanding how things work — then seeing what else they could become.</p><div className="about-signature"><span className="signature-mark" aria-hidden="true">gr.</span><span>Gajendra Rajput<small>Pune, India</small></span></div></div></div><div className="principles"><div><span>01 / MY FOUNDATION</span><h3>Connect the dots.</h3><p>Understand the system before changing it.</p></div><div><span>02 / MY APPROACH</span><h3>Make it useful.</h3><p>Start with a real problem. Build toward a simple answer.</p></div><div><span>03 / MY DEFAULT</span><h3>Stay a beginner.</h3><p>Keep trying things. There’s always more to learn.</p></div></div></div></section>
      <section id="contact" className="contact section" aria-labelledby="contact-title"><div className="shell"><div className="section-topline"><p className="eyebrow">03 / LET’S CONNECT</p><span>Good things start with a conversation.</span></div><a className="contact-heading" href={socials.email.url}><h2 id="contact-title">Have a spark?<br/><span>Let’s talk.</span></h2><span className="contact-circle" aria-hidden="true"><ArrowUpRight/></span></a><div className="contact-bottom"><a className="email-link" href={socials.email.url}>{profile.email}<ArrowUpRight size={20}/></a><div className="social-links">{[socials.linkedin,socials.github,socials.youtube].map(s=><a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label}<ArrowUpRight size={17}/></a>)}</div></div></div></section>
    </main><footer className="footer shell"><span>© {new Date().getFullYear()} Gajendra Rajput</span><span>Built with curiosity, in Pune.</span><a href="#home">Back to top <ArrowUpRight size={16}/></a></footer>
  </>
}
