import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export default function Sculpture({ chapter, paused, reset, fallback, onReady }) {
  const host = useRef(null), state = useRef({chapter,paused,reset});
  const [failed,setFailed]=useState(false);
  useEffect(()=>{state.current={chapter,paused,reset}},[chapter,paused,reset]);
  useEffect(()=>{
    const element=host.current;
    let renderer;
    try {renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch {setFailed(true);onReady(false);return;}
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
    renderer.setClearColor(0x000000,0);
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.25;
    element.appendChild(renderer.domElement);onReady(true);
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(35,1,0.1,100);camera.position.set(0,0.15,8.7);
    const pmrem=new THREE.PMREMGenerator(renderer), room=new RoomEnvironment();
    const environment=pmrem.fromScene(room,0.04);scene.environment=environment.texture;room.dispose();pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xffffff,0x756495,3));
    const light=new THREE.DirectionalLight(0xffffff,4);light.position.set(3,5,5);scene.add(light);
    const purple=new THREE.DirectionalLight(0xa898ff,3);purple.position.set(-4,1,-2);scene.add(purple);
    const silver=new THREE.MeshPhysicalMaterial({color:0xd8d3e7,metalness:0.88,roughness:0.2,clearcoat:1});
    const violet=new THREE.MeshPhysicalMaterial({color:0x9d87ec,metalness:0.55,roughness:0.25,clearcoat:1});
    const lime=new THREE.MeshPhysicalMaterial({color:0xd6fa79,metalness:0.12,roughness:0.22,clearcoat:1});
    const dark=new THREE.MeshStandardMaterial({color:0x252330,roughness:0.45,metalness:0.3});
    const root=new THREE.Group();scene.add(root);
    const groups=[new THREE.Group(),new THREE.Group(),new THREE.Group()];groups.forEach(g=>root.add(g));
    const mesh=(geo,mat,parent,x=0,y=0,z=0)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);parent.add(m);return m;};
    // Interlocking links: the foundation in connecting people and systems.
    const linkA=mesh(new THREE.TorusGeometry(1.15,0.31,28,96),silver,groups[0],-.48,.3,0);linkA.rotation.set(.45,.45,-.35);
    const linkB=mesh(new THREE.TorusGeometry(1.05,0.3,28,96),violet,groups[0],.5,-.35,.2);linkB.rotation.set(1.3,-.6,.55);
    mesh(new THREE.SphereGeometry(.34,32,24),lime,groups[0],1.65,1.1,.5);
    mesh(new THREE.SphereGeometry(.16,24,16),lime,groups[0],-1.6,-1.05,.25);
    // Layered browser windows: turning ideas into usable interfaces.
    for(let i=0;i<3;i++){
      const windowGroup=new THREE.Group();windowGroup.position.set((i-1)*.22,(i-1)*.17,(i-1)*.55);windowGroup.rotation.set(-.12,-.3,-.13);groups[1].add(windowGroup);
      mesh(new RoundedBoxGeometry(2.75,1.95,.14,4,.15),i===2?silver:violet,windowGroup);
      if(i===2){mesh(new RoundedBoxGeometry(2.49,1.5,.05,3,.08),dark,windowGroup,0,-.08,.1);for(let j=0;j<3;j++)mesh(new THREE.SphereGeometry(.048,12,8),j===0?lime:violet,windowGroup,-1.08+j*.17,.8,.11);mesh(new RoundedBoxGeometry(1.2,.17,.08,3,.07),silver,windowGroup,-.42,.3,.15);mesh(new RoundedBoxGeometry(.8,.12,.08,3,.05),violet,windowGroup,-.62,0,.15);mesh(new RoundedBoxGeometry(.7,.26,.08,3,.07),lime,windowGroup,-.66,-.43,.15);mesh(new THREE.TorusGeometry(.35,.1,16,40),violet,windowGroup,.72,-.03,.3);}
    }
    // An orbit of possibilities: curiosity and practical AI experiments.
    mesh(new THREE.IcosahedronGeometry(.75,2),lime,groups[2]);
    for(let i=0;i<3;i++){const ring=mesh(new THREE.TorusGeometry(1.42,.075,16,80),i===1?violet:silver,groups[2]);ring.rotation.set(i*.95+.2,i*.6,.3);const bead=mesh(new THREE.SphereGeometry(.19,20,16),i===1?lime:violet,ring,1.42,0,0);}
    const resize=()=>{const w=element.clientWidth,h=element.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.position.z=w/h<1?9.8:8.7;camera.updateProjectionMatrix();};
    const ro=new ResizeObserver(resize);ro.observe(element);resize();
    let visible=true,dragging=false,lastX=0,lastY=0,spin=0,tilt=0,lastReset=reset,lastTime=0,clock=0,frame=0;
    const io=new IntersectionObserver(([entry])=>visible=entry.isIntersecting);io.observe(element);
    const down=e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;element.setPointerCapture(e.pointerId)};
    const move=e=>{if(dragging){spin+=(e.clientX-lastX)*.008;tilt=THREE.MathUtils.clamp(tilt+(e.clientY-lastY)*.005,-.8,.8);lastX=e.clientX;lastY=e.clientY;}};
    const up=()=>dragging=false;
    const key=e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();if(e.key==='ArrowLeft')spin-=.2;if(e.key==='ArrowRight')spin+=.2;if(e.key==='ArrowUp')tilt-=.15;if(e.key==='ArrowDown')tilt+=.15}};
    const lost=e=>{e.preventDefault();setFailed(true);onReady(false);cancelAnimationFrame(frame)};
    element.addEventListener('pointerdown',down);element.addEventListener('pointermove',move);element.addEventListener('pointerup',up);element.addEventListener('pointercancel',up);element.addEventListener('keydown',key);renderer.domElement.addEventListener('webglcontextlost',lost);
    function animate(now){frame=requestAnimationFrame(animate);const dt=Math.min((now-lastTime)/1000,.05);lastTime=now;if(!visible||document.hidden)return;const current=state.current;if(lastReset!==current.reset){spin=0;tilt=0;lastReset=current.reset}if(!current.paused){clock+=dt;if(!dragging)spin+=dt*.16;}root.rotation.y=spin;root.rotation.x=tilt;root.position.y=current.paused?0:Math.sin(clock*.9)*.09;
      groups.forEach((g,i)=>{const target=i===current.chapter?1:.001;const scale=current.paused?target:THREE.MathUtils.damp(g.scale.x,target,8,dt);g.scale.setScalar(scale);g.visible=scale>.01;});
      renderer.render(scene,camera);
    }
    groups.forEach((g,i)=>g.scale.setScalar(i===state.current.chapter?1:.001));frame=requestAnimationFrame(animate);
    return()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();element.removeEventListener('pointerdown',down);element.removeEventListener('pointermove',move);element.removeEventListener('pointerup',up);element.removeEventListener('pointercancel',up);element.removeEventListener('keydown',key);renderer.domElement.removeEventListener('webglcontextlost',lost);const geometries=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry)});geometries.forEach(g=>g.dispose());[silver,violet,lime,dark].forEach(m=>m.dispose());environment.dispose();renderer.dispose();renderer.domElement.remove();};
  },[]);
  return failed?fallback:<div className="sculpture" ref={host} tabIndex={0} role="img" aria-label={['Interactive 3D interlocking rings representing connections. Drag or use arrow keys to rotate.','Interactive 3D browser windows representing website creation. Drag or use arrow keys to rotate.','Interactive 3D orbit representing AI exploration. Drag or use arrow keys to rotate.'][chapter]}/>;
}
