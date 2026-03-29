import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Scissors,
  MapPin,
  Phone,
  Clock,
  Star,
  InstagramLogo,
  WhatsappLogo,
  CaretDown,
  List,
  X,
  CreditCard,
  WifiHigh,
  Wheelchair,
  Dog,
  CalendarCheck,
  NavigationArrow,
} from '@phosphor-icons/react'

/* ─── palette & data ─── */
const GOLD = '#c8a45e'
const DARK = '#0d0d0d'
const DARK2 = '#1a1a1a'
const DARK3 = '#222222'
const CREAM = '#e8dcc8'
const WA_LINK = 'https://wa.me/554830581900?text=Olá! Gostaria de agendar um horário na Ofício Barbearia.'
const BOOKSY = 'https://booksy.com/pt-br/210885_oficio-barbearia_barbearias_853923_sao-jose'
const PHONE = '(48) 3058-1900'
const ADDRESS = 'R. Tiradentes, 16 — Kobrasol, São José/SC'
const MAPS_LINK = 'https://www.google.com/maps/search/Oficio+Barbearia+Kobrasol+São+José+SC'
const IG = 'https://www.instagram.com/oficiobarbershop/'

const SERVICES = [
  { name: 'Corte de Cabelo', price: 'R$ 60', time: '45 min', desc: 'Corte personalizado com acabamento preciso.' },
  { name: 'Corte Máquina', price: 'R$ 45', time: '30 min', desc: 'Máquina com degradê impecável e clean.' },
  { name: 'Barba Completa', price: 'R$ 50', time: '30 min', desc: 'Aparada e frisada com lâmina, toalha quente.' },
  { name: 'Barba Máquina', price: 'R$ 35', time: '30 min', desc: 'Alinhamento rápido com máquina.' },
  { name: 'Acabamento', price: 'R$ 30', time: '30 min', desc: 'Contorno e limpeza de nuca e pé de ouvido.' },
  { name: 'Corte + Barba', price: 'R$ 100', time: '1h', desc: 'O combo completo do cavalheiro.' },
]

const HOURS = [
  { day: 'Segunda a Sexta', time: '14h — 19h30' },
  { day: 'Sábado', time: '9h — 13h30' },
  { day: 'Domingo', time: 'Fechado' },
]

const REVIEWS = [
  { name: 'Lucas M.', stars: 5, text: 'Melhor barbearia do Kobrasol. Atendimento impecável, corte sempre no ponto. Recomendo demais!' },
  { name: 'Rafael S.', stars: 5, text: 'Ambiente top, sem frescura. O barbeiro entende exatamente o que você quer. Nota 10!' },
  { name: 'Pedro H.', stars: 5, text: 'Faço barba e cabelo aqui há meses. Qualidade consistente, preço justo. Virei cliente fiel.' },
  { name: 'Gustavo R.', stars: 5, text: 'Descobri por indicação e agora não troco. Tradicional de verdade, como uma barbearia deve ser.' },
]

const AMENITIES = [
  { icon: CreditCard, text: 'Cartão de crédito' },
  { icon: WifiHigh, text: 'Wi-Fi grátis' },
  { icon: Wheelchair, text: 'Acessibilidade' },
  { icon: Dog, text: 'Pet friendly' },
  { icon: CalendarCheck, text: 'Programa de fidelidade' },
  { icon: NavigationArrow, text: 'Estacionamento' },
]

