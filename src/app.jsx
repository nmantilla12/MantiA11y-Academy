import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importación de imágenes desde la carpeta de assets
import heroDashboardImg from './assets/images/manager.png';
import dyslexiaSpecialistImg from './assets/images/dyslexia.png';
import communityTeamImg from './assets/images/especialista.png';

// Importación de datos, contexto y componente de accesibilidad
import { catalogData } from './data.jsx';
import { AccessibilityProvider } from './AccessibilityContext.jsx';
import { AccessibilityToggle } from './AccessibilityToggle';


function App() {
  const [cart, setCart] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Todos');
  
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
    <AccessibilityProvider>
      <Router>
        <div className="app-container">
          
          {/* BARRA DE ACCESIBILIDAD / HEADER SUPERIOR */}
          <header className="header-accessibility-bar" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9', borderBottom: '1px solid #eaeaea' }}>
            <nav style={{ display: 'flex', gap: '1.5rem' }}>
              <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>🏠 Inicio</Link>
              <Link to="/carrito" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>🛒 Carrito ({cart.length})</Link>
            </nav>
            <AccessibilityToggle />
          </header>

          <Routes>
            {/* RUTA 1: LA LANDING PRINCIPAL (Tu código intacto) */}
            <Route path="/" element={
              <>
                {/* 1. SECCIÓN HERO */}
                <section className="hero-container" aria-label="Bienvenida">
                  <div className="hero-badge">APRENDIZAJE ACCESIBILIDAD DIGITAL</div>
                  <div className="hero-content-wrapper" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <div className="hero-content" style={{ flex: '1 1 45%' }}>
                      <h1 className="hero-title">
                        Diseña y Desarrolla para <em>Todos</em>.
                      </h1>
                      <p className="hero-description">
                        MantiA11y Academy es la plataforma educativa líder en español enfocada en Diseño Universal, Accesibilidad Web y Neurodiversidad.
                      </p>
                      <div className="hero-buttons">
                        <a href="#catalog" className="btn-primary">Explorar Cursos</a>
                        <button className="btn-secondary">Nuestra Metodología</button>
                      </div>
                    </div>
                    <div className="hero-image-container" style={{ flex: '1 1 45%', maxWidth: '550px' }}>
                      <img 
                        src={heroDashboardImg} 
                        alt="Especialista trabajando frente a un portátil con un panel analítico de accesibilidad web" 
                        className="hero-img"
                        style={{ width: '100%', borderRadius: '8px', display: 'block' }}
                      />
                    </div>
                  </div>
                </section>

                {/* 2. BARRA DE ESTADÍSTICAS */}
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
                    <span className="stat-label">ESPEC. 2.2</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">UNIVERSAL</span>
                  </div>
                </section>
                
                {/* SECCIÓN DE RECURSOS Y DISLEXIA */}
                <section className="resources-section" style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                  <div className="resources-container" style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                    <div className="resources-image-wrapper" style={{ flex: '1 1 45%', maxWidth: '500px' }}>
                      <img 
                        src={dyslexiaSpecialistImg} 
                        alt="Especialista en dislexia revisando recursos y pautas de lectura accesible en una biblioteca" 
                        className="resources-img"
                        style={{ width: '100%', borderRadius: '8px', display: 'block' }}
                      />
                    </div>
                    <div className="resources-content" style={{ flex: '1 1 45%' }}>
                      <span className="section-tag" style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>ASESORAMIENTO ESPECIALIZADO</span>
                      <h2 style={{ fontSize: '2rem', margin: '0.5rem 0 1rem 0' }}>Dislexia y Accesibilidad Cognitiva</h2>
                      <p style={{ lineHeight: '1.6' }}>
                        Integramos pautas tipográficas, contrastes optimizados y estrategias de apoyo cognitivo para garantizar que la lectura y la navegación digital sean plenamente accesibles para personas con dislexia.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 3. CATÁLOGO FORMATIVO */}
                <main id="catalog" className="catalog-section" tabIndex="-1">
                  <div className="catalog-header">
                    <span className="section-number">1. CATÁLOGO FORMATIVO</span>
                    <h2>Catálogo Formativo</h2>
                    <p>Formaciones intensivas con certificación profesional en accesibilidad digital.</p>
                    
                    <div className="filter-buttons" role="group" aria-label="Filtros de cursos">
                      <button 
                        className={activeFilter === 'Todos' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setActiveFilter('Todos')}
                      >
                        Todos
                      </button>
                      <button 
                        className={activeFilter === 'Diseño' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setActiveFilter('Diseño')}
                      >
                        Diseño
                      </button>
                      <button 
                        className={activeFilter === 'Desarrollo' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setActiveFilter('Desarrollo')}
                      >
                        Desarrollo
                      </button>
                    </div>
                  </div>

                  <div className="catalog-grid">
                    {filteredCourses && filteredCourses.map(course => (
                      <div key={course.id} className="course-card">
                        
                        <div className="course-card-image-container" style={{ width: '100%', height: '170px', overflow: 'hidden' }}>
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="course-card-img" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        </div>

                        <div className="course-card-body">
                          <span className="course-level-tag">{course.level || 'INTERMEDIO'}</span>
                          <h3 className="course-title">{course.title}</h3>
                          <p className="course-description">{course.description}</p>
                          
                          {course.id === 4 && (
                            <div className="course-syllabus">
                              <h3>Contenidos de la Formación:</h3>
                              <ul className="syllabus-list">
                                <li><strong>TEMA 1.</strong> Dificultades de aprendizaje</li>
                                <li><strong>TEMA 2.</strong> Estimulación cognitiva y dificultades de aprendizaje</li>
                                <li><strong>TEMA 3.</strong> Estrategias para mejorar la capacidad de aprender</li>
                                <li><strong>TEMA 4.</strong> Intervención emocional en las dificultades de aprendizaje</li>
                              </ul>
                            </div>
                          )}

                          {course.id === 5 && (
                            <div className="course-syllabus">
                              <h3>Contenidos de la Formación:</h3>
                              <ul className="syllabus-list">
                                <li><strong>TEMA 1.</strong> Aproximación a la discapacidad</li>
                                <li><strong>TEMA 2.</strong> Discapacidad y familia</li>
                                <li><strong>TEMA 3.</strong> La discapacidad en el ámbito escolar</li>
                                <li><strong>TEMA 4.</strong> Apoyo conductual positivo</li>
                                <li><strong>TEMA 5.</strong> Discapacidad y ocio inclusivo</li>
                                <li><strong>TEMA 6.</strong> Tránsito de la vida adulta</li>
                                <li><strong>TEMA 7.</strong> Inclusión en el ámbito laboral</li>
                              </ul>
                            </div>
                          )}

                          {course.id === 6 && (
                            <div className="course-syllabus">
                              <h3>Contenidos de la Formación:</h3>
                              <div className="syllabus-block"><strong>Inteligencia Emocional:</strong></div>
                              <ul className="syllabus-list">
                                <li>TEMA 1. Conceptos y fundamentación</li>
                                <li>TEMA 2. El reto en las organizaciones</li>
                                <li>TEMA 3. Aplicación práctica</li>
                              </ul>
                              <div className="syllabus-block" style={{ marginTop: '0.4rem' }}><strong>Método Montessori (0-6 años):</strong></div>
                              <ul className="syllabus-list">
                                <li>TEMA 0-1. Introducción y principios</li>
                                <li>TEMA 2-3. Aplicación 0-3 y 3-6 años</li>
                                <li>TEMA 4. Banco de actividades</li>
                              </ul>
                            </div>
                          )}

                          <div className="course-footer">
                            <span className="course-price">{course.price} €</span>
                            <button className="course-btn" onClick={() => addToCart(course)}>
                              Añadir al Carrito
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </main>

                {/* 4. SECCIÓN CORPORATIVA */}
                <section className="corporate-section">
                  <div className="corporate-box dark-card" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
                    <div className="corporate-image-container" style={{ marginBottom: '1.5rem', borderRadius: '8px', overflow: 'hidden' }}>
                      <img 
                        src={communityTeamImg} 
                        alt="Panel digital que muestra rostros diversos de la comunidad de estudiantes y profesionales en videollamada" 
                        className="corporate-img"
                        style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <h2>¿Tu empresa necesita accesibilidad?</h2>
                    <p>Ofrecemos planes de formación corporativa y auditorías técnicas personalizadas para equipos de diseño y desarrollo.</p>
                    <button className="btn-corporate">Contacto Corporativo</button>
                    <div className="corporate-icon-badge">♿</div>
                  </div>
                </section>
              </>
            } />

            {/* RUTA 2: DETALLE DEL CURSO (Basado en Figma) */}
            <Route path="/curso/:id" element={
              <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
                <p style={{ color: '#666', fontSize: '0.9rem' }}><Link to="/">Cursos</Link> &gt; <strong>2. Detalle del Curso</strong></p>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '1rem' }}>WCAG 2.2 Essentials: Diseño Inclusivo Moderno</h1>
                <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
                  <span style={{ background: '#e2e8f0', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>⏱️ 12 Horas</span>
                  <span style={{ background: '#e2e8f0', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>📚 24 Clases</span>
                </div>
                <h3 style={{ marginTop: '1.5rem' }}>Sobre este curso</h3>
                <p style={{ lineHeight: '1.6', color: '#444' }}>
                  Domina las últimas actualizaciones de las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2. Aprenderás a implementar los nuevos criterios de éxito enfocados en usuarios con discapacidades cognitivas y de aprendizaje, así como mejoras para usuarios móviles.
                </p>
                <div style={{ marginTop: '2rem' }}>
                  <h3>Plan de Estudios</h3>
                  <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd', marginTop: '1rem' }}>
                    <h4>Módulo 1: Fundamentos de Accesibilidad</h4>
                    <p>1.1 Introducción al Diseño Universal (08:20)</p>
                    <p>1.2 Historia de las WCAG (15 min)</p>
                  </div>
                </div>
              </div>
            } />

            {/* RUTA 3: CARRITO DE COMPRAS (Basado en Figma) */}
            <Route path="/carrito" element={
              <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
                <h2 style={{ textAlign: 'center' }}>3. Carrito de Compras</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Revisa los cursos seleccionados antes de finalizar tu suscripción.</p>
                
                {cart.length === 0 ? (
                  <p style={{ textAlign: 'center' }}>Tu carrito está vacío. <Link to="/">Volver al catálogo</Link></p>
                ) : (
                  <div>
                    {cart.map((item, index) => (
                      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '1rem' }}>
                        <div>
                          <h4>{item.title}</h4>
                          <p>Precio: <strong>{item.price} €</strong></p>
                        </div>
                        <button onClick={() => removeFromCart(index)} style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                          🗑️ Eliminar
                        </button>
                      </div>
                    ))}

                    <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ddd', marginTop: '2rem' }}>
                      <h3>Resumen del Pedido</h3>
                      <p>Subtotal: <strong>{cart.reduce((acc, curr) => acc + curr.price, 0)} €</strong></p>
                      <p>IVA (21%): Incluido</p>
                      <hr style={{ margin: '1rem 0' }} />
                      <h4>Total: {cart.reduce((acc, curr) => acc + curr.price, 0)} €</h4>
                      <button style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', background: '#0056b3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Finalizar Contratación →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            } />
          </Routes>

          {/* 5. FOOTER */}
          <footer className="footer-section">
            <div className="footer-content">
              <h3>MantiA11y Academy</h3>
              <p>© 2026 MantiA11y Academy. Diseño Universal y Accesibilidad.</p>
              <div className="footer-links">
                <a href="#privacy">Política de Privacidad</a>
                <a href="#terms">Términos de Servicio</a>
                <a href="#accessibility">Declaración de Accesibilidad</a>
                <a href="#contact">Contacto</a>
              </div>
            </div>
          </footer>

        </div>
      </Router>
    </AccessibilityProvider>
  );
}

export default App;
