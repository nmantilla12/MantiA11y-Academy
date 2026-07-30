import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Importación de imágenes desde la carpeta de assets
import heroDashboardImg from './assets/images/manager.png';
import neurodivergentesImg from './assets/images/neurodivergentes.jpg';
import dyslexiaSpecialistImg from './assets/images/dislexia.png';
import communityTeamImg from './assets/images/educacion.jpg';
import specialistImg from './assets/images/especialista.png';

// Importación de datos, contexto y componente de accesibilidad
import { catalogData } from './data.jsx';
import { AccessibilityProvider, AccessibilityContext } from './AccessibilityContext.jsx';
import { AccessibilityToggle } from './AccessibilityToggle';

// -----------------------------------------------------------------------------
// COMPONENTE: CourseCard (Aislado para cumplir estrictamente las Reglas de Hooks)
// -----------------------------------------------------------------------------
function CourseCard({ course, highContrast, addToCart }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="course-card" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        background: highContrast ? '#222' : '#fff', 
        color: highContrast ? '#fff' : '#000', 
        border: isHovered ? '2px solid #0056b3' : '1px solid #ddd', 
        borderRadius: '8px', 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        boxShadow: isHovered ? '0 8px 20px rgba(0,86,179,0.15)' : '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.25s ease'
      }}
    >
      <div>
        <div className="course-card-image-container" style={{ width: '100%', height: '170px', overflow: 'hidden' }}>
          <img 
            src={course.image} 
            alt={course.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease', transform: isHovered ? 'scale(1.03)' : 'scale(1)' }} 
          />
        </div>
        <div className="course-card-body" style={{ padding: '1.5rem' }}>
          <span className="course-level-tag" style={{ display: 'inline-block', padding: '0.2rem 0.6rem', background: '#e2e8f0', color: '#1e293b', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {course.level || 'INTERMEDIO'}
          </span>
          
          <h3 
            className="course-title" 
            style={{ 
              fontSize: '1.2rem', 
              margin: '0.5rem 0', 
              color: isHovered ? '#0056b3' : (highContrast ? '#fff' : '#000'),
              textDecoration: isHovered ? 'underline' : 'none',
              transition: 'color 0.2s ease'
            }}
          >
            {course.title}
          </h3>

          <p className="course-description" style={{ fontSize: '0.9rem', lineHeight: '1.5', color: highContrast ? '#ddd' : '#555' }}>
            {course.description}
          </p>
          
          {course.competenciaGeneral && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: highContrast ? '#111' : '#f1f5f9', borderRadius: '6px', fontSize: '0.85rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.25rem', color: highContrast ? '#60a5fa' : '#0056b3' }}>Objetivo:</strong>
              <p style={{ margin: 0 }}>{course.competenciaGeneral}</p>
            </div>
          )}

          {course.contenidos && (
            <div style={{ marginTop: '0.75rem' }}>
              <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>Temario Principal:</strong>
              <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.8rem', color: highContrast ? '#ccc' : '#444' }}>
                {course.contenidos.slice(0, 3).map((tema, idx) => (
                  <li key={idx} style={{ marginBottom: '0.2rem' }}>{tema}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="course-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1.5rem 1.5rem 1.5rem' }}>
        <span className="course-price" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{course.price} €</span>
        <button 
          className="course-btn" 
          onClick={() => addToCart(course)} 
          style={{ padding: '0.5rem 1rem', background: '#0056b3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// COMPONENTE: MainAppContent (Contiene toda la lógica y rutas)
// -----------------------------------------------------------------------------
function MainAppContent() {
  const [cart, setCart] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Todos');
  
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isA11yOpen, setIsA11yOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  // Declaras el hook aquí para que esté disponible en todo el componente
  const navigate = useNavigate(); 

  const accessibility = useContext(AccessibilityContext) || {};
  const { 
    fontDyslexia = false, setFontDyslexia = () => {}, 
    calmMode = false, setCalmMode = () => {}, 
    readingGuide = false, setReadingGuide = () => {},
    highContrast = false, setHighContrast = () => {} 
  } = accessibility;

  
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`¡Genial! Has añadido "${product.title}" al carrito.`);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const handleFilterClick = (category) => {
    setActiveFilter(category);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredCourses = catalogData.filter(course => {
    if (activeFilter === 'Todos') return true;
    return course.category === activeFilter;
  });

  return (
    <div className="app-container" style={{
      fontFamily: fontDyslexia ? '"OpenDyslexic", sans-serif, Arial' : 'inherit',
      filter: calmMode ? 'saturate(0.5) contrast(0.9)' : 'none',
      backgroundColor: highContrast ? '#000000' : 'inherit',
      color: highContrast ? '#ffffff' : 'inherit',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* 1. BARRA DE ACCESIBILIDAD / HEADER SUPERIOR */}
      <header className="header-accessibility-bar" style={{ 
        padding: '0.75rem 0.5rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: highContrast ? '#111111' : '#f9f9f9', 
        borderBottom: '2px solid #000',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        flexWrap: 'nowrap',
        gap: '0.2rem',
        overflowX: 'auto'
      }}>
        <button 
          onClick={() => setIsNavOpen(true)}
          aria-label="Abrir menú de navegación"
          style={{
            background: '#000',
            color: '#fff',
            border: '2px solid #000',
            padding: '0.4rem 0.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            flexShrink: 0
          }}
        >
          ☰ Menú
        </button>

        <nav style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
          <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: highContrast ? '#fff' : '#000', marginLeft: '6px' }}>🏠 Inicio</Link>
          <Link to="/nosotros" style={{ fontWeight: 'bold', textDecoration: 'none', color: highContrast ? '#fff' : '#000' }}>👥 Nosotros</Link>
          <Link to="/carrito" style={{ fontWeight: 'bold', textDecoration: 'none', color: highContrast ? '#fff' : '#000', marginRight: '6px' }}>🛒 Carrito ({cart.length})</Link>
        </nav>

        <button 
          onClick={() => setIsA11yOpen(true)}
          aria-label="Abrir panel de accesibilidad y neurodivergencia"
          style={{
            background: '#000',
            color: '#fff',
            border: '2px solid #000',
            padding: '0.4rem 0.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            flexShrink: 0
          }}
        >
          👁️ Accesibilidad
        </button>
      </header>

      {/* 2. MENÚ LATERAL IZQUIERDO (NAVEGACIÓN) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: isNavOpen ? 0 : '-100%',
        width: '280px',
        height: '100%',
        backgroundColor: '#ffffff',
        boxShadow: '4px 0 15px rgba(0,0,0,0.2)',
        transition: 'left 0.3s ease-in-out',
        zIndex: 1100,
        padding: '1.5rem',
        boxSizing: 'border-box',
        borderRight: '3px solid #000',
        overflowY: 'auto',
        color: '#000'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#000', margin: 0 }}>Menú de Navegación</h2>
          <button 
            onClick={() => setIsNavOpen(false)}
            aria-label="Cerrar menú"
            style={{ background: '#000', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
          >
            ✕
          </button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <li>
            <button 
              onClick={() => {
                setIsNavOpen(false);
                const catalogEl = document.getElementById('catalog');
                if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }} 
              style={{ width: '100%', textAlign: 'left', display: 'block', padding: '0.75rem', background: '#0056b3', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
            >
              🎓 Cursos
            </button>
          </li>
          <li><Link to="/nosotros" onClick={() => setIsNavOpen(false)} style={{ display: 'block', padding: '0.75rem', background: '#f1f1f1', color: '#000', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>👥 Nosotros</Link></li>
          <li>
            <button 
              onClick={() => { setIsNavOpen(false); setIsA11yOpen(true); }}
              style={{ width: '100%', textAlign: 'left', display: 'block', padding: '0.75rem', background: '#f1f1f1', color: '#000', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
            >
              ⚙️ Ajustes (Accesibilidad)
            </button>
          </li>
          <li><Link to="/carrito" onClick={() => setIsNavOpen(false)} style={{ display: 'block', padding: '0.75rem', background: '#f1f1f1', color: '#000', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>🛒 Carrito</Link></li>
        </ul>
      </div>

      {/* 3. PANEL LATERAL DERECHO (ACCESIBILIDAD FUNCIONAL) */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: isA11yOpen ? 0 : '-100%',
        width: '320px',
        height: '100%',
        backgroundColor: '#ffffff',
        boxShadow: '-4px 0 15px rgba(0,0,0,0.2)',
        transition: 'right 0.3s ease-in-out',
        zIndex: 1100,
        padding: '1.5rem',
        boxSizing: 'border-box',
        borderLeft: '3px solid #000',
        overflowY: 'auto',
        color: '#000'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#000', margin: 0 }}>Accesibilidad AAA</h2>
          <button 
            onClick={() => setIsA11yOpen(false)}
            aria-label="Cerrar panel de accesibilidad"
            style={{ background: '#000', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
          >
            ✕
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#000' }}>Tipo de letra accesible (Dislexia)</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => setFontDyslexia(true)}
                style={{ flex: 1, padding: '0.5rem', background: fontDyslexia ? '#0056b3' : '#000', color: '#fff', border: '2px solid #000', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                OpenDyslexic
              </button>
              <button 
                onClick={() => setFontDyslexia(false)}
                style={{ flex: 1, padding: '0.5rem', background: !fontDyslexia ? '#0056b3' : '#fff', color: !fontDyslexia ? '#fff' : '#000', border: '2px solid #000', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Estándar
              </button>
            </div>
          </div>

          <div>
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#000' }}>Modo Visual (Autismo / Calma Sensorial)</p>
            <div 
              onClick={() => setCalmMode(!calmMode)}
              style={{ padding: '0.75rem', background: calmMode ? '#d4edda' : '#f4f4f4', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer' }}
            >
              <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>🍃 Modo Calma {calmMode ? '✓ (Activo)' : ''}</span>
              <span style={{ fontSize: '0.85rem', color: '#555' }}>Reduce saturación y distracciones visuales.</span>
            </div>
          </div>

          <div>
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#000' }}>Guía de Lectura</p>
            <button 
              onClick={() => setReadingGuide(!readingGuide)}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #000', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold', background: readingGuide ? '#000' : '#fff', color: readingGuide ? '#fff' : '#000', cursor: 'pointer' }}
            >
              Foco de Línea {readingGuide ? '✓ (Activo)' : 'U'}
            </button>
          </div>

          <div>
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#000' }}>Contraste</p>
            <button 
              onClick={() => setHighContrast(!highContrast)}
              style={{ width: '100%', padding: '0.5rem', background: highContrast ? '#fff' : '#000', color: highContrast ? '#000' : '#fff', borderRadius: '4px', fontWeight: 'bold', textAlign: 'center', border: '2px solid #000', cursor: 'pointer' }}
            >
              Alto Contraste AAA {highContrast ? '✓' : '◐'}
            </button>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <AccessibilityToggle />
        </div>
      </div>

      {/* 4. MODAL DE METODOLOGÍA */}
      {isMethodologyOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1200,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: '#fff',
            color: '#000',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '600px',
            width: '100%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setIsMethodologyOpen(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#000', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ✕
            </button>
            <h2 style={{ marginTop: 0 }}>Nuestra Metodología Inclusiva</h2>
            <p style={{ lineHeight: '1.6' }}>
              En <strong>MantiA11y Academy</strong> implementamos estrictamente el marco de <em>Diseño Universal para el Aprendizaje (DUA)</em> y las normativas internacionales de accesibilidad WCAG nivel AAA.
            </p>
            <button 
              onClick={() => setIsMethodologyOpen(false)}
              style={{ marginTop: '1rem', background: '#0056b3', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Entendido, cerrar
            </button>
          </div>
        </div>
      )}

      {/* 5. GUÍA DE LECTURA VISUAL */}
      {readingGuide && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: 0,
          width: '100%',
          height: '40px',
          borderTop: '2px dashed #ff0000',
          borderBottom: '2px dashed #ff0000',
          backgroundColor: 'rgba(255, 255, 0, 0.15)',
          pointerEvents: 'none',
          zIndex: 999
        }} />
      )}

      {/* 6. BACKDROP GENERAL PARA MENÚS */}
      {(isNavOpen || isA11yOpen) && (
        <div 
          onClick={() => { setIsNavOpen(false); setIsA11yOpen(false); }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1050
          }}
        />
      )}

      {/* 7. CONTENEDOR PRINCIPAL / RUTAS DE LA APLICACIÓN (FlexGrow para empujar el footer) */}
      <div style={{ flex: '1 0 auto' }}>
        <Routes>
          {/* RUTA 1: LANDING PRINCIPAL */}
          <Route path="/" element={
            <>
              <section className="hero-container" aria-label="Bienvenida" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <div className="hero-badge" style={{ margin: '0 auto 1rem auto', display: 'inline-block' }}>APRENDIZAJE ACCESIBILIDAD DIGITAL</div>
                
                <div className="hero-content-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                  <div className="hero-content" style={{ width: '100%' }}>
                    <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                      Diseña y Desarrolla para <em>Todos</em>.
                    </h1>
                    <p className="hero-description" style={{ maxWidth: '700px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
                      MantiA11y Academy es la plataforma educativa líder en español enfocada en Diseño Universal, Accesibilidad Web y Neurodiversidad.
                    </p>
                    <div className="hero-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <a href="#catalog" className="btn-primary" style={{ padding: '0.75rem 1.5rem', background: '#0056b3', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Explorar Cursos</a>
                      <button 
                        onClick={() => setIsMethodologyOpen(true)}
                        className="btn-secondary"
                        style={{ padding: '0.75rem 1.5rem', background: '#e2e8f0', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        Nuestra Metodología
                      </button>
                    </div>
                  </div>

                  {/* IMAGEN DE NEURODIVERGENTES INTEGRADA EN LA PARTE SUPERIOR */}
                  <div className="hero-image-container" style={{ width: '100%', maxWidth: '650px', marginTop: '1rem' }}>
                    <img 
                      src={neurodivergentesImg} 
                      alt="Ilustración representativa de neurodivergencia en MantiA11y Academy" 
                      style={{ width: '100%', borderRadius: '8px', display: 'block', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                  </div>
                </div>
              </section>

              <section className="stats-bar">
                <div className="stat-box">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">CURSOS EXPERTOS</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">5k+</span>
                  <span className="stat-label">ALUMNOS ACTIVOS</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">WCAG</span>
                  <span className="stat-label">NIVEL AAA</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">NEUROINCLUYENTE</span>
                </div>
              </section>
              
              <section className="resources-section" style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                <div className="resources-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                  <div className="resources-image-wrapper" style={{ width: '100%', maxWidth: '550px' }}>
                    <img 
                      src={dyslexiaSpecialistImg} 
                      alt="Especialista en dislexia revisando recursos y pautas de lectura accesible en una biblioteca" 
                      style={{ width: '100%', borderRadius: '8px', display: 'block', margin: '0 auto' }}
                    />
                  </div>
                  <div className="resources-content" style={{ width: '100%' }}>
                    <span className="section-tag" style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.5rem' }}>ASESORAMIENTO ESPECIALIZADO</span>
                    <h2 style={{ fontSize: '2rem', margin: '0.5rem 0 1rem 0' }}>Dislexia, Autismo y Accesibilidad Cognitiva</h2>
                    <p style={{ lineHeight: '1.6', maxWidth: '750px', margin: '0 auto' }}>
                      Integramos pautas tipográficas estrictas para dislexia, entornos de calma sensorial para personas dentro del espectro autista y apoyos cognitivos.
                    </p>
                  </div>
                </div>
              </section>

              {/* CATÁLOGO FORMATIVO DINÁMICO */}
              <main id="catalog" className="catalog-section" tabIndex="-1" style={{ padding: '2rem' }}>
                <div className="catalog-header" style={{ textAlign: 'center' }}>
                  <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontWeight: '900' }}>Catálogo Formativo</h2>
                  <p style={{ color: highContrast ? '#ccc' : '#555', fontSize: '1.05rem' }}>Formaciones intensivas con certificación profesional en accesibilidad digital y neurodiversidad.</p>
                  
                  {/* BOTONES DE FILTRO */}
                  <div className="filter-buttons" role="group" aria-label="Filtros de cursos" style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => handleFilterClick('Todos')}
                      style={{
                        padding: '0.6rem 1.25rem',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        border: '2px solid #0056b3',
                        backgroundColor: activeFilter === 'Todos' ? '#0056b3' : '#f8f9fa',
                        color: activeFilter === 'Todos' ? '#ffffff' : '#0056b3',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Todos
                    </button>
                    <button 
                      onClick={() => handleFilterClick('Diseño')}
                      style={{
                        padding: '0.6rem 1.25rem',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        border: '2px solid #0056b3',
                        backgroundColor: activeFilter === 'Diseño' ? '#0056b3' : '#f8f9fa',
                        color: activeFilter === 'Diseño' ? '#ffffff' : '#0056b3',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Diseño
                    </button>
                    <button 
                      onClick={() => handleFilterClick('Desarrollo')}
                      style={{
                        padding: '0.6rem 1.25rem',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        border: '2px solid #0056b3',
                        backgroundColor: activeFilter === 'Desarrollo' ? '#0056b3' : '#f8f9fa',
                        color: activeFilter === 'Desarrollo' ? '#ffffff' : '#0056b3',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Desarrollo
                    </button>
                  </div>
                </div>

                <div className="catalog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem', maxWidth: '1100px', marginInline: 'auto' }}>
                  {filteredCourses && filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} highContrast={highContrast} addToCart={addToCart} />
                  ))}
                </div>
              </main>

              <section className="corporate-section" style={{ marginTop: '4rem' }}>
                <div className="corporate-box dark-card" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
                  <div className="corporate-image-container" style={{ marginBottom: '1.5rem', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={communityTeamImg} alt="Comunidad" style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <h2>¿Tu empresa necesita accesibilidad AAA y neuroinclusión?</h2>
                  <p style={{ maxWidth: '700px', margin: '0 auto 1.5rem auto' }}>Ofrecemos planes de formación corporativa y auditorías técnicas.</p>
                  <div className="corporate-icon-badge">♿</div>
                </div>
              </section>
            </>
          } />

          {/* RUTA: SOBRE NOSOTROS */}
          <Route path="/nosotros" element={
            <div style={{ maxWidth: '900px', margin: '3rem auto', padding: '0 1.5rem', lineHeight: '1.7' }}>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}><Link to="/">Inicio</Link> &gt; <strong>Sobre Nosotros</strong></p>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>Quiénes Somos</h1>
              
              <div style={{ background: highContrast ? '#111' : '#f8f9fa', padding: '2rem', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Nuestra Misión</h2>
                <p>
                  En <strong>MantiA11y Academy</strong> creemos firmemente que la web debe ser un espacio universal, equitativo y sin barreras. Nuestra misión es formar a la próxima generación de diseñadores y desarrolladores bajo rigurosos estándares de accesibilidad digital (WCAG nivel AAA) y neuroinclusión (dislexia, autismo y accesibilidad cognitiva).
                </p>
              </div>

              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Por qué elegir MantiA11y Academy</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1.2rem', marginBottom: '2rem' }}>
                <li><strong>Enfoque Práctico:</strong> Formaciones basadas en casos de uso reales y herramientas modernas de desarrollo web.</li>
                <li><strong>Accesibilidad Nativa:</strong> No tratamos la accesibilidad como un complemento posterior, sino como la base fundamental de cualquier arquitectura digital.</li>
                <li><strong>Compromiso con la Neurodiversidad:</strong> Diseño de interfaces y metodologías que se adaptan a distintas necesidades sensoriales y cognitivas.</li>
              </ul>

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Link 
                  to="/" 
                  style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: '#0056b3', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}
                >
                  ← Volver al Catálogo de Cursos
                </Link>
              </div>
            </div>
          } />

{/* RUTA: CARRITO DE COMPRAS */}
          <Route path="/carrito" element={
            <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
              <h2 style={{ textAlign: 'center' }}>3. Carrito de Compras</h2>
              <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Revisa los cursos seleccionados antes de finalizar tu suscripción.</p>
              
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center' }}>Tu carrito está vacío. <Link to="/">Volver al catálogo</Link></p>
              ) : (
                <div>
                  {cart.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem', color: '#000' }}>
                      <div>
                        <h4>{item.title}</h4>
                        <p>Precio: <strong>{item.price} €</strong></p>
                      </div>
                      <button onClick={() => removeFromCart(index)} style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                        🗑️ Eliminar
                      </button>
                    </div>
                  ))}

                  <div style={{ background: '#f8f9fa', color: '#000', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ddd', marginTop: '2rem' }}>
                    <h3>Resumen del Pedido</h3>
                    <p>Subtotal: <strong>{cart.reduce((acc, curr) => acc + Number(curr.price || 0), 0)} €</strong></p>
                    <p>IVA (21%): Incluido</p>
                    <hr style={{ margin: '1rem 0' }} />
                    <h4>Total: {cart.reduce((acc, curr) => acc + Number(curr.price || 0), 0)} €</h4>
                    <button 
                      onClick={() => {
                        if (cart.length === 0) {
                          alert("El carrito está vacío.");
                        } else {
                          setCart([]); // Vaciamos el carrito
                          navigate('/exito'); // Redirigimos a la vista de Implementación Exitosa
                        }
                      }}
                      style={{ 
                        marginTop: '1.5rem', 
                        width: '100%', 
                        padding: '0.75rem', 
                        background: '#28a745', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '6px', 
                        fontSize: '1rem', 
                        fontWeight: 'bold', 
                        cursor: 'pointer' 
                      }}
                    >
                      💳 Finalizar Suscripción
                    </button>
                  </div>
                </div>
              )}
            </div>
          } />

          {/* RUTA: IMPLEMENTACIÓN EXITOSA */}
          <Route path="/exito" element={
            <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem 1rem', textAlign: 'center', background: '#121212', color: '#fff', borderRadius: '12px' }}>
              
              {/* Icono de verificación verde */}
              <div style={{ width: '70px', height: '70px', background: '#d4edda', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '2rem', color: '#28a745' }}>
                ✓
              </div>

              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>5. Implementación Exitosa</h2>
              <p style={{ color: '#cbd5e1', marginBottom: '2rem', lineHeight: '1.5' }}>
                ¡Felicidades! Tu inscripción se ha completado correctamente. Ahora eres parte del cambio hacia un mundo digital más inclusivo.
              </p>

              {/* Tarjeta 1: Dashboard de Calidad */}
              <div style={{ background: '#f8f9fa', color: '#000', padding: '1.5rem', borderRadius: '12px', textAlign: 'left', marginBottom: '1.5rem', border: '1px solid #ddd' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#0056b3', marginBottom: '0.5rem' }}>🗂️ Dashboard de Calidad</h3>
                <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>
                  Accede a tu panel centralizado para gestionar tus progresos, ver métricas de accesibilidad en tiempo real y coordinar tus equipos.
                </p>
                <button onClick={() => alert('Redirigiendo al Dashboard...')} style={{ background: '#0056b3', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>
                  🚀 Ir al Dashboard
                </button>
              </div>

              {/* Tarjeta 2: Reporte de Auditoría */}
              <div style={{ background: '#f8f9fa', color: '#000', padding: '1.5rem', borderRadius: '12px', textAlign: 'left', marginBottom: '1.5rem', border: '1px solid #ddd' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#854d0e', marginBottom: '0.5rem' }}>📊 Reporte de Auditoría</h3>
                <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>
                  Tu reporte inicial de cumplimiento WCAG 2.1 ya está listo. Descarga el PDF detallado con recomendaciones técnicas priorizadas.
                </p>
                <button onClick={() => alert('Descargando reporte PDF...')} style={{ background: 'transparent', color: '#0056b3', border: '2px solid #0056b3', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>
                  📥 Descargar Reporte
                </button>
              </div>

              {/* Soporte / Contacto inferior */}
              <div style={{ background: '#f8f9fa', color: '#000', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', textAlign: 'center' }}>
                <p style={{ margin: 0, color: '#555' }}>
                  ¿Necesitas asistencia técnica para navegar por el dashboard? Nuestro equipo de soporte especializado está disponible 24/7. <a href="mailto:mantiayacademymantillapena@gmail.com" style={{ color: '#0056b3', fontWeight: 'bold' }}>Habla con nosotros.</a>
                </p>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <Link to="/" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 'bold' }}>← Volver al inicio</Link>
              </div>

            </div>
          } />

        </Routes>
      </div>

      {/* FOOTER */}
      <footer style={{
        backgroundColor: highContrast ? '#111111' : '#1e293b',
        color: '#ffffff',
        padding: '3rem 1.5rem 2rem 1.5rem',
        marginTop: 'auto',
        borderTop: '3px solid #0056b3',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#60a5fa' }}>MantiA11y Academy</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#cbd5e1' }}>
              Transformando la educación digital mediante accesibilidad universal WCAG nivel AAA y un diseño neuroinclusivo.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#60a5fa' }}>Enlaces Rápidos</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <li><Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Inicio / Cursos</Link></li>
              <li><Link to="/carrito" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Carrito de Compras</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#60a5fa' }}>Contacto</h4>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>¿Dudas sobre accesibilidad corporativa?</p>
            <a href="mailto:mantiayacademymantillapena@gmail.com" style={{ color: '#60a5fa', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>
              mantiayacademymantillapena@gmail.com
            </a>
          </div>
        </div>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          borderTop: '1px solid #334155',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#94a3b8'
        }}>
          <p>© {new Date().getFullYear()} MantiA11y Academy. Todos los derechos reservados. Diseñado para Todos.</p>
        </div>
      </footer>

    </div>
  );
}

// -----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (Export)
// -----------------------------------------------------------------------------
export default function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <MainAppContent />
      </Router>
    </AccessibilityProvider>
  );
}