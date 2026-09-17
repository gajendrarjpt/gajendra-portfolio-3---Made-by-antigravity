import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { getTheme } from '../data/themes';

export default function Sculpture({ chapter, theme, paused, reset, fallback, onReady }) {
  const host=useRef(null), state=useRef({chapter,theme,paused,reset});
  const [failed,setFailed]=useState(false);
  useEffect(()=>{state.current={chapter,theme,paused,reset}},[chapter,theme,paused,reset]);
  useEffect(()=>{
    const element=host.current;
    let renderer;
    try {renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});} catch {setFailed(true);onReady(false);return;}
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setClearColor(0,0);
    renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
    element.appendChild(renderer.domElement);onReady(true);
    const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,100);
    const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();
    const env=pmrem.fromScene(room,.04);scene.environment=env.texture;room.dispose();pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xffffff,0x303b55,2));
    const keyLight=new THREE.DirectionalLight(0xfff1dd,3.2);keyLight.position.set(-3,6,5);scene.add(keyLight);
    const rim=new THREE.DirectionalLight(0x9eb4ff,2.5);rim.position.set(4,3,-4);scene.add(rim);
    const materials={
      metal:new THREE.MeshPhysicalMaterial({color:0xd9deef,metalness:.7,roughness:.32,clearcoat:.5}),
      accent:new THREE.MeshPhysicalMaterial({color:0x8ea5ff,metalness:.35,roughness:.28,clearcoat:1}),
      glow:new THREE.MeshStandardMaterial({color:0xd7f58b,emissive:0xd7f58b,emissiveIntensity:.35,roughness:.3}),
      dark:new THREE.MeshStandardMaterial({color:0x202631,metalness:.35,roughness:.4}),
      brass:new THREE.MeshStandardMaterial({color:0xc8a86c,metalness:.75,roughness:.3}),
      glass:new THREE.MeshPhysicalMaterial({color:0x8ea5ff,metalness:.1,roughness:.12,transparent:true,opacity:.3,depthWrite:false,side:THREE.DoubleSide}),
    };
    const root=new THREE.Group();scene.add(root);
    const mesh=(geo,mat,parent,x=0,y=0,z=0)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);parent.add(o);return o};
    const box=(w,h,d,mat,parent,x=0,y=0,z=0,r=.04)=>mesh(new RoundedBoxGeometry(w,h,d,2,r),mat,parent,x,y,z);
    const cyl=(r,h,mat,parent,x=0,y=0,z=0)=>mesh(new THREE.CylinderGeometry(r,r,h,32),mat,parent,x,y,z);
    const tube=(points,r,mat,parent)=>mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),32,r,6,false),mat,parent);
    const m=materials;
    // Machined plinth with layered edge, recessed circuit tracks and fasteners.
    box(3.9,.22,3.05,m.accent,root,0,-.75,0,.12);
    box(3.8,.12,2.95,m.dark,root,0,-.6,0,.1);
    box(3.72,.14,2.87,m.metal,root,0,-.48,0,.1);
    for(const x of [-1.66,1.66])for(const z of [-1.22,1.22]){
      cyl(.055,.024,m.brass,root,x,-.398,z);
      box(.06,.007,.009,m.dark,root,x,-.382,z,.002);
    }
    for(let i=0;i<7;i++)box(.008,.008,2.5,m.dark,root,-1.5+i*.5,-.405,0,.002);
    for(let i=0;i<5;i++)box(3.3,.008,.008,m.dark,root,0,-.405,-1+i*.5,.002);
    const paths=[[[ -1.5,-.39,.9],[-.65,-.39,.9],[-.65,-.39,.25],[.4,-.39,.25],[.4,-.39,-.8]],[[1.5,-.39,.8],[.85,-.39,.8],[.85,-.39,-.5],[1.35,-.39,-.5]],[[-1.5,-.39,-.7],[-1,-.39,-.7],[-1,-.39,-1.1],[.8,-.39,-1.1]]];
    paths.forEach(p=>{tube(p,.019,m.accent,root);const a=p[0];cyl(.047,.025,m.glow,root,a[0],a[1],a[2]);});
    // Three engraved front-panel bars and a tiny maker's badge.
    for(let i=0;i<3;i++)box(.35,.024,.014,m.brass,root,-1.13+i*.42,-.75,1.532,.005);
    box(.48,.12,.024,m.dark,root,1.2,-.73,1.537,.018);
    box(.25,.025,.01,m.glow,root,1.2,-.73,1.555,.004);
    const groups=[new THREE.Group(),new THREE.Group(),new THREE.Group()];groups.forEach(g=>root.add(g));
    // CONNECT: miniature modular network studio, patch leads and radio mast.
    for(let i=0;i<3;i++){
      const x=-1.12+i*.92,h=.9+i*.26;
      box(.68,h,.62,m.accent,groups[0],x,-.36+h/2,-.18,.06);
      box(.59,h-.12,.028,m.dark,groups[0],x,-.36+h/2,.147,.02);
      for(let j=0;j<4;j++){
        const y=-.19+j*(h-.18)/4;
        box(.48,.13,.04,m.metal,groups[0],x,y,.174,.018);
        for(let k=0;k<3;k++)box(.075,.047,.02,m.dark,groups[0],x-.13+k*.12,y,.203,.004);
        mesh(new THREE.SphereGeometry(.024,10,8),m.glow,groups[0],x+.2,y,.21);
      }
      for(let j=0;j<5;j++)box(.035,.015,.36,m.dark,groups[0],x-.17+j*.085,h-.35,-.18,.004);
      if(i<2)tube([[x,.12,.24],[x,.12,.68],[x+.4,-.15,.9],[x+.92,.35,.25]],.035,m.brass,groups[0]);
    }
    cyl(.035,1.5,m.brass,groups[0],1.45,.33,-1);
    for(let i=0;i<3;i++)box(.47-i*.1,.025,.028,m.metal,groups[0],1.45,.72+i*.19,-1,.004);
    box(.68,.07,.4,m.dark,groups[0],-.9,-.33,1,.025);
    for(let i=0;i<5;i++)box(.065,.018,.1,m.glow,groups[0],-1.12+i*.11,-.285,1,.004);
    // CREATE: sculpted workstation, layered screen UI, keyboard and task lamp.
    box(2.35,.12,1.28,m.accent,groups[1],-.2,.05,0,.08);
    for(const x of [-1.15,.75])for(const z of [-.45,.45])cyl(.035,.45,m.brass,groups[1],x,-.18,z);
    box(.52,.06,.35,m.metal,groups[1],-.35,.15,-.16);
    box(.11,.48,.1,m.metal,groups[1],-.35,.38,-.28);
    box(1.7,1.03,.13,m.metal,groups[1],-.35,.98,-.3,.07);
    box(1.52,.84,.024,m.dark,groups[1],-.35,1,-.219,.03);
    box(1.36,.065,.012,m.accent,groups[1],-.35,1.33,-.199,.009);
    for(let i=0;i<3;i++)mesh(new THREE.SphereGeometry(.018,8,6),m.glow,groups[1],-.95+i*.065,1.33,-.186);
    for(let i=0;i<3;i++)box(.58-i*.09,.045,.02,i===2?m.glow:m.metal,groups[1],-.67,1.14-i*.12,-.19,.01);
    box(.39,.46,.025,m.accent,groups[1],.1,.99,-.19,.024);
    mesh(new THREE.IcosahedronGeometry(.14,0),m.glow,groups[1],.1,1.04,-.14);
    box(.99,.065,.34,m.dark,groups[1],-.42,.153,.4,.03);
    for(let row=0;row<3;row++)for(let col=0;col<10;col++)box(.064,.023,.061,col===9?m.glow:m.metal,groups[1],-.82+col*.089,.199,.3+row*.086,.008);
    box(.15,.07,.22,m.metal,groups[1],.38,.17,.42,.05);
    cyl(.14,.08,m.brass,groups[1],1.17,-.33,.25);
    tube([[1.17,-.28,.25],[1.17,.5,.25],[1,.92,.1],[.77,1.12,.08]],.038,m.brass,groups[1]);
    const shade=mesh(new THREE.ConeGeometry(.22,.29,32,1,true),m.accent,groups[1],.77,1.06,.08);shade.rotation.z=-.35;
    mesh(new THREE.SphereGeometry(.07,16,12),m.glow,groups[1],.74,.97,.08);
    cyl(.11,.24,m.accent,groups[1],-1.5,-.27,.85);
    for(let i=0;i<3;i++){const pen=cyl(.014,.39,m.brass,groups[1],-1.53+i*.035,-.02,.85);pen.rotation.z=(i-1)*.15;}
    // EXPLORE: mechanical curiosity engine, crystalline core and hinged petals.
    cyl(.76,.12,m.dark,groups[2],0,-.31,0);
    cyl(.65,.13,m.brass,groups[2],0,-.2,0);
    cyl(.53,.17,m.accent,groups[2],0,-.06,0);
    const crystal=mesh(new THREE.OctahedronGeometry(.62,0),m.glow,groups[2],0,1,0);crystal.scale.y=1.4;
    const cage=new THREE.LineSegments(new THREE.EdgesGeometry(crystal.geometry),new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.55}));crystal.add(cage);
    const petals=[];
    for(let i=0;i<6;i++){
      const a=i*Math.PI/3,x=Math.cos(a),z=Math.sin(a);
      cyl(.035,.53,m.brass,groups[2],x*.43,.19,z*.43);
      tube([[x*.58,-.13,z*.58],[x*.99,.5,z*.99],[x*.83,1.36,z*.83],[x*.43,1.86,z*.43]],.035,m.metal,groups[2]);
      const petal=box(.26,.67,.045,m.glass,groups[2],x*.74,.61,z*.74,.055);petal.rotation.y=-a+Math.PI/2;petal.rotation.z=.2;petals.push(petal);
      mesh(new THREE.SphereGeometry(.07,12,10),m.brass,groups[2],x*.43,1.86,z*.43);
    }
    for(let i=0;i<12;i++){const a=i*Math.PI/6;box(.065,.035,.06,m.glow,groups[2],Math.cos(a)*.69,-.12,Math.sin(a)*.69,.009);}
    box(.62,.11,.42,m.dark,groups[2],1.21,-.32,.75);
    for(let i=0;i<3;i++)cyl(.057,.04,i===1?m.glow:m.brass,groups[2],1.02+i*.18,-.24,.75);
    // Soft studio contact shadow, generated locally without a downloaded texture.
    const shadowCanvas=document.createElement('canvas');shadowCanvas.width=128;shadowCanvas.height=128;
    const ctx=shadowCanvas.getContext('2d');let shadowTexture;
    if(ctx){const gradient=ctx.createRadialGradient(64,64,6,64,64,64);gradient.addColorStop(0,'rgba(0,0,0,.25)');gradient.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);shadowTexture=new THREE.CanvasTexture(shadowCanvas);const shadow=mesh(new THREE.PlaneGeometry(6,5),new THREE.MeshBasicMaterial({map:shadowTexture,transparent:true,depthWrite:false}),root,0,-.95,0);shadow.rotation.x=-Math.PI/2;}
    const resize=()=>{const w=element.clientWidth,h=element.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;const d=w/h<1?1.15:1;camera.position.set(4.5*d,3.7*d,6.1*d);camera.lookAt(0,.28,0);camera.updateProjectionMatrix();};
    const ro=new ResizeObserver(resize);ro.observe(element);resize();
    let visible=true,dragging=false,lastX=0,lastY=0,spin=0,tilt=0,lastReset=reset,lastTime=0,clock=0,frame=0,lastTheme='';
    const io=new IntersectionObserver(([e])=>visible=e.isIntersecting);io.observe(element);
    const down=e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;element.setPointerCapture(e.pointerId)};
    const move=e=>{if(dragging){spin+=(e.clientX-lastX)*.008;tilt=THREE.MathUtils.clamp(tilt+(e.clientY-lastY)*.004,-.35,.35);lastX=e.clientX;lastY=e.clientY}};
    const up=()=>{dragging=false};
    const key=e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();if(e.key==='ArrowLeft')spin-=.18;if(e.key==='ArrowRight')spin+=.18;if(e.key==='ArrowUp')tilt=Math.max(-.35,tilt-.1);if(e.key==='ArrowDown')tilt=Math.min(.35,tilt+.1)}};
    const lost=e=>{e.preventDefault();setFailed(true);onReady(false);cancelAnimationFrame(frame)};
    element.addEventListener('pointerdown',down);element.addEventListener('pointermove',move);element.addEventListener('pointerup',up);element.addEventListener('pointercancel',up);element.addEventListener('keydown',key);renderer.domElement.addEventListener('webglcontextlost',lost);
    function animate(now){frame=requestAnimationFrame(animate);const dt=Math.min((now-lastTime)/1000,.05);lastTime=now;if(!visible||document.hidden)return;const current=state.current;
      if(lastTheme!==current.theme){const palette=getTheme(current.theme);m.accent.color.set(palette.accent);m.metal.color.set(palette.metal);m.glow.color.set(palette.glow);m.glow.emissive.set(palette.glow);m.glass.color.set(palette.accent);lastTheme=current.theme;}
      if(lastReset!==current.reset){spin=0;tilt=0;lastReset=current.reset}
      if(!current.paused)clock+=dt;
      root.rotation.y=spin+(current.paused?0:Math.sin(clock*.28)*.09);root.rotation.x=tilt;root.position.y=current.paused?0:Math.sin(clock*.7)*.035;
      crystal.rotation.y=current.paused?0:clock*.22;
      groups.forEach((g,i)=>{const target=i===current.chapter?1:.001;const scale=current.paused?target:THREE.MathUtils.damp(g.scale.x,target,9,dt);g.scale.setScalar(scale);g.visible=scale>.01});
      renderer.render(scene,camera);
    }
    groups.forEach((g,i)=>g.scale.setScalar(i===state.current.chapter?1:.001));frame=requestAnimationFrame(animate);
    return()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();element.removeEventListener('pointerdown',down);element.removeEventListener('pointermove',move);element.removeEventListener('pointerup',up);element.removeEventListener('pointercancel',up);element.removeEventListener('keydown',key);renderer.domElement.removeEventListener('webglcontextlost',lost);const geometries=new Set(),usedMaterials=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)usedMaterials.add(o.material)});geometries.forEach(g=>g.dispose());usedMaterials.forEach(m=>m.dispose());shadowTexture?.dispose();env.dispose();renderer.dispose();renderer.domElement.remove();};
  },[]);
  return failed?fallback:<div className="sculpture" ref={host} tabIndex={0} role="img" aria-label={['Interactive miniature connection studio with network towers, patch cables and circuitry.','Interactive miniature creative workstation with monitor, keyboard and task lamp.','Interactive miniature curiosity engine with faceted crystal and mechanical petals.'][chapter]+' Drag or use arrow keys to rotate.'}/>;
}
