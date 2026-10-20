# 🦉 DuoProgra

**DuoProgra** es una aplicación web gamificada (estilo Duolingo) diseñada para aprender y practicar los contenidos del curso **IIC2233 Programación Avanzada en Python** de la Pontificia Universidad Católica de Chile (PUC).

---

## 🚀 Características Principales

- **🎮 Dinámica estilo Duolingo**:
  - Sistema de **Vidas ❤️** (5 vidas por lección, se descuentan con errores).
  - Puntos de experiencia (**XP ⭐**) según dificultad.
  - **Racha diaria 🔥** con seguimiento automático de días consecutivos de estudio.
  - **Niveles de Maestría** por módulo: Bronce 🥉, Plata 🥈, Oro 🥇 y Diamante 💎.
  - **14 Logros desbloqueables 🏆** (ej. "Perfección", "Sin Errores", "Velocista", "Aprobado").

- **📝 Diversidad de Formatos de Preguntas**:
  - **Alternativas múltiples** con retroalimentación detallada y explicación conceptual.
  - **Salida de código Python (`code-output`)**: deduce qué imprime un fragmento de código.
  - **Completar código (`fill-code`)**: rellena espacios en blanco con la sintaxis correcta.
  - **Ordenar código (`order-code`)**: organiza líneas de código en la secuencia lógica correcta.
  - **Verdadero / Falso**.

- **⏱️ Modo Simulacro de Pruebas**:
  - **Simulacro Interrogación 1 (I1)**: 80 minutos (OOP Básico, OOP Avanzado y Estructuras Built-in).
  - **Simulacro Interrogación 2 (I2)**: 80 minutos (Estructuras Nodales, Excepciones, Threading, Redes y Serialización).
  - **Simulacro Examen Final**: 120 minutos (Evaluación integradora de todos los contenidos).
  - Incluye cronómetro regresivo en vivo, mapa visual de preguntas respondidas/pendientes y revisión detallada al finalizar.

- **🎯 Modo Práctica Libre**:
  - Filtra preguntas por módulos específicos y por dificultad (Fácil, Medio, Difícil).
  - Vidas infinitas (♾️) para estudiar sin presión.

- **💾 Sin Instalación ni Servidor Externo**:
  - 100% Client-side (HTML5, CSS3, JavaScript Vanilla).
  - El progreso se guarda automáticamente en `localStorage` de tu navegador.

---

## 📚 Estructura de Contenidos (Módulos IIC2233)

1. 🏗️ **OOP Básico**: Clases, instancias, atributos de instancia vs clase, métodos y encapsulamiento (`@property`).
2. 🧬 **OOP Avanzado**: Herencia, `super()`, polimorfismo, dunder methods (`__str__`, `__repr__`, sobrecarga de operadores), herencia múltiple, MRO (C3 Linearization) y clases abstractas (`abc`).
3. 📦 **Estructuras Built-in**: Tuplas, `namedtuple`, conjuntos (`set`), `defaultdict`, `Counter`, `OrderedDict`, `*args` y `**kwargs`.
4. 🔗 **Estructuras Nodales**: Nodos enlazados, listas ligadas, Pilas (Stack - LIFO), Colas (Queue - FIFO) y Árboles binarios.
5. ⚠️ **Excepciones**: Manejo de errores con `try / except / else / finally`, captura de errores específicos y creación de excepciones personalizadas.
6. 🔄 **Iterables y Generadores**: Protocolo de iteración (`__iter__`, `__next__`), funciones generadoras con `yield`, lazy evaluation y funciones de orden superior (`map`, `filter`).
7. 🧵 **Threading**: Concurrencia, procesos vs hilos, GIL en CPython, `Thread`, `start()`, `join()`, condiciones de carrera, exclusión mutua con `Lock`/`RLock`, daemon threads y `queue.Queue`.
8. 🌐 **Networking**: Sockets TCP (`AF_INET`, `SOCK_STREAM`), arquitectura cliente-servidor (`bind`, `listen`, `accept`, `connect`), codificación/decodificación de bytes y servidores multicliente.
9. 💾 **Serialización**: `json` (`dumps`/`loads`), `pickle` (usos, riesgos de seguridad y `__getstate__`) y protocolos de mensajes con longitud en bytes (Big-Endian).
10. 🖥️ **Interfaces Gráficas (PyQt)**: `QApplication`, Widgets, Layouts (`QVBoxLayout`, `QHBoxLayout`), Signals & Slots, señales personalizadas `pyqtSignal` y arquitectura Frontend-Backend desacoplada.
11. 🔁 **Recursión & Backtracking**: Casos base, llamadas recursivas, call stack y algoritmos de Backtracking con poda (pruning).

---

## 🖥️ Cómo Abrir y Usar la Aplicación

1. Navega a la carpeta `duoprogra` en tu Escritorio.
2. Abre el archivo **`index.html`** con cualquier navegador web moderno (Google Chrome, Edge, Firefox, Brave, Safari).
3. ¡Listo! No requiere Node.js, Python ni conexión a internet para funcionar.

---

## 📂 Estructura de Archivos

```text
duoprogra/
├── index.html          # Estructura SPA con todas las vistas de la app
├── README.md           # Documentación del proyecto y guía de uso
├── .gitignore          # Reglas de exclusión para Git
├── css/
│   └── styles.css      # Estilos Dark Mode, animaciones y diseño responsivo
└── js/
    ├── app.js          # Lógica de juego, enrutador, estado y gamificación
    ├── data-parte1.js  # Preguntas de los módulos 1 al 6
    └── data-parte2.js  # Preguntas de los módulos 7 al 11 y simulacros de examen
```
