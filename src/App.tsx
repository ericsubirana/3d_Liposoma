import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const ADVANTAGES = [
	{
		num: '01',
		icon: '⚗️',
		title: "Quelació més específica i biocompatible",
		desc: "A diferència dels quelants metàl·lics convencionals, la histidina es troba exposada a la superfície del liposoma, permetent una interacció més localitzada amb els ions metàl·lics implicats en l'agregació del β-amiloide. Aquesta aproximació podria reduir els efectes sistèmics associats a la quelació no específica.",
		color: '#2563eb',
		border: 'rgba(37,99,235,0.2)',
		cardBg: 'rgba(37,99,235,0.04)',
		gradFrom: '#1d4ed8',
		gradTo: '#3b82f6',
		shadow: 'rgba(37,99,235,0.15)',
	},
	{
		num: '02',
		icon: '🔬',
		title: "Plataforma basada en nanomedicina",
		desc: "Els liposomes són nanopartícules biocompatibles àmpliament utilitzades en aplicacions biomèdiques. La seva estructura permet funcionalitzar-ne la superfície i adaptar-ne les propietats per a diferents aplicacions terapèutiques.",
		color: '#0891b2',
		border: 'rgba(8,145,178,0.2)',
		cardBg: 'rgba(8,145,178,0.04)',
		gradFrom: '#0e7490',
		gradTo: '#06b6d4',
		shadow: 'rgba(8,145,178,0.15)',
	},
	{
		num: '03',
		icon: '🧠',
		title: "Potencial administració intranasal",
		desc: "El projecte planteja la via intranasal com una possible estratègia per facilitar l'arribada del nanosistema al cervell i superar parcialment les limitacions de la barrera hematoencefàlica.",
		color: '#7c3aed',
		border: 'rgba(124,58,237,0.2)',
		cardBg: 'rgba(124,58,237,0.04)',
		gradFrom: '#6d28d9',
		gradTo: '#8b5cf6',
		shadow: 'rgba(124,58,237,0.15)',
	},
	{
		num: '04',
		icon: '⚖️',
		title: "Modular l'agregació sense destruir metalls essencials",
		desc: "L'objectiu del nanosistema no és eliminar completament els ions metàl·lics de l'organisme, sinó competir localment pels ions implicats en l'agregació amiloide i modular-ne el procés.",
		color: '#059669',
		border: 'rgba(5,150,105,0.2)',
		cardBg: 'rgba(5,150,105,0.04)',
		gradFrom: '#047857',
		gradTo: '#10b981',
		shadow: 'rgba(5,150,105,0.15)',
	},
	{
		num: '05',
		icon: '🚀',
		title: "Potencial translacional",
		desc: "Tot i tractar-se d'una proposta en fase experimental, aquesta estratègia podria contribuir al desenvolupament futur de noves aproximacions nanotecnològiques per al tractament de malalties neurodegeneratives.",
		color: '#d97706',
		border: 'rgba(217,119,6,0.2)',
		cardBg: 'rgba(217,119,6,0.04)',
		gradFrom: '#b45309',
		gradTo: '#f59e0b',
		shadow: 'rgba(217,119,6,0.15)',
	},
];

function Divider({ color = 'rgba(37,99,235,0.15)' }: { color?: string }) {
	return (
		<div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
			<div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
		</div>
	);
}

