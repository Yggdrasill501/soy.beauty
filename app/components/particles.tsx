"use client";

import React, { useRef, useEffect, useState } from "react";
import { useMousePosition } from "@/util/mouse";

interface ParticlesProps {
	className?: string;
	quantity?: number;
	staticity?: number;
	ease?: number;
	refresh?: boolean;
}

export default function Particles({
	className = "",
	quantity = 30,
	staticity = 50,
	ease = 50,
	refresh = false,
}: ParticlesProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const circles = useRef<any[]>([]);
	const mousePosition = useMousePosition();
	const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
	const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

	useEffect(() => {
		if (canvasRef.current) {
			context.current = canvasRef.current.getContext("2d");
		}
		initCanvas();
		animate();
		window.addEventListener("resize", initCanvas);

		return () => {
			window.removeEventListener("resize", initCanvas);
		};
	}, []);

	useEffect(() => {
		onMouseMove();
	}, [mousePosition.x, mousePosition.y]);

	useEffect(() => {
		initCanvas();
	}, [refresh]);

	const initCanvas = () => {
		resizeCanvas();
		drawParticles();
	};

	const onMouseMove = () => {
		if (canvasRef.current) {
			const rect = canvasRef.current.getBoundingClientRect();
			const { w, h } = canvasSize.current;
			const x = mousePosition.x - rect.left - w / 2;
			const y = mousePosition.y - rect.top - h / 2;
			const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
			if (inside) {
				mouse.current.x = x;
				mouse.current.y = y;
			}
		}
	};

	type Circle = {
		x: number;
		y: number;
		translateX: number;
		translateY: number;
		size: number;
		alpha: number;
		targetAlpha: number;
		dx: number;
		dy: number;
		magnetism: number;
	};

	const resizeCanvas = () => {
		if (canvasContainerRef.current && canvasRef.current && context.current) {
			circles.current.length = 0;
			canvasSize.current.w = canvasContainerRef.current.offsetWidth;
			canvasSize.current.h = canvasContainerRef.current.offsetHeight;
			canvasRef.current.width = canvasSize.current.w * dpr;
			canvasRef.current.height = canvasSize.current.h * dpr;
			canvasRef.current.style.width = `${canvasSize.current.w}px`;
			canvasRef.current.style.height = `${canvasSize.current.h}px`;
			context.current.scale(dpr, dpr);
		}
	};

	const circleParams = (): Circle => {
		const x = Math.floor(Math.random() * canvasSize.current.w);
		const y = Math.floor(Math.random() * canvasSize.current.h);
		const translateX = 0;
		const translateY = 0;
		// Create a mix of tiny and larger stars
		const size = Math.random() > 0.8 ? 
			Math.random() * 2 + 1 : // Larger stars (20% chance)
			Math.random() * 0.8 + 0.3; // Smaller stars (80% chance)
		const alpha = 0;
		// Create more variance in brightness for twinkling effect
		const targetAlpha = parseFloat((Math.random() * 0.8 + 0.2).toFixed(1));
		// Slower movement for stars
		const dx = (Math.random() - 0.5) * 0.05;
		const dy = (Math.random() - 0.5) * 0.05;
		const magnetism = 0.1 + Math.random() * 2;
		return {
			x,
			y,
			translateX,
			translateY,
			size,
			alpha,
			targetAlpha,
			dx,
			dy,
			magnetism,
		};
	};

	const drawCircle = (circle: Circle, update = false) => {
		if (context.current) {
			const { x, y, translateX, translateY, size, alpha } = circle;
			context.current.translate(translateX, translateY);
			
			// Draw a more defined star shape
			const spikes = 4 + Math.floor(Math.random() * 2); // 4 or 5 pointed stars for variety
			const outerRadius = size * 1.2; // Slightly larger outer radius
			const innerRadius = size / 3.5; // Smaller inner radius for more pronounced points
			let rot = Math.PI / 2 * 3 + (Math.random() * 0.5); // Slight rotation variance
			let step = Math.PI / spikes;
			
			context.current.beginPath();
			context.current.moveTo(x, y - outerRadius);
			
			for (let i = 0; i < spikes; i++) {
				context.current.lineTo(
					x + Math.cos(rot) * outerRadius,
					y + Math.sin(rot) * outerRadius
				);
				rot += step;
				
				context.current.lineTo(
					x + Math.cos(rot) * innerRadius,
					y + Math.sin(rot) * innerRadius
				);
				rot += step;
			}
			
			context.current.lineTo(x, y - outerRadius);
			context.current.closePath();
			
			// Enhanced glow effect with brighter center
			const gradient = context.current.createRadialGradient(
				x, y, 0, 
				x, y, outerRadius * 2
			);
			
			// Random color tint for some stars
			const hue = Math.random() > 0.7 ? 
				(Math.random() > 0.5 ? '255, 240, 220' : '220, 240, 255') : 
				'255, 255, 255';
			
			gradient.addColorStop(0, `rgba(${hue}, ${alpha * 1.2})`);
			gradient.addColorStop(0.4, `rgba(${hue}, ${alpha * 0.8})`);
			gradient.addColorStop(1, `rgba(${hue}, 0)`);
			
			context.current.fillStyle = gradient;
			context.current.fill();
			context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

			if (!update) {
				circles.current.push(circle);
			}
		}
	};

	const clearContext = () => {
		if (context.current) {
			context.current.clearRect(
				0,
				0,
				canvasSize.current.w,
				canvasSize.current.h,
			);
		}
	};

	const drawParticles = () => {
		clearContext();
		const particleCount = quantity;
		for (let i = 0; i < particleCount; i++) {
			const circle = circleParams();
			drawCircle(circle);
		}
	};

	const remapValue = (
		value: number,
		start1: number,
		end1: number,
		start2: number,
		end2: number,
	): number => {
		const remapped =
			((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
		return remapped > 0 ? remapped : 0;
	};

	const animate = () => {
		clearContext();
		circles.current.forEach((circle: Circle, i: number) => {
			// Handle the alpha value
			const edge = [
				circle.x + circle.translateX - circle.size, // distance from left edge
				canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
				circle.y + circle.translateY - circle.size, // distance from top edge
				canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
			];
			const closestEdge = edge.reduce((a, b) => Math.min(a, b));
			const remapClosestEdge = parseFloat(
				remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
			);
			
			// Add twinkling effect - stars randomly change brightness
			if (Math.random() > 0.995) {
				circle.targetAlpha = parseFloat((Math.random() * 0.8 + 0.2).toFixed(1));
			}
			
			if (remapClosestEdge > 1) {
				// Smoother transition for twinkling
				circle.alpha += (circle.targetAlpha - circle.alpha) * 0.01;
			} else {
				circle.alpha = circle.targetAlpha * remapClosestEdge;
			}
			circle.x += circle.dx;
			circle.y += circle.dy;
			circle.translateX +=
				(mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
				ease;
			circle.translateY +=
				(mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
				ease;
			// circle gets out of the canvas
			if (
				circle.x < -circle.size ||
				circle.x > canvasSize.current.w + circle.size ||
				circle.y < -circle.size ||
				circle.y > canvasSize.current.h + circle.size
			) {
				// remove the circle from the array
				circles.current.splice(i, 1);
				// create a new circle
				const newCircle = circleParams();
				drawCircle(newCircle);
				// update the circle position
			} else {
				drawCircle(
					{
						...circle,
						x: circle.x,
						y: circle.y,
						translateX: circle.translateX,
						translateY: circle.translateY,
						alpha: circle.alpha,
					},
					true,
				);
			}
		});
		window.requestAnimationFrame(animate);
	};

	return (
		<div className={className} ref={canvasContainerRef} aria-hidden="true">
			<canvas ref={canvasRef} />
		</div>
	);
}
