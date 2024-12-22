"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

type VisualizationMode = "real" | "imaginary" | "complex";

export const SphericalHarmonicsVisualization = () => {
  const [l, setL] = useState(4);
  const [m, setM] = useState(2);
  const [draftL, setDraftL] = useState(4);
  const [draftM, setDraftM] = useState(2);
  const [mode, setMode] = useState<VisualizationMode>("real");
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const isInitializedRef = useRef(false);

  // Debounced update function
  const debouncedUpdate = useCallback((newL: number, newM: number) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    updateTimeoutRef.current = setTimeout(() => {
      setL(newL);
      setM(newM);
    }, 100); // 100ms delay
  }, []);

  // Calculate associated Legendre polynomial P_l^m(x)
  const calculateLegendreP = (l: number, m: number, x: number): number => {
    if (m < 0 || m > l) return 0;

    // Handle edge cases
    if (l === 0) return 1;

    // Calculate P_m^m
    let pmm = 1.0;
    const somx2 = Math.sqrt((1 - x) * (1 + x));
    let fact = 1.0;
    for (let i = 1; i <= m; i++) {
      pmm *= -fact * somx2;
      fact += 2.0;
    }

    if (l === m) return pmm;

    // Calculate P_(m+1)^m
    let pmmp1 = x * (2 * m + 1) * pmm;
    if (l === m + 1) return pmmp1;

    // Calculate P_l^m using recurrence formula
    let pll = 0.0;
    for (let ll = m + 2; ll <= l; ll++) {
      pll = (x * (2 * ll - 1) * pmmp1 - (ll + m - 1) * pmm) / (ll - m);
      pmm = pmmp1;
      pmmp1 = pll;
    }

    return pll;
  };

  // Calculate spherical harmonic Y(l,m)
  const calculateYlm = (l: number, m: number, theta: number, phi: number) => {
    const cosTheta = Math.cos(theta);
    const norm = Math.sqrt(
      ((2 * l + 1) * factorial(l - Math.abs(m))) /
        (4 * Math.PI * factorial(l + Math.abs(m)))
    );

    const legendre = calculateLegendreP(l, Math.abs(m), cosTheta);

    // Calculate both real and imaginary parts
    const real = Math.cos(m * phi);
    const imag = Math.sin(m * phi);

    // For m < 0, multiply by (-1)^m
    const mSign = m < 0 ? (Math.abs(m) % 2 === 0 ? 1 : -1) : 1;

    return {
      real: norm * legendre * real * mSign,
      imag: norm * legendre * imag * mSign,
    };
  };

  // Helper function to calculate factorial
  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  // Convert function value to color using a modern, vibrant color scheme
  const valueToColor = (
    value: number | { real: number; imag: number },
    mode: VisualizationMode
  ) => {
    if (mode === "complex") {
      // For complex mode, use HSL color space where hue represents phase
      const { real, imag } = value as { real: number; imag: number };
      const phase = Math.atan2(imag, real);
      const magnitude = Math.sqrt(real * real + imag * imag);
      const hue = ((phase / Math.PI) * 180 + 180) % 360; // Map [-π, π] to [0, 360]
      const lightness = 0.4 + 0.35 * Math.min(magnitude, 1); // Adjusted lightness range for more vibrancy
      return new THREE.Color().setHSL(hue / 360, 0.9, lightness); // Increased saturation to 0.9
    } else {
      // Original color scheme for real/imaginary parts
      const val =
        typeof value === "number"
          ? value
          : mode === "real"
          ? value.real
          : value.imag;
      return val >= 0 ? new THREE.Color(0x5c9fff) : new THREE.Color(0xff6b8b);
    }
  };

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current || isInitializedRef.current) return;
    isInitializedRef.current = true;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xffffff);

    // Setup camera
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = Math.min(
      containerWidth * 0.8,
      window.innerHeight * 0.98
    );
    const camera = new THREE.PerspectiveCamera(
      45,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 1.6;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(containerWidth, containerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight1.position.set(1, 2, 3);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight2.position.set(-1, -2, -3);
    scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight3.position.set(3, -2, 1);
    scene.add(directionalLight3);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.position.set(0, 1, 0);
    scene.add(hemiLight);

    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 15.0;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minDistance = 1.6;
    controls.maxDistance = 1.6;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !containerRef.current)
        return;
      const width = containerRef.current.clientWidth;
      const height = Math.min(width * 0.8, window.innerHeight * 0.98);
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, []); // Only run once on mount

  // Update sphere when l or m changes
  useEffect(() => {
    if (!sceneRef.current) return;

    const updateSphere = () => {
      const geometry = new THREE.SphereGeometry(1, 512, 512);
      const material = new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.5,
        metalness: 0.1,
      });

      const colors: THREE.Color[] = [];
      const positions = geometry.attributes.position.array;
      const originalPositions = positions.slice();

      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        const z = originalPositions[i + 2];

        const r = Math.sqrt(x * x + y * y + z * z);
        const theta = Math.acos(z / r);
        const phi = Math.atan2(y, x);

        const ylm = calculateYlm(l, m, theta, phi);
        let scale: number;

        if (mode === "complex") {
          scale =
            0.05 + Math.sqrt(ylm.real * ylm.real + ylm.imag * ylm.imag) * 0.95;
        } else {
          const value = mode === "real" ? ylm.real : ylm.imag;
          scale = 0.05 + Math.abs(value) * 0.95;
        }

        positions[i] = x * scale;
        positions[i + 1] = y * scale;
        positions[i + 2] = z * scale;

        colors.push(valueToColor(ylm, mode));
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(
          colors.flatMap((color) => [color.r, color.g, color.b]),
          3
        )
      );

      if (sphereRef.current) {
        sceneRef.current?.remove(sphereRef.current);
        sphereRef.current.geometry.dispose();
        (sphereRef.current.material as THREE.Material).dispose();
      }

      const sphere = new THREE.Mesh(geometry, material);
      sphereRef.current = sphere;
      sceneRef.current?.add(sphere);
    };

    updateSphere();
  }, [l, m, mode]);

  const handleLChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newL = parseInt(e.target.value);
      setDraftL(newL);
      if (Math.abs(draftM) > newL) {
        const newM = 0;
        setDraftM(newM);
        debouncedUpdate(newL, newM);
      } else {
        debouncedUpdate(newL, draftM);
      }
    },
    [draftM, debouncedUpdate]
  );

  const handleMChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newM = parseInt(e.target.value);
      setDraftM(newM);
      debouncedUpdate(draftL, newM);
    },
    [draftL, debouncedUpdate]
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-8 flex flex-col sm:flex-row gap-6 sm:gap-12 items-center">
        <div className="flex flex-col items-center w-full sm:w-auto px-4 sm:px-0">
          <label className="text-lg font-medium mb-2">
            <InlineMath math={`\\ell = ${draftL}`} />
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={draftL}
            onChange={handleLChange}
            className="w-full sm:w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
        <div className="flex flex-col items-center w-full sm:w-auto px-4 sm:px-0">
          <label className="text-lg font-medium mb-2">
            <InlineMath math={`m = ${draftM}`} />
          </label>
          <input
            type="range"
            min={-draftL}
            max={draftL}
            value={draftM}
            onChange={handleMChange}
            className="w-full sm:w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
        <div className="flex flex-col items-center w-full sm:w-auto px-4 sm:px-0">
          <label className="text-lg font-medium mb-2">Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as VisualizationMode)}
            className="px-3 py-1 border border-gray-300 rounded-md bg-white"
          >
            <option value="real">Real</option>
            <option value="imaginary">Imaginary</option>
            <option value="complex">Complex</option>
          </select>
        </div>
      </div>
      <div ref={containerRef} style={{ width: "100%", height: "auto" }} />
    </div>
  );
};