function Badge({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
	return (
		<div style={{
			display: 'inline-block',
			padding: '5px 16px',
			backgroundColor: bg,
			border: `1px solid ${border}`,
			borderRadius: 100,
			marginBottom: 24,
		}}>
			<span style={{ fontSize: 11, color, letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700 }}>
				{label}
			</span>
		</div>
	);
}

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
			{/* ── Canvas Section ──────────────────────────────────────────── */}
			<div style={{ height: '3000px', position: 'relative' }}>
				<canvas
					ref={ref}
					width={canvasSize.width}
					height={canvasSize.height}
					style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#fff' }}
				/>

				{/* Top nav bar */}
				<div style={{
					position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20,
					padding: '28px 56px',
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
					<span style={{ fontSize: 11, color: '#94a3b8', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 500 }}>
						Nanomedicine Research
					</span>
				</div>

				{/* Scroll indicator — dark capsule so it's visible on any canvas background */}
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

			{/* ── Content Section — Light Theme ───────────────────────────── */}
			<div style={{
				position: 'relative', zIndex: 10,
				backgroundColor: '#ffffff',
				backgroundImage: [
					'radial-gradient(ellipse 70% 30% at 15% 0%, rgba(37,99,235,0.06) 0%, transparent 55%)',
					'radial-gradient(ellipse 50% 20% at 85% 5%, rgba(8,145,178,0.05) 0%, transparent 50%)',
				].join(', '),
			}}>
				{/* ── QUÈ ÉS LIP-OFF? ─────────────────────────────────────── */}
				<section style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 48px 80px', position: 'relative' }}>
					<Badge
						label="Projecte de Recerca"
						color="#2563eb"
						bg="rgba(37,99,235,0.08)"
						border="rgba(37,99,235,0.2)"
					/>

					<h1 style={{
						fontSize: 'clamp(52px, 9vw, 100px)', fontWeight: 900, lineHeight: 0.95,
						marginBottom: 12, letterSpacing: '-3px',
						background: 'linear-gradient(135deg, #0f172a 0%, #2563eb 50%, #0891b2 100%)',
						WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
					}}>
						LIP-OFF
					</h1>

					<p style={{
						fontSize: 12, color: '#94a3b8', letterSpacing: '4px',
						textTransform: 'uppercase', marginBottom: 52, fontWeight: 600,
					}}>
						Nanomedicina · Alzheimer · Liposomes
					</p>

					<div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 72, alignItems: 'start' }}>
						<div>
							<p style={{ fontSize: 19, lineHeight: 1.85, color: '#334155', marginBottom: 22 }}>
								<strong style={{ color: '#0f172a' }}>LIP-OFF</strong> és un projecte de recerca basat en{' '}
								<strong style={{ color: '#2563eb' }}>nanomedicina</strong> que explora una nova estratègia per modular
								l'agregació del pèptid{' '}
								<strong style={{ color: '#0891b2' }}>β-amiloide</strong> associada a la malaltia d'Alzheimer.
							</p>
							<p style={{ fontSize: 17, lineHeight: 1.85, color: '#475569', marginBottom: 22 }}>
								El sistema proposat consisteix en{' '}
								<strong style={{ color: '#1e293b' }}>liposomes recoberts amb histidina</strong>, un aminoàcid capaç
								d'interaccionar amb ions metàl·lics com el{' '}
								<strong style={{ color: '#2563eb' }}>coure (Cu²⁺)</strong> i el{' '}
								<strong style={{ color: '#0891b2' }}>zinc (Zn²⁺)</strong>.
							</p>
							<p style={{ fontSize: 17, lineHeight: 1.85, color: '#475569' }}>
								Mitjançant aquesta funcionalització superficial, els liposomes podrien competir pels ions implicats en
								l'agregació amiloide i reduir la formació d'espècies neurotòxiques. Aquest projecte combina conceptes de{' '}
								<strong style={{ color: '#1e293b' }}>bioquímica, neurobiologia i nanotecnologia</strong> amb l'objectiu
								d'investigar noves aproximacions terapèutiques més dirigides, biocompatibles i menys invasives.
							</p>
						</div>

						<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
							{[
								{ label: 'Bioquímica', color: '#2563eb', bg: 'rgba(37,99,235,0.07)', border: 'rgba(37,99,235,0.15)' },
								{ label: 'Neurobiologia', color: '#7c3aed', bg: 'rgba(124,58,237,0.07)', border: 'rgba(124,58,237,0.15)' },
								{ label: 'Nanotecnologia', color: '#0891b2', bg: 'rgba(8,145,178,0.07)', border: 'rgba(8,145,178,0.15)' },
								{ label: "Malaltia d'Alzheimer", color: '#dc2626', bg: 'rgba(220,38,38,0.07)', border: 'rgba(220,38,38,0.15)' },
							].map((tag) => (
								<div key={tag.label} style={{
									padding: '16px 20px',
									backgroundColor: tag.bg,
									border: `1px solid ${tag.border}`,
									borderRadius: 14,
									color: tag.color, fontWeight: 700, fontSize: 14, letterSpacing: '0.3px',
								}}>
									{tag.label}
								</div>
							))}
						</div>
					</div>
				</section>

				<Divider color="rgba(220,38,38,0.2)" />

				{/* ── LA MALALTIA D'ALZHEIMER ──────────────────────────────── */}
				<section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 48px' }}>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
						<div>
							<Badge
								label="Neurobiologia"
								color="#dc2626"
								bg="rgba(220,38,38,0.08)"
								border="rgba(220,38,38,0.2)"
							/>
							<h2 style={{
								fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 900, lineHeight: 1.05,
								marginBottom: 28, letterSpacing: '-1.5px', color: '#0f172a',
							}}>
								La Malaltia<br />
								<span style={{
									background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
									WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
								}}>
									d'Alzheimer
								</span>
							</h2>
							<p style={{ fontSize: 17, lineHeight: 1.85, color: '#475569' }}>
								La malaltia d'Alzheimer (MA) és una{' '}
								<strong style={{ color: '#0f172a' }}>malaltia neurodegenerativa progressiva</strong> caracteritzada per la
								pèrdua de memòria, deteriorament cognitiu i alteracions neuronals. Un dels principals processos implicats
								en aquesta patologia és l'agregació del{' '}
								<strong style={{ color: '#dc2626' }}>pèptid β-amiloide (Aβ)</strong>, que pot formar oligòmers i plaques
								amiloides neurotòxiques al cervell.
							</p>
						</div>

						<div style={{
							padding: '40px', borderRadius: 24,
							backgroundColor: '#fafafa',
							border: '1px solid rgba(220,38,38,0.12)',
							boxShadow: '0 4px 24px rgba(220,38,38,0.06)',
							position: 'relative', overflow: 'hidden',
						}}>
							<div style={{
								position: 'absolute', top: -50, right: -50,
								width: 160, height: 160,
								background: 'radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 70%)',
								borderRadius: '50%', pointerEvents: 'none',
							}} />
							{[
								{ label: 'Pèrdua de memòria', tag: 'Símptoma principal' },
								{ label: 'Plaques β-amiloide', tag: 'Biomarcador clau' },
								{ label: 'Deteriorament cognitiu', tag: 'Progressiu' },
								{ label: 'Alteracions neuronals', tag: 'Irreversibles' },
							].map((item, idx, arr) => (
								<div key={idx} style={{
									display: 'flex', justifyContent: 'space-between', alignItems: 'center',
									padding: '15px 0',
									borderBottom: idx < arr.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
									position: 'relative', zIndex: 1,
								}}>
									<span style={{ fontSize: 15, color: '#334155', fontWeight: 500 }}>{item.label}</span>
									<span style={{
										fontSize: 11, color: '#dc2626',
										backgroundColor: 'rgba(220,38,38,0.09)',
										padding: '4px 14px', borderRadius: 100,
										fontWeight: 700, letterSpacing: '0.5px',
									}}>
										{item.tag}
									</span>
								</div>
							))}
						</div>
					</div>
				</section>

				<Divider color="rgba(124,58,237,0.2)" />

				{/* ── EL NANOSISTEMA EN 3D ─────────────────────────────────── */}
				<section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 48px' }}>
					<Badge
						label="Visualització Interactiva"
						color="#7c3aed"
						bg="rgba(124,58,237,0.08)"
						border="rgba(124,58,237,0.2)"
					/>
					<h2 style={{
						fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 900, lineHeight: 1.05,
						marginBottom: 44, letterSpacing: '-1.5px', color: '#0f172a',
					}}>
						El Nanosistema{' '}
						<span style={{
							background: 'linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)',
							WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
						}}>
							en 3D
						</span>
					</h2>

					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
						<div style={{
							gridColumn: '1 / -1', padding: '32px 36px',
							backgroundColor: '#f8fafc',
							border: '1px solid rgba(124,58,237,0.12)',
							borderRadius: 20,
							boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
						}}>
							<p style={{ fontSize: 17, lineHeight: 1.85, color: '#475569' }}>
								El model interactiu presentat en aquesta pàgina mostra una{' '}
								<strong style={{ color: '#0f172a' }}>representació simplificada</strong> del nanosistema desenvolupat en el
								projecte LIP-OFF. El model permet visualitzar el funcionament del nanosistema proposat de manera visual i
								interactiva. Aquest sistema ha estat dissenyat amb l'objectiu de representar de manera clara els
								components i el mecanisme d'acció proposat.
							</p>
						</div>

						{[
							{ emoji: '🔵', title: 'Bicapa lipídica del liposoma', desc: 'Estructura fonamental que conforma la membrana del nanosistema' },
							{ emoji: '🟣', title: 'Histidines superficials', desc: 'Aminoàcids exposats a la superfície exterior del liposoma' },
							{ emoji: '🟡', title: 'Interacció amb ions metàl·lics', desc: "Possible quelació del Cu²⁺ i el Zn²⁺ implicats en l'agregació" },
							{ emoji: '⚡', title: "Modulació de l'agregació amiloide", desc: 'Mecanisme hipotètic de reducció de les espècies neurotòxiques' },
						].map((item, idx) => (
							<div key={idx} style={{
								padding: '28px 24px', display: 'flex', alignItems: 'flex-start', gap: 16,
								backgroundColor: '#fafafa',
								border: '1px solid rgba(124,58,237,0.1)',
								borderRadius: 18,
								boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
							}}>
								<span style={{ fontSize: 24, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{item.emoji}</span>
								<div>
									<div style={{ fontSize: 15, fontWeight: 700, color: '#7c3aed', marginBottom: 6 }}>{item.title}</div>
									<div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{item.desc}</div>
								</div>
							</div>
						))}
					</div>
				</section>

				<Divider color="rgba(8,145,178,0.2)" />

				{/* ── AVANTATGES DEL NANOSISTEMA ───────────────────────────── */}
				<section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 48px 112px' }}>
					<div style={{ textAlign: 'center', marginBottom: 60 }}>
						<Badge
							label="Innovació Terapèutica"
							color="#0891b2"
							bg="rgba(8,145,178,0.08)"
							border="rgba(8,145,178,0.2)"
						/>
						<h2 style={{
							fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 900, lineHeight: 1.05,
							letterSpacing: '-1.5px', color: '#0f172a',
						}}>
							Avantatges del{' '}
							<span style={{
								background: 'linear-gradient(135deg, #0891b2 0%, #2563eb 100%)',
								WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
							}}>
								Nanosistema
							</span>
						</h2>
					</div>

					<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
						{ADVANTAGES.map((adv) => (
							<div
								key={adv.num}
								style={{
									display: 'grid', gridTemplateColumns: '72px 1fr', gap: 32,
									alignItems: 'start', padding: '32px 36px',
									backgroundColor: adv.cardBg,
									border: `1px solid ${adv.border}`,
									borderRadius: 20,
									boxShadow: `0 2px 12px ${adv.shadow}`,
									transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
									cursor: 'default',
								}}
								onMouseEnter={(e) => {
									const el = e.currentTarget as HTMLDivElement;
									el.style.transform = 'translateX(8px)';
									el.style.boxShadow = `0 6px 24px ${adv.shadow}`;
									el.style.borderColor = adv.color + '55';
								}}
								onMouseLeave={(e) => {
									const el = e.currentTarget as HTMLDivElement;
									el.style.transform = 'translateX(0)';
									el.style.boxShadow = `0 2px 12px ${adv.shadow}`;
									el.style.borderColor = adv.border;
								}}
							>
								<div style={{
									width: 64, height: 64, borderRadius: 16, flexShrink: 0,
									background: `linear-gradient(135deg, ${adv.gradFrom} 0%, ${adv.gradTo} 100%)`,
									display: 'flex', alignItems: 'center', justifyContent: 'center',
									fontSize: 26,
									boxShadow: `0 4px 16px ${adv.shadow}`,
								}}>
									{adv.icon}
								</div>
								<div>
									<div style={{
										fontSize: 11, color: adv.color, letterSpacing: '3px',
										textTransform: 'uppercase', fontWeight: 700, marginBottom: 8,
									}}>
										Avantatge {adv.num}
									</div>
									<h3 style={{
										fontSize: 18, fontWeight: 800, color: '#0f172a',
										marginBottom: 10, lineHeight: 1.3,
									}}>
										{adv.title}
									</h3>
									<p style={{ fontSize: 15, lineHeight: 1.75, color: '#475569' }}>
										{adv.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Footer */}
				<div style={{
					borderTop: '1px solid rgba(0,0,0,0.07)',
					padding: '48px', textAlign: 'center',
					backgroundColor: '#f8fafc',
				}}>
					<div style={{
						fontSize: 20, fontWeight: 900, letterSpacing: '6px',
						background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
						WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
						marginBottom: 10,
					}}>
						LIP-OFF
					</div>
					<p style={{ fontSize: 11, color: '#94a3b8', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 500 }}>
						Nanomedicine Research Project
					</p>
				</div>
			</div>
		</div>
	);
}

export default App;
