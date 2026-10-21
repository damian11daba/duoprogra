// ============================================================
// DuoProgra - Banco de Preguntas para Práctica Infinita de Desarrollo
// Ejercicios interactivos (write-code y write-answer) sin límite de preguntas
// Basado en IIC2233 Programación Avanzada en Python (PUC Chile)
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
    },
    {
      "id": "inf-oop1-5",
      "type": "write-code",
      "difficulty": 3,
      "question": "[Nivel PUC] Implementa el setter con `@saldo.setter` para validar que no se asigne un saldo negativo; si `nuevo_saldo < 0`, debe lanzar un `ValueError`.",
      "code": "class Billetera:\n    def __init__(self, saldo=0):\n        self._saldo = saldo\n\n    @property\n    def saldo(self):\n        return self._saldo\n\n    _____\n    def saldo(self, nuevo_saldo):\n        if nuevo_saldo < 0:\n            raise ValueError('Saldo negativo')\n        self._saldo = nuevo_saldo",
      "placeholder": "@saldo.setter",
      "hints": [
        "El decorador usa el nombre de la propiedad seguido de .setter."
      ],
      "acceptedAnswers": [
        "@saldo.setter"
      ],
      "explanation": "El decorador `@<propiedad>.setter` vincula un método como descriptor de escritura (setter) de la propiedad correspondiente."
    },
    {
      "id": "inf-oop1-6",
      "type": "write-code",
      "difficulty": 2,
      "question": "Evita el antipatrón de argumento mutable por defecto en Python. Si `hobbies` es `None`, asígnale una nueva lista vacía a `self.hobbies`.",
      "code": "class Persona:\n    def __init__(self, nombre, hobbies=None):\n        self.nombre = nombre\n        _____",
      "placeholder": "self.hobbies = hobbies if hobbies is not None else []",
      "hints": [
        "Comprueba si hobbies es None antes de asignar una lista vacía, o usa if/else en una línea."
      ],
      "acceptedAnswers": [
        "self.hobbies = hobbies if hobbies is not None else []",
        "self.hobbies = [] if hobbies is None else hobbies",
        "if hobbies is None:\n            self.hobbies = []\n        else:\n            self.hobbies = hobbies",
        "self.hobbies = hobbies or []"
      ],
      "explanation": "En Python, los argumentos por defecto mutables como `[]` se evalúan solo una vez en la definición. Usar `None` y asignar una lista nueva en el constructor evita que todas las instancias compartan la misma lista."
    },
    {
      "id": "inf-oop1-7",
      "type": "write-answer",
      "difficulty": 2,
      "question": "¿Qué método dunder se invoca para obtener la representación formal e inequívoca de un objeto (usada en la consola interactiva y logs de depuración)?",
      "placeholder": "__metodo__",
      "hints": [
        "Empieza y termina con dos guiones bajos.",
        "Se diferencia de __str__."
      ],
      "acceptedAnswers": [
        "__repr__",
        "repr",
        "__repr__()"
      ],
      "explanation": "`__repr__` busca ser inequívoco y representar cómo recrear el objeto, a diferencia de `__str__` que está orientado a una lectura amigable para el usuario."
    },
    {
      "id": "inf-oop1-8",
      "type": "write-code",
      "difficulty": 3,
      "question": "Implementa el método de clase `desde_string` usando `@classmethod` que reciba `\"Nombre-Edad\"` (ej: `'Ana-22'`) y retorne una nueva instancia de `Usuario`.",
      "code": "class Usuario:\n    def __init__(self, nombre, edad):\n        self.nombre = nombre\n        self.edad = edad\n\n    @classmethod\n    def desde_string(cls, texto):\n        nombre, edad = texto.split('-')\n        return _____",
      "placeholder": "cls(nombre, int(edad))",
      "hints": [
        "Invoca cls(...) pasando nombre y edad convertida a entero.",
        "cls hace referencia a la clase misma."
      ],
      "acceptedAnswers": [
        "cls(nombre, int(edad))",
        "cls(nombre=nombre, edad=int(edad))"
      ],
      "explanation": "Los constructores alternativos en Python se definen típicamente con `@classmethod`, donde `cls(...)` permite instanciar dinámicamente la clase o sus posibles subclases."
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
    },
    {
      "id": "inf-oop2-4",
      "type": "write-code",
      "difficulty": 3,
      "question": "[AC3 - Genética] En herencia cooperativa múltiple, llama al constructor de la superclase delegando todos los `**kwargs` restantes.",
      "code": "class Gen:\n    def __init__(self, rasgo: str, valor: str, **kwargs):\n        _____\n        self.rasgo = rasgo\n        self.valor = valor",
      "placeholder": "super().__init__(**kwargs)",
      "hints": [
        "Usa super() invocando __init__ con **kwargs."
      ],
      "acceptedAnswers": [
        "super().__init__(**kwargs)",
        "super().__init__(**kwargs) "
      ],
      "explanation": "En AC3 y en la arquitectura de herencia múltiple de Python, pasar `**kwargs` a `super().__init__(**kwargs)` asegura que todos los inicializadores en la cadena del MRO reciban sus argumentos sin romperse."
    },
    {
      "id": "inf-oop2-5",
      "type": "write-code",
      "difficulty": 3,
      "question": "[AC3] Sobrecarga el operador `+` (`__add__`) en la clase `Dominante` para retornar una tupla `(self.valor, other.valor)` que combine ambos genes.",
      "code": "class Dominante:\n    def __init__(self, valor):\n        self.valor = valor\n\n    def _____(self, other):\n        return (self.valor, other.valor)",
      "placeholder": "__add__",
      "hints": [
        "El método mágico para la suma en Python es __add__."
      ],
      "acceptedAnswers": [
        "__add__"
      ],
      "explanation": "El método dunder `__add__` se ejecuta cuando se evalúa la expresión `obj1 + obj2`, permitiendo modelar interacciones biológicas o algebraicas entre objetos."
    },
    {
      "id": "inf-oop2-6",
      "type": "write-code",
      "difficulty": 3,
      "question": "Define el método dunder `__lt__` (menor que) para permitir que instancias de `Atleta` se ordenen automáticamente por su atributo `tiempo`.",
      "code": "class Atleta:\n    def __init__(self, nombre, tiempo):\n        self.nombre = nombre\n        self.tiempo = tiempo\n\n    def __lt__(self, other):\n        return _____",
      "placeholder": "self.tiempo < other.tiempo",
      "hints": [
        "Compara self.tiempo con other.tiempo usando el operador <."
      ],
      "acceptedAnswers": [
        "self.tiempo < other.tiempo"
      ],
      "explanation": "Al implementar `__lt__` (less than), Python puede ordenar colecciones de objetos con `sorted()` o `.sort()` y usar operadores relacionales."
    },
    {
      "id": "inf-oop2-7",
      "type": "write-answer",
      "difficulty": 2,
      "question": "¿Qué algoritmo utiliza Python 3 para calcular el Method Resolution Order (MRO) en jerarquías de herencia múltiple?",
      "placeholder": "Algoritmo...",
      "hints": [
        "C3...",
        "Linearization"
      ],
      "acceptedAnswers": [
        "C3",
        "C3 Linearization",
        "C3 linearization",
        "linealizacion C3",
        "linealización C3"
      ],
      "explanation": "Python implementa el algoritmo de Linealización C3 para determinar el orden determinista y monótono de búsqueda de métodos en herencia múltiple."
    },
    {
      "id": "inf-oop2-8",
      "type": "write-code",
      "difficulty": 3,
      "question": "Define la clase abstracta `Figura` usando `ABC` de manera que obligue a sus subclases a implementar el método `area`.",
      "code": "from abc import ABC, abstractmethod\n\nclass Figura(ABC):\n    _____\n    def area(self):\n        pass",
      "placeholder": "@abstractmethod",
      "hints": [
        "Decora el método con @abstractmethod."
      ],
      "acceptedAnswers": [
        "@abstractmethod"
      ],
      "explanation": "`@abstractmethod` previene que la clase base o subclases incompletas sean instanciadas sin definir una implementación concreta para el método."
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
    },
    {
      "id": "inf-built-4",
      "type": "write-code",
      "difficulty": 2,
      "question": "Usa `collections.defaultdict` para inicializar un diccionario donde los valores por defecto sean listas vacías automáticas.",
      "code": "from collections import defaultdict\n\nagrupados = _____",
      "placeholder": "defaultdict(list)",
      "hints": [
        "Pasa el tipo list como función constructora a defaultdict."
      ],
      "acceptedAnswers": [
        "defaultdict(list)",
        "defaultdict(list) "
      ],
      "explanation": "`defaultdict(list)` crea automáticamente una lista vacía para cualquier clave no existente al intentar acceder a ella, evitando `KeyError` y chequeos con `if key in dict`."
    },
    {
      "id": "inf-built-5",
      "type": "write-code",
      "difficulty": 2,
      "question": "Dado un objeto `Counter` con votos, obtén el elemento con mayor cantidad de ocurrencias usando su método más eficiente.",
      "code": "from collections import Counter\nvotos = Counter(['A', 'B', 'A', 'C', 'A', 'B'])\n# Obtén [(elemento, conteo)] del más frecuente:\nganador = _____",
      "placeholder": "votos.most_common(1)",
      "hints": [
        "Usa most_common con argumento 1."
      ],
      "acceptedAnswers": [
        "votos.most_common(1)",
        "votos.most_common(1) "
      ],
      "explanation": "`Counter.most_common(n)` retorna una lista con las `n` tuplas `(elemento, frecuencia)` más frecuentes ordenadas de mayor a menor."
    },
    {
      "id": "inf-built-6",
      "type": "write-code",
      "difficulty": 2,
      "question": "Usa desempaquetado con asterisco (`*`) para capturar el primer elemento en `cabeza` y todos los restantes en `cola`.",
      "code": "numeros = [10, 20, 30, 40, 50]\n_____ = numeros",
      "placeholder": "cabeza, *cola",
      "hints": [
        "cabeza toma el primer valor y *cola absorbe el resto en una lista."
      ],
      "acceptedAnswers": [
        "cabeza, *cola",
        "cabeza, *cola "
      ],
      "explanation": "El operador `*` en asignaciones por desempaquetado agrupa cualquier número arbitrario de elementos intermedios o finales en una lista estándar de Python."
    },
    {
      "id": "inf-built-7",
      "type": "write-code",
      "difficulty": 2,
      "question": "Dados dos conjuntos `set_a` y `set_b`, obtén el conjunto que contiene los elementos comunes a ambos (intersección) usando operadores de conjuntos.",
      "code": "set_a = {1, 2, 3, 4}\nset_b = {3, 4, 5, 6}\ncomunes = _____",
      "placeholder": "set_a & set_b",
      "hints": [
        "Usa el operador & o el método intersection."
      ],
      "acceptedAnswers": [
        "set_a & set_b",
        "set_a.intersection(set_b)",
        "set_b & set_a",
        "set_b.intersection(set_a)"
      ],
      "explanation": "El operador `&` calcula la intersección en tiempo promedio O(min(len(s), len(t))), retornando un nuevo set con los elementos presentes en ambos."
    },
    {
      "id": "inf-built-8",
      "type": "write-answer",
      "difficulty": 2,
      "question": "¿Qué tipo de dato en Python permite acceder a sus campos tanto por índice numérico como por nombre de atributo, manteniendo inmutabilidad?",
      "placeholder": "nombre_estructura",
      "hints": [
        "Proviene del módulo collections.",
        "named..."
      ],
      "acceptedAnswers": [
        "namedtuple",
        "named tuple",
        "collections.namedtuple"
      ],
      "explanation": "`namedtuple` genera subclases de tupla con nombres de campos legibles sin incurrir en el sobrecosto de memoria de un diccionario o clase completa."
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
    },
    {
      "id": "inf-nod-4",
      "type": "write-code",
      "difficulty": 3,
      "question": "[AC5 - Equipo] En una lista ligada con puntero `self.ultimo`, enlaza el nuevo atleta `atleta` al final y actualiza `self.ultimo`.",
      "code": "def append(self, atleta):\n    if not self.primero:\n        self.primero = atleta\n        self.ultimo = atleta\n    else:\n        self.ultimo.siguiente = atleta\n        _____",
      "placeholder": "self.ultimo = atleta",
      "hints": [
        "Actualiza la referencia de self.ultimo para que apunte al nuevo atleta."
      ],
      "acceptedAnswers": [
        "self.ultimo = atleta",
        "self.ultimo = atleta "
      ],
      "explanation": "En listas ligadas con referencia a la cola, mantener `self.ultimo` actualizado permite inserciones O(1) al final de la secuencia sin recorrerla completa."
    },
    {
      "id": "inf-nod-5",
      "type": "write-code",
      "difficulty": 2,
      "question": "En una estructura de datos tipo Pila (Stack, LIFO), completa la operación `pop` para extraer y retornar el elemento en el tope.",
      "code": "class Stack:\n    def __init__(self):\n        self.items = []\n\n    def push(self, item):\n        self.items.append(item)\n\n    def pop(self):\n        if not self.items:\n            raise IndexError('Pila vacía')\n        return _____",
      "placeholder": "self.items.pop()",
      "hints": [
        "Llama al método pop() de la lista interna self.items."
      ],
      "acceptedAnswers": [
        "self.items.pop()",
        "self.items.pop(-1)"
      ],
      "explanation": "El método `.pop()` de una lista de Python desapila el último elemento añadido en tiempo O(1), cumpliendo con la disciplina LIFO (Last-In, First-Out)."
    },
    {
      "id": "inf-nod-6",
      "type": "write-code",
      "difficulty": 2,
      "question": "Usa `collections.deque` para implementar una Cola (Queue, FIFO) eficiente extrayendo el elemento del frente en O(1).",
      "code": "from collections import deque\n\nclass Queue:\n    def __init__(self):\n        self._datos = deque()\n\n    def enqueue(self, item):\n        self._datos.append(item)\n\n    def dequeue(self):\n        return _____",
      "placeholder": "self._datos.popleft()",
      "hints": [
        "El método de deque para extraer por la izquierda en O(1) es popleft()."
      ],
      "acceptedAnswers": [
        "self._datos.popleft()",
        "self._datos.popleft() "
      ],
      "explanation": "`popleft()` en `deque` se ejecuta en O(1) porque está implementado sobre una lista doblemente enlazada de bloques, a diferencia de `list.pop(0)` que toma O(n)."
    },
    {
      "id": "inf-nod-7",
      "type": "write-code",
      "difficulty": 3,
      "question": "[AC7 - Búsqueda] En un algoritmo BFS para recorrer un grafo o laberinto, ¿qué método de `collections.deque` se usa para extraer la celda actual?",
      "code": "from collections import deque\n\ndef buscar_bfs(inicio, fin):\n    cola = deque([inicio])\n    while cola:\n        actual = _____\n        # Procesar vecinos...",
      "placeholder": "cola.popleft()",
      "hints": [
        "Extrae el elemento del frente de la cola con popleft()."
      ],
      "acceptedAnswers": [
        "cola.popleft()",
        "cola.popleft() "
      ],
      "explanation": "BFS (Breadth-First Search) requiere una cola FIFO para explorar los nodos nivel por nivel en orden de menor distancia."
    },
    {
      "id": "inf-nod-8",
      "type": "write-answer",
      "difficulty": 2,
      "question": "En un Árbol Binario de Búsqueda (BST), ¿qué tipo de recorrido (in-order, pre-order, post-order) visita los nodos en orden estrictamente ascendente?",
      "placeholder": "tipo_de_recorrido",
      "hints": [
        "Visita: subárbol izquierdo, raíz, subárbol derecho."
      ],
      "acceptedAnswers": [
        "in-order",
        "inorder",
        "in order",
        "en orden"
      ],
      "explanation": "El recorrido in-order procesa primero el hijo izquierdo (< raíz), luego la raíz, y finalmente el hijo derecho (> raíz), produciendo una secuencia ordenada."
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
    },
    {
      "id": "inf-exc-4",
      "type": "write-code",
      "difficulty": 2,
      "question": "Define una excepción personalizada llamada `ErrorPuntajeInvalido` que herede de la clase estándar `Exception`.",
      "code": "_____:\n    pass",
      "placeholder": "class ErrorPuntajeInvalido(Exception)",
      "hints": [
        "Usa class ErrorPuntajeInvalido(Exception):"
      ],
      "acceptedAnswers": [
        "class ErrorPuntajeInvalido(Exception)",
        "class ErrorPuntajeInvalido(Exception):"
      ],
      "explanation": "Toda excepción personalizada en Python debe heredar directa o indirectamente de `Exception` para poder ser capturada por bloques de manejo de errores."
    },
    {
      "id": "inf-exc-5",
      "type": "write-code",
      "difficulty": 2,
      "question": "Lanza manualmente una excepción de tipo `ValueError` con el mensaje exacto `'Formato incorrecto'` si `texto` no contiene una coma.",
      "code": "def procesar_csv(texto):\n    if ',' not in texto:\n        _____",
      "placeholder": "raise ValueError('Formato incorrecto')",
      "hints": [
        "Usa la palabra clave raise seguida de ValueError('Formato incorrecto')."
      ],
      "acceptedAnswers": [
        "raise ValueError('Formato incorrecto')",
        "raise ValueError(\"Formato incorrecto\")",
        "raise ValueError('Formato incorrecto') "
      ],
      "explanation": "`raise` interrumpe el flujo normal del programa señalando que ocurrió una condición anómala que no puede continuar."
    },
    {
      "id": "inf-exc-6",
      "type": "write-code",
      "difficulty": 3,
      "question": "Captura simultáneamente tanto `KeyError` como `IndexError` en una sola cláusula `except` guardando el error en la variable `err`.",
      "code": "try:\n    valor = coleccion[clave]\n_____\n    print(f'Error de acceso: {err}')",
      "placeholder": "except (KeyError, IndexError) as err:",
      "hints": [
        "Agrupa las dos excepciones en una tupla usando paréntesis: (KeyError, IndexError) as err:"
      ],
      "acceptedAnswers": [
        "except (KeyError, IndexError) as err:",
        "except (IndexError, KeyError) as err:",
        "except (KeyError, IndexError) as err :",
        "except (IndexError, KeyError) as err :"
      ],
      "explanation": "Para capturar múltiples excepciones en un solo bloque `except`, deben agruparse explícitamente dentro de una tupla."
    },
    {
      "id": "inf-exc-7",
      "type": "write-code",
      "difficulty": 2,
      "question": "En un bloque `try/except`, ¿qué palabra clave define el bloque que se ejecuta SI Y SOLO SI NO ocurrió ninguna excepción?",
      "code": "try:\n    resultado = 10 / 2\nexcept ZeroDivisionError:\n    print('División por cero')\n_____:\n    print('Todo salió bien:', resultado)\nfinally:\n    print('Limpieza')",
      "placeholder": "else",
      "hints": [
        "Es la misma palabra que se usa en condicionales: else."
      ],
      "acceptedAnswers": [
        "else",
        "else:"
      ],
      "explanation": "La cláusula `else:` de un `try/except` solo se ejecuta si el bloque `try` finalizó sin lanzar ninguna excepción, ideal para código que no debe ser protegido por los `except`."
    },
    {
      "id": "inf-exc-8",
      "type": "write-answer",
      "difficulty": 2,
      "question": "¿Qué bloque de un `try/except` garantiza ejecutarse siempre, sin importar si ocurrió un error, se capturó o se ejecutó un return anticipado?",
      "placeholder": "bloque...",
      "hints": [
        "Empieza con f.",
        "finally"
      ],
      "acceptedAnswers": [
        "finally",
        "finally:"
      ],
      "explanation": "El bloque `finally` se ejecuta invariablemente en todas las salidas posibles del bloque `try`, siendo vital para liberar recursos, cerrar archivos o desconectar sockets."
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
    },
    {
      "id": "inf-it-6",
      "type": "write-code",
      "difficulty": 2,
      "question": "Usa una expresión lambda junto con `filter()` para quedarte únicamente con los números pares de la lista `numeros`.",
      "code": "numeros = [1, 2, 3, 4, 5, 6]\npares = list(_____(lambda x: x % 2 == 0, numeros))",
      "placeholder": "filter",
      "hints": [
        "La función de orden superior para seleccionar elementos es filter."
      ],
      "acceptedAnswers": [
        "filter"
      ],
      "explanation": "`filter(predicado, iterable)` evalúa la función booleana para cada elemento y conserva solo aquellos donde retorna `True`."
    },
    {
      "id": "inf-it-7",
      "type": "write-code",
      "difficulty": 2,
      "question": "Usa `map()` y `lambda` para elevar al cuadrado todos los números de `datos`.",
      "code": "datos = [2, 3, 4]\ncuadrados = list(_____(lambda x: x ** 2, datos))",
      "placeholder": "map",
      "hints": [
        "La función de orden superior para transformar cada elemento es map."
      ],
      "acceptedAnswers": [
        "map"
      ],
      "explanation": "`map(funcion, iterable)` aplica la función a cada elemento de forma perezosa (lazy evaluation) produciendo un iterador con los resultados transformados."
    },
    {
      "id": "inf-it-8",
      "type": "write-code",
      "difficulty": 3,
      "question": "[IIC2233 I2] Envía el valor `100` a un generador pausado `gen` usando el método correspondiente.",
      "code": "def acumulador():\n    total = 0\n    while True:\n        valor = yield total\n        if valor is not None:\n            total += valor\n\ngen = acumulador()\nnext(gen)  # Inicializa el generador\nresultado = _____",
      "placeholder": "gen.send(100)",
      "hints": [
        "El método de los generadores para inyectar un valor es send(valor)."
      ],
      "acceptedAnswers": [
        "gen.send(100)",
        "gen.send(100) "
      ],
      "explanation": "`generator.send(valor)` reanuda la ejecución del generador asignando `valor` como resultado de la expresión `yield` que estaba suspendida."
    },
    {
      "id": "inf-it-9",
      "type": "write-code",
      "difficulty": 3,
      "question": "[AC4 - CaminoIterator] En el método `__next__` de un iterador personalizado, ¿qué excepción debes lanzar cuando ya no quedan elementos por recorrer?",
      "code": "def __next__(self):\n    if self.indice >= len(self.elementos):\n        _____\n    elem = self.elementos[self.indice]\n    self.indice += 1\n    return elem",
      "placeholder": "raise StopIteration",
      "hints": [
        "Usa raise StopIteration."
      ],
      "acceptedAnswers": [
        "raise StopIteration",
        "raise StopIteration()",
        "raise StopIteration "
      ],
      "explanation": "El protocolo de iteración en Python especifica que `__next__` debe lanzar `StopIteration` para notificar al bucle `for` o al consumidor que la secuencia ha terminado."
    },
    {
      "id": "inf-it-10",
      "type": "write-answer",
      "difficulty": 2,
      "question": "¿Cómo se llama la propiedad de los generadores e iteradores de calcular elementos bajo demanda a medida que se piden, sin almacenar la secuencia completa en memoria?",
      "placeholder": "concepto...",
      "hints": [
        "Lazy...",
        "Evaluación perezosa"
      ],
      "acceptedAnswers": [
        "lazy evaluation",
        "evaluacion perezosa",
        "evaluación perezosa",
        "lazy",
        "evaluacion lazy"
      ],
      "explanation": "La evaluación perezosa (lazy evaluation) permite procesar flujos de datos infinitos o masivos consumiendo un espacio de memoria constante O(1)."
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
    },
    {
      "id": "inf-th-4",
      "type": "write-code",
      "difficulty": 2,
      "question": "[AC5 - Atleta] Define la clase `Atleta` para que herede directamente de la clase `Thread` del módulo `threading`.",
      "code": "from threading import Thread\n\nclass Atleta(_____):\n    def __init__(self, nombre):\n        super().__init__()\n        self.nombre = nombre",
      "placeholder": "Thread",
      "hints": [
        "La clase base de hilos es Thread."
      ],
      "acceptedAnswers": [
        "Thread",
        "threading.Thread"
      ],
      "explanation": "En IIC2233, la creación de hilos especializados se realiza comúnmente heredando de `threading.Thread` y sobreescribiendo su método `run()`."
    },
    {
      "id": "inf-th-5",
      "type": "write-code",
      "difficulty": 3,
      "question": "[AC5 - Eventos] Usa un objeto `threading.Event` llamado `self.evento` para bloquear al hilo hasta que otro hilo dé la señal de partida con `.set()`.",
      "code": "from threading import Thread, Event\n\nclass Corredor(Thread):\n    def __init__(self, evento_inicio: Event):\n        super().__init__()\n        self.evento = evento_inicio\n\n    def run(self):\n        print('Esperando señal...')\n        _____\n        print('¡Partió!')",
      "placeholder": "self.evento.wait()",
      "hints": [
        "Llama al método wait() del evento."
      ],
      "acceptedAnswers": [
        "self.evento.wait()",
        "self.evento.wait() "
      ],
      "explanation": "`event.wait()` suspende la hebra hasta que el flag interno del evento sea `True` (activado mediante `event.set()`), permitiendo coordinar partidas simultáneas."
    },
    {
      "id": "inf-th-6",
      "type": "write-code",
      "difficulty": 2,
      "question": "Configura un hilo `t` como demonio (`daemon`) antes de iniciarlo, para que no impida el cierre del programa principal al terminar el proceso.",
      "code": "t = MiHilo()\n_____\nt.start()",
      "placeholder": "t.daemon = True",
      "hints": [
        "Asigna True al atributo daemon del hilo t."
      ],
      "acceptedAnswers": [
        "t.daemon = True",
        "t.daemon = True "
      ],
      "explanation": "Los hilos con `daemon = True` finalizan de forma forzosa cuando todos los hilos no-daemons del programa han completado su ejecución."
    },
    {
      "id": "inf-th-7",
      "type": "write-code",
      "difficulty": 3,
      "question": "Inserta un elemento `mensaje` en una cola segura para hilos `queue.Queue` llamada `self.cola`.",
      "code": "from queue import Queue\n\nclass Productor:\n    def __init__(self, cola: Queue):\n        self.cola = cola\n\n    def enviar(self, mensaje):\n        _____",
      "placeholder": "self.cola.put(mensaje)",
      "hints": [
        "El método para agregar a una Queue es put(elemento)."
      ],
      "acceptedAnswers": [
        "self.cola.put(mensaje)",
        "self.cola.put(mensaje) "
      ],
      "explanation": "`queue.Queue.put()` es atómico y thread-safe por diseño, implementando internamente locks para sincronizar productores y consumidores sin riesgo de race conditions."
    },
    {
      "id": "inf-th-8",
      "type": "write-answer",
      "difficulty": 2,
      "question": "¿Qué mecanismo interno del intérprete CPython evita que múltiples hilos de Python ejecuten bytecode simultáneamente en múltiples núcleos reales de CPU?",
      "placeholder": "sigla...",
      "hints": [
        "Global Interpreter Lock",
        "3 letras: G..."
      ],
      "acceptedAnswers": [
        "GIL",
        "Global Interpreter Lock",
        "el GIL"
      ],
      "explanation": "El GIL (Global Interpreter Lock) serializa la ejecución de hilos de Python en CPython, lo que beneficia tareas I/O-bound pero limita la aceleración de tareas CPU-bound en hilos."
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
    },
    {
      "id": "inf-net-4",
      "type": "write-code",
      "difficulty": 2,
      "question": "[Semana 10] Crea un socket TCP/IPv4 estándar usando el módulo `socket` de Python.",
      "code": "import socket\n\nservidor = _____",
      "placeholder": "socket.socket(socket.AF_INET, socket.SOCK_STREAM)",
      "hints": [
        "socket.AF_INET especifica IPv4 y socket.SOCK_STREAM especifica TCP."
      ],
      "acceptedAnswers": [
        "socket.socket(socket.AF_INET, socket.SOCK_STREAM)",
        "socket.socket(socket.AF_INET, socket.SOCK_STREAM) "
      ],
      "explanation": "`AF_INET` indica la familia de direcciones IPv4 y `SOCK_STREAM` define el protocolo orientado a conexión y confiable (TCP)."
    },
    {
      "id": "inf-net-5",
      "type": "write-code",
      "difficulty": 3,
      "question": "En un servidor TCP, enlaza el socket `sock` al host `'127.0.0.1'` y puerto `5000` pasando la tupla respectiva.",
      "code": "import socket\nsock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n_____",
      "placeholder": "sock.bind(('127.0.0.1', 5000))",
      "hints": [
        "Llama al método bind pasando la tupla ('127.0.0.1', 5000)."
      ],
      "acceptedAnswers": [
        "sock.bind(('127.0.0.1', 5000))",
        "sock.bind(('127.0.0.1', 5000)) ",
        "sock.bind((\"127.0.0.1\", 5000))"
      ],
      "explanation": "`bind((host, port))` asocia el socket a una interfaz de red y un puerto específico del sistema operativo. Requiere recibir los parámetros dentro de una tupla."
    },
    {
      "id": "inf-net-6",
      "type": "write-code",
      "difficulty": 2,
      "question": "En un servidor que ya ejecutó `bind` y `listen`, acepta una conexión entrante desempaquetando el socket del cliente y su dirección.",
      "code": "sock.listen()\n# Espera y acepta una conexión:\n_____ = sock.accept()",
      "placeholder": "socket_cliente, address",
      "hints": [
        "accept() retorna (socket_cliente, address)."
      ],
      "acceptedAnswers": [
        "socket_cliente, address",
        "cliente, direccion",
        "conn, addr",
        "socket_cliente, direccion",
        "client_socket, address"
      ],
      "explanation": "`socket.accept()` es una llamada bloqueante que espera una conexión entrante y retorna un nuevo objeto socket dedicado a ese cliente junto a su tupla `(IP, puerto)`."
    },
    {
      "id": "inf-net-7",
      "type": "write-code",
      "difficulty": 3,
      "question": "[IIC2233 Protocolo] Lee exactamente los primeros 4 bytes recibidos por un socket `sock` y conviértelos a un entero representando el largo del payload (en Big-Endian).",
      "code": "bytes_largo = sock.recv(4)\nlargo = _____",
      "placeholder": "int.from_bytes(bytes_largo, byteorder='big')",
      "hints": [
        "Usa int.from_bytes(bytes_largo, byteorder='big')."
      ],
      "acceptedAnswers": [
        "int.from_bytes(bytes_largo, byteorder='big')",
        "int.from_bytes(bytes_largo, byteorder=\"big\")",
        "int.from_bytes(bytes_largo, 'big')",
        "int.from_bytes(bytes_largo, \"big\")"
      ],
      "explanation": "El protocolo estándar de IIC2233 antepone 4 bytes con el tamaño del mensaje codificado en orden Big-Endian (el byte más significativo primero)."
    },
    {
      "id": "inf-net-8",
      "type": "write-answer",
      "difficulty": 2,
      "question": "¿Qué método del socket se recomienda utilizar en lugar de `send()` para garantizar que todos los bytes del buffer sean enviados sin requerir un bucle manual?",
      "placeholder": "metodo...",
      "hints": [
        "Envía todo el contenido garantizado.",
        "send..."
      ],
      "acceptedAnswers": [
        "sendall",
        "sendall()",
        "socket.sendall"
      ],
      "explanation": "`send()` puede transmitir solo una fracción de los bytes si los buffers de red están llenos. `sendall()` se encarga internamente de seguir enviando hasta transmitir la totalidad de los datos."
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
    },
    {
      "id": "inf-ser-4",
      "type": "write-code",
      "difficulty": 2,
      "question": "Serializa el diccionario `datos` a un string JSON formateado usando la biblioteca estándar `json`.",
      "code": "import json\ndatos = {'alumno': 'Damian', 'nota': 7.0}\njson_str = _____",
      "placeholder": "json.dumps(datos)",
      "hints": [
        "json.dumps serializa un objeto a string en memoria."
      ],
      "acceptedAnswers": [
        "json.dumps(datos)",
        "json.dumps(datos) "
      ],
      "explanation": "`json.dumps()` (dump to string) convierte estructuras estándar de Python (diccionarios, listas, strings, enteros) a una cadena JSON interoperable."
    },
    {
      "id": "inf-ser-5",
      "type": "write-code",
      "difficulty": 2,
      "question": "Convierte un entero `tamano = 1024` a una secuencia de 4 bytes usando ordenamiento de bytes Big-Endian.",
      "code": "tamano = 1024\nbytes_tamano = _____",
      "placeholder": "tamano.to_bytes(4, byteorder='big')",
      "hints": [
        "Usa tamano.to_bytes(4, byteorder='big') o 'big'."
      ],
      "acceptedAnswers": [
        "tamano.to_bytes(4, byteorder='big')",
        "tamano.to_bytes(4, byteorder=\"big\")",
        "tamano.to_bytes(4, 'big')",
        "tamano.to_bytes(4, \"big\")"
      ],
      "explanation": "`int.to_bytes(longitud, byteorder)` convierte números enteros en objetos inmutables de tipo `bytes`, fundamental para encabezados en protocolos de red."
    },
    {
      "id": "inf-ser-6",
      "type": "write-code",
      "difficulty": 3,
      "question": "Serializa un objeto Python cualquiera `obj` a una representación en bytes binarios usando el módulo `pickle`.",
      "code": "import pickle\n\ndef guardar_en_bytes(obj):\n    return _____",
      "placeholder": "pickle.dumps(obj)",
      "hints": [
        "pickle.dumps convierte un objeto Python a bytes."
      ],
      "acceptedAnswers": [
        "pickle.dumps(obj)",
        "pickle.dumps(obj) "
      ],
      "explanation": "`pickle.dumps(obj)` serializa objetos arbitrarios de Python en formato binario, preservando referencias circulares y tipos complejos de clases."
    },
    {
      "id": "inf-ser-7",
      "type": "write-code",
      "difficulty": 3,
      "question": "En la clase `ServidorSeguro`, define el método dunder `__getstate__` para excluir el atributo `self.lock` de la serialización con pickle.",
      "code": "class ServidorSeguro:\n    def __init__(self, nombre, lock):\n        self.nombre = nombre\n        self.lock = lock\n\n    def _____(self):\n        estado = self.__dict__.copy()\n        estado.pop('lock', None)\n        return estado",
      "placeholder": "__getstate__",
      "hints": [
        "El método dunder para personalizar lo que pickle serializa es __getstate__."
      ],
      "acceptedAnswers": [
        "__getstate__"
      ],
      "explanation": "`__getstate__` permite omitir atributos que no se pueden serializar (como sockets, locks o manejadores de archivos) antes de que pickle procese el diccionario del objeto."
    },
    {
      "id": "inf-ser-8",
      "type": "write-answer",
      "difficulty": 2,
      "question": "¿Por qué nunca se debe deserializar con `pickle.loads()` datos recibidos de una fuente no confiable o red abierta?",
      "placeholder": "motivo...",
      "hints": [
        "Inseguridad",
        "Ejecución de código arbitrario",
        "Inyección / Vulnerabilidad"
      ],
      "acceptedAnswers": [
        "ejecucion de codigo arbitrario",
        "ejecución de código arbitrario",
        "ejecucion de codigo",
        "seguridad",
        "es inseguro",
        "inseguridad"
      ],
      "explanation": "`pickle` permite instanciar objetos arbitrarios y ejecutar constructores como `__reduce__`, permitiendo a un atacante ejecutar código malicioso en el sistema que deserializa."
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
    },
    {
      "id": "inf-gui-4",
      "type": "write-code",
      "difficulty": 3,
      "question": "[PyQt] Declara una señal personalizada a nivel de clase llamada `actualizar_puntaje` que transmita un entero.",
      "code": "from PyQt6.QtCore import QObject, pyqtSignal\n\nclass Backend(QObject):\n    _____ = pyqtSignal(int)",
      "placeholder": "actualizar_puntaje",
      "hints": [
        "Escribe el nombre de la señal: actualizar_puntaje"
      ],
      "acceptedAnswers": [
        "actualizar_puntaje",
        "actualizar_puntaje "
      ],
      "explanation": "Las señales en PyQt (`pyqtSignal`) deben definirse obligatoriamente como atributos de clase en objetos que hereden de `QObject`."
    },
    {
      "id": "inf-gui-5",
      "type": "write-code",
      "difficulty": 2,
      "question": "Conecta la señal `self.boton.clicked` al método `self.iniciar_juego` en un widget PyQt.",
      "code": "def configurar_conexiones(self):\n    _____",
      "placeholder": "self.boton.clicked.connect(self.iniciar_juego)",
      "hints": [
        "Usa self.boton.clicked.connect(self.iniciar_juego)."
      ],
      "acceptedAnswers": [
        "self.boton.clicked.connect(self.iniciar_juego)",
        "self.boton.clicked.connect(self.iniciar_juego) "
      ],
      "explanation": "El patrón Signal-Slot de Qt conecta el emisor (`clicked`) con el receptor ejecutable (`self.iniciar_juego`) sin acoplar directamente las clases."
    },
    {
      "id": "inf-gui-6",
      "type": "write-code",
      "difficulty": 2,
      "question": "Emite la señal `self.senal_datos` enviando el diccionario `{'status': 'ok'}` como argumento.",
      "code": "def notificar(self):\n    datos = {'status': 'ok'}\n    _____",
      "placeholder": "self.senal_datos.emit(datos)",
      "hints": [
        "Llama al método emit de la señal pasando datos."
      ],
      "acceptedAnswers": [
        "self.senal_datos.emit(datos)",
        "self.senal_datos.emit(datos) "
      ],
      "explanation": "`senal.emit(*args)` desencadena la invocación de todos los métodos slots conectados a ella, transmitiendo los argumentos correspondientes."
    },
    {
      "id": "inf-gui-7",
      "type": "write-code",
      "difficulty": 3,
      "question": "[Arquitectura Frontend-Backend] Para ejecutar tareas prolongadas de networking sin congelar la ventana gráfica, ¿de qué clase de PyQt debe heredar el worker?",
      "code": "from PyQt6.QtCore import _____\n\nclass Worker(QThread):\n    def run(self):\n        # Tarea de red pesada\n        pass",
      "placeholder": "QThread",
      "hints": [
        "QThread es la abstracción de hilos de Qt."
      ],
      "acceptedAnswers": [
        "QThread"
      ],
      "explanation": "`QThread` gestiona hilos de ejecución compatibles con el bucle de eventos de Qt, permitiendo comunicar avances al hilo principal mediante señales sin riesgo de crash."
    },
    {
      "id": "inf-gui-8",
      "type": "write-answer",
      "difficulty": 2,
      "question": "¿Por qué jamás se deben modificar los widgets de la interfaz gráfica directamente desde un hilo secundario (`Thread` o `QThread`) en PyQt?",
      "placeholder": "razon...",
      "hints": [
        "Solo el hilo principal (Main Thread) puede modificar la UI.",
        "Thread-safety / Concurrencia"
      ],
      "acceptedAnswers": [
        "solo el hilo principal puede modificar la interfaz",
        "no es thread safe",
        "no es thread-safe",
        "hilo principal",
        "provoca crash o comportamiento indefinido"
      ],
      "explanation": "En Qt, los componentes gráficos NO son thread-safe. Solo el hilo principal (donde corre `QApplication.exec()`) tiene permitido manipular la interfaz gráfica; los demás deben emitir señales."
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
    },
    {
      "id": "inf-rec-4",
      "type": "write-code",
      "difficulty": 2,
      "question": "Escribe el paso recursivo de la función factorial: multiplica `n` por la llamada recursiva con `n - 1`.",
      "code": "def factorial(n):\n    if n <= 1:\n        return 1\n    return _____",
      "placeholder": "n * factorial(n - 1)",
      "hints": [
        "Multiplica n por factorial(n - 1)."
      ],
      "acceptedAnswers": [
        "n * factorial(n - 1)",
        "n * factorial(n - 1) "
      ],
      "explanation": "Cada llamada recursiva reduce el problema a un subproblema de menor tamaño hasta alcanzar el caso base `n <= 1`."
    },
    {
      "id": "inf-rec-5",
      "type": "write-code",
      "difficulty": 3,
      "question": "[AC7 - Reconstrucción] Escribe la llamada recursiva para calcular la altura máxima de un árbol binario (`1 + max(...)`).",
      "code": "def altura(nodo):\n    if nodo is None:\n        return 0\n    return 1 + max(altura(nodo.izq), _____)",
      "placeholder": "altura(nodo.der)",
      "hints": [
        "Llama a altura con nodo.der o nodo.derecha."
      ],
      "acceptedAnswers": [
        "altura(nodo.der)",
        "altura(nodo.derecha)",
        "altura(nodo.der) "
      ],
      "explanation": "La altura de un nodo es 1 más el máximo entre la altura de su rama izquierda y la altura de su rama derecha."
    },
    {
      "id": "inf-rec-6",
      "type": "write-code",
      "difficulty": 2,
      "question": "Invierte un string `s` recursivamente: toma el último carácter `s[-1]` y concatena la llamada recursiva con el resto `s[:-1]`.",
      "code": "def invertir(s):\n    if len(s) <= 1:\n        return s\n    return s[-1] + _____",
      "placeholder": "invertir(s[:-1])",
      "hints": [
        "Llama a invertir con el substring s[:-1]."
      ],
      "acceptedAnswers": [
        "invertir(s[:-1])",
        "invertir(s[:-1]) "
      ],
      "explanation": "El caso base es un string de largo 0 o 1. El paso recursivo toma el último carácter y le concatena recursivamente el resto invertido."
    },
    {
      "id": "inf-rec-7",
      "type": "write-answer",
      "difficulty": 2,
      "question": "¿Cómo se llama el caso indispensable en una función recursiva que define cuándo detener las llamadas para no caer en bucle infinito?",
      "placeholder": "caso...",
      "hints": [
        "Caso...",
        "Base"
      ],
      "acceptedAnswers": [
        "caso base",
        "caso base ",
        "base case"
      ],
      "explanation": "El caso base proporciona una solución directa sin llamadas adicionales, garantizando que la recursión termine en un número finito de pasos."
    }
  ]
};
