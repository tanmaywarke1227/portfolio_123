"use client";

import { Component, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

type Signal = { x: number; y: number; scroll: number; visible: boolean; mobile: boolean; heroActive: boolean; centerY: number };
const subscribe = (notify: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const getMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverMotion = () => true;

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function Contacts({ low }: { low: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = low ? 8 : 16;
  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const matrix = new THREE.Matrix4();
    for (let side = 0; side < 4; side++) {
      for (let i = 0; i < count; i++) {
        const offset = ((i + .5) / count - .5) * 2.65;
        const x = side < 2 ? offset : (side === 2 ? -1.68 : 1.68);
        const z = side < 2 ? (side === 0 ? -1.68 : 1.68) : offset;
        matrix.compose(new THREE.Vector3(x, -.08, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0), side < 2 ? 0 : Math.PI / 2), new THREE.Vector3(1,1,1));
        mesh.setMatrixAt(side * count + i, matrix);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [count]);
  return <instancedMesh ref={ref} args={[undefined, undefined, count * 4]} frustumCulled={false}><boxGeometry args={[.065, .07, .27]} /><meshStandardMaterial color="#a4a29a" metalness={.85} roughness={.3} /></instancedMesh>;
}

function DieGrid({ low }: { low: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = low ? 4 : 8;
  useEffect(() => {
    if (!ref.current) return;
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();
    for (let row = 0; row < count; row++) for (let col = 0; col < count; col++) {
      const step = 1.5 / count;
      matrix.makeScale(step * .82, .024, step * .82);
      matrix.setPosition((col - (count - 1) / 2) * step, .13, (row - (count - 1) / 2) * step);
      ref.current.setMatrixAt(row * count + col, matrix);
      ref.current.setColorAt(row * count + col, color.set((row + col) % 5 === 0 ? "#64afb8" : (col % 3 === 0 ? "#6f738a" : "#3b555c")));
    }
    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  }, [count]);
  return <instancedMesh ref={ref} args={[undefined, undefined, count * count]}><boxGeometry args={[1,1,1]} /><meshStandardMaterial metalness={.85} roughness={.22} /></instancedMesh>;
}

function Traces({ low }: { low: boolean }) {
  const positions = useMemo(() => {
    const points: number[] = [];
    const count = low ? 5 : 11;
    for (let side = 0; side < 4; side++) for (let i = 0; i < count; i++) {
      const offset = (i / (count - 1) - .5) * 2.2;
      const angle = side * Math.PI / 2;
      const route = [[offset * .58, .8], [offset * .58, 1.04], [offset, 1.27], [offset, 1.54]];
      for (let j = 0; j < route.length - 1; j++) for (const [x,z] of [route[j],route[j+1]]) points.push(x*Math.cos(angle)-z*Math.sin(angle), .135, x*Math.sin(angle)+z*Math.cos(angle));
    }
    return new Float32Array(points);
  }, [low]);
  return <lineSegments><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]} /></bufferGeometry><lineBasicMaterial color="#6eabb3" transparent opacity={.5} /></lineSegments>;
}

function Processor({ signal, expanded, reduced, low, degrade }: { signal: RefObject<Signal>; expanded: boolean; reduced: boolean; low: boolean; degrade: () => void }) {
  const assembly = useRef<THREE.Group>(null);
  const die = useRef<THREE.Group>(null);
  const cover = useRef<THREE.Group>(null);
  const base = useRef<THREE.Group>(null);
  const slowFrames = useRef(0);
  const { viewport, invalidate, size } = useThree();
  useEffect(() => { invalidate(); }, [expanded, reduced, low, invalidate]);
  useFrame((_, delta) => {
    if (!assembly.current || !die.current || !cover.current || !base.current) return;
    const input = signal.current;
    const phase = THREE.MathUtils.clamp(input.scroll, 0, 1);
    const spread = expanded && input.heroActive ? 1 : Math.sin(phase * Math.PI) * .95;
    const narrow = size.width < 900;
    const targetScale = narrow ? Math.min(viewport.width / 5.8, .6) : Math.min(viewport.width / 11.5, 1.32);
    let difference = 0;
    const damp = (value: number, target: number) => {
      difference += Math.abs(target - value);
      return reduced ? target : THREE.MathUtils.damp(value, target, 5, Math.min(delta, .05));
    };
    assembly.current.position.x = damp(assembly.current.position.x, narrow ? 0 : viewport.width * .24);
    assembly.current.position.y = damp(assembly.current.position.y, narrow ? input.centerY * viewport.height : -.15);
    assembly.current.rotation.x = damp(assembly.current.rotation.x, .85 + phase * .13 + (reduced ? 0 : input.y * .07));
    assembly.current.rotation.y = damp(assembly.current.rotation.y, -.48 + phase * .8 + (reduced ? 0 : input.x * .16));
    assembly.current.rotation.z = damp(assembly.current.rotation.z, -.13 + phase * .2);
    assembly.current.scale.setScalar(damp(assembly.current.scale.x, targetScale));
    die.current.position.y = damp(die.current.position.y, .23 + spread * .62);
    cover.current.position.y = damp(cover.current.position.y, .51 + spread * 1.16);
    base.current.position.y = damp(base.current.position.y, -.3 - spread * .27);
    if (input.visible && difference > .001 && !reduced) invalidate();
    // Degrade only after sustained slow animation frames; ignore pauses in demand rendering.
    if (delta > .05 && delta < .25 && difference > .01) slowFrames.current++;
    else if (delta < .035) slowFrames.current = Math.max(0, slowFrames.current - 1);
    if (!low && slowFrames.current > 45) { slowFrames.current = 0; degrade(); }
  });
  return <>
    <ambientLight intensity={.45} />
    <directionalLight position={[3,6,4]} intensity={3} color="#d8e9f2" />
    <directionalLight position={[-4,2,-3]} intensity={1.7} color="#9294bd" />
    <Environment resolution={low ? 64 : 128} frames={1}>
      <Lightformer position={[0,5,-3]} rotation={[Math.PI / 2,0,0]} scale={[7,3,1]} intensity={4} color="#dfe9ef" />
      <Lightformer position={[-5,1,2]} rotation={[0,Math.PI / 2,0]} scale={[2,7,1]} intensity={3} color="#8fafbd" />
      <Lightformer position={[4,2,3]} rotation={[0,-Math.PI / 3,0]} scale={[1,5,1]} intensity={4} color="#c4bcd8" />
    </Environment>
    <group ref={assembly} rotation={[.85,-.48,-.13]}>
      <group ref={base} position={[0,-.3,0]}>
        <RoundedBox args={[3.55,.12,3.55]} radius={.07} smoothness={low ? 2 : 3}><meshStandardMaterial color="#535962" metalness={.9} roughness={.28} /></RoundedBox>
        <RoundedBox args={[3.35,.19,3.35]} position={[0,.1,0]} radius={.06} smoothness={2}><meshStandardMaterial color="#111c22" metalness={.55} roughness={.36} /></RoundedBox>
        <Contacts low={low} />
        <group position={[0,.07,0]}><Traces low={low} /></group>
        {[-1,1].flatMap(x => [-1,1].map(z => <mesh key={`${x}-${z}`} position={[x*1.45,.2,z*1.45]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.042,.065,16]} /><meshBasicMaterial color="#a9b8bd" /></mesh>))}
      </group>
      <group ref={die} position={[0,.23,0]}>
        <RoundedBox args={[2.22,.13,2.22]} radius={.035} smoothness={2}><meshStandardMaterial color="#a7b5be" metalness={.96} roughness={.22} /></RoundedBox>
        <RoundedBox args={[1.86,.09,1.86]} position={[0,.08,0]} radius={.025} smoothness={2}><meshStandardMaterial color="#132b35" metalness={.85} roughness={.2} /></RoundedBox>
        <DieGrid low={low} />
      </group>
      <group ref={cover} position={[0,.51,0]}>
        <RoundedBox args={[2.46,.075,2.46]} radius={.08} smoothness={low ? 2 : 4}><meshPhysicalMaterial color="#a8ccd8" metalness={.1} roughness={.12} transparent opacity={low ? .14 : .19} depthWrite={false} clearcoat={1} /></RoundedBox>
        {[-1,1].map(side => <mesh key={side} position={[side*1.19,.045,0]}><boxGeometry args={[.018,.018,2.25]} /><meshStandardMaterial color="#91c5d0" emissive="#569fab" emissiveIntensity={.4} metalness={.7} roughness={.2} /></mesh>)}
      </group>
    </group>
  </>;
}

function StaticProcessor() {
  return <div className="processor-fallback" aria-hidden="true"><div className="fallback-board"><div className="fallback-die" /><div className="fallback-cover" /></div></div>;
}

export default function GlobalThreeD({ expanded = false }: { expanded?: boolean }) {
  const reduced = useSyncExternalStore(subscribe, getMotion, serverMotion);
  const [ready, setReady] = useState(false);
  const [low, setLow] = useState(false);
  const [lost, setLost] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const redraw = useRef<() => void>(() => {});
  const signal = useRef<Signal>({x:0,y:0,scroll:0,visible:true,mobile:false,heroActive:true,centerY:0});
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const canvas = document.createElement("canvas");
    let context: WebGL2RenderingContext | null;
    try { context = canvas.getContext("webgl2"); } catch { context = null; }
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    const device = navigator as Navigator & { deviceMemory?: number };
    const initialize = requestAnimationFrame(() => {
      setLow(mq.matches || navigator.hardwareConcurrency <= 4 || (device.deviceMemory !== undefined && device.deviceMemory <= 4));
      setReady(Boolean(context));
    });
    let frame = 0;
    const update = () => {
      const hero = document.getElementById("home");
      const study = document.getElementById("system-study");
      const stage = document.getElementById("processor-stage");
      if (!hero || !study || !host.current) return;
      const studyRect = study.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      const mobile = mq.matches;
      const visible = heroRect.bottom > 0 || studyRect.bottom > 0;
      const progress = THREE.MathUtils.clamp((window.innerHeight - studyRect.top) / (studyRect.height + window.innerHeight * .15), 0, 1);
      const stageRect = stage?.getBoundingClientRect();
      signal.current.scroll = progress;
      signal.current.mobile = mobile;
      signal.current.heroActive = heroRect.bottom > window.innerHeight * .4;
      signal.current.visible = visible && !document.hidden;
      signal.current.centerY = mobile && stageRect && heroRect.bottom > window.innerHeight * .4 ? .5 - (stageRect.top + stageRect.height * .5) / window.innerHeight : -.2;
      host.current.style.setProperty("--fallback-top", mobile ? `${(.5 - signal.current.centerY) * 100}%` : "50%");
      host.current.style.opacity = visible ? String(Math.min(1, Math.max(0, studyRect.bottom / (window.innerHeight * .3)))) : "0";
      host.current.dataset.phase = progress < .15 ? "assembled" : progress < .8 ? "exploded" : "settled";
      redraw.current();
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const pointer = (event: PointerEvent) => {
      if (reduced || event.pointerType === "touch" || !signal.current.visible) return;
      signal.current.x = event.clientX / window.innerWidth - .5;
      signal.current.y = event.clientY / window.innerHeight - .5;
      redraw.current();
    };
    const resize = () => { if (mq.matches) setLow(true); schedule(); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, {passive:true});
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", pointer, {passive:true});
    document.addEventListener("visibilitychange", schedule);
    schedule();
    return () => { cancelAnimationFrame(initialize); cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll",schedule); window.removeEventListener("resize",resize); window.removeEventListener("pointermove",pointer); document.removeEventListener("visibilitychange",schedule); };
  }, [reduced]);
  return <div ref={host} className="engineering-canvas" data-expanded={expanded} data-quality={low ? "light" : "full"} aria-hidden="true">
    <SceneBoundary fallback={<StaticProcessor />}>
      {ready && !lost ? <Canvas frameloop="demand" dpr={low ? 1 : [1,1.5]} camera={{position:[0,0,9],fov:36}} gl={{alpha:true,antialias:!low,powerPreference:"low-power"}} onCreated={({invalidate,gl}) => { redraw.current = invalidate; gl.domElement.addEventListener("webglcontextlost", () => setLost(true), {once:true}); }}>
        <Processor signal={signal} expanded={expanded} reduced={reduced} low={low} degrade={() => setLow(true)} />
      </Canvas> : <StaticProcessor />}
    </SceneBoundary>
  </div>;
}


