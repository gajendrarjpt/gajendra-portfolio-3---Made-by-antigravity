export const themes = [
  {id:'dark', name:'Midnight', background:'#141517', accent:'#8ea5ff', metal:'#d9deef', glow:'#d7f58b'},
  {id:'light', name:'Porcelain', background:'#f4f2eb', accent:'#536bd5', metal:'#e4dfd2', glow:'#cfac54'},
  {id:'forest', name:'Botanical', background:'#12251f', accent:'#7ecba9', metal:'#c6d8cb', glow:'#edd488'},
  {id:'sunset', name:'Terracotta', background:'#f5e9df', accent:'#b65438', metal:'#e7cbb7', glow:'#65886a'},
  {id:'plum', name:'Amethyst', background:'#251d32', accent:'#bf9aeb', metal:'#e0cfe9', glow:'#efbc86'},
];
export const getTheme = id => themes.find(t=>t.id===id)||themes[0];
