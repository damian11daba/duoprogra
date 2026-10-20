// ============================================================
// DuoProgra - Banco de Preguntas Parte 1
// Basado en IIC2233 Programación Avanzada en Python (PUC Chile)
// Módulos: OOP Básico, OOP Avanzado, Estructuras Built-in,
//          Estructuras Nodales, Excepciones, Iterables y Generadores
// ============================================================

window.DUOPROGRA_PARTE1 = [

  // ============================================================
  // MODULE 1: OOP Básico
  // ============================================================
  {
    id: 'oop-basico',
    name: 'OOP Básico',
    icon: '🏗️',
    description: 'Fundamentos de Programación Orientada a Objetos: clases, objetos, atributos, métodos y encapsulamiento.',
    color: '#58CC02',
    lessons: [
      // ---- Lesson 1: Clases y Objetos ----
      {
        id: 'oop-basico-1',
        name: 'Clases y Objetos',
        questions: [
          {
            id: 'q-oop1-1-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Cuál es la palabra clave para definir una clase en Python?',
            code: null,
            options: ['class', 'def', 'struct', 'object'],
            correct: 0,
            explanation: 'En Python, la palabra clave "class" se usa para definir una nueva clase. "def" se usa para funciones, "struct" no existe en Python y "object" es la clase base de todas las clases.'
          },
          {
            id: 'q-oop1-1-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Perro:\n    def __init__(self, nombre):\n        self.nombre = nombre\n    def ladrar(self):\n        return f"{self.nombre} dice: Guau!"\n\nfido = Perro("Fido")\nprint(fido.ladrar())',
            options: ['Fido dice: Guau!', 'Perro dice: Guau!', 'nombre dice: Guau!', 'Error'],
            correct: 0,
            explanation: 'Se crea una instancia de Perro con nombre "Fido". Al llamar ladrar(), usa self.nombre que es "Fido", resultando en "Fido dice: Guau!".'
          },
          {
            id: 'q-oop1-1-3',
            type: 'fill-code',
            difficulty: 1,
            question: 'Completa el código para definir el constructor de la clase:',
            code: 'class Estudiante:\n    def _____(self, nombre, edad):\n        self.nombre = nombre\n        self.edad = edad',
            options: ['__init__', '__new__', '__create__', 'constructor'],
            correct: 0,
            explanation: 'En Python, el método __init__ es el inicializador (constructor) que se ejecuta automáticamente al crear una nueva instancia de la clase.'
          },
          {
            id: 'q-oop1-1-4',
            type: 'true-false',
            difficulty: 1,
            question: 'En Python, puedes crear múltiples instancias (objetos) a partir de una misma clase.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 0,
            explanation: 'Verdadero. Una clase es como un molde y puedes crear tantas instancias como necesites. Cada instancia es un objeto independiente con sus propios atributos.'
          },
          {
            id: 'q-oop1-1-5',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Contador:\n    def __init__(self):\n        self.cuenta = 0\n    def incrementar(self):\n        self.cuenta += 1\n\nc1 = Contador()\nc2 = Contador()\nc1.incrementar()\nc1.incrementar()\nc2.incrementar()\nprint(c1.cuenta, c2.cuenta)',
            options: ['2 1', '2 2', '3 3', '1 1'],
            correct: 0,
            explanation: 'c1 y c2 son instancias independientes. c1 se incrementa 2 veces (cuenta=2) y c2 se incrementa 1 vez (cuenta=1). Cada objeto mantiene su propio estado.'
          },
          {
            id: 'q-oop1-1-6',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el código para que la clase funcione correctamente:',
            code: 'class Gato:\n    def __init__(self, nombre):\n        _____ = nombre\n\ngato = Gato("Michi")\nprint(gato.nombre)  # Michi',
            options: ['self.nombre', 'this.nombre', 'nombre', 'Gato.nombre'],
            correct: 0,
            explanation: 'En Python, self.nombre asigna el parámetro nombre como atributo de la instancia. "self" hace referencia a la instancia actual, no "this" como en otros lenguajes.'
          },
          {
            id: 'q-oop1-1-7',
            type: 'multiple-choice',
            difficulty: 2,
            question: '¿Qué representa el parámetro "self" en un método de una clase?',
            code: null,
            options: [
              'La instancia actual del objeto',
              'La clase misma',
              'El método actual',
              'Una variable global'
            ],
            correct: 0,
            explanation: '"self" es una referencia a la instancia actual del objeto. Se pasa automáticamente como primer argumento cuando se llama a un método de instancia.'
          },
      {
      "id": "oop-basico-dev-practica",
      "name": "✍️ Desarrollo: Práctica de OOP",
      "questions": [
            {
                  "id": "q-oop-dev-p1",
                  "type": "write-code",
                  "difficulty": 2,
                  "question": "Escribe la línea de código para definir el constructor de una clase Persona que recibe 'nombre' y 'edad':",
                  "code": "class Persona:\n    # Escribe la firma del constructor aquí\n        self.nombre = nombre\n        self.edad = edad",
                  "placeholder": "def __init__(self, ...):",
                  "hints": [
                        "El método se llama __init__ con doble guión bajo.",
                        "Recuerda incluir siempre 'self' como primer parámetro.",
                        "No olvides los dos puntos al final."
                  ],
                  "acceptedAnswers": [
                        "def __init__(self, nombre, edad):",
                        "def __init__(self, nombre, edad) :"
                  ],
                  "explanation": "En Python, los constructores se definen con 'def __init__(self, ...)'. 'self' es obligatorio para referenciar la instancia que se está creando."
            },
            {
                  "id": "q-oop-dev-p2",
                  "type": "write-code",
                  "difficulty": 2,
                  "question": "Escribe la instrucción exacta para crear una instancia de la clase 'Auto' con marca 'Toyota' y asignarla a la variable 'mi_auto':",
                  "code": null,
                  "placeholder": "mi_auto = ...",
                  "hints": [
                        "Se llama a la clase como una función: Clase(argumentos).",
                        "El string debe ser 'Toyota'."
                  ],
                  "acceptedAnswers": [
                        "mi_auto = Auto('Toyota')",
                        "mi_auto = Auto(\"Toyota\")",
                        "mi_auto=Auto('Toyota')",
                        "mi_auto=Auto(\"Toyota\")"
                  ],
                  "explanation": "Para instanciar una clase en Python se utiliza el nombre de la clase seguido de paréntesis con los argumentos necesarios: mi_auto = Auto('Toyota')."
            },
            {
                  "id": "q-oop-dev-p3",
                  "type": "write-code",
                  "difficulty": 2,
                  "question": "Escribe el decorador que se coloca sobre un método para convertirlo en un getter de una propiedad:",
                  "code": "class Circulo:\n    # ¿Qué decorador va aquí?\n    def radio(self):\n        return self._radio",
                  "placeholder": "@...",
                  "hints": [
                        "Empieza con arroba (@).",
                        "Es una palabra reservada built-in de Python para propiedades."
                  ],
                  "acceptedAnswers": [
                        "@property"
                  ],
                  "explanation": "El decorador built-in '@property' permite acceder a un método como si fuera un atributo regular (getter), facilitando el encapsulamiento."
            }
      ]
},
      {
      "id": "oop-basico-dev-puc",
      "name": "🎓 Desarrollo Nivel Prueba PUC: Modelación OOP",
      "questions": [
            {
                  "id": "q-oop-dev-puc1",
                  "type": "write-code",
                  "difficulty": 3,
                  "question": "[IIC2233 P1] Completa la línea del setter para que valide que el saldo sea no negativo antes de asignarlo a self._saldo:",
                  "code": "class CuentaBancaria:\n    def __init__(self, titular, saldo):\n        self.titular = titular\n        self.saldo = saldo\n\n    @property\n    def saldo(self):\n        return self._saldo\n\n    @saldo.setter\n    def saldo(self, valor):\n        # Asigna el máximo entre 0 y valor a self._saldo\n        _____",
                  "placeholder": "self._saldo = ...",
                  "hints": [
                        "Usa la función max(0, valor) o una expresión ternaria.",
                        "Recuerda asignar a self._saldo (con guión bajo)."
                  ],
                  "acceptedAnswers": [
                        "self._saldo = max(0, valor)",
                        "self._saldo = valor if valor >= 0 else 0",
                        "self._saldo = valor if valor > 0 else 0"
                  ],
                  "explanation": "En las pruebas de IIC2233 se exige encapsulamiento estricto: el setter debe proteger el atributo interno (self._saldo) aplicando las reglas de negocio, como impedir saldos negativos mediante max(0, valor)."
            },
            {
                  "id": "q-oop-dev-puc2",
                  "type": "write-code",
                  "difficulty": 3,
                  "question": "[IIC2233 P2] Implementa la condición para que dos instancias de 'Alumno' sean iguales si y solo si tienen el mismo 'rut':",
                  "code": "class Alumno:\n    def __init__(self, rut, nombre):\n        self.rut = rut\n        self.nombre = nombre\n\n    def __eq__(self, other):\n        if isinstance(other, Alumno):\n            # Escribe la expresión que retorna True si los ruts coinciden\n            return _____\n        return False",
                  "placeholder": "self.rut == ...",
                  "hints": [
                        "Compara el atributo rut de self con el rut de other.",
                        "Usa el operador de igualdad '=='."
                  ],
                  "acceptedAnswers": [
                        "self.rut == other.rut",
                        "other.rut == self.rut"
                  ],
                  "explanation": "El método especial __eq__ implementa el operador '=='. Siempre se verifica primero que other sea de la clase adecuada con isinstance, y luego se comparan sus identificadores únicos (self.rut == other.rut)."
            }
      ]
}
    ]
      },
      // ---- Lesson 2: Atributos y Métodos ----
      {
        id: 'oop-basico-2',
        name: 'Atributos y Métodos',
        questions: [
          {
            id: 'q-oop1-2-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Cuál es la diferencia principal entre un atributo de clase y un atributo de instancia?',
            code: null,
            options: [
              'El atributo de clase se comparte entre todas las instancias, el de instancia es único para cada objeto',
              'El atributo de clase es privado, el de instancia es público',
              'No hay diferencia, son lo mismo',
              'El atributo de instancia se comparte entre todas las instancias'
            ],
            correct: 0,
            explanation: 'Un atributo de clase se define dentro de la clase pero fuera de cualquier método y es compartido por todas las instancias. Un atributo de instancia se define en __init__ con self y es propio de cada objeto.'
          },
          {
            id: 'q-oop1-2-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Robot:\n    cantidad = 0\n\n    def __init__(self, nombre):\n        self.nombre = nombre\n        Robot.cantidad += 1\n\nr1 = Robot("R2D2")\nr2 = Robot("C3PO")\nr3 = Robot("BB8")\nprint(Robot.cantidad)',
            options: ['3', '1', '0', 'Error'],
            correct: 0,
            explanation: 'Robot.cantidad es un atributo de clase que se incrementa cada vez que se crea una instancia. Se crean 3 robots, por lo que cantidad es 3.'
          },
          {
            id: 'q-oop1-2-3',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Vehiculo:\n    ruedas = 4\n\nauto = Vehiculo()\nauto.ruedas = 6\nmoto = Vehiculo()\nprint(auto.ruedas, moto.ruedas, Vehiculo.ruedas)',
            options: ['6 4 4', '6 6 6', '4 4 4', '6 4 6'],
            correct: 0,
            explanation: 'Al hacer auto.ruedas = 6, se crea un atributo de instancia que "sombrea" al de clase solo para auto. moto sigue usando el atributo de clase (4), y Vehiculo.ruedas sigue siendo 4.'
          },
          {
            id: 'q-oop1-2-4',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el código para definir un método de instancia que retorne el área:',
            code: 'class Rectangulo:\n    def __init__(self, ancho, alto):\n        self.ancho = ancho\n        self.alto = alto\n\n    def area(_______):\n        return self.ancho * self.alto',
            options: ['self', 'this', 'cls', 'Rectangulo'],
            correct: 0,
            explanation: 'Los métodos de instancia siempre reciben self como primer parámetro, que representa la instancia actual del objeto.'
          },
          {
            id: 'q-oop1-2-5',
            type: 'true-false',
            difficulty: 1,
            question: 'Un atributo de clase definido como una lista mutable será compartido por todas las instancias si se modifica in-place.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 0,
            explanation: 'Verdadero. Si un atributo de clase es mutable (como una lista) y se modifica in-place (ej: lista.append()), el cambio afecta a todas las instancias porque todas comparten la misma referencia.'
          },
          {
            id: 'q-oop1-2-6',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Punto:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def distancia_origen(self):\n        return (self.x ** 2 + self.y ** 2) ** 0.5\n\np = Punto(3, 4)\nprint(p.distancia_origen())',
            options: ['5.0', '7.0', '12.0', '25.0'],
            correct: 0,
            explanation: 'La distancia al origen es sqrt(3² + 4²) = sqrt(9 + 16) = sqrt(25) = 5.0. Es la fórmula de distancia euclidiana.'
          }
        ]
      },
      // ---- Lesson 3: Encapsulamiento ----
      {
        id: 'oop-basico-3',
        name: 'Encapsulamiento',
        questions: [
          {
            id: 'q-oop1-3-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Qué convención se usa en Python para indicar que un atributo es "privado" (uso interno)?',
            code: null,
            options: [
              'Prefijar con guión bajo: _atributo',
              'Usar la palabra clave private',
              'Declararlo con const',
              'Ponerlo fuera de la clase'
            ],
            correct: 0,
            explanation: 'En Python, la convención es usar un guión bajo al inicio (_atributo) para indicar que es de uso interno. Python no tiene modificadores de acceso como private o protected de otros lenguajes.'
          },
          {
            id: 'q-oop1-3-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Persona:\n    def __init__(self, nombre, edad):\n        self._nombre = nombre\n        self.__edad = edad\n\np = Persona("Ana", 25)\nprint(p._nombre)',
            options: ['Ana', 'Error: atributo privado', 'None', '_nombre'],
            correct: 0,
            explanation: 'El guión bajo simple (_nombre) es solo una convención. Python no impide el acceso. Se puede acceder directamente, aunque no es recomendable.'
          },
          {
            id: 'q-oop1-3-3',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el código para crear una property que controle el acceso al atributo edad:',
            code: 'class Persona:\n    def __init__(self, edad):\n        self._edad = edad\n\n    _____\n    def edad(self):\n        return self._edad',
            options: ['@property', '@staticmethod', '@classmethod', '@getter'],
            correct: 0,
            explanation: '@property es el decorador que convierte un método en una propiedad de solo lectura. Permite acceder como atributo (obj.edad) pero ejecuta el método internamente.'
          },
          {
            id: 'q-oop1-3-4',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Temperatura:\n    def __init__(self, celsius):\n        self._celsius = celsius\n\n    @property\n    def celsius(self):\n        return self._celsius\n\n    @celsius.setter\n    def celsius(self, valor):\n        if valor < -273.15:\n            raise ValueError("Imposible")\n        self._celsius = valor\n\nt = Temperatura(100)\nt.celsius = 50\nprint(t.celsius)',
            options: ['50', '100', 'Error: ValueError', 'Error: no se puede asignar'],
            correct: 0,
            explanation: 'El setter permite asignar un nuevo valor a celsius. Como 50 > -273.15, la asignación es válida y t.celsius ahora retorna 50.'
          },
          {
            id: 'q-oop1-3-5',
            type: 'true-false',
            difficulty: 2,
            question: 'El doble guión bajo (__atributo) en Python hace que el atributo sea completamente inaccesible desde fuera de la clase.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 1,
            explanation: 'Falso. El doble guión bajo activa el "name mangling": Python renombra el atributo a _NombreClase__atributo. Sigue siendo accesible, pero de forma menos directa.'
          },
          {
            id: 'q-oop1-3-6',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class CuentaBancaria:\n    def __init__(self, saldo):\n        self.__saldo = saldo\n\n    @property\n    def saldo(self):\n        return self.__saldo\n\n    def depositar(self, monto):\n        if monto > 0:\n            self.__saldo += monto\n\nc = CuentaBancaria(1000)\nc.depositar(500)\nprint(c.saldo)',
            options: ['1500', '1000', '500', 'Error'],
            correct: 0,
            explanation: 'Se inicia con saldo 1000, se depositan 500 (monto > 0 es válido), y la property saldo retorna self.__saldo que ahora es 1500.'
          },
          {
            id: 'q-oop1-3-7',
            type: 'multiple-choice',
            difficulty: 2,
            question: '¿Cuál es la ventaja principal de usar @property en lugar de acceso directo a atributos?',
            code: null,
            options: [
              'Permite agregar validación y lógica sin cambiar la interfaz de uso',
              'Hace el código más rápido',
              'Es obligatorio en Python 3',
              'Permite usar herencia múltiple'
            ],
            correct: 0,
            explanation: '@property permite agregar lógica (validación, cálculos) al acceder o modificar un atributo sin cambiar cómo se usa desde afuera. Se sigue accediendo como obj.atributo.'
          }
        ]
      }
    ]
  },

  // ============================================================
  // MODULE 2: OOP Avanzado
  // ============================================================
  {
    id: 'oop-avanzado',
    name: 'OOP Avanzado',
    icon: '🧬',
    description: 'Herencia, polimorfismo, herencia múltiple, MRO y clases abstractas.',
    color: '#1CB0F6',
    lessons: [
      // ---- Lesson 1: Herencia ----
      {
        id: 'oop-avanzado-1',
        name: 'Herencia',
        questions: [
          {
            id: 'q-oop2-1-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Cuál es la sintaxis correcta para que la clase Gato herede de Animal?',
            code: null,
            options: [
              'class Gato(Animal):',
              'class Gato extends Animal:',
              'class Gato inherits Animal:',
              'class Gato -> Animal:'
            ],
            correct: 0,
            explanation: 'En Python, la herencia se indica poniendo la clase padre entre paréntesis después del nombre de la clase hija: class Gato(Animal):.'
          },
          {
            id: 'q-oop2-1-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Animal:\n    def __init__(self, nombre):\n        self.nombre = nombre\n    def hablar(self):\n        return "..."\n\nclass Perro(Animal):\n    def hablar(self):\n        return f"{self.nombre} dice: Guau!"\n\np = Perro("Rex")\nprint(p.hablar())',
            options: ['Rex dice: Guau!', '...', 'Error', 'None'],
            correct: 0,
            explanation: 'Perro hereda __init__ de Animal, así que self.nombre = "Rex". Perro sobreescribe el método hablar() con su propia versión que usa self.nombre.'
          },
          {
            id: 'q-oop2-1-3',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el código para llamar al constructor de la clase padre:',
            code: 'class Vehiculo:\n    def __init__(self, marca):\n        self.marca = marca\n\nclass Auto(Vehiculo):\n    def __init__(self, marca, modelo):\n        _____.__init__(marca)\n        self.modelo = modelo',
            options: ['super()', 'parent()', 'base()', 'Vehiculo'],
            correct: 0,
            explanation: 'super() retorna un objeto proxy que permite llamar métodos de la clase padre. super().__init__(marca) llama al constructor de Vehiculo.'
          },
          {
            id: 'q-oop2-1-4',
            type: 'true-false',
            difficulty: 1,
            question: 'Una clase hija hereda todos los métodos y atributos de la clase padre.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 0,
            explanation: 'Verdadero. En Python, la clase hija hereda todos los métodos y atributos de la clase padre. Puede usarlos directamente o sobreescribirlos.'
          },
          {
            id: 'q-oop2-1-5',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Base:\n    def __init__(self):\n        self.valor = 10\n        self.configurar()\n\n    def configurar(self):\n        self.valor += 5\n\nclass Derivada(Base):\n    def configurar(self):\n        self.valor *= 2\n\nd = Derivada()\nprint(d.valor)',
            options: ['20', '15', '10', '25'],
            correct: 0,
            explanation: 'Al crear Derivada(), se llama Base.__init__. Primero self.valor = 10, luego self.configurar() llama la versión de Derivada (por polimorfismo), que hace 10 * 2 = 20.'
          },
          {
            id: 'q-oop2-1-6',
            type: 'multiple-choice',
            difficulty: 2,
            question: '¿Qué función se usa para verificar si un objeto es instancia de una clase?',
            code: null,
            options: ['isinstance()', 'type()', 'is_instance()', 'classof()'],
            correct: 0,
            explanation: 'isinstance(obj, Clase) verifica si obj es instancia de Clase o de alguna subclase de Clase. type() retorna el tipo exacto sin considerar herencia.'
          },
      {
      "id": "oop-avanzado-dev-practica",
      "name": "✍️ Desarrollo: Práctica de Herencia y Polimorfismo",
      "questions": [
            {
                  "id": "q-oop2-dev-p1",
                  "type": "write-code",
                  "difficulty": 2,
                  "question": "Escribe la llamada a super() para invocar el constructor de la clase base pasándole 'nombre':",
                  "code": "class Empleado(Persona):\n    def __init__(self, nombre, sueldo):\n        # Escribe aquí la invocación a la clase base con super()\n        self.sueldo = sueldo",
                  "placeholder": "super()...",
                  "hints": [
                        "Usa super().__init__(...).",
                        "Pasa el parámetro 'nombre' dentro del paréntesis."
                  ],
                  "acceptedAnswers": [
                        "super().__init__(nombre)",
                        "super().__init__(nombre=nombre)"
                  ],
                  "explanation": "super().__init__(nombre) delega la inicialización del atributo heredado a la clase madre siguiendo el Method Resolution Order (MRO)."
            },
            {
                  "id": "q-oop2-dev-p2",
                  "type": "write-code",
                  "difficulty": 2,
                  "question": "¿Qué método dunder debes sobreescribir para definir la representación legible en string de un objeto (usada por print)?",
                  "code": null,
                  "placeholder": "__...__",
                  "hints": [
                        "Tiene doble guión bajo al inicio y al final.",
                        "Viene de la palabra 'string'."
                  ],
                  "acceptedAnswers": [
                        "__str__",
                        "def __str__(self):"
                  ],
                  "explanation": "__str__ es el método especial que Python invoca al hacer str(obj) o print(obj), y debe retornar obligatoriamente un objeto de tipo str."
            }
      ]
},
      {
      "id": "oop-avanzado-dev-puc",
      "name": "🎓 Desarrollo Nivel Prueba PUC: Herencia Múltiple y Clases Abstractas",
      "questions": [
            {
                  "id": "q-oop2-dev-puc1",
                  "type": "write-code",
                  "difficulty": 3,
                  "question": "[IIC2233 Examen] Declara la clase abstracta 'Entidad' que hereda de la clase base ABC:",
                  "code": "from abc import ABC, abstractmethod\n\n# Escribe la declaración de la clase abstracta Entidad\n    @abstractmethod\n    def actuar(self):\n        pass",
                  "placeholder": "class Entidad(...):",
                  "hints": [
                        "Hereda de ABC dentro de los paréntesis.",
                        "No olvides los dos puntos al final."
                  ],
                  "acceptedAnswers": [
                        "class Entidad(ABC):",
                        "class Entidad(ABC) :"
                  ],
                  "explanation": "Para crear una clase abstracta en Python moderno se hereda directamente de 'ABC' del módulo 'abc'. Esto impide que la clase sea instanciada directamente si contiene métodos con @abstractmethod."
            },
            {
                  "id": "q-oop2-dev-puc2",
                  "type": "write-code",
                  "difficulty": 3,
                  "question": "[IIC2233 I1] Escribe la expresión para obtener la tupla de clases en el orden de resolución de métodos de la clase 'Guerrero':",
                  "code": null,
                  "placeholder": "Guerrero._____",
                  "hints": [
                        "Es un atributo dunder de clase con 3 letras entre guiones bajos.",
                        "O bien el método .mro()"
                  ],
                  "acceptedAnswers": [
                        "Guerrero.__mro__",
                        "Guerrero.mro()"
                  ],
                  "explanation": "Guerrero.__mro__ (o Guerrero.mro()) retorna la tupla/lista de clases ordenadas según el algoritmo C3 Linearization que Python utiliza para resolver atributos y llamadas a super()."
            }
      ]
}
    ]
      },
      // ---- Lesson 2: Polimorfismo ----
      {
        id: 'oop-avanzado-2',
        name: 'Polimorfismo',
        questions: [
          {
            id: 'q-oop2-2-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Qué es el "duck typing" en Python?',
            code: null,
            options: [
              'Si un objeto se comporta como un tipo, se trata como ese tipo, sin importar su clase',
              'Un tipo de datos para representar patos',
              'Una forma de castear entre tipos',
              'Un patrón de diseño obligatorio en Python'
            ],
            correct: 0,
            explanation: 'Duck typing: "Si camina como pato y hace cuac como pato, entonces es un pato". Python se enfoca en qué métodos tiene un objeto, no en su tipo formal.'
          },
          {
            id: 'q-oop2-2-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Vector:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __add__(self, otro):\n        return Vector(self.x + otro.x, self.y + otro.y)\n\n    def __str__(self):\n        return f"({self.x}, {self.y})"\n\nv1 = Vector(1, 2)\nv2 = Vector(3, 4)\nprint(v1 + v2)',
            options: ['(4, 6)', '(1, 2)(3, 4)', 'Error', 'Vector(4, 6)'],
            correct: 0,
            explanation: '__add__ define el operador +. Suma las componentes: (1+3, 2+4) = (4, 6). __str__ define cómo se imprime el objeto.'
          },
          {
            id: 'q-oop2-2-3',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el método dunder para que print(obj) muestre una representación legible:',
            code: 'class Libro:\n    def __init__(self, titulo):\n        self.titulo = titulo\n\n    def _____(self):\n        return f"Libro: {self.titulo}"\n\nlibro = Libro("Python 101")\nprint(libro)  # Libro: Python 101',
            options: ['__str__', '__repr__', '__print__', '__display__'],
            correct: 0,
            explanation: '__str__ es el método que define la representación en string "amigable" de un objeto. Es lo que se usa cuando se llama print() o str() sobre el objeto.'
          },
          {
            id: 'q-oop2-2-4',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Caja:\n    def __init__(self, peso):\n        self.peso = peso\n\n    def __lt__(self, otra):\n        return self.peso < otra.peso\n\n    def __eq__(self, otra):\n        return self.peso == otra.peso\n\ncajas = [Caja(5), Caja(2), Caja(8), Caja(1)]\ncajas.sort()\nprint([c.peso for c in cajas])',
            options: ['[1, 2, 5, 8]', '[8, 5, 2, 1]', 'Error', '[5, 2, 8, 1]'],
            correct: 0,
            explanation: '__lt__ define el operador <, que es lo que sort() usa para comparar elementos. Las cajas se ordenan de menor a mayor peso: [1, 2, 5, 8].'
          },
          {
            id: 'q-oop2-2-5',
            type: 'true-false',
            difficulty: 1,
            question: 'El método __repr__ está diseñado para dar una representación técnica/debuggable del objeto, mientras que __str__ es para usuarios.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 0,
            explanation: 'Verdadero. __repr__ busca ser una representación no ambigua (idealmente evaluable con eval()), mientras que __str__ busca ser legible para el usuario final.'
          },
          {
            id: 'q-oop2-2-6',
            type: 'multiple-choice',
            difficulty: 2,
            question: '¿Qué método dunder se debe implementar para usar el operador == entre objetos?',
            code: null,
            options: ['__eq__', '__cmp__', '__equals__', '__is__'],
            correct: 0,
            explanation: '__eq__(self, other) define el comportamiento del operador ==. Sin implementarlo, == compara identidad de objetos (misma referencia en memoria).'
          },
          {
            id: 'q-oop2-2-7',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Moneda:\n    def __init__(self, valor):\n        self.valor = valor\n\n    def __str__(self):\n        return f"${self.valor}"\n\n    def __repr__(self):\n        return f"Moneda({self.valor})"\n\nm = Moneda(100)\nprint(str(m))\nprint(repr(m))',
            options: ['$100\\nMoneda(100)', 'Moneda(100)\\nMoneda(100)', '$100\\n$100', 'Error'],
            correct: 0,
            explanation: 'str(m) llama a __str__ que retorna "$100". repr(m) llama a __repr__ que retorna "Moneda(100)". Son representaciones distintas del mismo objeto.'
          }
        ]
      },
      // ---- Lesson 3: Herencia Múltiple y MRO ----
      {
        id: 'oop-avanzado-3',
        name: 'Herencia Múltiple y MRO',
        questions: [
          {
            id: 'q-oop2-3-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Qué es el problema del diamante en herencia múltiple?',
            code: null,
            options: [
              'Cuando una clase hereda de dos clases que a su vez heredan de una misma clase base',
              'Cuando una clase tiene forma de diamante',
              'Cuando hay 4 clases en el programa',
              'Cuando una clase hereda de sí misma'
            ],
            correct: 0,
            explanation: 'El problema del diamante ocurre cuando D hereda de B y C, y ambas heredan de A. Python lo resuelve con el MRO (Method Resolution Order) usando el algoritmo C3.'
          },
          {
            id: 'q-oop2-3-2',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class A:\n    def saludo(self):\n        return "Hola desde A"\n\nclass B(A):\n    def saludo(self):\n        return "Hola desde B"\n\nclass C(A):\n    def saludo(self):\n        return "Hola desde C"\n\nclass D(B, C):\n    pass\n\nd = D()\nprint(d.saludo())',
            options: ['Hola desde B', 'Hola desde A', 'Hola desde C', 'Error'],
            correct: 0,
            explanation: 'El MRO de D es: D -> B -> C -> A. Como D no tiene saludo(), busca en B (siguiente en MRO) y lo encuentra. Por eso retorna "Hola desde B".'
          },
          {
            id: 'q-oop2-3-3',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el código para ver el orden de resolución de métodos de la clase D:',
            code: 'class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass\n\nprint(D._____)',
            options: ['__mro__', '__order__', '__hierarchy__', '__bases__'],
            correct: 0,
            explanation: '__mro__ (Method Resolution Order) muestra el orden en que Python busca métodos y atributos. También se puede usar D.mro() como método.'
          },
          {
            id: 'q-oop2-3-4',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class A:\n    def __init__(self):\n        print("A", end=" ")\n\nclass B(A):\n    def __init__(self):\n        super().__init__()\n        print("B", end=" ")\n\nclass C(A):\n    def __init__(self):\n        super().__init__()\n        print("C", end=" ")\n\nclass D(B, C):\n    def __init__(self):\n        super().__init__()\n        print("D", end=" ")\n\nd = D()',
            options: ['A C B D ', 'D B C A ', 'A B C D ', 'D B A C A '],
            correct: 0,
            explanation: 'Con super() cooperativo, el MRO es D->B->C->A. D llama super().__init__ que va a B, B llama super() que va a C (no A), C llama super() que va a A. Impresión: A C B D.'
          },
          {
            id: 'q-oop2-3-5',
            type: 'true-false',
            difficulty: 2,
            question: 'En Python, super() con herencia múltiple siempre llama al método de la clase padre directa.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 1,
            explanation: 'Falso. super() sigue el MRO (Method Resolution Order), no necesariamente la clase padre directa. Puede saltar a una clase hermana en el orden de resolución.'
          },
          {
            id: 'q-oop2-3-6',
            type: 'multiple-choice',
            difficulty: 2,
            question: '¿Qué algoritmo usa Python para determinar el MRO?',
            code: null,
            options: [
              'Linealización C3',
              'Búsqueda en profundidad (DFS)',
              'Búsqueda en anchura (BFS)',
              'Ordenamiento topológico simple'
            ],
            correct: 0,
            explanation: 'Python usa la linealización C3, que respeta el orden de las bases y garantiza una linealización monotónica. No es simple DFS ni BFS.'
          }
        ]
      },
      // ---- Lesson 4: Clases Abstractas ----
      {
        id: 'oop-avanzado-4',
        name: 'Clases Abstractas',
        questions: [
          {
            id: 'q-oop2-4-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Qué módulo de Python se usa para crear clases abstractas?',
            code: null,
            options: ['abc', 'abstract', 'interface', 'virtual'],
            correct: 0,
            explanation: 'El módulo abc (Abstract Base Classes) proporciona la clase ABC y el decorador @abstractmethod para definir clases abstractas en Python.'
          },
          {
            id: 'q-oop2-4-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'from abc import ABC, abstractmethod\n\nclass Forma(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\ntry:\n    f = Forma()\n    print("Creada")\nexcept TypeError as e:\n    print("Error: no se puede instanciar")',
            options: ['Error: no se puede instanciar', 'Creada', 'None', 'Error de sintaxis'],
            correct: 0,
            explanation: 'No se puede crear una instancia de una clase abstracta directamente. Python lanza TypeError si intentas instanciar una clase que tiene métodos abstractos sin implementar.'
          },
          {
            id: 'q-oop2-4-3',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el código para declarar un método abstracto:',
            code: 'from abc import ABC, abstractmethod\n\nclass Animal(ABC):\n    _____\n    def hacer_sonido(self):\n        pass',
            options: ['@abstractmethod', '@abstract', '@virtual', '@interface'],
            correct: 0,
            explanation: '@abstractmethod es el decorador que marca un método como abstracto. Las subclases están obligadas a implementar este método.'
          },
          {
            id: 'q-oop2-4-4',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'from abc import ABC, abstractmethod\n\nclass Forma(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Circulo(Forma):\n    def __init__(self, radio):\n        self.radio = radio\n\n    def area(self):\n        return 3.14159 * self.radio ** 2\n\nc = Circulo(5)\nprint(round(c.area(), 2))',
            options: ['78.54', 'Error: clase abstracta', '0', '25'],
            correct: 0,
            explanation: 'Circulo implementa el método abstracto area(), por lo que puede ser instanciada. El área es 3.14159 * 25 = 78.53975, redondeado a 78.54.'
          },
          {
            id: 'q-oop2-4-5',
            type: 'true-false',
            difficulty: 2,
            question: 'Si una subclase no implementa todos los métodos abstractos de su clase padre, tampoco podrá ser instanciada.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 0,
            explanation: 'Verdadero. Si una subclase no implementa TODOS los métodos abstractos heredados, Python la considera también abstracta y lanzará TypeError al intentar instanciarla.'
          },
          {
            id: 'q-oop2-4-6',
            type: 'order-code',
            difficulty: 3,
            question: 'Ordena las líneas para crear una clase abstracta y su implementación correctamente:',
            code: null,
            options: [
              'from abc import ABC, abstractmethod',
              'class Vehiculo(ABC):',
              '    @abstractmethod',
              '    def acelerar(self):',
              '        pass',
              'class Auto(Vehiculo):',
              '    def acelerar(self):',
              '        return "Vroom!"'
            ],
            correct: [0, 1, 2, 3, 4, 5, 6, 7],
            explanation: 'Primero se importa abc, luego se define la clase abstracta Vehiculo con su método abstracto, y finalmente la clase concreta Auto que implementa el método.'
          }
        ]
      }
    ]
  },

  // ============================================================
  // MODULE 3: Estructuras de Datos Built-in
  // ============================================================
  {
    id: 'estructuras-builtin',
    name: 'Estructuras de Datos Built-in',
    icon: '📦',
    description: 'Tuplas, NamedTuples, sets, diccionarios avanzados, y el uso de *args y **kwargs.',
    color: '#FF9600',
    lessons: [
      // ---- Lesson 1: Tuplas y NamedTuples ----
      {
        id: 'estructuras-builtin-1',
        name: 'Tuplas y NamedTuples',
        questions: [
          {
            id: 'q-estr1-1-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Cuál es la principal característica de una tupla en Python?',
            code: null,
            options: [
              'Es inmutable: no se puede modificar después de crearla',
              'Es más rápida que un diccionario',
              'Solo puede contener números',
              'Puede tener un máximo de 10 elementos'
            ],
            correct: 0,
            explanation: 'Las tuplas son inmutables: una vez creadas, no se pueden agregar, eliminar o modificar sus elementos. Esto las diferencia de las listas.'
          },
          {
            id: 'q-estr1-1-2',
            type: 'code-output',
            difficulty: 1,
            question: '¿Cuál es el output del siguiente código?',
            code: 'coordenada = (3, 7)\nx, y = coordenada\nprint(f"x={x}, y={y}")',
            options: ['x=3, y=7', 'x=(3, 7), y=(3, 7)', 'Error', 'x=7, y=3'],
            correct: 0,
            explanation: 'El unpacking de tuplas permite asignar cada elemento a una variable. x toma el valor 3 e y toma el valor 7.'
          },
          {
            id: 'q-estr1-1-3',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'from collections import namedtuple\n\nPunto = namedtuple("Punto", ["x", "y"])\np = Punto(5, 10)\nprint(p.x + p.y)',
            options: ['15', '(5, 10)', 'Error', '510'],
            correct: 0,
            explanation: 'namedtuple crea una tupla con campos nombrados. p.x es 5 y p.y es 10, su suma es 15.'
          },
          {
            id: 'q-estr1-1-4',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el código para crear un namedtuple correctamente:',
            code: 'from collections import namedtuple\n\nEstudiante = _____(\"Estudiante\", [\"nombre\", \"edad\", \"carrera\"])\ne = Estudiante("María", 21, "Computación")\nprint(e.nombre)',
            options: ['namedtuple', 'NamedTuple', 'tuple', 'named_tuple'],
            correct: 0,
            explanation: 'collections.namedtuple es una función factory que crea una nueva clase de tupla con campos nombrados. Se llama con el nombre de la clase y una lista de campos.'
          },
          {
            id: 'q-estr1-1-5',
            type: 'true-false',
            difficulty: 2,
            question: 'Un namedtuple puede ser usado como clave de un diccionario porque es inmutable y hasheable.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 0,
            explanation: 'Verdadero. Al igual que las tuplas regulares, los namedtuples son inmutables y hasheables, lo que los hace válidos como claves de diccionarios y elementos de sets.'
          },
          {
            id: 'q-estr1-1-6',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'numeros = (1, 2, 3, 4, 5)\nprimero, *medio, ultimo = numeros\nprint(medio)',
            options: ['[2, 3, 4]', '(2, 3, 4)', '2, 3, 4', 'Error'],
            correct: 0,
            explanation: 'El operador * en unpacking captura los elementos restantes como una lista. primero=1, medio=[2,3,4], ultimo=5. Nota: medio es una lista, no una tupla.'
          },
      {
      "id": "builtin-dev-practica",
      "name": "✍️ Desarrollo: Práctica de Colecciones y Args/Kwargs",
      "questions": [
            {
                  "id": "q-builtin-dev-p1",
                  "type": "write-code",
                  "difficulty": 2,
                  "question": "Escribe la definición de una namedtuple llamada 'Punto' con los campos 'x' e 'y':",
                  "code": "from collections import namedtuple\n# Escribe aquí la asignación a la variable Punto\n",
                  "placeholder": "Punto = namedtuple(...)",
                  "hints": [
                        "El primer argumento es el nombre del typename: 'Punto'.",
                        "El segundo argumento puede ser una lista con los campos ['x', 'y'] o el string 'x y'."
                  ],
                  "acceptedAnswers": [
                        "Punto = namedtuple('Punto', ['x', 'y'])",
                        "Punto = namedtuple('Punto', ['x', 'y'])",
                        "Punto = namedtuple('Punto', 'x y')",
                        "Punto = namedtuple(\"Punto\", [\"x\", \"y\"])",
                        "Punto = namedtuple(\"Punto\", \"x y\")"
                  ],
                  "explanation": "namedtuple('TypeName', ['field1', 'field2']) crea una subclase de tupla accesible por nombre de atributo además de índice."
            },
            {
                  "id": "q-builtin-dev-p2",
                  "type": "write-code",
                  "difficulty": 2,
                  "question": "Escribe la función de fábrica que se le pasa a defaultdict para que los valores por defecto sean listas vacías:",
                  "code": "from collections import defaultdict\nd = defaultdict(_____) ",
                  "placeholder": "list",
                  "hints": [
                        "Pasa la clase/función constructora de listas, sin paréntesis."
                  ],
                  "acceptedAnswers": [
                        "list"
                  ],
                  "explanation": "defaultdict(list) llama a list() cada vez que se accede a una clave inexistente, inicializándola con una lista vacía []."
            }
      ]
},
      {
      "id": "builtin-dev-puc",
      "name": "🎓 Desarrollo Nivel Prueba PUC: Manipulación Avanzada de Estructuras",
      "questions": [
            {
                  "id": "q-builtin-dev-puc1",
                  "type": "write-code",
                  "difficulty": 3,
                  "question": "[IIC2233 I1] Escribe la expresión de desempaquetado para pasar un diccionario 'parametros' como keyword arguments a la función procesar():",
                  "code": "parametros = {'modo': 'rapido', 'intentos': 3}\n# Invoca procesar pasando el diccionario desempaquetado\n_____",
                  "placeholder": "procesar(...) ",
                  "hints": [
                        "Usa el operador de doble asterisco (**).",
                        "procesar(**parametros)"
                  ],
                  "acceptedAnswers": [
                        "procesar(**parametros)",
                        "procesar( **parametros )"
                  ],
                  "explanation": "El operador '**' desempaqueta un diccionario transformando sus pares clave-valor en argumentos por palabra clave (kwargs) para la función receptora."
            }
      ]
}
    ]
      },
      // ---- Lesson 2: Sets y Diccionarios ----
      {
        id: 'estructuras-builtin-2',
        name: 'Sets y Diccionarios',
        questions: [
          {
            id: 'q-estr1-2-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Qué operación de conjuntos retorna los elementos que están en ambos sets?',
            code: null,
            options: [
              'Intersección (& o .intersection())',
              'Unión (| o .union())',
              'Diferencia (- o .difference())',
              'Diferencia simétrica (^ o .symmetric_difference())'
            ],
            correct: 0,
            explanation: 'La intersección retorna los elementos comunes a ambos conjuntos. Se puede usar el operador & o el método .intersection().'
          },
          {
            id: 'q-estr1-2-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a & b)\nprint(a | b)',
            options: ['{3, 4}\\n{1, 2, 3, 4, 5, 6}', '{1, 2}\\n{5, 6}', '{1, 2, 3, 4, 5, 6}\\n{3, 4}', 'Error'],
            correct: 0,
            explanation: 'a & b es la intersección: elementos comunes {3, 4}. a | b es la unión: todos los elementos {1, 2, 3, 4, 5, 6}.'
          },
          {
            id: 'q-estr1-2-3',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'from collections import Counter\n\npalabras = ["python", "java", "python", "c", "python", "java"]\nconteo = Counter(palabras)\nprint(conteo.most_common(1))',
            options: ["[('python', 3)]", "{'python': 3}", "('python', 3)", "['python']"],
            correct: 0,
            explanation: "Counter cuenta las ocurrencias de cada elemento. most_common(1) retorna una lista con la tupla del elemento más frecuente: [('python', 3)]."
          },
          {
            id: 'q-estr1-2-4',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el código para usar un defaultdict que agrupe estudiantes por carrera:',
            code: 'from collections import _____\n\nestudiantes = defaultdict(list)\nestudiantes["Computación"].append("Ana")\nestudiantes["Matemáticas"].append("Pedro")\nprint(dict(estudiantes))',
            options: ['defaultdict', 'DefaultDict', 'default_dict', 'ordered_dict'],
            correct: 0,
            explanation: 'defaultdict es un diccionario que crea automáticamente un valor por defecto cuando se accede a una clave inexistente. Con list como factory, cada clave nueva inicia con una lista vacía.'
          },
          {
            id: 'q-estr1-2-5',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'from collections import defaultdict\n\ndd = defaultdict(int)\npalabra = "banana"\nfor letra in palabra:\n    dd[letra] += 1\nprint(dict(dd))',
            options: [
              "{'b': 1, 'a': 3, 'n': 2}",
              "{'banana': 1}",
              "{'b': 1, 'a': 1, 'n': 1}",
              "Error: clave no existe"
            ],
            correct: 0,
            explanation: "defaultdict(int) inicializa claves nuevas con 0. Al iterar 'banana', cuenta cada letra: b=1, a=3, n=2."
          },
          {
            id: 'q-estr1-2-6',
            type: 'true-false',
            difficulty: 1,
            question: 'Un set en Python puede contener elementos duplicados.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 1,
            explanation: 'Falso. Los sets solo contienen elementos únicos. Si intentas agregar un duplicado, simplemente se ignora.'
          }
        ]
      },
      // ---- Lesson 3: Args y Kwargs ----
      {
        id: 'estructuras-builtin-3',
        name: 'Args y Kwargs',
        questions: [
          {
            id: 'q-estr1-3-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Qué tipo de dato recibe *args dentro de una función?',
            code: null,
            options: [
              'Una tupla con los argumentos posicionales extras',
              'Una lista con todos los argumentos',
              'Un diccionario con los argumentos',
              'Un set con los argumentos'
            ],
            correct: 0,
            explanation: '*args recoge todos los argumentos posicionales extras como una tupla. El nombre "args" es convención, lo importante es el asterisco *.'
          },
          {
            id: 'q-estr1-3-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'def sumar(*args):\n    return sum(args)\n\nprint(sumar(1, 2, 3, 4, 5))',
            options: ['15', '(1, 2, 3, 4, 5)', 'Error', '12345'],
            correct: 0,
            explanation: '*args recibe (1, 2, 3, 4, 5) como tupla. sum() suma todos los elementos: 1+2+3+4+5 = 15.'
          },
          {
            id: 'q-estr1-3-3',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'def presentar(**kwargs):\n    for clave, valor in kwargs.items():\n        print(f"{clave}: {valor}", end="; ")\n\npresentar(nombre="Ana", edad=25, carrera="CS")',
            options: [
              'nombre: Ana; edad: 25; carrera: CS; ',
              "{'nombre': 'Ana', 'edad': 25, 'carrera': 'CS'}",
              'Error',
              'Ana 25 CS'
            ],
            correct: 0,
            explanation: '**kwargs recibe los argumentos nombrados como diccionario. Se itera con .items() obteniendo pares clave-valor que se imprimen formateados.'
          },
          {
            id: 'q-estr1-3-4',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el código para desempaquetar la lista como argumentos de la función:',
            code: 'def multiplicar(a, b, c):\n    return a * b * c\n\nnumeros = [2, 3, 4]\nresultado = multiplicar(_____ numeros)\nprint(resultado)  # 24',
            options: ['*', '**', '&', '...'],
            correct: 0,
            explanation: 'El operador * desempaqueta una lista o tupla como argumentos posicionales. multiplicar(*numeros) equivale a multiplicar(2, 3, 4).'
          },
          {
            id: 'q-estr1-3-5',
            type: 'true-false',
            difficulty: 1,
            question: 'En la definición de una función, **kwargs debe ir antes de *args.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 1,
            explanation: 'Falso. El orden correcto es: parámetros normales, *args, parámetros con valor por defecto, **kwargs. **kwargs siempre va al final.'
          },
          {
            id: 'q-estr1-3-6',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'def func(a, b, *args, **kwargs):\n    print(a, b, args, kwargs)\n\nfunc(1, 2, 3, 4, x=10, y=20)',
            options: [
              "1 2 (3, 4) {'x': 10, 'y': 20}",
              "1 2 [3, 4] {'x': 10, 'y': 20}",
              '1 2 3 4 10 20',
              'Error'
            ],
            correct: 0,
            explanation: "a=1, b=2 son los primeros posicionales. args=(3,4) captura los extras posicionales como tupla. kwargs={'x':10, 'y':20} captura los nombrados como diccionario."
          },
          {
            id: 'q-estr1-3-7',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'def saludar(nombre, saludo="Hola"):\n    return f"{saludo}, {nombre}!"\n\ndatos = {"nombre": "Carlos", "saludo": "Buenos días"}\nprint(saludar(**datos))',
            options: ['Buenos días, Carlos!', 'Hola, Carlos!', 'Error', "{'nombre': 'Carlos'}"],
            correct: 0,
            explanation: '** desempaqueta el diccionario como argumentos nombrados. Equivale a saludar(nombre="Carlos", saludo="Buenos días"), resultando "Buenos días, Carlos!".'
          }
        ]
      }
    ]
  },

  // ============================================================
  // MODULE 4: Estructuras Nodales
  // ============================================================
  {
    id: 'estructuras-nodales',
    name: 'Estructuras Nodales',
    icon: '🔗',
    description: 'Nodos, listas ligadas, pilas, colas y árboles implementados con nodos.',
    color: '#CE82FF',
    lessons: [
      // ---- Lesson 1: Nodos y Listas Ligadas ----
      {
        id: 'estructuras-nodales-1',
        name: 'Nodos y Listas Ligadas',
        questions: [
          {
            id: 'q-nod-1-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Qué dos componentes principales tiene un nodo en una lista ligada simple?',
            code: null,
            options: [
              'Un valor (dato) y una referencia al siguiente nodo',
              'Un valor y un índice numérico',
              'Dos valores y un puntero',
              'Un valor y una referencia al nodo anterior'
            ],
            correct: 0,
            explanation: 'En una lista ligada simple, cada nodo contiene un valor (dato almacenado) y una referencia (puntero) al siguiente nodo. El último nodo apunta a None.'
          },
          {
            id: 'q-nod-1-2',
            type: 'fill-code',
            difficulty: 1,
            question: 'Completa el código para definir un nodo básico:',
            code: 'class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.siguiente = _____',
            options: ['None', '0', '""', 'self'],
            correct: 0,
            explanation: 'Al crear un nodo, self.siguiente se inicializa en None porque aún no está conectado a otro nodo. None indica el fin de la lista.'
          },
          {
            id: 'q-nod-1-3',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.siguiente = None\n\nn1 = Nodo(10)\nn2 = Nodo(20)\nn3 = Nodo(30)\nn1.siguiente = n2\nn2.siguiente = n3\n\nactual = n1\nwhile actual:\n    print(actual.valor, end=" ")\n    actual = actual.siguiente',
            options: ['10 20 30 ', '10', '30 20 10 ', 'Error'],
            correct: 0,
            explanation: 'Se crea una lista ligada: 10 -> 20 -> 30 -> None. El while recorre desde n1, imprimiendo cada valor y avanzando al siguiente hasta llegar a None.'
          },
          {
            id: 'q-nod-1-4',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.siguiente = None\n\nclass ListaLigada:\n    def __init__(self):\n        self.cabeza = None\n\n    def agregar_inicio(self, valor):\n        nuevo = Nodo(valor)\n        nuevo.siguiente = self.cabeza\n        self.cabeza = nuevo\n\nlista = ListaLigada()\nlista.agregar_inicio(3)\nlista.agregar_inicio(2)\nlista.agregar_inicio(1)\n\nactual = lista.cabeza\nwhile actual:\n    print(actual.valor, end=" ")\n    actual = actual.siguiente',
            options: ['1 2 3 ', '3 2 1 ', '1', '3'],
            correct: 0,
            explanation: 'agregar_inicio inserta al principio. Se agrega 3, luego 2 al inicio (2->3), luego 1 al inicio (1->2->3). Al recorrer desde la cabeza: 1 2 3.'
          },
          {
            id: 'q-nod-1-5',
            type: 'true-false',
            difficulty: 2,
            question: 'En una lista ligada, acceder al elemento n-ésimo tiene complejidad O(1), igual que en una lista de Python.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 1,
            explanation: 'Falso. En una lista ligada, acceder al elemento n-ésimo requiere recorrer n nodos (O(n)). En una lista de Python (array dinámico), el acceso por índice es O(1).'
          },
          {
            id: 'q-nod-1-6',
            type: 'multiple-choice',
            difficulty: 2,
            question: '¿Cuál es la ventaja principal de una lista ligada sobre un arreglo (lista de Python)?',
            code: null,
            options: [
              'Inserción y eliminación al inicio en O(1) sin reorganizar elementos',
              'Acceso aleatorio más rápido',
              'Usa menos memoria',
              'Es más fácil de ordenar'
            ],
            correct: 0,
            explanation: 'Las listas ligadas permiten insertar y eliminar al inicio en O(1) simplemente cambiando punteros, sin necesidad de mover otros elementos como en un arreglo.'
          },
      {
      "id": "nodales-dev-practica",
      "name": "✍️ Desarrollo: Práctica de Listas Ligadas y Nodos",
      "questions": [
            {
                  "id": "q-nodal-dev-p1",
                  "type": "write-code",
                  "difficulty": 2,
                  "question": "Completa el avance del puntero para recorrer una lista ligada en un bucle while:",
                  "code": "actual = self.head\nwhile actual is not None:\n    print(actual.valor)\n    # Avanza al siguiente nodo\n    _____",
                  "placeholder": "actual = ...",
                  "hints": [
                        "Asigna a 'actual' su atributo 'siguiente'."
                  ],
                  "acceptedAnswers": [
                        "actual = actual.siguiente",
                        "actual = actual.next"
                  ],
                  "explanation": "Para avanzar en una estructura enlazada, se reasigna la variable del puntero al nodo referenciado por su atributo .siguiente hasta encontrar None."
            }
      ]
},
      {
      "id": "nodales-dev-puc",
      "name": "🎓 Desarrollo Nivel Prueba PUC: Pilas, Colas y Árboles",
      "questions": [
            {
                  "id": "q-nodal-dev-puc1",
                  "type": "write-code",
                  "difficulty": 3,
                  "question": "[IIC2233 I2] En una pila (LIFO) donde self.top es el nodo superior, implementa la línea para desapilar (pop) y actualizar el tope:",
                  "code": "def pop(self):\n    if self.top is None:\n        raise IndexError('Pila vacía')\n    valor = self.top.valor\n    # Actualiza self.top al siguiente nodo\n    _____\n    return valor",
                  "placeholder": "self.top = ...",
                  "hints": [
                        "El nuevo tope es el nodo siguiente al actual tope."
                  ],
                  "acceptedAnswers": [
                        "self.top = self.top.siguiente",
                        "self.top = self.top.next"
                  ],
                  "explanation": "Desapilar en O(1) consiste en guardar el valor del tope y mover el puntero self.top a self.top.siguiente."
            }
      ]
}
    ]
      },
      // ---- Lesson 2: Pilas (Stacks) ----
      {
        id: 'estructuras-nodales-2',
        name: 'Pilas (Stacks)',
        questions: [
          {
            id: 'q-nod-2-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Qué principio sigue una pila (stack)?',
            code: null,
            options: [
              'LIFO: Last In, First Out (el último en entrar es el primero en salir)',
              'FIFO: First In, First Out (el primero en entrar es el primero en salir)',
              'LILO: Last In, Last Out',
              'Acceso aleatorio'
            ],
            correct: 0,
            explanation: 'Una pila funciona con el principio LIFO: el último elemento que se agrega (push) es el primero que se retira (pop). Como una pila de platos.'
          },
          {
            id: 'q-nod-2-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.siguiente = None\n\nclass Pila:\n    def __init__(self):\n        self.tope = None\n\n    def push(self, valor):\n        nuevo = Nodo(valor)\n        nuevo.siguiente = self.tope\n        self.tope = nuevo\n\n    def pop(self):\n        if self.tope is None:\n            return None\n        valor = self.tope.valor\n        self.tope = self.tope.siguiente\n        return valor\n\np = Pila()\np.push(1)\np.push(2)\np.push(3)\nprint(p.pop(), p.pop(), p.pop())',
            options: ['3 2 1', '1 2 3', '3 3 3', 'Error'],
            correct: 0,
            explanation: 'LIFO: se apilan 1, 2, 3. Al hacer pop, sale primero el 3 (último en entrar), luego 2, luego 1.'
          },
          {
            id: 'q-nod-2-3',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el método peek que retorna el elemento del tope sin eliminarlo:',
            code: 'class Pila:\n    def __init__(self):\n        self.tope = None\n\n    def peek(self):\n        if self.tope is None:\n            return None\n        return self.tope._____',
            options: ['valor', 'siguiente', 'tope', 'data'],
            correct: 0,
            explanation: 'peek() retorna el valor del nodo en el tope sin modificar la pila. self.tope.valor accede al dato almacenado en el nodo superior.'
          },
          {
            id: 'q-nod-2-4',
            type: 'true-false',
            difficulty: 1,
            question: 'La operación push en una pila implementada con nodos tiene complejidad O(1).',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 0,
            explanation: 'Verdadero. Push solo crea un nuevo nodo y lo enlaza al tope actual. No necesita recorrer la estructura, por lo que es O(1).'
          },
          {
            id: 'q-nod-2-5',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código que verifica paréntesis balanceados?',
            code: 'def balanceados(texto):\n    pila = []\n    for char in texto:\n        if char == "(":\n            pila.append(char)\n        elif char == ")":\n            if not pila:\n                return False\n            pila.pop()\n    return len(pila) == 0\n\nprint(balanceados("((a+b)*(c-d))"))\nprint(balanceados("((a+b)"))',
            options: ['True\\nFalse', 'True\\nTrue', 'False\\nFalse', 'False\\nTrue'],
            correct: 0,
            explanation: '"((a+b)*(c-d))": cada ( se apila y cada ) desapila. Al final la pila está vacía → True. "((a+b)": quedan paréntesis sin cerrar → False.'
          },
          {
            id: 'q-nod-2-6',
            type: 'multiple-choice',
            difficulty: 2,
            question: '¿Cuál es un uso clásico de las pilas en la vida real de la programación?',
            code: null,
            options: [
              'El call stack (pila de llamadas) que administra las funciones en ejecución',
              'Manejar solicitudes HTTP en un servidor web',
              'Ordenar datos en una base de datos',
              'Renderizar gráficos en pantalla'
            ],
            correct: 0,
            explanation: 'El call stack usa una pila: cada llamada a función se apila y al retornar se desapila. También se usan en deshacer/rehacer (Ctrl+Z) y evaluación de expresiones.'
          }
        ]
      },
      // ---- Lesson 3: Colas (Queues) ----
      {
        id: 'estructuras-nodales-3',
        name: 'Colas (Queues)',
        questions: [
          {
            id: 'q-nod-3-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Qué principio sigue una cola (queue)?',
            code: null,
            options: [
              'FIFO: First In, First Out (el primero en entrar es el primero en salir)',
              'LIFO: Last In, First Out',
              'LILO: Last In, Last Out',
              'Prioridad por valor'
            ],
            correct: 0,
            explanation: 'Una cola funciona con el principio FIFO: el primer elemento que se agrega (enqueue) es el primero que se retira (dequeue). Como una fila en el supermercado.'
          },
          {
            id: 'q-nod-3-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.siguiente = None\n\nclass Cola:\n    def __init__(self):\n        self.frente = None\n        self.final = None\n\n    def enqueue(self, valor):\n        nuevo = Nodo(valor)\n        if self.final is None:\n            self.frente = self.final = nuevo\n        else:\n            self.final.siguiente = nuevo\n            self.final = nuevo\n\n    def dequeue(self):\n        if self.frente is None:\n            return None\n        valor = self.frente.valor\n        self.frente = self.frente.siguiente\n        if self.frente is None:\n            self.final = None\n        return valor\n\nc = Cola()\nc.enqueue("A")\nc.enqueue("B")\nc.enqueue("C")\nprint(c.dequeue(), c.dequeue())',
            options: ['A B', 'C B', 'A C', 'C A'],
            correct: 0,
            explanation: 'FIFO: se encolan A, B, C en ese orden. dequeue retira desde el frente: primero A, luego B.'
          },
          {
            id: 'q-nod-3-3',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el código para encolar un nuevo elemento al final:',
            code: 'class Cola:\n    def enqueue(self, valor):\n        nuevo = Nodo(valor)\n        if self.final is None:\n            self.frente = self.final = nuevo\n        else:\n            self.final.siguiente = nuevo\n            self._____ = nuevo',
            options: ['final', 'frente', 'siguiente', 'cabeza'],
            correct: 0,
            explanation: 'Al encolar, el nuevo nodo se enlaza después del final actual y luego self.final se actualiza para apuntar al nuevo nodo.'
          },
          {
            id: 'q-nod-3-4',
            type: 'true-false',
            difficulty: 1,
            question: 'En una cola con punteros al frente y al final, tanto enqueue como dequeue son O(1).',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 0,
            explanation: 'Verdadero. Con punteros al frente y al final, enqueue agrega al final en O(1) y dequeue retira del frente en O(1), sin necesidad de recorrer la estructura.'
          },
          {
            id: 'q-nod-3-5',
            type: 'multiple-choice',
            difficulty: 2,
            question: '¿Cuál es la diferencia principal entre una pila y una cola?',
            code: null,
            options: [
              'La pila es LIFO (último en salir) y la cola es FIFO (primero en salir)',
              'La pila es más rápida que la cola',
              'La cola usa más memoria que la pila',
              'La pila puede guardar más elementos'
            ],
            correct: 0,
            explanation: 'La diferencia fundamental es el orden de salida. Pila (LIFO): sale el último que entró. Cola (FIFO): sale el primero que entró.'
          },
          {
            id: 'q-nod-3-6',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código que simula la cola de un banco?',
            code: 'from collections import deque\n\ncola = deque()\ncola.append("Cliente 1")\ncola.append("Cliente 2")\ncola.append("Cliente 3")\n\natendido = cola.popleft()\nprint(f"Atendido: {atendido}")\nprint(f"Siguiente: {cola[0]}")',
            options: [
              'Atendido: Cliente 1\\nSiguiente: Cliente 2',
              'Atendido: Cliente 3\\nSiguiente: Cliente 2',
              'Atendido: Cliente 1\\nSiguiente: Cliente 3',
              'Error'
            ],
            correct: 0,
            explanation: 'deque funciona como cola eficiente. append agrega al final, popleft retira del inicio (FIFO). Se atiende al Cliente 1, el siguiente es Cliente 2.'
          }
        ]
      },
      // ---- Lesson 4: Árboles ----
      {
        id: 'estructuras-nodales-4',
        name: 'Árboles',
        questions: [
          {
            id: 'q-nod-4-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Cuántos hijos puede tener cada nodo en un árbol binario como máximo?',
            code: null,
            options: ['2', '1', '3', 'Ilimitados'],
            correct: 0,
            explanation: 'Un árbol binario es aquel donde cada nodo puede tener a lo más 2 hijos: hijo izquierdo e hijo derecho.'
          },
          {
            id: 'q-nod-4-2',
            type: 'fill-code',
            difficulty: 1,
            question: 'Completa la definición del nodo de un árbol binario:',
            code: 'class NodoArbol:\n    def __init__(self, valor):\n        self.valor = valor\n        self.izquierdo = None\n        self._____ = None',
            options: ['derecho', 'siguiente', 'hijo', 'rama'],
            correct: 0,
            explanation: 'Un nodo de árbol binario tiene tres atributos: valor, izquierdo (hijo izquierdo) y derecho (hijo derecho). Ambos hijos inician en None.'
          },
          {
            id: 'q-nod-4-3',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente recorrido inorder?',
            code: 'class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.izq = None\n        self.der = None\n\ndef inorder(nodo):\n    if nodo is None:\n        return\n    inorder(nodo.izq)\n    print(nodo.valor, end=" ")\n    inorder(nodo.der)\n\n#       4\n#      / \\\n#     2   6\n#    / \\\n#   1   3\nraiz = Nodo(4)\nraiz.izq = Nodo(2)\nraiz.der = Nodo(6)\nraiz.izq.izq = Nodo(1)\nraiz.izq.der = Nodo(3)\ninorder(raiz)',
            options: ['1 2 3 4 6 ', '4 2 1 3 6 ', '1 3 2 6 4 ', '4 2 6 1 3 '],
            correct: 0,
            explanation: 'Inorder visita: izquierdo → nodo → derecho. Recorre: 1, 2, 3, 4, 6. En un BST, inorder da los valores ordenados.'
          },
          {
            id: 'q-nod-4-4',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente recorrido preorder?',
            code: 'class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.izq = None\n        self.der = None\n\ndef preorder(nodo):\n    if nodo is None:\n        return\n    print(nodo.valor, end=" ")\n    preorder(nodo.izq)\n    preorder(nodo.der)\n\n#       4\n#      / \\\n#     2   6\n#    / \\\n#   1   3\nraiz = Nodo(4)\nraiz.izq = Nodo(2)\nraiz.der = Nodo(6)\nraiz.izq.izq = Nodo(1)\nraiz.izq.der = Nodo(3)\npreorder(raiz)',
            options: ['4 2 1 3 6 ', '1 2 3 4 6 ', '1 3 2 6 4 ', '4 2 6 1 3 '],
            correct: 0,
            explanation: 'Preorder visita: nodo → izquierdo → derecho. Empieza en 4, baja a 2, luego a 1, sube a 3, y finalmente 6.'
          },
          {
            id: 'q-nod-4-5',
            type: 'multiple-choice',
            difficulty: 2,
            question: '¿Cuál es el orden de visita en un recorrido postorder?',
            code: null,
            options: [
              'Izquierdo → Derecho → Nodo',
              'Nodo → Izquierdo → Derecho',
              'Izquierdo → Nodo → Derecho',
              'Derecho → Izquierdo → Nodo'
            ],
            correct: 0,
            explanation: 'Postorder visita: izquierdo → derecho → nodo. El nodo se visita después de sus hijos. Se usa comúnmente para eliminar árboles o evaluar expresiones.'
          },
          {
            id: 'q-nod-4-6',
            type: 'true-false',
            difficulty: 2,
            question: 'En un árbol binario de búsqueda (BST), todos los valores del subárbol izquierdo son menores que la raíz.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 0,
            explanation: 'Verdadero. En un BST, para cada nodo: todos los valores en su subárbol izquierdo son menores, y todos los valores en su subárbol derecho son mayores.'
          },
          {
            id: 'q-nod-4-7',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código que calcula la altura de un árbol?',
            code: 'class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.izq = None\n        self.der = None\n\ndef altura(nodo):\n    if nodo is None:\n        return 0\n    return 1 + max(altura(nodo.izq), altura(nodo.der))\n\n#       1\n#      / \\\n#     2   3\n#    /\n#   4\nraiz = Nodo(1)\nraiz.izq = Nodo(2)\nraiz.der = Nodo(3)\nraiz.izq.izq = Nodo(4)\nprint(altura(raiz))',
            options: ['3', '4', '2', '1'],
            correct: 0,
            explanation: 'La altura se calcula recursivamente: altura = 1 + max(izq, der). Rama más larga: 1→2→4 = 3 niveles. Entonces la altura es 3.'
          }
        ]
      }
    ]
  },

  // ============================================================
  // MODULE 5: Excepciones
  // ============================================================
  {
    id: 'excepciones',
    name: 'Excepciones',
    icon: '⚠️',
    description: 'Manejo de errores con try/except, tipos de excepciones y creación de excepciones personalizadas.',
    color: '#FF4B4B',
    lessons: [
      // ---- Lesson 1: Try/Except ----
      {
        id: 'excepciones-1',
        name: 'Try/Except',
        questions: [
          {
            id: 'q-exc-1-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Cuál es el propósito del bloque try/except en Python?',
            code: null,
            options: [
              'Capturar y manejar errores que ocurran durante la ejecución',
              'Hacer el código más rápido',
              'Prevenir errores de sintaxis',
              'Definir funciones seguras'
            ],
            correct: 0,
            explanation: 'try/except permite capturar excepciones (errores en tiempo de ejecución) y manejarlas de forma controlada, evitando que el programa se detenga abruptamente.'
          },
          {
            id: 'q-exc-1-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'try:\n    x = 10 / 0\n    print("Éxito")\nexcept ZeroDivisionError:\n    print("Error: división por cero")\nfinally:\n    print("Fin")',
            options: ['Error: división por cero\\nFin', 'Éxito\\nFin', 'Error: división por cero', 'Fin'],
            correct: 0,
            explanation: '10/0 lanza ZeroDivisionError, que es capturada por except. "Éxito" nunca se imprime. finally siempre se ejecuta, sin importar si hubo error o no.'
          },
          {
            id: 'q-exc-1-3',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'try:\n    x = int("42")\n    print("Convertido:", x)\nexcept ValueError:\n    print("Error de valor")\nelse:\n    print("Sin errores")\nfinally:\n    print("Listo")',
            options: ['Convertido: 42\\nSin errores\\nListo', 'Convertido: 42\\nListo', 'Sin errores\\nListo', 'Error de valor\\nListo'],
            correct: 0,
            explanation: 'int("42") se ejecuta sin error. Se imprime "Convertido: 42". El bloque else se ejecuta porque NO hubo excepción. finally siempre se ejecuta.'
          },
          {
            id: 'q-exc-1-4',
            type: 'fill-code',
            difficulty: 1,
            question: 'Completa el código para capturar una excepción de valor:',
            code: 'try:\n    numero = int("abc")\nexcept _____:\n    print("No se pudo convertir a número")',
            options: ['ValueError', 'TypeError', 'SyntaxError', 'RuntimeError'],
            correct: 0,
            explanation: 'int("abc") lanza ValueError porque "abc" no es un número válido. ValueError se usa cuando una función recibe un argumento con el tipo correcto pero valor inapropiado.'
          },
          {
            id: 'q-exc-1-5',
            type: 'true-false',
            difficulty: 2,
            question: 'El bloque else en try/except/else se ejecuta solo cuando NO se produjo ninguna excepción en el bloque try.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 0,
            explanation: 'Verdadero. El bloque else se ejecuta únicamente si el bloque try completó sin lanzar ninguna excepción. Es útil para código que debe ejecutarse solo si todo salió bien.'
          },
          {
            id: 'q-exc-1-6',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'def dividir(a, b):\n    try:\n        resultado = a / b\n    except ZeroDivisionError:\n        return "Error: div/0"\n    except TypeError:\n        return "Error: tipo inválido"\n    else:\n        return resultado\n    finally:\n        print("Operación terminada")\n\nprint(dividir(10, 2))\nprint(dividir(10, 0))',
            options: [
              'Operación terminada\\n5.0\\nOperación terminada\\nError: div/0',
              '5.0\\nError: div/0',
              'Operación terminada\\n5.0\\nError: div/0',
              '5.0\\nOperación terminada\\nError: div/0\\nOperación terminada'
            ],
            correct: 0,
            explanation: 'finally se ejecuta ANTES de que return entregue el valor. Primera llamada: imprime "Operación terminada", luego retorna 5.0. Segunda: imprime "Operación terminada", luego retorna el error.'
          },
      {
      "id": "excepciones-dev-practica",
      "name": "✍️ Desarrollo: Práctica de Manejo de Errores",
      "questions": [
            {
                  "id": "q-exc-dev-p1",
                  "type": "write-code",
                  "difficulty": 2,
                  "question": "Escribe la sentencia para levantar manualmente una excepción ValueError con el mensaje 'Valor inválido':",
                  "code": null,
                  "placeholder": "raise ...",
                  "hints": [
                        "Usa la keyword 'raise'.",
                        "Instancia ValueError('Valor inválido')."
                  ],
                  "acceptedAnswers": [
                        "raise ValueError('Valor inválido')",
                        "raise ValueError(\"Valor inválido\")",
                        "raise ValueError('Valor invalido')",
                        "raise ValueError(\"Valor invalido\")"
                  ],
                  "explanation": "En Python, las excepciones se disparan utilizando la sentencia 'raise' seguida de una instancia de la clase de excepción."
            }
      ]
},
      {
      "id": "excepciones-dev-puc",
      "name": "🎓 Desarrollo Nivel Prueba PUC: Excepciones Custom y Bloques Robustos",
      "questions": [
            {
                  "id": "q-exc-dev-puc1",
                  "type": "write-code",
                  "difficulty": 3,
                  "question": "[IIC2233 I2] Define la clase de excepción personalizada 'SaldoInsuficienteError' que hereda de la clase base correspondiente:",
                  "code": "# Define la clase en una sola línea\n_____",
                  "placeholder": "class SaldoInsuficienteError(...): pass",
                  "hints": [
                        "Toda excepción personalizada debe heredar de 'Exception'.",
                        "Puedes usar pass en el cuerpo."
                  ],
                  "acceptedAnswers": [
                        "class SaldoInsuficienteError(Exception): pass",
                        "class SaldoInsuficienteError(Exception):\n    pass",
                        "class SaldoInsuficienteError(Exception):pass"
                  ],
                  "explanation": "En las interrogaciones de IIC2233 es obligatorio que las excepciones propias hereden de 'Exception' (o subclases estándar), nunca de 'BaseException'."
            }
      ]
}
    ]
      },
      // ---- Lesson 2: Tipos de Excepciones ----
      {
        id: 'excepciones-2',
        name: 'Tipos de Excepciones',
        questions: [
          {
            id: 'q-exc-2-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Qué excepción se lanza al intentar acceder a un índice que no existe en una lista?',
            code: null,
            options: ['IndexError', 'KeyError', 'ValueError', 'TypeError'],
            correct: 0,
            explanation: 'IndexError se lanza cuando se intenta acceder a un índice fuera del rango de una secuencia (lista, tupla, string).'
          },
          {
            id: 'q-exc-2-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Qué tipo de excepción lanza el siguiente código?',
            code: 'datos = {"nombre": "Ana", "edad": 25}\nprint(datos["carrera"])',
            options: ['KeyError', 'IndexError', 'ValueError', 'AttributeError'],
            correct: 0,
            explanation: 'KeyError se lanza cuando se intenta acceder a una clave que no existe en un diccionario. "carrera" no está en el diccionario datos.'
          },
          {
            id: 'q-exc-2-3',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'errores = []\n\ntry:\n    int("abc")\nexcept ValueError:\n    errores.append("ValueError")\n\ntry:\n    lista = [1, 2, 3]\n    lista[10]\nexcept IndexError:\n    errores.append("IndexError")\n\ntry:\n    None + 5\nexcept TypeError:\n    errores.append("TypeError")\n\nprint(errores)',
            options: [
              "['ValueError', 'IndexError', 'TypeError']",
              "['ValueError']",
              "['TypeError']",
              "[]"
            ],
            correct: 0,
            explanation: 'Cada bloque captura un error distinto: int("abc")→ValueError, lista[10]→IndexError, None+5→TypeError. Los tres se agregan a la lista.'
          },
          {
            id: 'q-exc-2-4',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el código para capturar el error al abrir un archivo inexistente:',
            code: 'try:\n    archivo = open("no_existe.txt", "r")\nexcept _____:\n    print("El archivo no existe")',
            options: ['FileNotFoundError', 'IOError', 'OSError', 'ValueError'],
            correct: 0,
            explanation: 'FileNotFoundError se lanza cuando se intenta abrir un archivo que no existe. Es una subclase de OSError, pero es más específica.'
          },
          {
            id: 'q-exc-2-5',
            type: 'true-false',
            difficulty: 1,
            question: 'TypeError se lanza cuando se realiza una operación con tipos incompatibles, como sumar un string con un entero.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 0,
            explanation: 'Verdadero. "hola" + 5 lanza TypeError porque no se puede concatenar un str con un int directamente. Se necesita conversión explícita.'
          },
          {
            id: 'q-exc-2-6',
            type: 'multiple-choice',
            difficulty: 3,
            question: '¿Cuál es la jerarquía correcta de las siguientes excepciones de más general a más específica?',
            code: null,
            options: [
              'BaseException → Exception → OSError → FileNotFoundError',
              'Exception → BaseException → OSError → FileNotFoundError',
              'FileNotFoundError → OSError → Exception → BaseException',
              'BaseException → FileNotFoundError → OSError → Exception'
            ],
            correct: 0,
            explanation: 'La jerarquía va de más general a más específica: BaseException es la raíz, Exception hereda de ella, OSError de Exception, y FileNotFoundError de OSError.'
          }
        ]
      },
      // ---- Lesson 3: Excepciones Personalizadas ----
      {
        id: 'excepciones-3',
        name: 'Excepciones Personalizadas',
        questions: [
          {
            id: 'q-exc-3-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿De qué clase debe heredar una excepción personalizada?',
            code: null,
            options: [
              'Exception (o una subclase de Exception)',
              'object',
              'Error',
              'BaseException directamente'
            ],
            correct: 0,
            explanation: 'Las excepciones personalizadas deben heredar de Exception o alguna subclase. No se recomienda heredar directamente de BaseException.'
          },
          {
            id: 'q-exc-3-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class EdadInvalidaError(Exception):\n    def __init__(self, edad):\n        self.edad = edad\n        super().__init__(f"Edad inválida: {edad}")\n\ndef verificar_edad(edad):\n    if edad < 0 or edad > 150:\n        raise EdadInvalidaError(edad)\n    return "Edad válida"\n\ntry:\n    verificar_edad(-5)\nexcept EdadInvalidaError as e:\n    print(e)',
            options: ['Edad inválida: -5', 'Error', 'EdadInvalidaError', '-5'],
            correct: 0,
            explanation: 'Se lanza EdadInvalidaError con edad=-5. El mensaje del super().__init__ es "Edad inválida: -5", que es lo que se imprime con print(e).'
          },
          {
            id: 'q-exc-3-3',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el código para lanzar una excepción personalizada:',
            code: 'class SaldoInsuficienteError(Exception):\n    pass\n\ndef retirar(saldo, monto):\n    if monto > saldo:\n        _____ SaldoInsuficienteError("Fondos insuficientes")\n    return saldo - monto',
            options: ['raise', 'throw', 'except', 'launch'],
            correct: 0,
            explanation: 'En Python, raise se usa para lanzar una excepción. A diferencia de otros lenguajes que usan "throw", Python siempre usa "raise".'
          },
          {
            id: 'q-exc-3-4',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class AppError(Exception):\n    pass\n\nclass DatabaseError(AppError):\n    pass\n\nclass ConexionError(DatabaseError):\n    pass\n\ntry:\n    raise ConexionError("Sin conexión a BD")\nexcept AppError as e:\n    print(f"Error de app: {e}")\nexcept DatabaseError as e:\n    print(f"Error de BD: {e}")\nexcept ConexionError as e:\n    print(f"Error de conexión: {e}")',
            options: [
              'Error de app: Sin conexión a BD',
              'Error de conexión: Sin conexión a BD',
              'Error de BD: Sin conexión a BD',
              'Error'
            ],
            correct: 0,
            explanation: 'Python evalúa los except en orden. ConexionError hereda de DatabaseError que hereda de AppError. El primer except (AppError) captura la excepción porque es clase padre.'
          },
          {
            id: 'q-exc-3-5',
            type: 'true-false',
            difficulty: 2,
            question: 'Es una buena práctica capturar todas las excepciones con "except Exception:" sin especificar el tipo.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 1,
            explanation: 'Falso. Capturar Exception genérico puede ocultar errores inesperados. Es mejor capturar excepciones específicas para manejar cada caso adecuadamente y permitir que errores inesperados se propaguen.'
          },
          {
            id: 'q-exc-3-6',
            type: 'order-code',
            difficulty: 3,
            question: 'Ordena las líneas para crear y usar una excepción personalizada correctamente:',
            code: null,
            options: [
              'class NotaInvalidaError(ValueError):',
              '    def __init__(self, nota):',
              '        super().__init__(f"Nota {nota} fuera de rango")',
              'def asignar_nota(nota):',
              '    if nota < 1 or nota > 7:',
              '        raise NotaInvalidaError(nota)',
              '    return nota'
            ],
            correct: [0, 1, 2, 3, 4, 5, 6],
            explanation: 'Primero se define la clase de excepción heredando de ValueError, con su __init__ y mensaje. Luego la función que la usa con raise cuando la nota está fuera de rango.'
          }
        ]
      }
    ]
  },

  // ============================================================
  // MODULE 6: Iterables y Generadores
  // ============================================================
  {
    id: 'iterables',
    name: 'Iterables y Generadores',
    icon: '🔄',
    description: 'Protocolo de iteración, generadores con yield, y funciones de orden superior como map, filter y reduce.',
    color: '#FFC800',
    lessons: [
      // ---- Lesson 1: Protocolo de Iteración ----
      {
        id: 'iterables-1',
        name: 'Protocolo de Iteración',
        questions: [
          {
            id: 'q-iter-1-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Qué dos métodos dunder debe implementar un objeto para ser iterable en Python?',
            code: null,
            options: [
              '__iter__ y __next__',
              '__loop__ y __step__',
              '__start__ y __end__',
              '__get__ y __set__'
            ],
            correct: 0,
            explanation: 'Un iterable implementa __iter__ (que retorna un iterador) y el iterador implementa __next__ (que retorna el siguiente valor o lanza StopIteration).'
          },
          {
            id: 'q-iter-1-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Rango:\n    def __init__(self, inicio, fin):\n        self.inicio = inicio\n        self.fin = fin\n        self.actual = inicio\n\n    def __iter__(self):\n        self.actual = self.inicio\n        return self\n\n    def __next__(self):\n        if self.actual >= self.fin:\n            raise StopIteration\n        valor = self.actual\n        self.actual += 1\n        return valor\n\nfor n in Rango(1, 4):\n    print(n, end=" ")',
            options: ['1 2 3 ', '1 2 3 4 ', '0 1 2 3 ', 'Error'],
            correct: 0,
            explanation: 'Rango(1,4) itera desde 1 hasta 3 (4 excluido). __next__ retorna el valor actual y avanza. Cuando actual >= fin, lanza StopIteration y el for termina.'
          },
          {
            id: 'q-iter-1-3',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el código para que el iterador lance la señal de parada:',
            code: 'class Cuenta:\n    def __init__(self, hasta):\n        self.hasta = hasta\n        self.n = 0\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.n >= self.hasta:\n            raise _____\n        self.n += 1\n        return self.n',
            options: ['StopIteration', 'EndIteration', 'IterationError', 'StopLoop'],
            correct: 0,
            explanation: 'StopIteration es la excepción que señala al bucle for (y otras construcciones) que el iterador se ha agotado y no hay más elementos.'
          },
          {
            id: 'q-iter-1-4',
            type: 'true-false',
            difficulty: 2,
            question: 'El método __iter__ de un iterador generalmente retorna self.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 0,
            explanation: 'Verdadero. Cuando un objeto es tanto iterable como iterador, __iter__ retorna self. Esto permite que el objeto se use directamente en bucles for.'
          },
          {
            id: 'q-iter-1-5',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'class Fibonacci:\n    def __init__(self, n):\n        self.n = n\n        self.a, self.b = 0, 1\n        self.count = 0\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.count >= self.n:\n            raise StopIteration\n        valor = self.a\n        self.a, self.b = self.b, self.a + self.b\n        self.count += 1\n        return valor\n\nprint(list(Fibonacci(6)))',
            options: ['[0, 1, 1, 2, 3, 5]', '[1, 1, 2, 3, 5, 8]', '[0, 1, 2, 3, 4, 5]', 'Error'],
            correct: 0,
            explanation: 'Fibonacci genera los primeros 6 números de Fibonacci: 0, 1, 1, 2, 3, 5. Cada valor es la suma de los dos anteriores.'
          },
          {
            id: 'q-iter-1-6',
            type: 'multiple-choice',
            difficulty: 2,
            question: '¿Qué función built-in se usa para obtener un iterador de un iterable?',
            code: null,
            options: ['iter()', 'next()', 'loop()', 'iterate()'],
            correct: 0,
            explanation: 'iter(obj) llama a obj.__iter__() y retorna un iterador. next(iterador) llama a iterador.__next__() para obtener el siguiente valor.'
          },
      {
      "id": "iter-dev-practica",
      "name": "✍️ Desarrollo: Práctica de Generadores y yield",
      "questions": [
            {
                  "id": "q-iter-dev-p1",
                  "type": "write-code",
                  "difficulty": 2,
                  "question": "¿Qué palabra clave convierte a una función normal en una función generadora que pausa su ejecución y entrega un valor?",
                  "code": null,
                  "placeholder": "...",
                  "hints": [
                        "Tiene 5 letras y empieza con y."
                  ],
                  "acceptedAnswers": [
                        "yield"
                  ],
                  "explanation": "'yield' produce un valor hacia el consumidor y suspende el estado de ejecución de la función hasta que se solicite el siguiente elemento con next()."
            }
      ]
},
      {
      "id": "iter-dev-puc",
      "name": "🎓 Desarrollo Nivel Prueba PUC: Protocolo de Iteración Personalizado",
      "questions": [
            {
                  "id": "q-iter-dev-puc1",
                  "type": "write-code",
                  "difficulty": 3,
                  "question": "[IIC2233 I1/Examen] ¿Qué excepción debe levantar el método __next__ cuando ya no quedan más elementos que iterar?",
                  "code": "def __next__(self):\n    if self.indice >= len(self.datos):\n        # Levanta la excepción estándar del protocolo\n        _____",
                  "placeholder": "raise ...",
                  "hints": [
                        "Es StopIteration sin argumentos obligatorios.",
                        "Usa la sentencia raise."
                  ],
                  "acceptedAnswers": [
                        "raise StopIteration",
                        "raise StopIteration()",
                        "raise StopIteration('Fin')",
                        "raise StopIteration(\"Fin\")"
                  ],
                  "explanation": "El protocolo de iteración de Python especifica que __next__ debe señalar el fin de los datos levantando StopIteration, lo que permite a los bucles for terminar de forma limpia."
            }
      ]
}
    ]
      },
      // ---- Lesson 2: Generadores ----
      {
        id: 'iterables-2',
        name: 'Generadores',
        questions: [
          {
            id: 'q-iter-2-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Qué palabra clave convierte una función normal en una función generadora?',
            code: null,
            options: ['yield', 'return', 'generate', 'async'],
            correct: 0,
            explanation: 'La presencia de yield en una función la convierte en una función generadora. Al llamarla, retorna un generador (iterador) en vez de ejecutar el cuerpo completo.'
          },
          {
            id: 'q-iter-2-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'def contar_hasta(n):\n    i = 1\n    while i <= n:\n        yield i\n        i += 1\n\ngen = contar_hasta(3)\nprint(next(gen))\nprint(next(gen))\nprint(next(gen))',
            options: ['1\\n2\\n3', '1\\n1\\n1', '3\\n3\\n3', 'Error'],
            correct: 0,
            explanation: 'Cada llamada a next() ejecuta el generador hasta el siguiente yield. Primera vez: yield 1. Segunda: yield 2. Tercera: yield 3.'
          },
          {
            id: 'q-iter-2-3',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'def pares(n):\n    for i in range(n):\n        if i % 2 == 0:\n            yield i\n\nresultado = list(pares(8))\nprint(resultado)',
            options: ['[0, 2, 4, 6]', '[2, 4, 6, 8]', '[0, 2, 4, 6, 8]', '[1, 3, 5, 7]'],
            correct: 0,
            explanation: 'El generador produce los números pares de 0 a 7 (range(8)). Solo hace yield cuando i % 2 == 0: 0, 2, 4, 6.'
          },
          {
            id: 'q-iter-2-4',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa la expresión generadora equivalente a la función generadora:',
            code: '# Función generadora\ndef cuadrados(n):\n    for i in range(n):\n        yield i ** 2\n\n# Expresión generadora equivalente\ngen = _____ for i in range(5))\nprint(list(gen))  # [0, 1, 4, 9, 16]',
            options: ['(i ** 2', '[i ** 2', '{i ** 2', 'yield i ** 2'],
            correct: 0,
            explanation: 'Una expresión generadora usa paréntesis: (expresión for variable in iterable). Es la versión compacta de una función generadora.'
          },
          {
            id: 'q-iter-2-5',
            type: 'true-false',
            difficulty: 2,
            question: 'Un generador produce todos sus valores de una vez y los almacena en memoria (eager evaluation).',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 1,
            explanation: 'Falso. Los generadores usan lazy evaluation: producen un valor a la vez bajo demanda. No almacenan todos los valores en memoria, lo que los hace eficientes para secuencias grandes.'
          },
          {
            id: 'q-iter-2-6',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'def infinito():\n    n = 0\n    while True:\n        yield n\n        n += 1\n\ngen = infinito()\nprimeros_5 = [next(gen) for _ in range(5)]\nprint(primeros_5)',
            options: ['[0, 1, 2, 3, 4]', 'Se cuelga (bucle infinito)', '[1, 2, 3, 4, 5]', 'Error'],
            correct: 0,
            explanation: 'Aunque el generador es infinito, solo se consumen 5 valores con next(). Esto es posible gracias a la lazy evaluation: el generador se pausa en cada yield.'
          },
          {
            id: 'q-iter-2-7',
            type: 'multiple-choice',
            difficulty: 3,
            question: '¿Qué ventaja tiene un generador sobre una lista para procesar un archivo de millones de líneas?',
            code: null,
            options: [
              'El generador procesa línea por línea sin cargar todo el archivo en memoria',
              'El generador lee el archivo más rápido',
              'El generador puede escribir en el archivo',
              'No hay ventaja, ambos son iguales'
            ],
            correct: 0,
            explanation: 'Un generador procesa elementos uno a uno (lazy), usando memoria constante O(1). Una lista cargaría todas las líneas en memoria O(n), lo que puede ser inviable con millones de líneas.'
          }
        ]
      },
      // ---- Lesson 3: Funciones de Orden Superior ----
      {
        id: 'iterables-3',
        name: 'Funciones de Orden Superior',
        questions: [
          {
            id: 'q-iter-3-1',
            type: 'multiple-choice',
            difficulty: 1,
            question: '¿Qué es una función lambda en Python?',
            code: null,
            options: [
              'Una función anónima de una sola expresión',
              'Una función que solo acepta un argumento',
              'Una función que siempre retorna True o False',
              'Una función que se ejecuta al inicio del programa'
            ],
            correct: 0,
            explanation: 'Lambda define una función anónima (sin nombre) que contiene una sola expresión. Sintaxis: lambda args: expresión. Es útil para funciones simples y cortas.'
          },
          {
            id: 'q-iter-3-2',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'numeros = [1, 2, 3, 4, 5, 6, 7, 8]\npares = list(filter(lambda x: x % 2 == 0, numeros))\nprint(pares)',
            options: ['[2, 4, 6, 8]', '[1, 3, 5, 7]', '[1, 2, 3, 4, 5, 6, 7, 8]', '[]'],
            correct: 0,
            explanation: 'filter() aplica la función lambda a cada elemento y conserva solo aquellos donde retorna True. x % 2 == 0 es True para los pares: [2, 4, 6, 8].'
          },
          {
            id: 'q-iter-3-3',
            type: 'code-output',
            difficulty: 2,
            question: '¿Cuál es el output del siguiente código?',
            code: 'numeros = [1, 2, 3, 4, 5]\ncuadrados = list(map(lambda x: x ** 2, numeros))\nprint(cuadrados)',
            options: ['[1, 4, 9, 16, 25]', '[2, 4, 6, 8, 10]', '[1, 2, 3, 4, 5]', 'Error'],
            correct: 0,
            explanation: 'map() aplica la función lambda a cada elemento. Lambda eleva al cuadrado: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25.'
          },
          {
            id: 'q-iter-3-4',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'from functools import reduce\n\nnumeros = [1, 2, 3, 4, 5]\nsuma = reduce(lambda acc, x: acc + x, numeros)\nprint(suma)',
            options: ['15', '[1, 3, 6, 10, 15]', '120', 'Error'],
            correct: 0,
            explanation: 'reduce() acumula un resultado aplicando la función de izquierda a derecha: ((((1+2)+3)+4)+5) = 15. El acumulador parte con el primer elemento.'
          },
          {
            id: 'q-iter-3-5',
            type: 'fill-code',
            difficulty: 2,
            question: 'Completa el código para usar map y convertir una lista de strings a enteros:',
            code: 'numeros_str = ["1", "2", "3", "4"]\nnumeros = list(_____(int, numeros_str))\nprint(numeros)  # [1, 2, 3, 4]',
            options: ['map', 'filter', 'reduce', 'apply'],
            correct: 0,
            explanation: 'map(int, lista_strings) aplica la función int a cada string, convirtiéndolos a enteros. map retorna un iterador, por eso se envuelve en list().'
          },
          {
            id: 'q-iter-3-6',
            type: 'true-false',
            difficulty: 2,
            question: 'Una list comprehension [x**2 for x in range(5)] genera todos los valores en memoria, mientras que una expresión generadora (x**2 for x in range(5)) los produce bajo demanda.',
            code: null,
            options: ['Verdadero', 'Falso'],
            correct: 0,
            explanation: 'Verdadero. La list comprehension crea una lista completa en memoria. La expresión generadora produce valores uno a uno (lazy evaluation), ahorrando memoria.'
          },
          {
            id: 'q-iter-3-7',
            type: 'code-output',
            difficulty: 3,
            question: '¿Cuál es el output del siguiente código?',
            code: 'palabras = ["Hola", "Mundo", "Python", "IIC2233"]\nresultado = list(filter(lambda p: len(p) > 4, map(lambda p: p.upper(), palabras)))\nprint(resultado)',
            options: ["['MUNDO', 'PYTHON', 'IIC2233']", "['HOLA', 'MUNDO', 'PYTHON', 'IIC2233']", "['Mundo', 'Python', 'IIC2233']", "['PYTHON', 'IIC2233']"],
            correct: 0,
            explanation: 'Primero map convierte a mayúsculas: ["HOLA","MUNDO","PYTHON","IIC2233"]. Luego filter conserva las de largo > 4: "MUNDO"(5), "PYTHON"(6), "IIC2233"(7). "HOLA"(4) no pasa.'
          }
        ]
      }
    ]
  }
];
