"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import HamburgerMenu from "./HamburgerMenu";
import Navbar from "./Navbar";

gsap.registerPlugin(ScrollTrigger);


export default function Logo3D() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoMeshRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup with transparency
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Yellow lighting for metallic effect
    const ambientLight = new THREE.AmbientLight(0xffff00, 0.4);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffd700, 1.5);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffaa00, 1);
    directionalLight2.position.set(-5, -5, 5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xffff00, 1, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Load the logo texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/fest_logo.png", (texture) => {
      const image = texture.image as HTMLImageElement;
      const aspectRatio = image.width / image.height;
      
      // Create group to hold all parts
      const group = new THREE.Group();
      
      // Dimensions
      const planeHeight = 2.8;
      const planeWidth = planeHeight * aspectRatio;
      const depth = 0.3;

      // Create front plane with logo texture (with alpha test for transparency)
      const frontGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.5,
        metalness: 0.3,
        roughness: 0.4,
        side: THREE.FrontSide,
      });
      const frontPlane = new THREE.Mesh(frontGeometry, frontMaterial);
      frontPlane.position.z = depth / 2;
      group.add(frontPlane);

      // Create back plane with logo texture (mirrored)
      const backGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
      const backMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.5,
        metalness: 0.3,
        roughness: 0.4,
        side: THREE.FrontSide,
      });
      const backPlane = new THREE.Mesh(backGeometry, backMaterial);
      backPlane.position.z = -depth / 2;
      backPlane.rotation.y = Math.PI;
      backPlane.scale.x = -1; // Mirror horizontally
      group.add(backPlane);

      // Create edge geometry using alpha channel
      // We'll create a "shell" effect by rendering multiple offset layers
      const canvas2d = document.createElement("canvas");
      const ctx = canvas2d.getContext("2d");
      if (ctx) {
        canvas2d.width = image.width;
        canvas2d.height = image.height;
        ctx.drawImage(image, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas2d.width, canvas2d.height);
        const data = imageData.data;
        
        // Create edge geometry by finding edge pixels and creating small boxes
        const edgePositions: number[] = [];
        const threshold = 128;
        const pixelScale = planeWidth / image.width;
        
        // Sample every pixel for continuous edge (no gaps)
        const sampleRate = 1;
        
        for (let y = 0; y < image.height; y += sampleRate) {
          for (let x = 0; x < image.width; x += sampleRate) {
            const idx = (y * image.width + x) * 4;
            const alpha = data[idx + 3];
            
            if (alpha >= threshold) {
              // Check if this is an edge pixel (check all 8 directions for better edge detection)
              const checkAlpha = (cx: number, cy: number) => {
                if (cx < 0 || cx >= image.width || cy < 0 || cy >= image.height) return 0;
                return data[(cy * image.width + cx) * 4 + 3];
              };
              
              const isEdge = 
                checkAlpha(x - 1, y) < threshold ||
                checkAlpha(x + 1, y) < threshold ||
                checkAlpha(x, y - 1) < threshold ||
                checkAlpha(x, y + 1) < threshold ||
                checkAlpha(x - 1, y - 1) < threshold ||
                checkAlpha(x + 1, y - 1) < threshold ||
                checkAlpha(x - 1, y + 1) < threshold ||
                checkAlpha(x + 1, y + 1) < threshold;
              
              if (isEdge) {
                // Convert to 3D coordinates (centered)
                const px = (x - image.width / 2) * pixelScale;
                const py = -(y - image.height / 2) * pixelScale;
                edgePositions.push(px, py);
              }
            }
          }
        }
        
        // Create small boxes at each edge position to form the metallic edge
        // Make boxes larger to ensure overlap and no gaps
        const edgeBoxSize = pixelScale * 2.0;
        const edgeMaterial = new THREE.MeshStandardMaterial({
          color: 0xffd700,
          metalness: 0.95,
          roughness: 0.15,
        });
        
        // Use instanced mesh for better performance
        const edgeBoxGeometry = new THREE.BoxGeometry(edgeBoxSize, edgeBoxSize, depth);
        const instanceCount = edgePositions.length / 2;
        const instancedMesh = new THREE.InstancedMesh(edgeBoxGeometry, edgeMaterial, instanceCount);
        
        const dummy = new THREE.Object3D();
        for (let i = 0; i < instanceCount; i++) {
          dummy.position.set(edgePositions[i * 2], edgePositions[i * 2 + 1], 0);
          dummy.updateMatrix();
          instancedMesh.setMatrixAt(i, dummy.matrix);
        }
        instancedMesh.instanceMatrix.needsUpdate = true;
        group.add(instancedMesh);
      }

      logoMeshRef.current = group;
      scene.add(group);

      // GSAP ScrollTrigger for vertical rotation on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          if (logoMeshRef.current && !isDraggingRef.current) {
            logoMeshRef.current.rotation.x = self.progress * Math.PI * 2;
          }
        },
      });
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (logoMeshRef.current) {
        logoMeshRef.current.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Mouse/touch interaction for free rotation
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !logoMeshRef.current) return;

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      logoMeshRef.current.rotation.y += deltaX * 0.01;
      logoMeshRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !logoMeshRef.current) return;

      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      logoMeshRef.current.rotation.y += deltaX * 0.01;
      logoMeshRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const canvasEl = canvasRef.current;
    canvasEl.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvasEl.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      canvasEl.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvasEl.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-4"
    >
      {/* Navbar with Logo and Hamburger Button */}
      <Navbar isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      
      {/* Hamburger Menu */}
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover -z-10"
      >
        <source src="/background_video.mp4" type="video/mp4" />
      </video>

      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10"
      />
    </div>
  );
}
