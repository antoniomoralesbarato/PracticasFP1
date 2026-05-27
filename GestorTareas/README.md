# GestorTareas

Proyecto final de las practicas 1ºDAW, mi Gestor de Tareas. Es una aplicación web para gestionar tareas, hecha con React 18 y Vite. Puedes crear, editar, eliminar y organizar tus tareas con prioridades y estados.

## ¿Qué puede hacer la aplicación?

Básicamente tiene todo el CRUD de tareas: crear una tarea con título, descripción, prioridad (alta, media o baja), estado (pendiente, en progreso o completada) y una fecha límite si quieres. También puedes editarlas, borrarlas (te pide confirmación antes) o marcarlas como completadas directamente desde la tarjeta.

También tiene filtros para ver solo las tareas que te interesan, ya sea por estado o por prioridad, y puedes ordenarlas por fecha, prioridad o título. Todo se guarda en el localStorage del navegador, así que no se pierden al cerrar la página.

## Tecnologías que he usado

- **Vite** para crear el proyecto y el servidor de desarrollo
- **React 18** con useState, useEffect y Context API para manejar el estado
- **CSS puro** con variables CSS para los estilos
- **UUID** para generar IDs únicos a cada tarea

## Cómo ejecutarlo

Instalamos las depencias con:
npm install

Y para iniciarlo utilizamos:
npm run dev

# Estructura de archivos

```
src/
├── components/
│   ├── Header.jsx        # Cabecera con el contador de tareas
│   ├── TaskForm.jsx      # Formulario para crear y editar tareas
│   ├── FilterBar.jsx     # Filtros y opciones de ordenación
│   ├── TaskList.jsx      # Lista de tareas con los filtros aplicados
│   ├── TaskCard.jsx      # Cada tarjeta individual de tarea
│   └── Notification.jsx  # Mensaje de confirmación al hacer cambios
├── context/
│   └── TaskContext.jsx   # Estado global de la app
├── App.jsx
└── main.jsx
```
