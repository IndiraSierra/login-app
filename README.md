# 🧠 Dashboard React App – Random APIs Explorer

Este proyecto es una aplicación web construida con React que consume varias APIs públicas para ofrecer contenido divertido, útil y aleatorio. Su objetivo principal es servir como entorno de prácticas para explorar funcionalidades clave de React: rutas protegidas, hooks, manejo de localStorage, fetch asincrónico, manejo de favoritos y diseño modular de componentes, como parte de un proceso evaluativo.  Puedes encontrar que entre una api y otra no haya mucha sintinís semántica o similitud, porque la idea era practicar el consumo de datos de apis usando react, por lo que se adapta la visualización de contenido a las apis públicas/gratuitas encontradas.

---

## 🚀 Tecnologías utilizadas

- **React** (Create React App)
- **React Router DOM**
- **CSS Modules + estilos personalizados**
- **LocalStorage** para favoritos
- **APIs públicas sin autenticación**
- ¡Sin backend! Totalmente frontend.

---

## 📚 Funcionalidades principales

- 🔐 **Autenticación simulada** con rutas protegidas (`PrivateRoute`)
- 🖼️  Intercambio de fondo de pantalla inicial
- 🔁 **Consumo de APIs públicas** como:
  - [Chuck Norris Jokes](https://api.chucknorris.io/)
  - [TheMealDB Recipes](https://www.themealdb.com/)
  - [Advice Slip](https://api.adviceslip.com/)
  - [Bored API](https://www.boredapi.com/)
- ⭐ **Marcado de favoritos** y persistencia en `localStorage`
- 👍🏻👎🏻 | ❤️ **Marcado de like/dislike** y persistencia en `localStorage`
- 📦 Sección `/favorites` con visualización de todos los ítems guardados
- 🔢 Contador en el botón de favoritos de cada sección.
- 🎲 Obtención de contenido `Random`
- 📱 Diseño responsive básico

---

## 🧭 Estructura de carpetas

```bash
src/
├── components/
│   ├── api/             # Componentes que interactúan con APIs
│   ├── cards/           # Componentes reutilizables para mostrar ítems
│   ├── dashboardCards/  # Tarjetas del dashboard
├── styles/              # Archivos CSS organizados por componente
├── hooks/               # Hooks personalizados (ej: useFavorites)
├── utils/               # Funciones utilitarias comunes



🔧 Instalación y ejecución
Clona el repositorio:
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo


Instala dependencias:
npm install


Inicia la aplicación en modo desarrollo:
npm start


Abre en tu navegador:
http://localhost:3000

💡 Nota sobre CORS
Algunas APIs (como BoredAPI) pueden bloquear solicitudes directas desde localhost. Puedes solucionarlo:
Añadiendo "proxy": "https://www.boredapi.com" en package.json (en desarrollo)
Usando un proxy temporal como CORS Anywhere


📌 Próximas mejoras
 Soporte completo para temas claro/oscuro
 Exportación/Importación de favoritos
 Integración de más APIs sin clave
 Test unitarios con Jest

🧑‍💻 Autor
Indira
Desarrolladora en formación y apasionada por el código limpio,  los proyectos útiles y fan de las ideas absurdas.


🌐 Licencia
Este proyecto se ofrece bajo licencia MIT. Eres libre de usarlo y adaptarlo con fines educativos o personales.
