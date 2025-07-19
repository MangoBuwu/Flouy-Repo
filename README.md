# FLOY - WhatsApp Automation Platform

Una plataforma moderna de automatización de WhatsApp con diseño inspirado en Cursor, que combina funcionalidad avanzada con una experiencia de usuario excepcional.

## 🎨 Nuevo Diseño

### Paleta de Colores
- **Primario**: Verde menta (#00d4aa)
- **Secundario**: Verde oscuro (#00b894)
- **Acento**: Verde claro (#00e6b8)
- **Neutros**: Blanco, gris y negro
- **Tema**: Claro por defecto con toggle a modo oscuro

### Características del Diseño
- **Hero Section**: Inspirado en Cursor con gradiente multicolor vibrante
- **Smartphone Realista**: Mockup con silueta de smartphone real y animación flotante
- **Botones Rectangulares**: Bordes redondeados con texto "Votar por Floy" y "Ver demostración"
- **Navegación**: Header oscuro sin posición fija
- **Responsive**: Diseño completamente adaptable a todos los dispositivos

## 🚀 Funcionalidades

### Demo Interactivo
- **Chat en Tiempo Real**: Integración con Gemini API
- **Respuestas Inteligentes**: IA que entiende contexto y genera respuestas relevantes
- **Indicadores de Escritura**: Animación de "escribiendo..."
- **Generación de Gráficos**: SVG dinámicos basados en consultas del usuario
- **Sugerencias Interactivas**: Clic para enviar mensajes predefinidos

### Sistema de Temas
- **Toggle Flotante**: Botón de cambio de tema en la esquina superior derecha
- **Persistencia**: Preferencia guardada en localStorage
- **Transiciones Suaves**: Animaciones fluidas entre temas

### Multiidioma
- **3 Idiomas**: Español, Inglés y Portugués
- **Selector en Footer**: Cambio de idioma con notificación toast
- **Persistencia**: Idioma guardado en localStorage
- **Traducción Completa**: Todo el contenido traducido

## 📹 Sección de Video

### Ubicación
La sección de video se encuentra después de la demostración inicial y antes de la sección de patrocinadores.

### Implementación Actual
```html
<section class="video-section">
    <div class="video-container">
        <div class="video-placeholder">
            <i class="fas fa-play-circle"></i>
        </div>
        <div class="video-text">
            <h3 data-translate="video.title">Descubre FLOY en Acción</h3>
            <p data-translate="video.description">
                Mira cómo FLOY transforma la gestión de WhatsApp en tu negocio. 
                Desde la configuración inicial hasta el análisis avanzado de datos.
            </p>
        </div>
    </div>
</section>
```

### Para Implementar el Video Real

1. **Reemplazar el placeholder**:
   ```html
   <div class="video-placeholder">
       <!-- Reemplazar con: -->
       <video controls width="100%" height="450">
           <source src="path/to/your/video.mp4" type="video/mp4">
           Tu navegador no soporta el elemento video.
       </video>
   </div>
   ```

2. **O usar un iframe para YouTube/Vimeo**:
   ```html
   <div class="video-placeholder">
       <iframe 
           width="100%" 
           height="450" 
           src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
           frameborder="0" 
           allowfullscreen>
       </iframe>
   </div>
   ```

3. **Actualizar CSS** (opcional):
   ```css
   .video-placeholder video,
   .video-placeholder iframe {
       border-radius: 20px;
       box-shadow: var(--shadow-medium);
   }
   ```

## 🏢 Sección de Patrocinadores

### Características
- **Scroll Infinito**: Animación continua de logos
- **Pausa en Hover**: Se detiene al pasar el cursor
- **Diseño Responsive**: Se adapta a diferentes tamaños de pantalla
- **Logos Duplicados**: Para crear el efecto de scroll infinito

### Estructura
```html
<section class="sponsors">
    <div class="sponsors-container">
        <div class="sponsors-title">
            <h3 data-translate="sponsors.title">Empresas que confían en FLOY</h3>
        </div>
        <div class="sponsors-logos">
            <!-- Logos aquí -->
        </div>
    </div>
</section>
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica moderna
- **CSS3**: Flexbox, Grid, animaciones y variables CSS
- **JavaScript ES6+**: Funcionalidad interactiva y manejo de estado
- **Font Awesome**: Iconografía consistente
- **Google Fonts**: Tipografía Inter para mejor legibilidad
- **Gemini API**: Integración para respuestas inteligentes

## 📱 Características Responsive

### Breakpoints
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

### Adaptaciones
- **Hero Section**: Grid a columna única en móvil
- **Smartphone Mockup**: Tamaño reducido en pantallas pequeñas
- **Navegación**: Menú hamburguesa en móvil
- **Botones**: Stack vertical en pantallas pequeñas

## 🎯 Funcionalidades Avanzadas

### Sistema de Animaciones
- **Scroll Animations**: Elementos aparecen al hacer scroll
- **Hover Effects**: Interacciones suaves en elementos
- **Loading States**: Indicadores de carga para operaciones
- **Stagger Animations**: Animaciones escalonadas para listas

### Gestión de Estado
- **LocalStorage**: Persistencia de tema e idioma
- **Session Management**: Manejo de estado del chat
- **Error Handling**: Manejo de errores en API calls

## 🔧 Configuración

### Requisitos
- Navegador moderno con soporte para ES6+
- Conexión a internet para fuentes y iconos
- API Key de Gemini (para funcionalidad completa del demo)

### Instalación
1. Clona el repositorio
2. Abre `index.html` en tu navegador
3. Para funcionalidad completa del demo, configura tu API key de Gemini

### Personalización
- **Colores**: Modifica las variables CSS en `:root`
- **Contenido**: Actualiza las traducciones en `script.js`
- **Funcionalidad**: Extiende las funciones en `script.js`

## 🚀 Próximas Mejoras

### Pendientes
- [ ] Implementar video real en la sección de video
- [ ] Agregar más animaciones de scroll
- [ ] Implementar analytics
- [ ] Agregar más integraciones de API
- [ ] Optimizar para SEO

### Sugerencias
- **Video**: Crear un video promocional de 2-3 minutos mostrando FLOY en acción
- **Analytics**: Implementar Google Analytics para tracking
- **Performance**: Optimizar imágenes y recursos
- **Accessibility**: Mejorar accesibilidad con ARIA labels

## 📄 Licencia

Este proyecto es parte del programa **TALENTO TECH** y está desarrollado con fines educativos y demostrativos.

---

**Desarrollado con ❤️ por Talento Tech** 