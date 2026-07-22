/* src/data.jsx */

import autismoImg from './assets/images/autismo.jpg';
import cognitivaImg from './assets/images/cognitiva.jpg';
import diferenciasImg from './assets/images/diferencias.jpg';
import dislexiaImg from './assets/images/dislexia.png';
import neurodiversidadImg from './assets/images/neurodiversidad.jpg';
import wcagImg from './assets/images/wcag.jpg';

export const catalogData = [
  {
    id: 1,
    title: "Introducción a la Accesibilidad Web (WCAG 2.2)",
    category: "Desarrollo",
    level: "BÁSICO",
    price: "80",
    description: "Aprende los fundamentos normativos y técnicos para crear sitios web accesibles conforme a los estándares internacionales WCAG.",
    image: wcagImg
  },
  {
    id: 2,
    title: "Diseño UX Inclusivo y Contrastes AAA",
    category: "Diseño",
    level: "INTERMEDIO",
    price: "95",
    description: "Domina las paletas de colores accesibles, la jerarquía visual tipográfica y la navegación por teclado en interfaces digitales.",
    image: diferenciasImg
  },
  {
    id: 3,
    title: "Lectura Fácil y Accesibilidad Cognitiva",
    category: "Diseño",
    level: "INTERMEDIO",
    price: "110",
    description: "Técnicas de redacción clara, estructuración de contenidos y diseño universal enfocado en personas con dificultades cognitivas.",
    image: cognitivaImg
  },
  {
    id: 4,
    title: "Dislexia y Otras Dificultades de Aprendizaje",
    category: "Diseño",
    level: "AVANZADO",
    price: "120",
    description: "Formación especializada en pautas de accesibilidad cognitiva, estimulación y estrategias de intervención emocional para entornos educativos y digitales.",
    image: dislexiaImg
  },
  {
    id: 5,
    title: "Máster en Intervención con Personas de Educación Especial",
    category: "Desarrollo",
    level: "AVANZADO",
    price: "240",
    description: "Programa formativo integral enfocado en la aproximación a la discapacidad, apoyo conductual positivo, inclusión escolar, laboral y tránsito a la vida adulta.",
    image: autismoImg
  },
  {
    id: 6,
    title: "Inteligencia Emocional y Método Montessori (0 a 6 años)",
    category: "Diseño",
    level: "AVANZADO",
    price: "180",
    description: "Formación especializada en desarrollo de competencias emocionales a nivel organizacional y aplicación de los principios pedagógicos Montessori en el desarrollo infantil temprano.",
    image: neurodiversidadImg
  }
];
