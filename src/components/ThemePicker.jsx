import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Palette, X } from 'lucide-react';
import { themes, getTheme } from '../data/themes';

export default function ThemePicker({theme, onChange, switching}) {
  const [open,setOpen]=useState(false);
  const root=useRef(null), trigger=useRef(null), selected=useRef(null);
  useEffect(()=>{
    if(!open)return;
    selected.current?.focus();
    const outside=e=>{if(!root.current?.contains(e.target))setOpen(false)};
    const escape=e=>{if(e.key==='Escape'){e.preventDefault();setOpen(false);trigger.current?.focus()}};
    document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);
    return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape)};
  },[open]);
  return <div className="appearance" ref={root} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false)}}>
    <button ref={trigger} type="button" className="appearance-trigger" aria-label={'Choose appearance, current theme '+getTheme(theme).name} aria-expanded={open} aria-controls="appearance-panel" onClick={()=>setOpen(v=>!v)}><span className="appearance-orb" aria-hidden="true"/><span className="appearance-trigger-text">Appearance</span><ChevronDown size={15} className={open?'chevron is-open':'chevron'}/></button>
    {open&&<div id="appearance-panel" className="appearance-panel"><div className="appearance-heading"><div><span className="appearance-title"><Palette size={17}/>Make it yours.</span><p>Five designs. Find your perspective.</p></div><button type="button" className="appearance-close" aria-label="Close appearance picker" onClick={()=>{setOpen(false);trigger.current?.focus()}}><X size={18}/></button></div>
      <fieldset className="appearance-options" aria-busy={switching}><legend className="sr-only">Color theme</legend>{themes.map(t=><label key={t.id} data-design={t.id} className={'appearance-option'+(theme===t.id?' is-selected':'')} style={{'--preview-bg':t.background,'--preview-accent':t.accent,'--preview-metal':t.metal,'--preview-glow':t.glow}}><input ref={theme===t.id?selected:undefined} type="radio" name="color-theme" aria-label={t.name} value={t.id} checked={theme===t.id} onChange={e=>{const r=e.currentTarget.closest('label').getBoundingClientRect();onChange(t.id,{x:r.left+r.width/2,y:r.top+r.height/2})}}/><span className="appearance-preview" aria-hidden="true"><i className="preview-line"/><i className="preview-line short"/><i className="preview-disc"/><i className="preview-button"/><span className="appearance-check"><Check size={13}/></span></span><span className="appearance-name">{t.name}<small>{t.style}</small></span></label>)}</fieldset>
      <div className="appearance-footer"><span className="appearance-saved-dot"/>Saved on this device<span>{getTheme(theme).name}</span></div>
    </div>}
  </div>;
}