/* ─── reveal animation wrapper ─── */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── gold divider ─── */
function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', padding: '40px 0' }}>
      <div style={{ width: 60, height: 1, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <Scissors size={20} weight="duotone" color={GOLD} />
      <div style={{ width: 60, height: 1, background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  )
}

/* ─── CTA button ─── */
function CTAButton({ children, href = WA_LINK, variant = 'primary', style = {} }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px',
    borderRadius: 0, fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600,
    letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none',
    transition: 'all 0.3s ease', cursor: 'pointer', border: 'none',
  }
  const styles = variant === 'primary'
    ? { ...base, background: GOLD, color: DARK, ...style }
    : { ...base, background: 'transparent', color: GOLD, border: `1px solid ${GOLD}`, ...style }

  return <a href={href} target="_blank" rel="noopener noreferrer" style={styles}>{children}</a>
}

/* ═══════════════════════════════════ APP ═══════════════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: 'Início', href: '#hero' },
    { label: 'Serviços', href: '#serv' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Avaliações', href: '#depoimentos' },
    { label: 'Horário', href: '#agenda' },
    { label: 'Contato', href: '#contato' },
  ]

  return (
    <>
      <Helmet>
        <title>Ofício Barbearia | Kobrasol — Tradicional & Sem Frescura</title>
        <meta name="description" content="Barbearia tradicional no Kobrasol, São José/SC. Corte de cabelo, barba, acabamento. Nota 5.0 com 88 avaliações. Agende agora!" />
      </Helmet>

      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Inter', sans-serif;
          background: ${DARK};
          color: ${CREAM};
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        h1, h2, h3, h4 { font-family: 'Playfair Display', Georgia, serif; }
        a { color: inherit; }
        ::selection { background: ${GOLD}; color: ${DARK}; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${DARK}; }
        ::-webkit-scrollbar-thumb { background: ${GOLD}40; border-radius: 4px; }

        .nav-blur {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          transition: all 0.4s ease;
        }
        .nav-scrolled { background: ${DARK}ee; border-bottom: 1px solid ${GOLD}15; }

        .section-pad { padding: 100px 24px; max-width: 1200px; margin: 0 auto; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 0 0 ${GOLD}40; }
          50% { box-shadow: 0 0 0 12px ${GOLD}00; }
        }
        .floating { animation: float 4s ease-in-out infinite; }
        .pulse-btn { animation: pulse-gold 2s ease-in-out infinite; }

        @media (max-width: 768px) {
          .section-pad { padding: 60px 16px; }
          .hide-mobile { display: none !important; }
          .mobile-menu {
            position: fixed; inset: 0; z-index: 200;
            background: ${DARK}f5; backdrop-filter: blur(30px);
            display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px;
          }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 42px !important; }
        }
      `}</style>

      {/* ─── NAV ─── */}
      <nav className={`nav-blur ${scrolled ? 'nav-scrolled' : ''}`}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="./images/logo.svg" alt="Ofício Barbearia" style={{ height: 40 }} />
          </a>
          <div className="hide-mobile" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} style={{ textDecoration: 'none', fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', color: CREAM, opacity: 0.8, transition: 'opacity 0.3s' }}
                onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.8}>
                {l.label}
              </a>
            ))}
            <CTAButton style={{ padding: '10px 24px', fontSize: 12 }}>
              <WhatsappLogo size={16} weight="duotone" /> Agendar
            </CTAButton>
          </div>
          <button onClick={() => setMenuOpen(true)} className="hide-mobile" style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: GOLD, padding: 8 }}>
            <List size={28} weight="bold" />
          </button>
          {/* mobile hamburger — visible only on mobile */}
          <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: GOLD, padding: 8 }}
            className="" id="mobile-menu-btn">
            <List size={28} weight="bold" />
          </button>
        </div>
      </nav>
      <style>{`
        @media (min-width: 769px) { #mobile-menu-btn { display: none !important; } }
      `}</style>

      {/* ─── MOBILE MENU ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: GOLD, cursor: 'pointer' }}>
              <X size={32} weight="bold" />
            </button>
            {navLinks.map((l, i) => (
              <motion.a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                style={{ textDecoration: 'none', fontSize: 24, fontFamily: "'Playfair Display', serif", color: CREAM, letterSpacing: 2 }}>
                {l.label}
              </motion.a>
            ))}
            <CTAButton><WhatsappLogo size={20} weight="duotone" /> Agendar Horário</CTAButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ SECTION 1: HERO ═══ */}
      <section id="hero" ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', inset: 0, opacity: heroOpacity, scale: heroScale }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 30% 20%, ${GOLD}08 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, ${GOLD}05 0%, transparent 50%), ${DARK}`,
          }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("./images/pattern-bg.svg")`, backgroundSize: 100, opacity: 0.3 }} />
        </motion.div>

        {/* floating decorations */}
        <div className="floating hide-mobile" style={{ position: 'absolute', top: '15%', left: '8%', opacity: 0.15 }}>
          <img src="./images/scissors-icon.svg" alt="" style={{ width: 80 }} />
        </div>
        <div className="floating hide-mobile" style={{ position: 'absolute', bottom: '20%', right: '10%', opacity: 0.1, animationDelay: '2s' }}>
          <img src="./images/barber-pole.svg" alt="" style={{ height: 120 }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '120px 24px 80px', maxWidth: 800 }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 40, height: 1, background: GOLD }} />
              <span style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: GOLD, fontWeight: 500 }}>Kobrasol • São José/SC</span>
              <div style={{ width: 40, height: 1, background: GOLD }} />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="hero-title" style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.05, color: CREAM, marginBottom: 24 }}>
              Barba & Cabelo<br />
              <span style={{ color: GOLD, fontStyle: 'italic', fontWeight: 400 }}>Tradicional &<br />Sem Frescura</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: `${CREAM}99`, maxWidth: 500, margin: '0 auto 40px', fontWeight: 300 }}>
              O ofício da barbearia clássica, com a precisão que você merece. Desde o primeiro corte, você sente a diferença.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <CTAButton className="pulse-btn">
                <WhatsappLogo size={20} weight="duotone" /> Agendar Horário
              </CTAButton>
              <CTAButton variant="outline" href={BOOKSY}>
                <CalendarCheck size={20} weight="duotone" /> Ver no Booksy
              </CTAButton>
            </div>
          </Reveal>
          <Reveal delay={0.6}>
            <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: GOLD, fontFamily: "'Playfair Display', serif" }}>5.0</div>
                <div style={{ display: 'flex', gap: 2, justifyContent: 'center', margin: '4px 0' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} weight="fill" color={GOLD} />)}
                </div>
                <div style={{ fontSize: 12, opacity: 0.6, letterSpacing: 1 }}>88 AVALIAÇÕES</div>
              </div>
              <div style={{ width: 1, height: 60, background: `${GOLD}30` }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: GOLD, fontFamily: "'Playfair Display', serif" }}>6+</div>
                <div style={{ fontSize: 12, opacity: 0.6, letterSpacing: 1, marginTop: 8 }}>ANOS DE<br />TRADIÇÃO</div>
              </div>
              <div style={{ width: 1, height: 60, background: `${GOLD}30` }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: GOLD, fontFamily: "'Playfair Display', serif" }}>100%</div>
                <div style={{ fontSize: 12, opacity: 0.6, letterSpacing: 1, marginTop: 8 }}>SATISFAÇÃO<br />GARANTIDA</div>
              </div>
            </div>
          </Reveal>
        </div>

        <a href="#serv" style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: GOLD, opacity: 0.5, textDecoration: 'none' }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <CaretDown size={28} weight="bold" />
          </motion.div>
        </a>
      </section>

      {/* ═══ SECTION 2: MANIFESTO ═══ */}
      <section style={{ background: DARK2, padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <Reveal>
            <img src="./images/mustache-icon.svg" alt="" style={{ width: 60, marginBottom: 24, opacity: 0.6 }} />
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: 22, lineHeight: 1.8, fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: `${CREAM}cc` }}>
              "Não seguimos tendências passageiras. Dominamos o ofício que atravessa gerações. Cada corte é uma assinatura, cada barba é uma obra. Aqui, tradição é coisa séria."
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ marginTop: 24, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: GOLD }}>— Ofício Barbearia</div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 3: SERVIÇOS ═══ */}
      <section id="serv" className="section-pad">
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: GOLD }}>Nossos Serviços</span>
            <h2 style={{ fontSize: 48, marginTop: 12, color: CREAM }}>O Cardápio do<br /><span style={{ color: GOLD, fontStyle: 'italic' }}>Cavalheiro</span></h2>
          </div>
        </Reveal>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <div style={{
                background: DARK2, border: `1px solid ${GOLD}15`, padding: 32,
                transition: 'all 0.4s ease', cursor: 'default', position: 'relative', overflow: 'hidden',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${GOLD}50`; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${GOLD}15`; e.currentTarget.style.transform = 'translateY(0)' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: `linear-gradient(135deg, ${GOLD}08, transparent)` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 20, color: CREAM }}>{s.name}</h3>
                  <span style={{ fontSize: 24, fontWeight: 700, color: GOLD, fontFamily: "'Playfair Display', serif" }}>{s.price}</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: `${CREAM}88`, marginBottom: 12 }}>{s.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: `${CREAM}55` }}>
                  <Clock size={14} weight="duotone" color={GOLD} /> {s.time}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.4}>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <CTAButton>
              <WhatsappLogo size={18} weight="duotone" /> Agendar Agora
            </CTAButton>
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* ═══ SECTION 4: SOBRE ═══ */}
      <section id="sobre" style={{ background: DARK2 }}>
        <div className="section-pad">
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <Reveal>
              <div>
                <span style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: GOLD }}>Nossa História</span>
                <h2 style={{ fontSize: 42, marginTop: 12, marginBottom: 24, color: CREAM, lineHeight: 1.2 }}>
                  Mais que uma barbearia.<br /><span style={{ color: GOLD, fontStyle: 'italic' }}>Um ofício.</span>
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: `${CREAM}99`, marginBottom: 20 }}>
                  No coração do Kobrasol, a Ofício Barbearia nasceu da paixão pelo trabalho artesanal. Aqui não existe corte automático — cada cliente recebe atenção individual, cada detalhe é pensado.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: `${CREAM}99`, marginBottom: 32 }}>
                  Nossa filosofia é simples: <strong style={{ color: GOLD }}>tradicional e sem frescura</strong>. Você senta na cadeira, relaxa, e sai com a confiança de quem sabe que está impecável.
                </p>
                <CTAButton variant="outline" href={IG}>
                  <InstagramLogo size={18} weight="duotone" /> @oficiobarbershop
                </CTAButton>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  aspectRatio: '4/5', background: `linear-gradient(145deg, ${DARK3}, ${DARK})`,
                  border: `1px solid ${GOLD}20`, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 24, padding: 40,
                }}>
                  <img src="./images/scissors-icon.svg" alt="Tesoura" style={{ width: 100, opacity: 0.4 }} />
                  <img src="./images/razor-icon.svg" alt="Navalha" style={{ width: 120, opacity: 0.35 }} />
                  <img src="./images/comb-icon.svg" alt="Pente" style={{ width: 100, opacity: 0.3 }} />
                  <p style={{ fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: `${GOLD}60`, marginTop: 16 }}>Ferramentas do Ofício</p>
                </div>
                <div style={{ position: 'absolute', top: -12, right: -12, width: '100%', height: '100%', border: `1px solid ${GOLD}20`, zIndex: -1 }} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: EXPERIÊNCIA ═══ */}
      <section style={{ background: DARK, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: GOLD }}>A Experiência</span>
              <h2 style={{ fontSize: 42, marginTop: 12, color: CREAM }}>O que esperar da<br /><span style={{ color: GOLD, fontStyle: 'italic' }}>sua visita</span></h2>
            </div>
          </Reveal>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { num: '01', title: 'Recepção', text: 'Chegue, sente e relaxe. Ambiente descontraído, sem pressa. Você é atendido no seu tempo.' },
              { num: '02', title: 'Consulta', text: 'Conversa franca sobre o que você quer. Sem julgamento, sem imposição. Seu estilo, sua escolha.' },
              { num: '03', title: 'Execução', text: 'Mãos firmes, técnica apurada. Cada detalhe importa — do degradê ao fio da barba com lâmina.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.15}>
                <div style={{ padding: 32, borderLeft: `2px solid ${GOLD}30`, position: 'relative' }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: `${GOLD}15`, fontFamily: "'Playfair Display', serif", position: 'absolute', top: 16, right: 16 }}>{step.num}</span>
                  <h3 style={{ fontSize: 22, color: GOLD, marginBottom: 16 }}>{step.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: `${CREAM}88` }}>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ SECTION 6: AVALIAÇÕES ═══ */}
      <section id="depoimentos" className="section-pad">
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: GOLD }}>Avaliações</span>
            <h2 style={{ fontSize: 42, marginTop: 12, color: CREAM }}>O que nossos<br /><span style={{ color: GOLD, fontStyle: 'italic' }}>clientes dizem</span></h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={24} weight="fill" color={GOLD} />)}
              <span style={{ marginLeft: 8, fontSize: 14, color: `${CREAM}88` }}>5.0 no Google — 88 avaliações</span>
            </div>
          </div>
        </Reveal>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <div style={{
                background: DARK2, border: `1px solid ${GOLD}10`, padding: 32,
                transition: 'border-color 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${GOLD}30`}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${GOLD}10`}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                  {[...Array(r.stars)].map((_, j) => <Star key={j} size={16} weight="fill" color={GOLD} />)}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: `${CREAM}cc`, marginBottom: 16, fontStyle: 'italic' }}>"{r.text}"</p>
                <div style={{ fontSize: 13, fontWeight: 600, color: GOLD, letterSpacing: 1 }}>— {r.name}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 7: COMODIDADES ═══ */}
      <section style={{ background: DARK2, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: GOLD }}>Comodidades</span>
              <h2 style={{ fontSize: 36, marginTop: 12, color: CREAM }}>Pensado para o seu <span style={{ color: GOLD, fontStyle: 'italic' }}>conforto</span></h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24 }}>
            {AMENITIES.map((a, i) => (
              <Reveal key={a.text} delay={i * 0.08}>
                <div style={{ textAlign: 'center', padding: 24 }}>
                  <a.icon size={36} weight="duotone" color={GOLD} style={{ marginBottom: 12 }} />
                  <div style={{ fontSize: 13, color: `${CREAM}99`, letterSpacing: 0.5 }}>{a.text}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: PREÇOS DESTAQUE ═══ */}
      <section style={{ background: `linear-gradient(135deg, ${GOLD}10, ${DARK})`, padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <span style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: GOLD }}>Combo Especial</span>
            <h2 style={{ fontSize: 48, marginTop: 12, color: CREAM }}>Corte + Barba</h2>
            <div style={{ fontSize: 72, fontWeight: 900, color: GOLD, fontFamily: "'Playfair Display', serif", margin: '24px 0' }}>R$ 100</div>
            <p style={{ fontSize: 16, color: `${CREAM}88`, marginBottom: 32, maxWidth: 450, margin: '0 auto 32px' }}>
              O pacote completo para o cavalheiro que não aceita menos que perfeição. 1 hora de dedicação exclusiva.
            </p>
            <CTAButton>
              <WhatsappLogo size={20} weight="duotone" /> Quero Agendar o Combo
            </CTAButton>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ═══ SECTION 9: GALERIA DE FERRAMENTAS ═══ */}
      <section style={{ padding: '80px 24px', background: DARK }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: GOLD }}>O Arsenal</span>
              <h2 style={{ fontSize: 42, marginTop: 12, color: CREAM }}>Ferramentas do <span style={{ color: GOLD, fontStyle: 'italic' }}>Ofício</span></h2>
            </div>
          </Reveal>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, maxWidth: 800, margin: '0 auto' }}>
            {[
              { src: './images/scissors-icon.svg', label: 'Tesoura Profissional' },
              { src: './images/razor-icon.svg', label: 'Navalha Clássica' },
              { src: './images/comb-icon.svg', label: 'Pente de Precisão' },
            ].map((tool, i) => (
              <Reveal key={tool.label} delay={i * 0.15}>
                <div style={{
                  aspectRatio: '1', background: DARK2, border: `1px solid ${GOLD}15`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20,
                  transition: 'all 0.4s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${GOLD}40`; e.currentTarget.style.transform = 'scale(1.03)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${GOLD}15`; e.currentTarget.style.transform = 'scale(1)' }}>
                  <img src={tool.src} alt={tool.label} style={{ width: '50%', opacity: 0.6 }} />
                  <span style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: `${CREAM}66` }}>{tool.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 10: HORÁRIO ═══ */}
      <section id="agenda" style={{ background: DARK2 }}>
        <div className="section-pad">
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <Reveal>
              <div>
                <span style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: GOLD }}>Horário de Funcionamento</span>
                <h2 style={{ fontSize: 42, marginTop: 12, marginBottom: 32, color: CREAM }}>Quando <span style={{ color: GOLD, fontStyle: 'italic' }}>estamos aqui</span></h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {HOURS.map(h => (
                    <div key={h.day} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '16px 0', borderBottom: `1px solid ${GOLD}10`,
                    }}>
                      <span style={{ fontSize: 16, color: CREAM }}>{h.day}</span>
                      <span style={{ fontSize: 16, fontWeight: 600, color: h.time === 'Fechado' ? '#ff4444' : GOLD }}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{
                background: DARK, border: `1px solid ${GOLD}20`, padding: 40, textAlign: 'center',
              }}>
                <Clock size={48} weight="duotone" color={GOLD} style={{ marginBottom: 16 }} />
                <h3 style={{ fontSize: 22, color: CREAM, marginBottom: 12 }}>Não perca tempo na fila</h3>
                <p style={{ fontSize: 14, color: `${CREAM}88`, lineHeight: 1.7, marginBottom: 24 }}>
                  Agende pelo WhatsApp ou Booksy e chegue direto para ser atendido. Sem espera, sem estresse.
                </p>
                <CTAButton>
                  <WhatsappLogo size={18} weight="duotone" /> Agendar pelo WhatsApp
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 11: LOCALIZAÇÃO ═══ */}
      <section id="contato" style={{ background: DARK, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: GOLD }}>Localização</span>
              <h2 style={{ fontSize: 42, marginTop: 12, color: CREAM }}>Venha nos <span style={{ color: GOLD, fontStyle: 'italic' }}>visitar</span></h2>
            </div>
          </Reveal>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            <Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <MapPin size={24} weight="duotone" color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h4 style={{ fontSize: 16, color: CREAM, marginBottom: 4 }}>Endereço</h4>
                    <p style={{ fontSize: 14, color: `${CREAM}88`, lineHeight: 1.5 }}>{ADDRESS}<br />CEP: 88102-040</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <Phone size={24} weight="duotone" color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h4 style={{ fontSize: 16, color: CREAM, marginBottom: 4 }}>Telefone</h4>
                    <a href={`tel:${PHONE}`} style={{ fontSize: 14, color: `${CREAM}88`, textDecoration: 'none' }}>{PHONE}</a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <InstagramLogo size={24} weight="duotone" color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h4 style={{ fontSize: 16, color: CREAM, marginBottom: 4 }}>Instagram</h4>
                    <a href={IG} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: GOLD, textDecoration: 'none' }}>@oficiobarbershop</a>
                  </div>
                </div>
                <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                  <CTAButton href={MAPS_LINK}>
                    <MapPin size={18} weight="duotone" /> Abrir no Maps
                  </CTAButton>
                  <CTAButton variant="outline">
                    <WhatsappLogo size={18} weight="duotone" /> WhatsApp
                  </CTAButton>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{
                background: DARK2, border: `1px solid ${GOLD}15`, height: 320,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.8!2d-48.6121!3d-27.5964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM1JzQ3LjAiUyA0OMKwMzYnNDMuNiJX!5e0!3m2!1spt-BR!2sbr!4v1"
                  width="100%" height="100%" style={{ border: 0, filter: 'grayscale(1) invert(0.92) contrast(0.85)' }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa Ofício Barbearia"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 12: CTA FINAL ═══ */}
      <section style={{
        background: `linear-gradient(180deg, ${DARK2}, ${DARK})`,
        padding: '100px 24px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("./images/pattern-bg.svg")`, backgroundSize: 100, opacity: 0.15 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 600, margin: '0 auto' }}>
          <Reveal>
            <img src="./images/logo.svg" alt="Ofício Barbearia" style={{ width: 200, marginBottom: 32, opacity: 0.7 }} />
            <h2 style={{ fontSize: 42, color: CREAM, marginBottom: 16 }}>
              Pronto para um corte <span style={{ color: GOLD, fontStyle: 'italic' }}>de verdade</span>?
            </h2>
            <p style={{ fontSize: 16, color: `${CREAM}88`, lineHeight: 1.7, marginBottom: 36 }}>
              Agende agora e descubra por que somos a barbearia mais bem avaliada do Kobrasol.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <CTAButton className="pulse-btn" style={{ padding: '18px 40px', fontSize: 15 }}>
                <WhatsappLogo size={22} weight="duotone" /> Agendar Horário
              </CTAButton>
              <CTAButton variant="outline" href={`tel:${PHONE}`}>
                <Phone size={18} weight="duotone" /> Ligar Agora
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: DARK, borderTop: `1px solid ${GOLD}10`, padding: '40px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <img src="./images/logo.svg" alt="Ofício Barbearia" style={{ height: 32, opacity: 0.5 }} />
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href={IG} target="_blank" rel="noopener noreferrer" style={{ color: `${CREAM}55`, transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = GOLD} onMouseLeave={e => e.target.style.color = `${CREAM}55`}>
              <InstagramLogo size={22} weight="duotone" />
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ color: `${CREAM}55`, transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = GOLD} onMouseLeave={e => e.target.style.color = `${CREAM}55`}>
              <WhatsappLogo size={22} weight="duotone" />
            </a>
            <a href={`tel:${PHONE}`} style={{ color: `${CREAM}55`, transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = GOLD} onMouseLeave={e => e.target.style.color = `${CREAM}55`}>
              <Phone size={22} weight="duotone" />
            </a>
          </div>
          <div style={{ fontSize: 12, color: `${CREAM}33`, letterSpacing: 1 }}>
            © 2026 Ofício Barbearia — Todos os direitos reservados
          </div>
        </div>
      </footer>

      {/* ─── WhatsApp floating button ─── */}
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 90,
          width: 56, height: 56, borderRadius: '50%',
          background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
          transition: 'transform 0.3s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        <WhatsappLogo size={28} weight="fill" color="#fff" />
      </a>
    </>
  )
}
