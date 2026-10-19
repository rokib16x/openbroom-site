"use client";

import { useEffect, useRef } from "react";

/**
 * The OpenBroom mark in 3D: an open glass ring with three bristle bars sweeping through the gap.
 * three.js is loaded on demand, pauses when off-screen, and renders a single still frame for reduced motion.
 */
export default function Hero3D() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        return; // no WebGL: the page simply has no 3D mark
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;
      scene.environmentIntensity = 1.1;

      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
      camera.position.set(0, 0, 9);

      const key = new THREE.DirectionalLight(0xffffff, 3.2);
      key.position.set(3, 4, 5);
      const rim = new THREE.PointLight(0x7aa2ff, 140, 24);
      rim.position.set(-4, -1, 3);
      scene.add(key, rim);

      // --- the mark ---
      const mark = new THREE.Group();
      const R = 1.25;
      const tube = 0.3;
      const gap = THREE.MathUtils.degToRad(70);
      const ringGeo = new THREE.TorusGeometry(R, tube, 72, 220, Math.PI * 2 - gap);
      // Frosted-glass look without real transmission: that needs an opaque scene behind it and reads as black on a transparent canvas.
      const glass = new THREE.MeshPhysicalMaterial({
        color: 0x9fbaff,
        metalness: 0.05,
        roughness: 0.14,
        transparent: true,
        opacity: 0.9,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        sheen: 1,
        sheenColor: new THREE.Color(0x9bb8ff),
        sheenRoughness: 0.4,
        envMapIntensity: 2.2,
        emissive: new THREE.Color(0x3a5fd0),
        emissiveIntensity: 0.3,
      });
      const ring = new THREE.Mesh(ringGeo, glass);
      ring.rotation.z = gap / 2; // centre the opening on +x
      mark.add(ring);

      const barDefs: [number, number, number][] = [
        [1.73, 0.32, 0x2f6bff],
        [1.29, 0, 0x5b8dff],
        [0.89, -0.32, 0x9dbbff],
      ];
      const barR = 0.105;
      const barGeos: import("three").BufferGeometry[] = [];
      const barMats: import("three").Material[] = [];
      barDefs.forEach(([len, y, color]) => {
        const geo = new THREE.CapsuleGeometry(barR, Math.max(0.01, len - barR * 2), 12, 28);
        const mat = new THREE.MeshPhysicalMaterial({
          color, roughness: 0.22, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.12,
          emissive: color, emissiveIntensity: 0.6,
        });
        const bar = new THREE.Mesh(geo, mat);
        bar.rotation.z = Math.PI / 2;
        bar.position.set(len / 2, y, 0);
        mark.add(bar);
        barGeos.push(geo);
        barMats.push(mat);
      });

      const holder = new THREE.Group();
      holder.add(mark);
      mark.rotation.z = -Math.PI / 4; // the brand mark sits at 45 degrees
      scene.add(holder);

      // --- layout in CSS pixels ---
      let W = 1, H = 1;
      const layout = () => {
        W = el.clientWidth || 1;
        H = el.clientHeight || 1;
        renderer.setSize(W, H, false);
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
        const unit = (2 * halfH) / H; // world units per CSS pixel
        const wide = W >= 1100, mid = W >= 760;
        const sizePx = wide ? 330 : mid ? 190 : 150;
        const cx = wide ? W - 175 : mid ? W - 110 : W - 70;
        const cy = wide ? 250 : mid ? 118 : 96;
        holder.scale.setScalar((sizePx * unit) / (2 * (R + tube)));
        holder.position.set((cx - W / 2) * unit, (H / 2 - cy) * unit, 0);
      };
      layout();
      const ro = new ResizeObserver(layout);
      ro.observe(el);

      // --- motion ---
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (e: PointerEvent) => {
        pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let raf = 0;
      let visible = true;
      const clock = new THREE.Clock();
      const frame = () => {
        raf = 0;
        const t = clock.getElapsedTime();
        pointer.x += (pointer.tx - pointer.x) * 0.06;
        pointer.y += (pointer.ty - pointer.y) * 0.06;
        const scrollTilt = Math.min(window.scrollY, 900) * 0.0011;
        holder.rotation.y = pointer.x * 0.5 + Math.sin(t * 0.35) * 0.28 + scrollTilt;
        holder.rotation.x = pointer.y * 0.3 + 0.12 + Math.cos(t * 0.3) * 0.06;
        mark.position.y = Math.sin(t * 0.9) * 0.08;
        renderer.render(scene, camera);
        if (visible && !reduce) raf = requestAnimationFrame(frame);
      };
      const start = () => { if (!raf) raf = requestAnimationFrame(frame); };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      });
      io.observe(el);

      frame();
      el.classList.add("ready");

      cleanup = () => {
        if (raf) cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        ringGeo.dispose();
        glass.dispose();
        barGeos.forEach((g) => g.dispose());
        barMats.forEach((m) => m.dispose());
        envTex.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
      if (disposed) cleanup();
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={host} className="hero3d" aria-hidden="true" />;
}
