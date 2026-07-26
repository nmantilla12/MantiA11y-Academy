import React from 'react';
import { Link } from 'react-router-dom';

import heroDashboardImg from './assets/images/manager.png';
import dyslexiaSpecialistImg from './assets/images/dyslexia.png';
import communityTeamImg from './assets/images/especialista.png';

export default function HomeView({ 
  catalogData, 
  activeFilter, 
  setActiveFilter, 
  addToCart, 
  setIsMethodologyOpen,
  highContrast 
}) {
  const filteredCourses = catalogData.filter(course => {
    if (activeFilter === 'Todos') return true;
    return course.category === activeFilter;
  });

  return (
    <>
      {/* SECCIÓN HERO / BIENVENIDA */}
      <section className="hero-container" aria-label="Bienvenida" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div className="hero-badge" style={{ margin: '0 auto 1rem auto', display: 'inline-block' }}>APRENDIZAJE ACCESIBILIDAD DIGITAL</div>
        <div className="hero-content-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          <div className="hero-content" style={{ width: '100%' }}>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Diseña y Desarrolla para <em>Todos</em>.
            </h1>
            <p className="hero-description" style={{ maxWidth: '700px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              MantiA11y Academy es la plataforma educativa líder en español enfocada en Diseño Universal, Accesibilidad Web y Neurodiversidad (Dislexia, Autismo y Autonomía Cognitiva).
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
              className="hero-img"
              style={{ width: '100%', borderRadius: '8px', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* BARRA DE ESTADÍSTICAS */}
      <section className="stats-bar">
        <div className="stat-box"><span className="stat-number">15+</span><span className="stat-label">CURSOS EXPERTOS</span></div>
        <div className="stat-box"><span className="stat-number">5k+</span><span className="stat-label">ALUMNOS ACTIVOS</span></div>
        <div className="stat-box"><span className="stat-number">WCAG</span><span className="stat-label">NIVEL AAA</span></div>
        <div className="stat-box"><span className="stat-number">100%</span><span className="stat-label">NEUROINCLUYENTE</span></div>
      </section>
      
      {/* SECCIÓN DE ASESORAMIENTO */}
      <section className="resources-section" style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div className="resources-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <div className="resources-image-wrapper" style={{ width: '100%', maxWidth: '550px' }}>
            <img src={dyslexiaSpecialistImg} alt="Especialista en dislexia revisando recursos" className="resources-img" style={{ width: '100%', borderRadius: '8px', display: 'block', margin: '0 auto' }} />
          </div>
          <div className="resources-content" style={{ width: '100%' }}>
            <span className="section-tag" style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.5rem' }}>ASESORAMIENTO ESPECIALIZADO</span>
            <h2 style={{ fontSize: '2rem', margin: '0.5rem 0 1rem 0' }}>Dislexia, Autismo y Accesibilidad Cognitiva</h2>
            <p style={{ lineHeight: '1.6', maxWidth: '750px', margin: '0 auto' }}>
              Integramos pautas tipográficas estrictas para dislexia, entornos de calma sensorial y apoyos cognitivos.
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
                <img src={course.image} alt={course.title} className="course-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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

      {/* SECCIÓN CORPORATIVA */}
      <section className="corporate-section" style={{ padding: '3rem 1rem' }}>
        <div className="corporate-box dark-card" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
          <div className="corporate-image-container" style={{ marginBottom: '1.5rem', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={communityTeamImg} alt="Panel digital que muestra rostros diversos" className="corporate-img" style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', display: 'block' }} />
          </div>
          <h2>¿Tu empresa necesita accesibilidad AAA y neuroinclusión?</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 1.5rem auto' }}>Ofrecemos planes de formación corporativa y auditorías técnicas adaptadas.</p>
          <div className="corporate-icon-badge">♿</div>
        </div>
      </section>
    </>
  );
}
