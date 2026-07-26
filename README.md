# MantiA11y Academy - Learning Platform

Proyecto desarrollado por **Nira Mantilla Peña** como parte de la formación Full-Stack Web Development. Esta plataforma de aprendizaje está especializada y diseñada específicamente para **personas neurodivergentes** y accesibilidad web avanzada, garantizando un entorno inclusivo, adaptable y libre de barreras cognitivas o sensoriales.

---

## 🛠️ Tecnologías y Metodologías
* **Estructura y Core:** React, HTML5 Semántico y componentes modulares (`App.jsx`, `homeView.jsx`).
* **Estilos:** SASS/SCSS utilizando la metodología **BEM** (Block Element Modifier) y tokens de diseño inclusivo (*Inclusive Horizon*).
* **Gestión de Proyecto:** Metodología Agile / Scrum mediante Jira.
* **Accesibilidad Avanzada (AAA / WCAG 2.2):**
  * Panel Sensorial interactivo con persistencia en `localStorage`.
  * Modos visuales adaptados: Modo Calma Sensorial, Tipografía accesible para Dislexia (`fontDyslexia`), Guía de Lectura interactiva, Modo de Alto Contraste y Foco Visible Mejorado.
  * Tamaños de fuente ajustables (`normal`, `large`, `xlarge`).
* **Diseño y Prototipado:** Figma (Diseño de alta fidelidad con enfoque inclusivo).

---

## 📂 Estructura del Proyecto
El proyecto se organiza de manera modular y limpia:
* `AccessibilityContext.jsx`: Contexto global para la gestión y persistencia de las preferencias de accesibilidad y neuroinclusión.
* `AccessibilityToggle.jsx`: Componente flotante de control rápido para el usuario.
* `homeView.jsx`: Vista principal modularizada con catálogos formativos interactivos y carrito de compras inclusivo.
* `scss/`: Módulos de estilos avanzados (`header.scss`, `main.scss`, `variables.scss`).

---

## 💳 Flujo de Compra y Pasarela (Simulación Educativa)
Para garantizar una experiencia de usuario fluida y sin interrupciones (evitando errores de políticas de CORS, CORS/S3 o claves de pago externas en un entorno puramente académico), la pasarela de pago real ha sido adaptada a un **flujo de simulación interno**.
* Al hacer clic en "Finalizar Contratación", el carrito se vacía limpiamente y redirige al usuario a una pantalla de éxito (`/checkout-exitoso`) integrada mediante React Router, simulando la recepción de la factura y el acceso inmediato a los cursos dentro de la plataforma.

---

## 🗺️ Arquitectura y Flujo de Usuario (User Flow)
El diseño y desarrollo de la plataforma sigue un flujo metodológico estructurado para garantizar la accesibilidad y la experiencia de usuario neuroinclusiva:

![MantiA11y Academy User Flow](./ruta-de-tu-imagen/image_639dda.jpg)

---

## 🔗 Enlaces de Interés y Documentación del Proyecto
* **Repositorio en GitHub:** [github.com/nmantilla12/MantiA11y-Academy](https://github.com/nmantilla12/MantiA11y-Academy)
* **Diseño en Figma:** [Figma Prototipo de Alta Fidelidad](https://www.figma.com/design/eiKtpcxWqEI89zafUfHYpD/landing-page-inclusiva-proyecto-final?node-id=0-1&p=f&t=OomMjMGnQ32jFVwZ-0)
* **Tablero de Jira:** [Jira Board - Proyecto MTY](https://01776169602738.atlassian.net/jira/software/projects/MTY/boards/68/backlog)

---

## 📄 Licencia
Este proyecto está protegido bajo la [Licencia MIT](LICENSE). Cualquier uso, modificación o distribución del código requiere mantener este aviso de derechos de autor y reconocer a la autora original: **Nira Mantilla Peña**.

---
*Desarrollado con pasión por la tecnología inclusiva y la neuroinclusión.*
