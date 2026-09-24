# Delta Rugby Club • Plataforma Web Oficial (Rediseño 2026)

Proyecto de modernización integral de la plataforma digital para **Delta Rugby Club** ("Los Yacarés" - Rincón de Milberg, Tigre, URBA), desarrollado por Trit Software Factory siguiendo los estándares visuales, funcionales y de performance de los principales clubes del rugby argentino (CASI, SIC, Newman, CUBA).

---

## 🏉 1. Identidad & Design System "ADN Yacaré"

- **Valores Rectores:** *• Amistad • Humildad • Compromiso • Respeto •*
- **Colores Institucionales:**
  - `Delta Green` (`#0D3829` / `#072218`): Verde bosque institucional, transmite solidez y pertenencia.
  - `Delta Red` (`#D32F2F` / `#B71C1C`): Rojo pasión y acento competitivo de alto dinamismo.
  - `Delta White` (`#FFFFFF`): Pureza, legibilidad y frescura visual.
  - `Gold Trophy` (`#C5A059`): Toques de prestigio institucional y conmemoración de hitos.
- **Tipografía:**
  - *Titulares:* `Montserrat` (Bold/Extrabold) – Fortaleza institucional deportiva y legibilidad absoluta.
  - *Cuerpo y UI:* `Plus Jakarta Sans` – Máxima legibilidad en dispositivos móviles.

---

## 📱 2. Enfoque Mobile-First & Arquitectura

Diseñado específicamente para resolver los casos de uso críticos de un **sábado de partido en la cancha**:
1. **Matchday Ticker Superior & Countdown:** Información al instante sobre rival, fecha, horario y estado del partido de la URBA.
2. **Geolocalización GPS Directa:** Botones de acceso rápido a Waze y Google Maps para la sede de Olivares 168 (Rincón de Milberg).
3. **Bottom App Bar Persistente:** Navegación táctil para pulgar en smartphones (Inicio, Deportes, Fixture, Cuotas, Asociate).
4. **Calculadora Interactiva de Cuota Social:** Estimación instantánea con beneficios por grupo familiar.
5. **Modal de Pre-Inscripción Directo:** Integración con canal oficial de WhatsApp de Secretaría.
6. **Descarga Centralizada de Fichas Médicas:** Enlaces a formularios oficiales URBA y AAHBA.

---

## 📂 3. Estructura de Componentes y Código Fuente

```
/
├── index.html                   # Página Principal (Home) con Match Center, Hero, Valores, Novedades y Sponsors
├── deportes.html                # Sección interactiva de Deportes (Switch Rugby URBA / Hockey AAHBA)
├── assets/
│   ├── logo_delta_pro_badge.svg # Escudo oficial completo con degradado verde rugby y carmesí
│   ├── logo_delta_yacare_solo.svg # Silueta pura vectorial del Yacaré para marcas de agua y fondos
│   └── delta-logo.svg           # Enlace de compatibilidad retroactiva
├── css/
│   └── styles.css               # Hoja de estilos del Design System (Tailwind hooks, micro-interacciones, scrollbars)
└── js/
    ├── app.js                   # Lógica cliente (Drawer móvil, countdown en vivo, tabs, modal, calculadora)
    └── sports-data.js           # Modelo de datos estructurado (divisiones, staff, horarios y resultados)
```

---

## 🚀 4. Puesta en Marcha / Desarrollo Local

No requiere configuración compleja ni dependencias pesadas de Node/Webpack. Puede ejecutarse directamente con cualquier servidor HTTP estático:

```bash
# Con Python 3:
python3 -m http.server 8080

# O con npx serve:
npx serve .
```

Abrir `http://localhost:8080` en cualquier navegador o emulador móvil.
