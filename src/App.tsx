import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const ADVANTAGES = [
	{
		title: "Quelació més específica i biocompatible",
		desc: "A diferència dels quelants metàl·lics convencionals, la histidina es troba exposada a la superfície del liposoma, permetent una interacció més localitzada amb els ions metàl·lics implicats en l'agregació del β-amiloide. Aquesta aproximació podria reduir els efectes sistèmics associats a la quelació no específica.",
		color: '#2563eb',
	},
	{
		title: "Plataforma basada en nanomedicina",
		desc: "Els liposomes són nanopartícules biocompatibles àmpliament utilitzades en aplicacions biomèdiques. La seva estructura permet funcionalitzar-ne la superfície i adaptar-ne les propietats per a diferents aplicacions terapèutiques.",
		color: '#0891b2',
	},
	{
		title: "Potencial administració intranasal",
		desc: "El projecte planteja la via intranasal com una possible estratègia per facilitar l'arribada del nanosistema al cervell i superar parcialment les limitacions de la barrera hematoencefàlica.",
		color: '#7c3aed',
	},
	{
		title: "Modular l'agregació sense destruir metalls essencials",
		desc: "L'objectiu del nanosistema no és eliminar completament els ions metàl·lics de l'organisme, sinó competir localment pels ions implicats en l'agregació amiloide i modular-ne el procés.",
		color: '#059669',
	},
	{
		title: "Potencial translacional",
		desc: "Tot i tractar-se d'una proposta en fase experimental, aquesta estratègia podria contribuir al desenvolupament futur de noves aproximacions nanotecnològiques per al tractament de malalties neurodegeneratives.",
		color: '#d97706',
	},
];

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
			ctx.fillStyle = '#fff';
			ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
			ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
		},
		[images, canvasSize]
	);

	const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 250]);

	useMotionValueEvent(currentIndex, 'change', (latest) => {
		render(Number(latest.toFixed()));
	});

	useEffect(() => { render(1); }, [render]);

	useEffect(() => {
		const handleResize = () => setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div ref={scrollRef}>
			{/* Canvas */}
			<div style={{ height: '3000px', position: 'relative' }}>
				<canvas
					ref={ref}
					width={canvasSize.width}
					height={canvasSize.height}
					style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#fff' }}
				/>

				{/* Nav */}
				<div className="nav" style={{
					position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20,
					display: 'flex', justifyContent: 'space-between', alignItems: 'center',
					background: 'linear-gradient(180deg, rgba(255,255,255,0.75) 0%, transparent 100%)',
					backdropFilter: 'blur(4px)',
				}}>
					<span style={{
						fontSize: 15, fontWeight: 900, letterSpacing: '1.5px',
						background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
						WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
					}}>
						Bet Subirana
					</span>
					<span className="nav-sub" style={{ fontSize: 11, color: '#94a3b8', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 500 }}>
						Nanomedicine Research
					</span>
				</div>

				{/* Scroll indicator */}
				<div style={{
					position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)',
					zIndex: 20,
					background: 'rgba(15,23,42,0.55)',
					backdropFilter: 'blur(14px)',
					WebkitBackdropFilter: 'blur(14px)',
					border: '1px solid rgba(255,255,255,0.12)',
					borderRadius: 100,
					padding: '10px 22px 14px',
					display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
					animation: 'fadePulse 2.4s ease-in-out infinite',
				}}>
					<span style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
						Scroll
					</span>
					<div style={{
						width: 20, height: 34,
						border: '1.5px solid rgba(255,255,255,0.45)',
						borderRadius: 10,
						display: 'flex', justifyContent: 'center',
						paddingTop: 6,
					}}>
						<div style={{
							width: 3, height: 7,
							backgroundColor: 'rgba(255,255,255,0.8)',
							borderRadius: 2,
							animation: 'scrollDot 1.8s ease-in-out infinite',
						}} />
					</div>
				</div>
			</div>

			{/* Content */}
			<div style={{ backgroundColor: '#ffffff', position: 'relative', zIndex: 10 }}>

				{/* ── QUÈ ÉS LIP-OFF? ── */}
				<section className="section-pad-first" style={{ maxWidth: 860, margin: '0 auto' }}>
					<p style={{ fontSize: 12, color: '#94a3b8', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: 32 }}>
						Projecte de recerca
					</p>

					<h1 style={{
						fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 900, lineHeight: 0.95,
						letterSpacing: '-3px', marginBottom: 48,
						background: 'linear-gradient(135deg, #0f172a 0%, #2563eb 55%, #0891b2 100%)',
						WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
					}}>
						LIP-OFF
					</h1>

					<p style={{ fontSize: 20, lineHeight: 1.8, color: '#1e293b', marginBottom: 24, fontWeight: 500 }}>
						LIP-OFF és un projecte de recerca basat en <span style={{ color: '#2563eb' }}>nanomedicina</span> que explora
						una nova estratègia per modular l'agregació del pèptid{' '}
						<span style={{ color: '#0891b2' }}>β-amiloide</span> associada a la malaltia d'Alzheimer.
					</p>

					<p style={{ fontSize: 17, lineHeight: 1.85, color: '#475569', marginBottom: 24 }}>
						El sistema proposat consisteix en liposomes recoberts amb histidina, un aminoàcid capaç d'interaccionar amb
						ions metàl·lics com el coure (Cu²⁺) i el zinc (Zn²⁺). Mitjançant aquesta funcionalització superficial, els
						liposomes podrien competir pels ions implicats en l'agregació amiloide i reduir la formació d'espècies
						neurotòxiques.
					</p>

					<p style={{ fontSize: 17, lineHeight: 1.85, color: '#475569' }}>
						Aquest projecte combina conceptes de bioquímica, neurobiologia i nanotecnologia amb l'objectiu d'investigar
						noves aproximacions terapèutiques més dirigides, biocompatibles i menys invasives.
					</p>

					<div style={{ display: 'flex', gap: 10, marginTop: 40, flexWrap: 'wrap' }}>
						{['Bioquímica', 'Neurobiologia', 'Nanotecnologia', "Alzheimer"].map((t, i) => {
							const colors = ['#2563eb', '#7c3aed', '#0891b2', '#dc2626'];
							return (
								<span key={t} style={{
									fontSize: 13, fontWeight: 600, color: colors[i],
									border: `1px solid ${colors[i]}30`,
									borderRadius: 6, padding: '5px 14px',
									backgroundColor: `${colors[i]}08`,
								}}>
									{t}
								</span>
							);
						})}
					</div>
				</section>

				<div className="divider-pad" style={{ maxWidth: 860, margin: '0 auto' }}>
					<div style={{ height: 1, backgroundColor: '#f1f5f9' }} />
				</div>

				{/* ── LA MALALTIA D'ALZHEIMER ── */}
				<section className="section-pad" style={{ maxWidth: 860, margin: '0 auto' }}>
					<p style={{ fontSize: 12, color: '#94a3b8', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: 24 }}>
						Context clínic
					</p>

					<h2 style={{
						fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, lineHeight: 1.1,
						letterSpacing: '-1px', marginBottom: 36, color: '#0f172a',
					}}>
						La Malaltia d'Alzheimer
					</h2>

					{/* Pull quote */}
					<blockquote style={{
						borderLeft: '3px solid #dc2626',
						paddingLeft: 28, marginBottom: 36,
						color: '#dc2626', fontSize: 19, fontWeight: 600, lineHeight: 1.6,
						fontStyle: 'italic',
					}}>
						Una malaltia neurodegenerativa progressiva caracteritzada per la pèrdua de memòria, deteriorament cognitiu
						i alteracions neuronals.
					</blockquote>

					<p style={{ fontSize: 17, lineHeight: 1.85, color: '#475569', marginBottom: 36 }}>
						Un dels principals processos implicats en aquesta patologia és l'agregació del pèptid{' '}
						<strong style={{ color: '#1e293b' }}>β-amiloide (Aβ)</strong>, que pot formar oligòmers i plaques
						amiloides neurotòxiques al cervell.
					</p>

					<div className="grid-2">
						{[
							['Pèrdua de memòria', 'Símptoma principal'],
							['Plaques β-amiloide', 'Biomarcador clau'],
							['Deteriorament cognitiu', 'Progressiu'],
							['Alteracions neuronals', 'Irreversibles'],
						].map(([label, tag], idx) => (
							<div key={idx} style={{
								display: 'flex', justifyContent: 'space-between', alignItems: 'center',
								padding: '13px 0',
								borderBottom: '1px solid #f1f5f9',
							}}>
								<span style={{ fontSize: 14, color: '#334155', fontWeight: 500 }}>{label}</span>
								<span style={{ fontSize: 12, color: '#dc2626', fontWeight: 600 }}>{tag}</span>
							</div>
						))}
					</div>
				</section>

				<div className="divider-pad" style={{ maxWidth: 860, margin: '0 auto' }}>
					<div style={{ height: 1, backgroundColor: '#f1f5f9' }} />
				</div>

				{/* ── EL NANOSISTEMA EN 3D ── */}
				<section className="section-pad" style={{ maxWidth: 860, margin: '0 auto' }}>
					<p style={{ fontSize: 12, color: '#94a3b8', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: 24 }}>
						Visualització interactiva
					</p>

					<h2 style={{
						fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, lineHeight: 1.1,
						letterSpacing: '-1px', marginBottom: 28, color: '#0f172a',
					}}>
						El Nanosistema en 3D
					</h2>

					<p style={{ fontSize: 17, lineHeight: 1.85, color: '#475569', marginBottom: 48 }}>
						El model interactiu presentat en aquesta pàgina mostra una representació simplificada del nanosistema
						desenvolupat en el projecte LIP-OFF. El model permet visualitzar el funcionament del nanosistema proposat
						de manera visual i interactiva, i ha estat dissenyat per representar de manera clara els components i el
						mecanisme d'acció proposat.
					</p>

					<div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
						{[
							{ emoji: '🔵', title: 'Bicapa lipídica del liposoma', desc: 'Estructura fonamental que conforma la membrana del nanosistema.' },
							{ emoji: '🟣', title: 'Histidines superficials', desc: 'Aminoàcids exposats a la superfície exterior del liposoma.' },
							{ emoji: '🟡', title: 'Interacció amb ions metàl·lics', desc: "Possible quelació del Cu²⁺ i el Zn²⁺ implicats en l'agregació." },
							{ emoji: '⚡', title: "Modulació de l'agregació amiloide", desc: 'Mecanisme hipotètic de reducció de les espècies neurotòxiques.' },
						].map((item, idx, arr) => (
							<div key={idx} style={{
								display: 'flex', gap: 20, alignItems: 'flex-start',
								padding: '20px 0',
								borderBottom: idx < arr.length - 1 ? '1px solid #f1f5f9' : 'none',
							}}>
								<span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{item.emoji}</span>
								<div>
									<span style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>{item.title} </span>
									<span style={{ fontSize: 15, color: '#64748b' }}>— {item.desc}</span>
								</div>
							</div>
						))}
					</div>
				</section>

				<div className="divider-pad" style={{ maxWidth: 860, margin: '0 auto' }}>
					<div style={{ height: 1, backgroundColor: '#f1f5f9' }} />
				</div>

				{/* ── AVANTATGES ── */}
				<section className="section-pad-last" style={{ maxWidth: 860, margin: '0 auto' }}>
					<p style={{ fontSize: 12, color: '#94a3b8', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: 24 }}>
						Innovació terapèutica
					</p>

					<h2 style={{
						fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, lineHeight: 1.1,
						letterSpacing: '-1px', marginBottom: 56, color: '#0f172a',
					}}>
						Avantatges del Nanosistema
					</h2>

					<div style={{ display: 'flex', flexDirection: 'column' }}>
						{ADVANTAGES.map((adv, idx) => (
							<div key={idx} style={{
								display: 'grid', gridTemplateColumns: '3px 1fr',
								gap: '0 32px',
								paddingBottom: 40,
								marginBottom: 40,
								borderBottom: idx < ADVANTAGES.length - 1 ? '1px solid #f1f5f9' : 'none',
							}}>
								<div style={{
									backgroundColor: adv.color,
									borderRadius: 4,
									alignSelf: 'stretch',
									minHeight: 60,
								}} />
								<div>
									<h3 style={{
										fontSize: 18, fontWeight: 700, color: '#0f172a',
										marginBottom: 12, lineHeight: 1.3,
									}}>
										{adv.title}
									</h3>
									<p style={{ fontSize: 16, lineHeight: 1.8, color: '#475569' }}>
										{adv.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Footer */}
				<div className="footer-bar" style={{ borderTop: '1px solid #f1f5f9' }}>
					<span style={{
						fontSize: 15, fontWeight: 900, letterSpacing: '1.5px',
						background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
						WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
					}}>
						Bet Subirana
					</span>
					<span style={{ fontSize: 11, color: '#cbd5e1', letterSpacing: '2px', textTransform: 'uppercase' }}>
						Nanomedicine Research Project
					</span>
				</div>
			</div>
		</div>
	);
}

export default App;
