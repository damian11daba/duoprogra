// ============================================================
// DuoProgra - Banco de Preguntas para Práctica Infinita de Desarrollo
// Ejercicios interactivos (write-code y write-answer) sin límite de preguntas
// ============================================================

window.DUOPROGRA_INFINITE = {
  "oop-basico": [
    {
      "id": "inf-oop1-1",
      "type": "write-code",
      "difficulty": 2,
      "question": "En la clase `Persona`, implementa el método `es_mayor_de_edad` que retorne `True` si `self.edad >= 18`, y `False` en caso contrario.",
      "code": "class Persona:\n    def __init__(self, nombre, edad):\n        self.nombre = nombre\n        self.edad = edad\n\n    def es_mayor_de_edad(self):\n        _____",
      "placeholder": "return self.edad >= 18",
      "hints": [
        "Compara self.edad con 18",
        "Retorna la expresión booleana directamente"
      ],
      "acceptedAnswers": [
        "return self.edad >= 18",
        "return True if self.edad >= 18 else False",
        "if self.edad >= 18:\n            return True\n        return False"
      ],
      "explanation": "La expresión `self.edad >= 18` ya evalúa a un valor booleano (`True` o `False`), por lo que `return self.edad >= 18` es la forma más limpia y pythónica."
    },
    {
      "id": "inf-oop1-2",
      "type": "write-code",
      "difficulty": 2,
      "question": "Implementa el método `__str__` en `Producto` para que devuelva `\"<nombre>: $<precio>\"`.",
      "code": "class Producto:\n    def __init__(self, nombre, precio):\n        self.nombre = nombre\n        self.precio = precio\n\n    def __str__(self):\n        _____",
      "placeholder": "return f\"{self.nombre}: ${self.precio}\"",
      "hints": [
        "Usa f-strings con self.nombre y self.precio",
        "Respeta el formato <nombre>: $<precio>"
      ],
      "acceptedAnswers": [
        "return f\"{self.nombre}: ${self.precio}\"",
        "return f'{self.nombre}: ${self.precio}'",
        "return self.nombre + ': $' + str(self.precio)"
      ],
      "explanation": "El método dunder `__str__` provee la representación informal del objeto destinada al usuario final (usada por `print` y `str`)."
    },
    {
      "id": "inf-oop1-3",
      "type": "write-code",
      "difficulty": 2,
      "question": "Define un getter con `@property` para el atributo protegido `_energia` en `Criatura`.",
      "code": "class Criatura:\n    def __init__(self, energia):\n        self._energia = energia\n\n    _____\n    def energia(self):\n        return self._energia",
      "placeholder": "@property",
      "hints": [
        "Usa el decorador estándar de Python @property"
      ],
      "acceptedAnswers": [
        "@property"
      ],
      "explanation": "El decorador built-in `@property` convierte el método `energia` en un atributo de solo lectura (getter) que se accede sin paréntesis."
    },
    {
      "id": "inf-oop1-4",
      "type": "write-answer",
      "difficulty": 1,
      "question": "¿Qué parámetro obligatorio debe ser el primero en la definición de cualquier método de instancia en una clase de Python?",
      "placeholder": "nombre_parametro",
      "hints": [
        "Hace referencia a la instancia en sí",
        "Por convención se llama self"
      ],
      "acceptedAnswers": [
        "self"
      ],
      "explanation": "`self` es la referencia explícita a la instancia invocadora del método, pasada automáticamente por el intérprete al ejecutar `obj.metodo()`."
    }
  ],
  "oop-avanzado": [
    {
      "id": "inf-oop2-1",
      "type": "write-code",
      "difficulty": 2,
      "question": "Invoca el constructor de la clase base usando `super()` dentro de `Gerente.__init__`.",
      "code": "class Empleado:\n    def __init__(self, rut, nombre):\n        self.rut = rut\n        self.nombre = nombre\n\nclass Gerente(Empleado):\n    def __init__(self, rut, nombre, area):\n        _____(rut, nombre)\n        self.area = area",
      "placeholder": "super().__init__",
      "hints": [
        "Usa super().__init__(...)",
        "Pasa rut y nombre al constructor padre"
      ],
      "acceptedAnswers": [
        "super().__init__",
        "super().__init__"
      ],
      "explanation": "`super().__init__(rut, nombre)` delega la inicialización de atributos compartidos en la clase base siguiendo el orden MRO."
    },
    {
      "id": "inf-oop2-2",
      "type": "write-code",
      "difficulty": 3,
      "question": "Sobrescribe `__len__` en `Carrito` para que retorne la cantidad de elementos en la lista `self.items`.",
      "code": "class Carrito:\n    def __init__(self):\n        self.items = []\n\n    def agregar(self, item):\n        self.items.append(item)\n\n    def __len__(self):\n        _____",
      "placeholder": "return len(self.items)",
      "hints": [
        "Delega en len(self.items)",
        "Debe retornar un número entero no negativo"
      ],
      "acceptedAnswers": [
        "return len(self.items)",
        "return len(self.items) "
      ],
      "explanation": "Implementar `__len__` permite que instancias de `Carrito` soporten la función global `len(carrito)` respetando el protocolo de contenedores."
    },
    {
      "id": "inf-oop2-3",
      "type": "write-answer",
      "difficulty": 2,
      "question": "¿Qué método dunder debes definir en una clase para sobrecargar el operador de suma `+`?",
      "placeholder": "__???__",
      "hints": [
        "Comienza con __add",
        "Significa add"
      ],
      "acceptedAnswers": [
        "__add__",
        "__add__()"
      ],
      "explanation": "El método dunder `__add__(self, other)` sobrecarga el operador binario de suma `a + b` en Python."
    }
  ],
  "estructuras-builtin": [
    {
      "id": "inf-builtin-1",
      "type": "write-code",
      "difficulty": 2,
      "question": "Completa la dict comprehension para crear un diccionario que asocie cada palabra con su longitud.",
      "code": "palabras = [\"python\", \"progra\", \"puc\"]\nlongitudes = {p: _____ for p in palabras}",
      "placeholder": "len(p)",
      "hints": [
        "Usa la función len() aplicada a la variable p"
      ],
      "acceptedAnswers": [
        "len(p)",
        "len(p) "
      ],
      "explanation": "En dict comprehensions `{clave: valor for elemento in iterable}`, `len(p)` calcula dinámicamente el valor correspondiente a cada clave."
    },
    {
      "id": "inf-builtin-2",
      "type": "write-code",
      "difficulty": 2,
      "question": "Usa el método `.get()` de diccionarios para obtener el puntaje de `\"damian\"`, con valor por defecto `0` si no existe.",
      "code": "scores = {\"ana\": 95, \"carlos\": 80}\npuntaje = scores._____\n# Debe retornar 0 sin lanzar KeyError",
      "placeholder": "get(\"damian\", 0)",
      "hints": [
        "Usa get con dos parámetros: la clave y el valor por defecto"
      ],
      "acceptedAnswers": [
        "get(\"damian\", 0)",
        "get('damian', 0)",
        "get(\"damian\",0)",
        "get('damian',0)"
      ],
      "explanation": "`dict.get(clave, default)` evita excepciones `KeyError` devolviendo el valor por defecto provisto si la clave no está en el mapa."
    },
    {
      "id": "inf-builtin-3",
      "type": "write-answer",
      "difficulty": 1,
      "question": "¿Qué estructura de datos built-in almacena colecciones desordenadas de elementos únicos sin claves?",
      "placeholder": "tipo_de_dato",
      "hints": [
        "En español conjunto",
        "En Python se llama set"
      ],
      "acceptedAnswers": [
        "set",
        "conjunto"
      ],
      "explanation": "`set` implementa conjuntos matemáticos con tiempo promedio O(1) de pertenencia mediante hash table y garantiza unicidad de elementos."
    }
  ],
  "estructuras-nodales": [
    {
      "id": "inf-nodal-1",
      "type": "write-code",
      "difficulty": 2,
      "question": "Completa la clase `Nodo` definiendo los atributos `valor` y `siguiente` (inicializado en `None`).",
      "code": "class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        _____",
      "placeholder": "self.siguiente = None",
      "hints": [
        "self.siguiente debe ser None inicialmente"
      ],
      "acceptedAnswers": [
        "self.siguiente = None",
        "self.siguiente = None "
      ],
      "explanation": "En una lista ligada simple, cada nodo almacena su dato (`self.valor`) y un puntero de enlace al sucesor (`self.siguiente = None`)."
    },
    {
      "id": "inf-nodal-2",
      "type": "write-code",
      "difficulty": 3,
      "question": "En una pila (Stack) basada en listas, completa la operación `desapilar` (pop) retirando y retornando el último elemento.",
      "code": "class Pila:\n    def __init__(self):\n        self._items = []\n    def desapilar(self):\n        if not self._items:\n            return None\n        return _____",
      "placeholder": "self._items.pop()",
      "hints": [
        "Usa el método pop() de la lista interna self._items"
      ],
      "acceptedAnswers": [
        "self._items.pop()",
        "self._items.pop() "
      ],
      "explanation": "`list.pop()` elimina y retorna el último elemento en O(1), emulando exactamente la cima de una pila LIFO."
    },
    {
      "id": "inf-nodal-3",
      "type": "write-answer",
      "difficulty": 1,
      "question": "¿Cuál es la complejidad temporal Big-O de consultar la cabeza (primer elemento) de una lista ligada?",
      "placeholder": "O(?)",
      "hints": [
        "Es tiempo constante",
        "O(1)"
      ],
      "acceptedAnswers": [
        "O(1)",
        "o(1)"
      ],
      "explanation": "Acceder a la cabeza de una lista enlazada requiere seguir directamente la referencia `self.cabeza`, lo cual toma tiempo constante O(1)."
    }
  ],
  "excepciones": [
    {
      "id": "inf-exc-1",
      "type": "write-code",
      "difficulty": 2,
      "question": "Define una excepción personalizada llamada `DatoInvalidoError` que herede de la clase `Exception`.",
      "code": "class DatoInvalidoError(_____):\n    pass",
      "placeholder": "Exception",
      "hints": [
        "Toda excepción personalizada en Python debe derivar de Exception"
      ],
      "acceptedAnswers": [
        "Exception",
        "Exception "
      ],
      "explanation": "Al heredar de `Exception`, `DatoInvalidoError` se integra al sistema de manejo de errores estándar sin atrapar señales críticas de `BaseException`."
    },
    {
      "id": "inf-exc-2",
      "type": "write-code",
      "difficulty": 2,
      "question": "Completa la sentencia `finally` para asegurar que el archivo se cierre siempre.",
      "code": "f = open(\"datos.txt\", \"w\")\ntry:\n    f.write(\"contenido\")\n_____:\n    f.close()",
      "placeholder": "finally",
      "hints": [
        "Usa la cláusula de limpieza finally"
      ],
      "acceptedAnswers": [
        "finally",
        "finally "
      ],
      "explanation": "El bloque `finally` se ejecuta incondicionalmente al terminar `try/except`, garantizando la liberación de recursos críticos."
    },
    {
      "id": "inf-exc-3",
      "type": "write-answer",
      "difficulty": 2,
      "question": "¿Qué instrucción se usa en Python para volver a relanzar la misma excepción activa dentro de un bloque except?",
      "placeholder": "instrucción",
      "hints": [
        "Es una sola palabra clave",
        "raise sin argumentos"
      ],
      "acceptedAnswers": [
        "raise",
        "raise "
      ],
      "explanation": "Un `raise` solitario dentro de un bloque `except` re-dispara la excepción actualmente capturada con su stacktrace original intacto."
    }
  ],
  "iterables": [
    {
      "id": "inf-iter-1",
      "type": "write-code",
      "difficulty": 2,
      "question": "Usa la función de orden superior `map` con una `lambda` para convertir una lista de temperaturas Celsius en Fahrenheit: `F = C * 1.8 + 32`.",
      "code": "celsius = [0, 20, 30]\nfahrenheit = list(map(_____, celsius))",
      "placeholder": "lambda c: c * 1.8 + 32",
      "hints": [
        "Usa una lambda con parámetro c",
        "Aplica c * 1.8 + 32"
      ],
      "acceptedAnswers": [
        "lambda c: c * 1.8 + 32",
        "lambda x: x * 1.8 + 32",
        "lambda c: c * 1.8 + 32.0"
      ],
      "explanation": "`map(func, iterable)` evalúa la transformación elemento por elemento. Aquí la función `lambda c: c * 1.8 + 32` mapea cada valor directamente."
    },
    {
      "id": "inf-iter-2",
      "type": "write-code",
      "difficulty": 2,
      "question": "Usa `filter` con una `lambda` para filtrar los números pares mayores a 10 de la lista `datos`.",
      "code": "datos = [4, 12, 7, 18, 5, 20]\nfiltrados = list(filter(_____, datos))",
      "placeholder": "lambda x: x % 2 == 0 and x > 10",
      "hints": [
        "Usa x % 2 == 0 and x > 10 dentro de la lambda"
      ],
      "acceptedAnswers": [
        "lambda x: x % 2 == 0 and x > 10",
        "lambda n: n % 2 == 0 and n > 10",
        "lambda x: x > 10 and x % 2 == 0"
      ],
      "explanation": "`filter` retiene únicamente aquellos elementos para los cuales el predicado booleano retorna `True`."
    },
    {
      "id": "inf-iter-3",
      "type": "write-code",
      "difficulty": 3,
      "question": "Usa `reduce` de `functools` para concatenar una lista de strings separándolos con un guión `\"-\"`.",
      "code": "from functools import reduce\npalabras = [\"IIC2233\", \"PUC\", \"Chile\"]\nresultado = reduce(_____, palabras)\n# Debe producir: \"IIC2233-PUC-Chile\"",
      "placeholder": "lambda a, b: f\"{a}-{b}\"",
      "hints": [
        "Usa lambda a, b: f\"{a}-{b}\" o lambda a, b: a + \"-\" + b"
      ],
      "acceptedAnswers": [
        "lambda a, b: f\"{a}-{b}\"",
        "lambda a, b: a + '-' + b",
        "lambda a, b: a + \"-\" + b",
        "lambda x, y: f\"{x}-{y}\""
      ],
      "explanation": "`reduce` toma el acumulador `a` y el siguiente elemento `b`, combinándolos sucesivamente hasta abarcar toda la secuencia."
    },
    {
      "id": "inf-iter-4",
      "type": "write-code",
      "difficulty": 2,
      "question": "Implementa una función generadora `rango_infinito` que emita números desde `inicio` incrementando de `salto` en `salto`.",
      "code": "def rango_infinito(inicio, salto=1):\n    actual = inicio\n    while True:\n        _____\n        actual += salto",
      "placeholder": "yield actual",
      "hints": [
        "Usa la palabra clave yield con actual"
      ],
      "acceptedAnswers": [
        "yield actual",
        "yield actual "
      ],
      "explanation": "La instrucción `yield actual` retorna el valor al llamador y pausa la ejecución de la función hasta la siguiente invocación a `next()`."
    },
    {
      "id": "inf-iter-5",
      "type": "write-answer",
      "difficulty": 1,
      "question": "¿Qué método dunder es llamado por la función built-in next(iterador) para solicitar el próximo valor?",
      "placeholder": "__???__",
      "hints": [
        "Tiene doble guion bajo antes y después de next"
      ],
      "acceptedAnswers": [
        "__next__",
        "__next__()"
      ],
      "explanation": "El protocolo iterador de Python estipula que `next(it)` delega en `it.__next__()`, levantando `StopIteration` cuando se agota la secuencia."
    }
  ],
  "threading": [
    {
      "id": "inf-thread-1",
      "type": "write-code",
      "difficulty": 2,
      "question": "Crea un objeto `Lock` de threading y asígnalo a la variable `candado`.",
      "code": "import threading\n_____",
      "placeholder": "candado = threading.Lock()",
      "hints": [
        "Llama al constructor Lock del módulo threading"
      ],
      "acceptedAnswers": [
        "candado = threading.Lock()",
        "candado = threading.Lock()"
      ],
      "explanation": "`threading.Lock()` crea una primitiva de sincronización mutua (mutex) para proteger secciones críticas frente a condiciones de carrera."
    },
    {
      "id": "inf-thread-2",
      "type": "write-code",
      "difficulty": 2,
      "question": "Usa un context manager (`with`) para adquirir y liberar de forma segura el lock `candado`.",
      "code": "def incrementar():\n    global contador\n    _____\n        contador += 1",
      "placeholder": "with candado:",
      "hints": [
        "Usa with candado:"
      ],
      "acceptedAnswers": [
        "with candado:",
        "with candado: "
      ],
      "explanation": "El context manager `with candado:` garantiza la adquisición previa y liberación automática del cerrojo incluso ante excepciones imprevistas."
    },
    {
      "id": "inf-thread-3",
      "type": "write-answer",
      "difficulty": 2,
      "question": "¿Cómo se denominan los hilos secundarios configurados con daemon=True que terminan abruptamente cuando el hilo principal finaliza?",
      "placeholder": "hilos ...",
      "hints": [
        "Hilos demonio o daemon threads",
        "daemon"
      ],
      "acceptedAnswers": [
        "daemon",
        "demonios",
        "hilos daemon",
        "demonio"
      ],
      "explanation": "Los hilos marcados como daemon corren en segundo plano y el intérprete finaliza el proceso sin esperar su término."
    }
  ],
  "networking": [
    {
      "id": "inf-net-1",
      "type": "write-code",
      "difficulty": 2,
      "question": "Decodifica los bytes recibidos `datos = b\"Hola Mundo\"` a string usando formato UTF-8.",
      "code": "datos = b\"Hola Mundo\"\nmensaje = datos._____",
      "placeholder": "decode(\"utf-8\")",
      "hints": [
        "Llama al método decode(\"utf-8\") sobre los bytes"
      ],
      "acceptedAnswers": [
        "decode(\"utf-8\")",
        "decode('utf-8')",
        "decode()"
      ],
      "explanation": "`.decode(\"utf-8\")` transforma la secuencia binaria recibida de la red de vuelta a un objeto string interpretable en Python."
    },
    {
      "id": "inf-net-2",
      "type": "write-code",
      "difficulty": 3,
      "question": "Acepta una conexión entrante en el socket servidor `server_sock` desempaquetando el socket cliente y su dirección.",
      "code": "server_sock.listen(5)\n# Desempaqueta la tupla retornada por accept()\ncliente_sock, direccion = _____",
      "placeholder": "server_sock.accept()",
      "hints": [
        "Llama al método accept() sobre server_sock"
      ],
      "acceptedAnswers": [
        "server_sock.accept()",
        "server_sock.accept() "
      ],
      "explanation": "`server_sock.accept()` bloquea hasta recibir una conexión de cliente y devuelve una tupla `(client_socket, address)`."
    },
    {
      "id": "inf-net-3",
      "type": "write-answer",
      "difficulty": 2,
      "question": "¿Qué protocolo de capa de transporte orientado a conexión asegura la entrega ordenada y sin pérdidas de bytes: TCP o UDP?",
      "placeholder": "TCP o UDP",
      "hints": [
        "Transmission Control Protocol",
        "TCP"
      ],
      "acceptedAnswers": [
        "TCP",
        "tcp"
      ],
      "explanation": "TCP (Transmission Control Protocol) provee un flujo confiable, ordenado y con verificación de errores entre dos sockets en red."
    }
  ],
  "serializacion": [
    {
      "id": "inf-ser-1",
      "type": "write-code",
      "difficulty": 2,
      "question": "Deserializa un string JSON llamado `json_str` convirtiéndolo a un objeto Python.",
      "code": "import json\njson_str = '{\"nombre\": \"Duo\", \"vidas\": 5}'\ndatos = json._____(json_str)",
      "placeholder": "loads",
      "hints": [
        "loads parsea un string JSON, load lee de un archivo"
      ],
      "acceptedAnswers": [
        "loads"
      ],
      "explanation": "`json.loads()` (load string) analiza una cadena con formato JSON y construye la estructura equivalente en tipos nativos de Python."
    },
    {
      "id": "inf-ser-2",
      "type": "write-code",
      "difficulty": 2,
      "question": "Serializa el objeto `grafo` a bytes binarios usando el método `dumps` de `pickle`.",
      "code": "import pickle\ngrafo = {\"A\": [\"B\", \"C\"]}\nbytes_grafo = pickle._____",
      "placeholder": "dumps(grafo)",
      "hints": [
        "pickle.dumps(objeto)"
      ],
      "acceptedAnswers": [
        "dumps(grafo)",
        "dumps(grafo) "
      ],
      "explanation": "`pickle.dumps()` serializa una estructura de objetos arbitrarios de Python en una secuencia de bytes binarios en memoria."
    },
    {
      "id": "inf-ser-3",
      "type": "write-answer",
      "difficulty": 2,
      "question": "¿Qué método dunder es consultado por el módulo pickle para obtener el estado serializable personalizado de una clase?",
      "placeholder": "__???__",
      "hints": [
        "getstate",
        "__getstate__"
      ],
      "acceptedAnswers": [
        "__getstate__",
        "__getstate__()"
      ],
      "explanation": "`__getstate__` permite controlar con precisión qué atributos y estado interno empaqueta pickle al serializar instancias de una clase."
    }
  ],
  "gui": [
    {
      "id": "inf-gui-1",
      "type": "write-code",
      "difficulty": 2,
      "question": "Crea una etiqueta de texto en PyQt con el texto `\"¡Bienvenido!\"` usando `QLabel`.",
      "code": "from PyQt6.QtWidgets import QLabel\netiqueta = QLabel(_____, self)",
      "placeholder": "\"¡Bienvenido!\"",
      "hints": [
        "Pasa el string como primer argumento"
      ],
      "acceptedAnswers": [
        "\"¡Bienvenido!\"",
        "'¡Bienvenido!'",
        "\"Bienvenido\"",
        "'Bienvenido'"
      ],
      "explanation": "`QLabel(texto, parent)` crea un componente visual para mostrar textos estáticos o imágenes en interfaces PyQt."
    },
    {
      "id": "inf-gui-2",
      "type": "write-code",
      "difficulty": 2,
      "question": "Agrega el widget `self.boton` al layout vertical `layout` usando `addWidget`.",
      "code": "layout = QVBoxLayout()\nlayout._____(self.boton)",
      "placeholder": "addWidget",
      "hints": [
        "Llama al método addWidget del layout"
      ],
      "acceptedAnswers": [
        "addWidget"
      ],
      "explanation": "`QBoxLayout.addWidget(widget)` posiciona e incorpora un control hijo en el orden de distribución espacial del layout."
    },
    {
      "id": "inf-gui-3",
      "type": "write-answer",
      "difficulty": 1,
      "question": "En PyQt, ¿cómo se denomina el mecanismo para comunicar eventos entre objetos desacoplados?",
      "placeholder": "Señales y ...",
      "hints": [
        "Signals and Slots",
        "Señales y Slots"
      ],
      "acceptedAnswers": [
        "señales y slots",
        "signals and slots",
        "signal and slot",
        "slots"
      ],
      "explanation": "El paradigma Señales y Slots (Signals & Slots) de Qt desacopla la emisión de eventos de su manejo programático."
    }
  ],
  "recursion": [
    {
      "id": "inf-rec-1",
      "type": "write-code",
      "difficulty": 2,
      "question": "Completa la función factorial recursiva implementando la condición del caso base si `n <= 1`.",
      "code": "def factorial(n):\n    if _____:\n        return 1\n    return n * factorial(n - 1)",
      "placeholder": "n <= 1",
      "hints": [
        "Verifica si n es menor o igual a 1"
      ],
      "acceptedAnswers": [
        "n <= 1",
        "n == 1 or n == 0",
        "n == 0 or n == 1",
        "n <= 0 or n == 1"
      ],
      "explanation": "El caso base `n <= 1: return 1` detiene la recursión y evita alcanzar `RecursionError` por llamadas infinitas."
    },
    {
      "id": "inf-rec-2",
      "type": "write-code",
      "difficulty": 3,
      "question": "Completa el paso recursivo para contar los nodos de un árbol binario (`1 + izquierda + derecha`).",
      "code": "def contar_nodos(raiz):\n    if raiz is None:\n        return 0\n    return 1 + contar_nodos(raiz.izq) + _____",
      "placeholder": "contar_nodos(raiz.der)",
      "hints": [
        "Llama recursivamente a contar_nodos con raiz.der"
      ],
      "acceptedAnswers": [
        "contar_nodos(raiz.der)",
        "contar_nodos(raiz.derecha)"
      ],
      "explanation": "El conteo en árboles binarios suma 1 por la raíz actual más el resultado recursivo en los subárboles izquierdo y derecho."
    },
    {
      "id": "inf-rec-3",
      "type": "write-answer",
      "difficulty": 1,
      "question": "¿Qué excepción levanta Python cuando una función recursiva excede la profundidad máxima del call stack?",
      "placeholder": "NombreError",
      "hints": [
        "RecursionError",
        "Recursion Error"
      ],
      "acceptedAnswers": [
        "RecursionError"
      ],
      "explanation": "`RecursionError` es levantada por el intérprete cuando el número de marcos de llamada activos supera `sys.getrecursionlimit()`."
    }
  ]
};
