import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importación de imágenes desde la carpeta de assets
import heroDashboardImg from './assets/images/manager.png';
import dyslexiaSpecialistImg from './assets/images/dyslexia.png';
import communityTeamImg from './assets/images/especialista.png';

// Importación de datos, contexto y componente de accesibilidad
import { catalogData } from './data.jsx';
import { AccessibilityProvider, AccessibilityContext } from './AccessibilityContext.jsx';
import { AccessibilityToggle } from './AccessibilityToggle';

function MainAppContent() {
  const [cart, setCart] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Todos');
  
  // Estados para controlar los menús laterales y el modal de metodología
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isA11yOpen, setIsA11yOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  // Consumir el contexto de accesibilidad de forma segura
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

  const filteredCourses = catalogData.filter(course => {
    if (activeFilter === 'Todos') return true;
    return course.category === activeFilter;
  });

  return (
    <div className="app-container" style={{
      fontFamily: fontDyslexia ? '"OpenDyslexic", sans-serif, Arial' : 'inherit',
      filter: calmMode ? 'saturate(0.5) contrast(0.9)' : 'none',
      backgroundColor: highContrast ? '#000000' : 'inherit',
      color: highContrast ? '#ffffff' : 'inherit'
    }}>
      
      {/* BARRA DE ACCESIBILIDAD / HEADER SUPERIOR */}
      <header className="header-accessibility-bar" style={{ 
        padding: '1rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: highContrast ? '#111111' : '#f9f9f9', 
        borderBottom: '2px solid #000',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <button 
          onClick={() => setIsNavOpen(true)}
          aria-label="Abrir menú de navegación"
          style={{
            background: '#000',
            color: '#fff',
            border: '2px solid #000',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          ☰ Menú
        </button>

        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: highContrast ? '#fff' : '#000' }}>🏠 Inicio</Link>
          <Link to="/carrito" style={{ fontWeight: 'bold', textDecoration: 'none', color: highContrast ? '#fff' : '#000' }}>🛒 Carrito ({cart.length})</Link>
        </nav>

        <button 
          onClick={() => setIsA11yOpen(true)}
          aria-label="Abrir panel de accesibilidad y neurodivergencia"
          style={{
            background: '#000',
            color: '#fff',
            border: '2px solid #000',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          👁️ Accesibilidad
        </button>
      </header>

      {/* MENÚ LATERAL IZQUIERDO (NAVEGACIÓN) */}
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
          <li><Link to="/" onClick={() => setIsNavOpen(false)} style={{ display: 'block', padding: '0.75rem', background: '#0056b3', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>🎓 Cursos</Link></li>
          <li><a href="#catalog" onClick={() => setIsNavOpen(false)} style={{ display: 'block', padding: '0.75rem', background: '#f1f1f1', color: '#000', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>👥 Nosotros</a></li>
          <li>
            <button 
              onClick={() => { setIsNavOpen(false); setIsA11yOpen(true); }}
              style={{ width: '100%', textAlign: 'left', display: 'block', padding: '0.75rem', background: '#f1f1f1', color: '#000', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
            >
               Ajustes (Accesibilidad)
            </button>
          </li>
          <li><Link to="/carrito" onClick={() => setIsNavOpen(false)} style={{ display: 'block', padding: '0.75rem', background: '#f1f1f1', color: '#000', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>🛒 Carrito</Link></li>
        </ul>
      </div>

      {/* PANEL LATERAL DERECHO (ACCESIBILIDAD FUNCIONAL) */}
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

      {/* MODAL DE METODOLOGÍA */}
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

      {/* GUÍA DE LECTURA VISUAL */}
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

      {/* BACKDROP GENERAL PARA MENÚS */}
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
                <div className="hero-image-container" style={{ width: '100%', maxWidth: '650px', marginTop: '1rem' }}>
                  <img 
                    src={heroDashboardImg} 
                    alt="Especialista trabajando frente a un portátil con un panel analítico de accesibilidad web" 
                    style={{ width: '100%', borderRadius: '8px', display: 'block' }}
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
            <main id="catalog" className="catalog-section" tabIndex="-1">
              <div className="catalog-header">
                <span className="section-number">1. CATÁLOGO FORMATIVO</span>
                <h2>Catálogo Formativo</h2>
                <p>Formaciones intensivas con certificación profesional en accesibilidad digital y neurodiversidad.</p>
                
                <div className="filter-buttons" role="group" aria-label="Filtros de cursos">
                  <button className={activeFilter === 'Todos' ? 'filter-btn active' : 'filter-btn'} onClick={() => setActiveFilter('Todos')}>Todos</button>
                  <button className={activeFilter === 'Diseño' ? 'filter-btn active' : 'filter-btn'} onClick={() => setActiveFilter('Diseño')}>Diseño</button>
                  <button className={activeFilter === 'Desarrollo' ? 'filter-btn active' : 'filter-btn'} onClick={() => setActiveFilter('Desarrollo')}>Desarrollo</button>
                </div>
              </div>

              <div className="catalog-grid">
                {filteredCourses && filteredCourses.map(course => (
                  <div key={course.id} className="course-card" style={{ background: highContrast ? '#222' : '#fff', color: highContrast ? '#fff' : '#000', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                    <div className="course-card-image-container" style={{ width: '100%', height: '170px', overflow: 'hidden' }}>
                      <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <div className="course-card-body" style={{ padding: '1.5rem' }}>
                      <span className="course-level-tag">{course.level || 'INTERMEDIO'}</span>
                      <h3 className="course-title">{course.title}</h3>
                      <p className="course-description">{course.description}</p>
                      <div className="course-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                        <span className="course-price" style={{ fontWeight: 'bold' }}>{course.price} €</span>
                        <button className="course-btn" onClick={() => addToCart(course)} style={{ padding: '0.5rem 1rem', background: '#0056b3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                          Añadir al Carrito
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </main>

            <section className="corporate-section">
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

        {/* RUTA 2: DETALLE DEL CURSO */}
        <Route path="/curso/:id" element={
          <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
            <p style={{ color: '#666', fontSize: '0.9rem' }}><Link to="/">Cursos</Link> &gt; <strong>2. Detalle del Curso</strong></p>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '1rem' }}>WCAG 2.2 Essentials: Diseño Inclusivo, Dislexia y Neurodiversidad</h1>
            <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0', flexWrap: 'wrap' }}>
              <span style={{ background: '#e2e8f0', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>⏱️ 12 Horas</span>
              <span style={{ background: '#e2e8f0', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>📚 24 Clases</span>
              <span style={{ background: '#000', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: 'bold' }}>AAA Compliant</span>
            </div>
            <h3 style={{ marginTop: '1.5rem' }}>Sobre este curso</h3>
            <p style={{ lineHeight: '1.6', color: '#444' }}>
              Domina las últimas actualizaciones de las Pautas de Accesibilidad (WCAG) nivel AAA.
            </p>
          </div>
        } />

        {/* RUTA 3: CARRITO DE COMPRAS */}
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
                        return;
                      }
                      
                      // Vaciamos el carrito y redirigimos a la pantalla interna de simulación de éxito
                      setCart([]);
                      window.location.href = "/checkout-exitoso";
                    }}
                    style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', background: '#0056b3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Finalizar Contratación →
                  </button>
                </div>
              </div>
            )}
          </div>
        } />

        {/* RUTA 4: SIMULACIÓN DE ÉXITO DE PAGO */}
        <Route path="/checkout-exitoso" element={
          <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem', textAlign: 'center', background: '#fff', borderRadius: '8px', border: '1px solid #ddd', color: '#000' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ color: '#28a745', marginBottom: '1rem' }}>¡Contratación Exitosa!</h2>
            <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '2rem' }}>
              Simulación completada con éxito. En un entorno de producción real, aquí recibirías tu factura y el acceso inmediato a tus cursos en la plataforma de MantiA11y Academy.
            </p>
            <Link 
              to="/" 
              style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: '#0056b3', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}
            >
              Volver al Inicio
            </Link>
          </div>
        } />

      </Routes>

      {/* FOOTER */}
      <footer className="footer-section" style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid #ddd', marginTop: '4rem' }}>
        <div className="footer-content">
          <h3>MantiA11y Academy</h3>
          <p>© 2026 MantiA11y Academy. Accesibilidad Web Nivel AAA, Dislexia y Neurodiversidad.</p>
          <div className="footer-links" style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#privacy">Política de Privacidad</a>
            <a href="#terms">Términos de Servicio</a>
            <a href="#accessibility">Declaración de Accesibilidad AAA</a>
            <a href="mailto:mantiayacademymantillapena@gmail.com">Contacto</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <MainAppContent />
      </Router>
    </AccessibilityProvider>
  );
}

export default App;