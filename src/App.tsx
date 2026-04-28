import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function App() {
	const ref = useRef<HTMLCanvasElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });

	const { scrollYProgress } = useScroll({
		target: scrollRef,
		offset: ['start start', 'end end'],
	});

	const images = useMemo(() => {
		const loadedImages: HTMLImageElement[] = [];

		for (let i = 1; i <= 250; i++) {
			const img = new Image();
			img.src = `/images/${String(i).padStart(4, '0')}.webp`;
			loadedImages.push(img);
		}

		return loadedImages;
	}, []);

	const render = useCallback(
		(index: number) => {
			const canvas = ref.current;
			if (!canvas || !images[index - 1]) return;

			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			const img = images[index - 1];
			const scale = Math.max(canvasSize.width / img.width, canvasSize.height / img.height);
			const x = (canvasSize.width - img.width * scale) / 2;
			const y = (canvasSize.height - img.height * scale) / 2;

			ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
			ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
		},
		[images, canvasSize]
	);

	const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 250]);

	useMotionValueEvent(currentIndex, 'change', (latest) => {
		render(Number(latest.toFixed()));
	});

	useEffect(() => {
		render(1);
	}, [render]);

	useEffect(() => {
		const handleResize = () => {
			setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div ref={scrollRef}>
			<div style={{ height: '3000px' }}>
				<canvas
					ref={ref}
					width={canvasSize.width}
					height={canvasSize.height}
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100vw',
						height: '100vh',
						backgroundColor: 'black',
					}}
				/>
			</div>
			{/* Explicación de Liposoma */}
			<div
				style={{
					position: 'relative',
					zIndex: 10,
					backgroundColor: '#ffffff',
					background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 50%, #f0f4ff 100%)',
					padding: '100px 40px',
					minHeight: '100vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{/* Decorative top element */}
				<div
					style={{
						position: 'absolute',
						top: -50,
						left: '50%',
						transform: 'translateX(-50%)',
						width: '200px',
						height: '200px',
						background: 'linear-gradient(135deg, #0066ff 0%, #00d4ff 100%)',
						borderRadius: '50%',
						opacity: 0.1,
						filter: 'blur(40px)',
					}}
				/>

				<h1
					style={{
						fontSize: '64px',
						fontWeight: '900',
						marginBottom: '50px',
						background: 'linear-gradient(135deg, #0066ff 0%, #00d4ff 50%, #0066ff 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
						textAlign: 'center',
						letterSpacing: '-1px',
					}}
				>
					¿Qué es un Liposoma?
				</h1>

				{/* Main content card */}
				<div
					style={{
						maxWidth: '1100px',
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: '60px',
						marginBottom: '80px',
						alignItems: 'center',
					}}
				>
					{/* Text content */}
					<div>
						<p
							style={{
								fontSize: '18px',
								lineHeight: '1.9',
								color: '#1a1a2e',
								marginBottom: '24px',
								fontWeight: '500',
							}}
						>
							Un <span style={{ color: '#0066ff', fontWeight: '700' }}>liposoma</span> es una estructura esférica microscópica formada por una <span style={{ color: '#00d4ff', fontWeight: '700' }}>bicapa lipídica</span> que envuelve una cavidad acuosa.
						</p>

						<p
							style={{
								fontSize: '18px',
								lineHeight: '1.9',
								color: '#1a1a2e',
								marginBottom: '24px',
								fontWeight: '500',
							}}
						>
							Estas diminutas vesículas están compuestas principalmente por <span style={{ color: '#0066ff', fontWeight: '700' }}>fosfolípidos</span>, los mismos componentes que forman las membranas celulares.
						</p>

						<p
							style={{
								fontSize: '18px',
								lineHeight: '1.9',
								color: '#1a1a2e',
								fontWeight: '500',
							}}
						>
							Su similitud con las membranas biológicas los hace especialmente valiosos para transportar medicamentos y sustancias dentro del cuerpo de manera segura y eficiente.
						</p>
					</div>

					{/* Features grid */}
					<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
						{[
							{ icon: '💊', title: 'Entrega de Fármacos', desc: 'Transporte seguro de medicinas' },
							{ icon: '🔬', title: 'Investigación', desc: 'Estudio celular avanzado' },
							{ icon: '✨', title: 'Cosmética', desc: 'Productos dermatológicos' },
							{ icon: '🧬', title: 'Biología', desc: 'Comprender membranas celulares' },
						].map((item, idx) => (
							<div
								key={idx}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '16px',
									padding: '20px',
									backgroundColor: 'rgba(0, 102, 255, 0.05)',
									borderRadius: '16px',
									border: '1px solid rgba(0, 102, 255, 0.15)',
									transition: 'all 0.3s ease',
									cursor: 'pointer',
								}}
								onMouseEnter={(e) => {
									const el = e.currentTarget;
									el.style.backgroundColor = 'rgba(0, 102, 255, 0.12)';
									el.style.transform = 'translateX(8px)';
									el.style.borderColor = 'rgba(0, 102, 255, 0.4)';
								}}
								onMouseLeave={(e) => {
									const el = e.currentTarget;
									el.style.backgroundColor = 'rgba(0, 102, 255, 0.05)';
									el.style.transform = 'translateX(0)';
									el.style.borderColor = 'rgba(0, 102, 255, 0.15)';
								}}
							>
								<div style={{ fontSize: '32px' }}>{item.icon}</div>
								<div>
									<div style={{ fontSize: '16px', fontWeight: '700', color: '#0066ff' }}>
										{item.title}
									</div>
									<div style={{ fontSize: '14px', color: '#666' }}>{item.desc}</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Applications Section */}
				<div
					style={{
						width: '100%',
						maxWidth: '1100px',
						marginBottom: '60px',
					}}
				>
					<h2
						style={{
							fontSize: '36px',
							fontWeight: '800',
							marginBottom: '40px',
							color: '#1a1a2e',
							textAlign: 'center',
						}}
					>
						Aplicaciones <span style={{ background: 'linear-gradient(135deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Principales</span>
					</h2>

					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
							gap: '24px',
						}}
					>
						{[
							{
								title: 'Medicina Oncológica',
								desc: 'Entrega dirigida de quimioterapéuticos',
								color: '#ff6b6b',
								bgColor: 'rgba(255, 107, 107, 0.08)',
								borderColor: 'rgba(255, 107, 107, 0.2)',
							},
							{
								title: 'Vacunas',
								desc: 'Sistema de distribución inmunológico',
								color: '#4ecdc4',
								bgColor: 'rgba(78, 205, 196, 0.08)',
								borderColor: 'rgba(78, 205, 196, 0.2)',
							},
							{
								title: 'Cosmética Premium',
								desc: 'Penetración profunda de nutrientes',
								color: '#ffa502',
								bgColor: 'rgba(255, 165, 2, 0.08)',
								borderColor: 'rgba(255, 165, 2, 0.2)',
							},
							{
								title: 'Diagnóstico',
								desc: 'Imagen médica avanzada',
								color: '#6c5ce7',
								bgColor: 'rgba(108, 92, 231, 0.08)',
								borderColor: 'rgba(108, 92, 231, 0.2)',
							},
							{
								title: 'Terapia Génica',
								desc: 'Transporte de material genético',
								color: '#00b894',
								bgColor: 'rgba(0, 184, 148, 0.08)',
								borderColor: 'rgba(0, 184, 148, 0.2)',
							},
							{
								title: 'Investigación',
								desc: 'Modelos celulares y estudio',
								color: '#0066ff',
								bgColor: 'rgba(0, 102, 255, 0.08)',
								borderColor: 'rgba(0, 102, 255, 0.2)',
							},
						].map((app, idx) => (
							<div
								key={idx}
								style={{
									backgroundColor: app.bgColor,
									border: `2px solid ${app.borderColor}`,
									padding: '32px 24px',
									borderRadius: '20px',
									transition: 'all 0.3s ease',
									cursor: 'pointer',
									position: 'relative',
									overflow: 'hidden',
								}}
								onMouseEnter={(e) => {
									const el = e.currentTarget;
									el.style.transform = 'translateY(-8px)';
									el.style.boxShadow = `0 16px 40px ${app.color}22`;
									el.style.borderColor = app.color;
								}}
								onMouseLeave={(e) => {
									const el = e.currentTarget;
									el.style.transform = 'translateY(0)';
									el.style.boxShadow = 'none';
									el.style.borderColor = app.borderColor;
								}}
							>
								<div
									style={{
										position: 'absolute',
										top: 0,
										right: 0,
										width: '100px',
										height: '100px',
										background: `linear-gradient(135deg, ${app.color}33 0%, transparent 70%)`,
										borderRadius: '50%',
										transform: 'translate(40%, -40%)',
									}}
								/>
								<h3
									style={{
										fontSize: '20px',
										fontWeight: '700',
										marginBottom: '12px',
										color: app.color,
										position: 'relative',
										zIndex: 1,
									}}
								>
									{app.title}
								</h3>
								<p
									style={{
										fontSize: '15px',
										color: '#666',
										lineHeight: '1.6',
										position: 'relative',
										zIndex: 1,
									}}
								>
									{app.desc}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Bottom CTA */}
				<div
					style={{
						textAlign: 'center',
						marginTop: '60px',
					}}
				>
					<p
						style={{
							fontSize: '16px',
							color: '#666',
							marginBottom: '24px',
							fontWeight: '500',
						}}
					>
						La visualización anterior muestra la estructura tridimensional completa de un liposoma
					</p>
					<button
						style={{
							padding: '16px 40px',
							fontSize: '16px',
							fontWeight: '700',
							background: 'linear-gradient(135deg, #0066ff 0%, #00d4ff 100%)',
							color: 'white',
							border: 'none',
							borderRadius: '50px',
							cursor: 'pointer',
							transition: 'all 0.3s ease',
							boxShadow: '0 8px 24px rgba(0, 102, 255, 0.3)',
						}}
						onMouseEnter={(e) => {
							const el = e.currentTarget;
							el.style.transform = 'scale(1.05)';
							el.style.boxShadow = '0 12px 32px rgba(0, 102, 255, 0.4)';
						}}
						onMouseLeave={(e) => {
							const el = e.currentTarget;
							el.style.transform = 'scale(1)';
							el.style.boxShadow = '0 8px 24px rgba(0, 102, 255, 0.3)';
						}}
					>
						Conocer más
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
