// ============================================================
// DuoProgra - Banco de Preguntas Parte 2 (Actualizado)
// Módulos: Threading, Networking, Serialización, GUI, Recursión
// Incluye secciones de Desarrollo Práctica y Nivel Prueba PUC
// + Simulacros de Prueba: I1, I2, Examen Final
// ============================================================

window.DUOPROGRA_PARTE2 = [
  {
    "id": "threading",
    "name": "Threading",
    "icon": "🧵",
    "description": "Concurrencia, hebras (threads), bloqueos (Locks), sincronización y condiciones de carrera.",
    "color": "#2B70C9",
    "lessons": [
      {
        "id": "threading-1",
        "name": "Procesos vs Hilos",
        "questions": [
          {
            "id": "q-thread-1-1",
            "type": "multiple-choice",
            "difficulty": 1,
            "question": "¿Qué módulo estándar de Python se utiliza principalmente para trabajar con hilos/hebras?",
            "code": null,
            "options": [
              "threading",
              "multiprocessing",
              "concurrent",
              "asyncio"
            ],
            "correct": 0,
            "explanation": "El módulo 'threading' proporciona la clase Thread y primitivas de sincronización para trabajar con hilos dentro de un mismo proceso."
          },
          {
            "id": "q-thread-1-2",
            "type": "multiple-choice",
            "difficulty": 1,
            "question": "¿Qué diferencia clave existe entre un proceso y un hilo?",
            "code": null,
            "options": [
              "Los hilos comparten el mismo espacio de memoria del proceso padre",
              "Los procesos comparten la memoria pero los hilos no",
              "Los hilos no pueden ejecutarse concurrentemente",
              "Un proceso solo puede tener un hilo como máximo"
            ],
            "correct": 0,
            "explanation": "Los hilos de un mismo proceso comparten la memoria (variables globales, objetos), mientras que cada proceso tiene su propio espacio de memoria aislado."
          },
          {
            "id": "q-thread-1-3",
            "type": "fill-code",
            "difficulty": 2,
            "question": "¿Qué método inicia la ejecución del hilo en segundo plano?",
            "code": "import threading\n\ndef tarea():\n    print('Trabajando...')\n\nt = threading.Thread(target=tarea)\nt._____()",
            "options": [
              "start",
              "run",
              "begin",
              "execute"
            ],
            "correct": 0,
            "explanation": "Se debe llamar a t.start() para que el hilo comience su ejecución de manera concurrente. Si llamas a t.run(), se ejecuta síncronamente en el hilo actual."
          },
          {
            "id": "q-thread-1-4",
            "type": "code-output",
            "difficulty": 2,
            "question": "¿Cuál es la función del método join()?",
            "code": "import threading\n\ndef saludar():\n    return 'Hola'\n\nt = threading.Thread(target=saludar)\nt.start()\nt.join()\nprint('Listo')",
            "options": [
              "Hace que el hilo principal espere a que 't' termine antes de continuar",
              "Detiene inmediatamente la ejecución de 't'",
              "Combina dos hilos en uno solo",
              "Reinicia el hilo 't'"
            ],
            "correct": 0,
            "explanation": "t.join() bloquea el hilo que lo invoca (en este caso el principal) hasta que el hilo 't' finalice su ejecución."
          },
          {
            "id": "q-thread-1-5",
            "type": "true-false",
            "difficulty": 1,
            "question": "En Python con CPython, el GIL (Global Interpreter Lock) permite que múltiples hilos ejecuten bytecode de Python en paralelo real usando múltiples núcleos de CPU.",
            "code": null,
            "options": [
              "Verdadero",
              "Falso"
            ],
            "correct": 1,
            "explanation": "Falso. En CPython, el GIL asegura que solo un hilo ejecute bytecode de Python a la vez, por lo que threading es ideal para tareas I/O-bound, no CPU-bound."
          },
          {
            "id": "q-thread-1-6",
            "type": "order-code",
            "difficulty": 2,
            "question": "Ordena el código para crear, iniciar y esperar un hilo:",
            "code": null,
            "options": [
              "import threading",
              "def worker(): print('OK')",
              "hilo = threading.Thread(target=worker)",
              "hilo.start()",
              "hilo.join()"
            ],
            "correct": [
              0,
              1,
              2,
              3,
              4
            ],
            "explanation": "Primero se importa el módulo, se define la función objetivo, se instancia el Thread, se inicia con start() y se espera con join()."
          }
        ]
      },
      {
        "id": "threading-2",
        "name": "Sincronización y Locks",
        "questions": [
          {
            "id": "q-thread-2-1",
            "type": "multiple-choice",
            "difficulty": 1,
            "question": "¿Qué problema ocurre cuando dos o más hilos modifican un recurso compartido al mismo tiempo sin sincronización?",
            "code": null,
            "options": [
              "Condición de carrera (Race Condition)",
              "Deadlock inevitable",
              "Stack Overflow",
              "Segmentation Fault"
            ],
            "correct": 0,
            "explanation": "Una condición de carrera (race condition) se produce cuando el resultado depende del orden impredecible de ejecución de hilos concurrentes accediendo a datos compartidos."
          },
          {
            "id": "q-thread-2-2",
            "type": "fill-code",
            "difficulty": 2,
            "question": "¿Cómo se usa de manera más segura y pythonica un Lock para evitar olvidar liberarlo?",
            "code": "lock = threading.Lock()\n\n_____ lock:\n    cuenta += 1",
            "options": [
              "with",
              "try",
              "using",
              "lock"
            ],
            "correct": 0,
            "explanation": "El gestor de contexto 'with lock:' adquiere el cerrojo al entrar y garantiza su liberación automática al salir, incluso si ocurren excepciones."
          },
          {
            "id": "q-thread-2-3",
            "type": "code-output",
            "difficulty": 3,
            "question": "¿Qué ocurre si un hilo intenta adquirir dos veces el mismo Lock estándar sin haberlo liberado?",
            "code": "import threading\nlock = threading.Lock()\nlock.acquire()\nlock.acquire()  # ¿Qué pasa aquí?",
            "options": [
              "El hilo se bloquea indefinidamente (Deadlock)",
              "Lanza un ValueError",
              "Retorna False de inmediato",
              "Python ignora la segunda llamada"
            ],
            "correct": 0,
            "explanation": "Un Lock estándar bloquea cualquier intento de adquisición mientras esté tomado, incluso si es el mismo hilo quien lo posee. Para permitir reentradas del mismo hilo se usa RLock."
          },
          {
            "id": "q-thread-2-4",
            "type": "multiple-choice",
            "difficulty": 2,
            "question": "¿Cuál es la diferencia entre Lock y RLock en el módulo threading?",
            "code": null,
            "options": [
              "RLock puede ser adquirido múltiples veces por el mismo hilo que lo posee",
              "RLock es más rápido porque no bloquea a otros hilos",
              "Lock funciona entre procesos distintos y RLock solo entre hilos",
              "Lock tiene timeout y RLock no"
            ],
            "correct": 0,
            "explanation": "RLock (Reentrant Lock) lleva la cuenta de cuántas veces el mismo hilo lo ha adquirido y requiere igual número de releases antes de quedar libre."
          },
          {
            "id": "q-thread-2-5",
            "type": "true-false",
            "difficulty": 2,
            "question": "Si una sección crítica modifica una lista con append(), en CPython siempre es obligatorio usar Lock porque append no es atómico.",
            "code": null,
            "options": [
              "Verdadero",
              "Falso"
            ],
            "correct": 1,
            "explanation": "Falso. En CPython, 'list.append()' es una operación atómica implementada en C, aunque en IIC2233 se enseña que toda sección crítica compartida debe protegerse explícitamente para portabilidad y buen diseño."
          }
        ]
      },
      {
        "id": "threading-3",
        "name": "Comunicación y Daemon Threads",
        "questions": [
          {
            "id": "q-thread-3-1",
            "type": "multiple-choice",
            "difficulty": 1,
            "question": "¿Qué característica define a un 'daemon thread' (hilo demonio)?",
            "code": null,
            "options": [
              "El programa principal termina sin esperar a que los hilos daemon finalicen",
              "Tiene mayor prioridad de CPU que los hilos normales",
              "Se ejecuta en un núcleo exclusivo del procesador",
              "No puede acceder a la memoria de otros hilos"
            ],
            "correct": 0,
            "explanation": "Un daemon thread corre en segundo plano y se destruye abruptamente en cuanto todos los hilos no-daemon (incluyendo el principal) han terminado."
          },
          {
            "id": "q-thread-3-2",
            "type": "fill-code",
            "difficulty": 2,
            "question": "¿Cómo se configura un hilo como daemon antes de iniciarlo?",
            "code": "t = threading.Thread(target=musica_fondo)\nt._____ = True\nt.start()",
            "options": [
              "daemon",
              "is_daemon",
              "background",
              "set_daemon"
            ],
            "correct": 0,
            "explanation": "Se puede asignar 't.daemon = True' o pasar 'daemon=True' en el constructor threading.Thread(..., daemon=True)."
          },
          {
            "id": "q-thread-3-3",
            "type": "multiple-choice",
            "difficulty": 2,
            "question": "¿Qué estructura de datos del módulo 'queue' es thread-safe y se utiliza comúnmente para el patrón Productor-Consumidor?",
            "code": null,
            "options": [
              "queue.Queue",
              "collections.deque",
              "list",
              "dict"
            ],
            "correct": 0,
            "explanation": "queue.Queue maneja internamente toda la sincronización y bloqueos necesarios, permitiendo enviar y recibir datos entre hilos de forma segura."
          },
          {
            "id": "q-thread-3-4",
            "type": "true-false",
            "difficulty": 1,
            "question": "El método queue.Queue.get() por defecto es bloqueante si la cola está vacía.",
            "code": null,
            "options": [
              "Verdadero",
              "Falso"
            ],
            "correct": 0,
            "explanation": "Verdadero. get() espera hasta que haya un elemento disponible en la cola, a menos que se configure 'block=False' o un 'timeout'."
          }
        ]
      },
      {
        "id": "thread-dev-practica",
        "name": "✍️ Desarrollo: Práctica de Hilos y Concurrencia",
        "questions": [
          {
            "id": "q-th-dev-p1",
            "type": "write-code",
            "difficulty": 2,
            "question": "Escribe el comando para esperar a que un hilo 't1' termine antes de que el programa continúe:",
            "code": null,
            "placeholder": "t1._____()",
            "hints": [
              "El método se llama join."
            ],
            "acceptedAnswers": [
              "t1.join()",
              "t1.join() "
            ],
            "explanation": "t1.join() bloquea el hilo que lo invoca hasta que t1 termine completamente su trabajo."
          }
        ]
      },
      {
        "id": "thread-dev-puc",
        "name": "🎓 Desarrollo Nivel Prueba PUC: Sincronización Segura con Locks",
        "questions": [
          {
            "id": "q-th-dev-puc1",
            "type": "write-code",
            "difficulty": 3,
            "question": "[IIC2233 I2] Escribe la sentencia de gestor de contexto para adquirir el lock 'self.lock' de forma thread-safe:",
            "code": "def depositar(self, monto):\n    # Adquiere el cerrojo usando context manager\n        self.saldo += monto",
            "placeholder": "with ...:",
            "hints": [
              "Usa la palabra reservada 'with'.",
              "No olvides los dos puntos al final."
            ],
            "acceptedAnswers": [
              "with self.lock:",
              "with self.lock :"
            ],
            "explanation": "'with self.lock:' adquiere el cerrojo al entrar al bloque y garantiza su liberación incluso si ocurre una excepción dentro de la sección crítica."
          }
        ]
      }
    ]
  },
  {
    "id": "networking",
    "name": "Networking",
    "icon": "🌐",
    "description": "Arquitectura Cliente-Servidor, sockets TCP, transmisión de bytes y comunicación en red.",
    "color": "#00CD9C",
    "lessons": [
      {
        "id": "networking-1",
        "name": "Sockets Básicos y TCP",
        "questions": [
          {
            "id": "q-net-1-1",
            "type": "multiple-choice",
            "difficulty": 1,
            "question": "¿Qué protocolo garantiza la entrega ordenada y sin pérdidas de paquetes de datos?",
            "code": null,
            "options": [
              "TCP",
              "UDP",
              "IP",
              "DNS"
            ],
            "correct": 0,
            "explanation": "TCP (Transmission Control Protocol) es orientado a la conexión y asegura la llegada confiable, ordenada y libre de errores de los bytes transmitidos."
          },
          {
            "id": "q-net-1-2",
            "type": "fill-code",
            "difficulty": 2,
            "question": "Completa los parámetros para crear un socket TCP IPv4 estándar:",
            "code": "import socket\nsock = socket.socket(socket.AF_INET, socket._____) ",
            "options": [
              "SOCK_STREAM",
              "SOCK_DGRAM",
              "SOCK_RAW",
              "TCP_SOCKET"
            ],
            "correct": 0,
            "explanation": "socket.AF_INET indica la familia IPv4 y socket.SOCK_STREAM especifica el protocolo TCP orientado a flujos de bytes."
          },
          {
            "id": "q-net-1-3",
            "type": "order-code",
            "difficulty": 2,
            "question": "Ordena el ciclo de vida de un servidor socket TCP:",
            "code": null,
            "options": [
              "Crear socket con socket.socket()",
              "Asociar IP y puerto con bind()",
              "Poner en modo escucha con listen()",
              "Aceptar conexión entrante con accept()",
              "Enviar/recibir datos con send() y recv()"
            ],
            "correct": [
              0,
              1,
              2,
              3,
              4
            ],
            "explanation": "El servidor primero crea el socket, lo enlaza con bind, activa la escucha con listen, espera conexiones con accept y luego intercambia datos."
          },
          {
            "id": "q-net-1-4",
            "type": "multiple-choice",
            "difficulty": 2,
            "question": "¿Qué retorna la llamada a server_socket.accept()?",
            "code": null,
            "options": [
              "Una tupla (client_socket, address)",
              "Solo la dirección IP del cliente",
              "Un entero indicando el puerto asignado",
              "Un booleano True/False si conectó"
            ],
            "correct": 0,
            "explanation": "accept() retorna un nuevo socket exclusivo para la comunicación con ese cliente y una tupla address (host, port)."
          },
          {
            "id": "q-net-1-5",
            "type": "true-false",
            "difficulty": 1,
            "question": "El socket del servidor principal que ejecutó bind() y listen() es el mismo que se utiliza para llamar a send() y recv() con cada cliente.",
            "code": null,
            "options": [
              "Verdadero",
              "Falso"
            ],
            "correct": 1,
            "explanation": "Falso. El socket principal sigue escuchando nuevas peticiones; los métodos send() y recv() se ejecutan en el nuevo socket retornado por accept()."
          }
        ]
      },
      {
        "id": "networking-2",
        "name": "Envío y Recepción de Bytes",
        "questions": [
          {
            "id": "q-net-2-1",
            "type": "code-output",
            "difficulty": 1,
            "question": "¿Qué ocurre si intentas enviar un string directamente por un socket sin codificar a bytes?",
            "code": "s.send('Hola mundo')",
            "options": [
              "Lanza un TypeError (a bytes-like object is required, not 'str')",
              "Se envía normalmente",
              "Python lo convierte automáticamente con ASCII",
              "Retorna 0 bytes enviados"
            ],
            "correct": 0,
            "explanation": "Los sockets solo transmiten secuencias de bytes (bytes/bytearray). Es necesario hacer 'Hola mundo'.encode('utf-8')."
          },
          {
            "id": "q-net-2-2",
            "type": "fill-code",
            "difficulty": 2,
            "question": "¿Cómo conviertes los bytes recibidos de vuelta a un string en Python?",
            "code": "datos_bytes = sock.recv(1024)\nmensaje = datos_bytes._____('utf-8')",
            "options": [
              "decode",
              "encode",
              "to_str",
              "parse"
            ],
            "correct": 0,
            "explanation": "Se utiliza el método bytes.decode('utf-8') para transformar los bytes a objeto str."
          },
          {
            "id": "q-net-2-3",
            "type": "multiple-choice",
            "difficulty": 2,
            "question": "¿Qué significa si socket.recv(1024) retorna un bytearray vacío b''?",
            "code": null,
            "options": [
              "El extremo remoto cerró la conexión ordenadamente",
              "No hay datos por ahora pero la conexión sigue abierta",
              "Ocurrió un error en la tarjeta de red",
              "El búfer se desbordó"
            ],
            "correct": 0,
            "explanation": "En sockets TCP, recibir b'' (0 bytes) indica que el peer ha cerrado el socket (EOF)."
          },
          {
            "id": "q-net-2-4",
            "type": "true-false",
            "difficulty": 2,
            "question": "En TCP, una llamada a send() de 1000 bytes garantiza que el receptor recibirá exactamente los 1000 bytes en un único llamado a recv().",
            "code": null,
            "options": [
              "Verdadero",
              "Falso"
            ],
            "correct": 1,
            "explanation": "Falso. TCP es un flujo continuo de bytes (stream), no de paquetes de mensaje. Los datos pueden llegar fragmentados en múltiples chunks o agrupados."
          }
        ]
      },
      {
        "id": "networking-3",
        "name": "Servidores Concurrente Multi-Cliente",
        "questions": [
          {
            "id": "q-net-3-1",
            "type": "multiple-choice",
            "difficulty": 2,
            "question": "¿Cuál es el patrón estándar en IIC2233 para atender múltiples clientes simultáneamente en un servidor TCP?",
            "code": null,
            "options": [
              "Crear un hilo nuevo (Thread) para atender cada cliente retornado por accept()",
              "Usar un bucle infinito en un solo hilo con sleep(0.1)",
              "Reiniciar el servidor tras cada cliente",
              "Abrir un puerto distinto para cada cliente"
            ],
            "correct": 0,
            "explanation": "Cada vez que accept() entrega un nuevo socket de cliente, se lanza un hilo dedicado a escuchar y responder a ese cliente específico."
          },
          {
            "id": "q-net-3-2",
            "type": "multiple-choice",
            "difficulty": 2,
            "question": "¿Qué problema surge si guardas todos los sockets de clientes en una lista compartida 'self.clientes' para hacer broadcast?",
            "code": null,
            "options": [
              "Múltiples hilos pueden modificar la lista a la vez, requiriendo un Lock",
              "TCP no permite tener más de 2 sockets abiertos",
              "Los sockets se desconectan si están en una lista",
              "No se pueden iterar listas de sockets"
            ],
            "correct": 0,
            "explanation": "Al conectar o desconectar clientes concurrentemente, varios hilos intentarán modificar self.clientes simultáneamente, requiriendo un Lock de sincronización."
          },
          {
            "id": "q-net-3-3",
            "type": "true-false",
            "difficulty": 1,
            "question": "Para cerrar un socket y liberar el puerto en el sistema operativo se utiliza el método close().",
            "code": null,
            "options": [
              "Verdadero",
              "Falso"
            ],
            "correct": 0,
            "explanation": "Verdadero. s.close() cierra la conexión y libera los descriptores de archivo asociados en el sistema operativo."
          }
        ]
      },
      {
        "id": "net-dev-practica",
        "name": "✍️ Desarrollo: Práctica de Sockets y Comunicación",
        "questions": [
          {
            "id": "q-net-dev-p1",
            "type": "write-code",
            "difficulty": 2,
            "question": "Escribe la instrucción para enviar la variable 'mensaje_bytes' a través del socket 'sock':",
            "code": null,
            "placeholder": "sock._____",
            "hints": [
              "El método de socket para enviar bytes es send() o sendall()."
            ],
            "acceptedAnswers": [
              "sock.send(mensaje_bytes)",
              "sock.sendall(mensaje_bytes)"
            ],
            "explanation": "sock.send() o sock.sendall() transmiten secuencias de bytes a través de la conexión establecida."
          }
        ]
      },
      {
        "id": "net-dev-puc",
        "name": "🎓 Desarrollo Nivel Prueba PUC: Arquitectura de Red y Protocolos",
        "questions": [
          {
            "id": "q-net-dev-puc1",
            "type": "write-code",
            "difficulty": 3,
            "question": "[IIC2233 I2/Examen] Escribe la línea con bind() para enlazar el socket 'servidor' a la IP '127.0.0.1' y puerto 8000:",
            "code": null,
            "placeholder": "servidor.bind(...)",
            "hints": [
              "bind recibe una única tupla con (host, port).",
              "servidor.bind(('127.0.0.1', 8000))"
            ],
            "acceptedAnswers": [
              "servidor.bind(('127.0.0.1', 8000))",
              "servidor.bind((\"127.0.0.1\", 8000))",
              "servidor.bind(('localhost', 8000))"
            ],
            "explanation": "En sockets de Python, bind() exige obligatoriamente una TUPLA de dos elementos (host, port) como argumento único: servidor.bind(('127.0.0.1', 8000))."
          }
        ]
      }
    ]
  },
  {
    "id": "serializacion",
    "name": "Serialización",
    "icon": "💾",
    "description": "Transformación de objetos a secuencias de bytes y texto: JSON, Pickle y codificación.",
    "color": "#FF86D0",
    "lessons": [
      {
        "id": "serializacion-1",
        "name": "JSON en Python",
        "questions": [
          {
            "id": "q-ser-1-1",
            "type": "multiple-choice",
            "difficulty": 1,
            "question": "¿Qué función del módulo 'json' serializa un objeto de Python a un string JSON?",
            "code": null,
            "options": [
              "json.dumps()",
              "json.dump()",
              "json.stringify()",
              "json.loads()"
            ],
            "correct": 0,
            "explanation": "json.dumps() convierte a string (Dump String), mientras que json.dump() escribe directamente en un archivo abierto."
          },
          {
            "id": "q-ser-1-2",
            "type": "code-output",
            "difficulty": 1,
            "question": "¿Cuál es el resultado de deserializar una tupla con json?",
            "code": "import json\ntexto = json.dumps((1, 2, 3))\nresultado = json.loads(texto)\nprint(type(resultado))",
            "options": [
              "<class 'list'>",
              "<class 'tuple'>",
              "<class 'set'>",
              "<class 'str'>"
            ],
            "correct": 0,
            "explanation": "JSON no tiene el tipo 'tupla'; los arreglos de JSON ([]) se deserializan siempre como listas estándar de Python."
          },
          {
            "id": "q-ser-1-3",
            "type": "fill-code",
            "difficulty": 2,
            "question": "¿Qué método se llama para leer y deserializar directamente desde un archivo?",
            "code": "import json\nwith open('datos.json', 'r') as f:\n    datos = json._____(f)",
            "options": [
              "load",
              "loads",
              "read",
              "parse"
            ],
            "correct": 0,
            "explanation": "json.load(f) lee directamente de un file-like object; json.loads(s) deserializa desde un string en memoria."
          },
          {
            "id": "q-ser-1-4",
            "type": "true-false",
            "difficulty": 1,
            "question": "El formato JSON puede serializar por defecto cualquier instancia de una clase personalizada sin configuración adicional.",
            "code": null,
            "options": [
              "Verdadero",
              "Falso"
            ],
            "correct": 1,
            "explanation": "Falso. Por defecto, json lanza TypeError con objetos custom. Se requiere heredar de JSONEncoder o proveer una función 'default'."
          }
        ]
      },
      {
        "id": "serializacion-2",
        "name": "Pickle y Métodos Especiales",
        "questions": [
          {
            "id": "q-ser-2-1",
            "type": "multiple-choice",
            "difficulty": 1,
            "question": "¿Cuál es una ventaja principal de Pickle sobre JSON en Python?",
            "code": null,
            "options": [
              "Puede serializar casi cualquier objeto de Python (incluyendo funciones, clases y grafos de objetos)",
              "Es legible por humanos en cualquier editor de texto",
              "Es seguro ejecutar pickle.loads con datos de fuentes desconocidas",
              "Es compatible de forma nativa con JavaScript"
            ],
            "correct": 0,
            "explanation": "Pickle es un formato binario exclusivo de Python capaz de serializar objetos complejos, referencias circulares y estructuras arbitrarias."
          },
          {
            "id": "q-ser-2-2",
            "type": "multiple-choice",
            "difficulty": 2,
            "question": "¿Por qué NUNCA se debe deserializar con pickle.loads datos provenientes de clientes no autenticados en red?",
            "code": null,
            "options": [
              "Permite Ejecución Remota de Código arbitrario (RCE)",
              "Pickle corrompe el disco duro siempre",
              "Genera fuga de memoria en el socket",
              "No soporta UTF-8"
            ],
            "correct": 0,
            "explanation": "Pickle permite definir constructores arbitrarios durante la deserialización (__reduce__), por lo que un atacante puede ejecutar comandos del sistema operativo."
          },
          {
            "id": "q-ser-2-3",
            "type": "code-output",
            "difficulty": 2,
            "question": "¿Qué método especial define qué atributos incluir al picklear una clase?",
            "code": "class Usuario:\n    def __init__(self, nombre, clave):\n        self.nombre = nombre\n        self.clave = clave\n    def __getstate__(self):\n        estado = self.__dict__.copy()\n        del estado['clave']\n        return estado",
            "options": [
              "__getstate__",
              "__reduce__",
              "__dict__",
              "__serialize__"
            ],
            "correct": 0,
            "explanation": "__getstate__ retorna el diccionario de estado que se almacenará con pickle, permitiendo ocultar atributos sensibles como contraseñas."
          },
          {
            "id": "q-ser-2-4",
            "type": "true-false",
            "difficulty": 1,
            "question": "pickle.dumps() devuelve un objeto de tipo bytes, mientras que json.dumps() devuelve un str.",
            "code": null,
            "options": [
              "Verdadero",
              "Falso"
            ],
            "correct": 0,
            "explanation": "Verdadero. Pickle opera directamente sobre flujos binarios (bytes), mientras que JSON genera texto Unicode."
          }
        ]
      },
      {
        "id": "serializacion-3",
        "name": "Protocolos de Mensajes con Largo",
        "questions": [
          {
            "id": "q-ser-3-1",
            "type": "multiple-choice",
            "difficulty": 2,
            "question": "En IIC2233 se enseña a anteponer 4 bytes con la longitud del mensaje antes de enviarlo por un socket. ¿Para qué sirve esto?",
            "code": null,
            "options": [
              "Para que el receptor sepa exactamente cuántos bytes debe esperar y leer del socket",
              "Para comprimir el mensaje a la mitad",
              "Para encriptar la carga útil con AES",
              "Para validar que el puerto esté abierto"
            ],
            "correct": 0,
            "explanation": "Al anteponer el largo (por ejemplo con 4 bytes big-endian), el receptor lee primero 4 bytes, sabe que el mensaje mide N bytes y repite recv() hasta completar los N bytes exactos."
          },
          {
            "id": "q-ser-3-2",
            "type": "code-output",
            "difficulty": 3,
            "question": "¿Cómo se convierte un entero de longitud a 4 bytes en orden big-endian?",
            "code": "largo = 120\nbytes_largo = largo.to_bytes(4, byteorder='big')\nprint(len(bytes_largo))",
            "options": [
              "4",
              "1",
              "120",
              "8"
            ],
            "correct": 0,
            "explanation": "int.to_bytes(4, 'big') produce exactamente una secuencia de 4 bytes representando el número en formato Big-Endian."
          },
          {
            "id": "q-ser-3-3",
            "type": "fill-code",
            "difficulty": 2,
            "question": "¿Cómo se recupera el número entero a partir de esos 4 bytes?",
            "code": "bytes_recibidos = b'\\x00\\x00\\x00x'\nlargo = int._____(bytes_recibidos, byteorder='big')",
            "options": [
              "from_bytes",
              "to_int",
              "parse_bytes",
              "decode"
            ],
            "correct": 0,
            "explanation": "El método de clase int.from_bytes(bytes, byteorder) reconstruye el número entero a partir de su representación binaria."
          }
        ]
      },
      {
        "id": "ser-dev-practica",
        "name": "✍️ Desarrollo: Práctica de Serialización",
        "questions": [
          {
            "id": "q-ser-dev-p1",
            "type": "write-code",
            "difficulty": 2,
            "question": "Escribe la función para transformar el diccionario 'datos' en una cadena de texto JSON:",
            "code": "import json\ndatos = {'nivel': 5}\n# Asigna a json_str el string serializado\njson_str = _____",
            "placeholder": "json.dumps(...)",
            "hints": [
              "La función para serializar a string es dumps (dump string)."
            ],
            "acceptedAnswers": [
              "json.dumps(datos)",
              "json.dumps(datos) "
            ],
            "explanation": "json.dumps(datos) serializa objetos en memoria a un string con formato JSON."
          }
        ]
      },
      {
        "id": "ser-dev-puc",
        "name": "🎓 Desarrollo Nivel Prueba PUC: Codificación de Largo y Bytes",
        "questions": [
          {
            "id": "q-ser-dev-puc1",
            "type": "write-code",
            "difficulty": 3,
            "question": "[IIC2233 I2] Convierte el entero 'largo_mensaje' a exactamente 4 bytes en orden big-endian:",
            "code": "largo_mensaje = len(mensaje_bytes)\n# Obtén los 4 bytes en formato big-endian\nbytes_largo = _____",
            "placeholder": "largo_mensaje.to_bytes(...)",
            "hints": [
              "Usa el método entero.to_bytes(4, byteorder='big')."
            ],
            "acceptedAnswers": [
              "largo_mensaje.to_bytes(4, byteorder='big')",
              "largo_mensaje.to_bytes(4, 'big')",
              "largo_mensaje.to_bytes(4, byteorder=\"big\")",
              "largo_mensaje.to_bytes(4, \"big\")"
            ],
            "explanation": "En las tareas y pruebas de IIC2233 es estándar anteponer 4 bytes de longitud usando 'largo.to_bytes(4, byteorder=\"big\")' para que el receptor sepa cuántos bytes esperar."
          }
        ]
      }
    ]
  },
  {
    "id": "gui",
    "name": "Interfaces Gráficas (PyQt)",
    "icon": "🖥️",
    "description": "Desarrollo de GUI con PyQt5/PyQt6: Widgets, Layouts, Señales y Slots, y separación Front/Back.",
    "color": "#7B68EE",
    "lessons": [
      {
        "id": "gui-1",
        "name": "PyQt Básico y Widgets",
        "questions": [
          {
            "id": "q-gui-1-1",
            "type": "multiple-choice",
            "difficulty": 1,
            "question": "¿Qué objeto es indispensable crear antes de instanciar cualquier widget en una aplicación PyQt?",
            "code": null,
            "options": [
              "QApplication",
              "QMainWindow",
              "QWidget",
              "QEventLoop"
            ],
            "correct": 0,
            "explanation": "QApplication administra el flujo de control de la GUI, la cola de eventos y la configuración global. Debe crearse antes que los widgets."
          },
          {
            "id": "q-gui-1-2",
            "type": "multiple-choice",
            "difficulty": 1,
            "question": "¿Qué layout organiza los widgets en una columna vertical uno debajo del otro?",
            "code": null,
            "options": [
              "QVBoxLayout",
              "QHBoxLayout",
              "QGridLayout",
              "QStackedLayout"
            ],
            "correct": 0,
            "explanation": "QVBoxLayout (Vertical Box Layout) dispone los elementos de arriba hacia abajo verticalmente."
          },
          {
            "id": "q-gui-1-3",
            "type": "fill-code",
            "difficulty": 2,
            "question": "¿Cómo se inicia el bucle de eventos principal de la aplicación PyQt?",
            "code": "import sys\nfrom PyQt5.QtWidgets import QApplication, QWidget\n\napp = QApplication(sys.argv)\nventana = QWidget()\nventana.show()\nsys.exit(app._____())",
            "options": [
              "exec_",
              "run",
              "start",
              "mainloop"
            ],
            "correct": 0,
            "explanation": "app.exec_() (o app.exec() en PyQt6/versiones modernas) inicia el ciclo de eventos (event loop) y no retorna hasta que la ventana se cierra."
          },
          {
            "id": "q-gui-1-4",
            "type": "true-false",
            "difficulty": 1,
            "question": "En PyQt, si no llamas al método .show() en una ventana creada, esta permanece invisible.",
            "code": null,
            "options": [
              "Verdadero",
              "Falso"
            ],
            "correct": 0,
            "explanation": "Verdadero. Los widgets de nivel superior se crean ocultos por omisión y deben mostrarse explícitamente con .show()."
          }
        ]
      },
      {
        "id": "gui-2",
        "name": "Señales y Slots",
        "questions": [
          {
            "id": "q-gui-2-1",
            "type": "multiple-choice",
            "difficulty": 1,
            "question": "En el mecanismo Signals & Slots de PyQt, ¿qué es un 'Slot'?",
            "code": null,
            "options": [
              "Cualquier función o método que responde a la emisión de una señal",
              "Un componente visual donde se arrastra un botón",
              "Un hilo de ejecución en segundo plano",
              "Un archivo de diseño creado con QtDesigner"
            ],
            "correct": 0,
            "explanation": "Un slot es la función o método que se ejecuta automáticamente cuando la señal a la cual está conectada es disparada (emitida)."
          },
          {
            "id": "q-gui-2-2",
            "type": "code-output",
            "difficulty": 2,
            "question": "¿Cómo se conecta el clic de un botón a una función?",
            "code": "boton = QPushButton('Presióname')\ndef al_hacer_click():\n    print('Presionado')\n\nboton.clicked.connect(al_hacer_click)",
            "options": [
              "Conectando la señal clicked con el método .connect(funcion)",
              "Pasando command=al_hacer_click en el constructor",
              "Sobreescribiendo el método mousePressEvent obligatoriamente",
              "Usando un decorador @listener"
            ],
            "correct": 0,
            "explanation": "En PyQt la sintaxis es objeto.señal.connect(slot)."
          },
          {
            "id": "q-gui-2-3",
            "type": "fill-code",
            "difficulty": 3,
            "question": "¿Cómo se define y emite una señal personalizada en una clase derivada de QObject?",
            "code": "from PyQt5.QtCore import QObject, pyqtSignal\n\nclass Emisor(QObject):\n    notificacion = pyqtSignal(str)\n\n    def avisar(self):\n        self.notificacion._____('Hola mundo')",
            "options": [
              "emit",
              "send",
              "trigger",
              "broadcast"
            ],
            "correct": 0,
            "explanation": "Las señales personalizadas se disparan invocando su método .emit(*args)."
          },
          {
            "id": "q-gui-2-4",
            "type": "true-false",
            "difficulty": 2,
            "question": "pyqtSignal debe ser declarada a nivel de atributos de clase y no dentro del método __init__.",
            "code": null,
            "options": [
              "Verdadero",
              "Falso"
            ],
            "correct": 0,
            "explanation": "Verdadero. En PyQt las señales se deben declarar como atributos de la clase para que el meta-objeto de Qt pueda registrarlas."
          }
        ]
      },
      {
        "id": "gui-3",
        "name": "Arquitectura Frontend-Backend",
        "questions": [
          {
            "id": "q-gui-3-1",
            "type": "multiple-choice",
            "difficulty": 2,
            "question": "¿Por qué NUNCA se debe ejecutar una tarea pesada o un bucle infinito en el hilo principal de la GUI?",
            "code": null,
            "options": [
              "Porque congela la interfaz y deja de responder a clics del usuario ('No responde')",
              "Porque el procesador se apaga por seguridad",
              "Porque PyQt borra los botones automáticamente",
              "Porque lanza un GUIError instantáneo"
            ],
            "correct": 0,
            "explanation": "El hilo principal maneja el event loop. Si se bloquea calculando o esperando red, no puede repintar la ventana ni procesar eventos del ratón."
          },
          {
            "id": "q-gui-3-2",
            "type": "multiple-choice",
            "difficulty": 3,
            "question": "¿Cómo debe un hilo secundario de backend actualizar un elemento visual (como un QLabel) en el frontend?",
            "code": null,
            "options": [
              "Emitiendo una señal pyqtSignal que el hilo principal reciba en un slot",
              "Llamando a label.setText() directamente desde el hilo secundario",
              "Modificando variables globales sin sincronización",
              "Cerrando y volviendo a abrir la ventana"
            ],
            "correct": 0,
            "explanation": "En Qt está prohibido modificar la interfaz desde hilos que no sean el hilo principal de la GUI. La forma thread-safe es emitir una señal hacia la GUI."
          },
          {
            "id": "q-gui-3-3",
            "type": "true-false",
            "difficulty": 1,
            "question": "En el patrón de diseño promovido en IIC2233, la lógica del juego o del negocio (Backend) debe ser independiente y no importar widgets de PyQt.",
            "code": null,
            "options": [
              "Verdadero",
              "Falso"
            ],
            "correct": 0,
            "explanation": "Verdadero. Separar responsabilidades permite probar la lógica sin abrir ventanas y cambiar la interfaz sin tocar las reglas del sistema."
          }
        ]
      },
      {
        "id": "gui-dev-practica",
        "name": "✍️ Desarrollo: Práctica de Señales y Widgets en PyQt",
        "questions": [
          {
            "id": "q-gui-dev-p1",
            "type": "write-code",
            "difficulty": 2,
            "question": "Escribe la línea para conectar la señal 'clicked' del botón 'self.boton' con el método 'self.iniciar_juego':",
            "code": null,
            "placeholder": "self.boton.clicked.connect(...)",
            "hints": [
              "Sintaxis: boton.clicked.connect(metodo sin parentesis)."
            ],
            "acceptedAnswers": [
              "self.boton.clicked.connect(self.iniciar_juego)",
              "self.boton.clicked.connect(self.iniciar_juego) "
            ],
            "explanation": "En PyQt la conexión entre señales y slots se realiza con señal.connect(callback), pasando la referencia a la función sin ejecutarla (sin paréntesis)."
          }
        ]
      },
      {
        "id": "gui-dev-puc",
        "name": "🎓 Desarrollo Nivel Prueba PUC: Señales Personalizadas y Concurrencia",
        "questions": [
          {
            "id": "q-gui-dev-puc1",
            "type": "write-code",
            "difficulty": 3,
            "question": "[IIC2233 Examen] Define como atributo de clase una señal personalizada 'actualizar_tablero' que emite un diccionario (dict):",
            "code": "from PyQt5.QtCore import QObject, pyqtSignal\n\nclass BackendJuego(QObject):\n    # Declara la señal pyqtSignal aquí\n    _____",
            "placeholder": "actualizar_tablero = pyqtSignal(...)",
            "hints": [
              "Usa pyqtSignal(dict).",
              "Debe ser asignada a actualizar_tablero."
            ],
            "acceptedAnswers": [
              "actualizar_tablero = pyqtSignal(dict)",
              "actualizar_tablero = pyqtSignal(dict) "
            ],
            "explanation": "Las señales personalizadas de PyQt deben definirse como atributos de clase mediante pyqtSignal(tipo_de_dato) para que el runtime de Qt las registre en el sistema de meta-objetos."
          }
        ]
      }
    ]
  },
  {
    "id": "recursion",
    "name": "Recursión",
    "icon": "🔁",
    "description": "Pensamiento recursivo, casos base, llamadas recursivas, estructuras anidadas y algoritmos de Backtracking.",
    "color": "#43C6AC",
    "lessons": [
      {
        "id": "recursion-1",
        "name": "Fundamentos de Recursión",
        "questions": [
          {
            "id": "q-rec-1-1",
            "type": "multiple-choice",
            "difficulty": 1,
            "question": "¿Cuáles son los dos componentes indispensables de toda función recursiva correcta?",
            "code": null,
            "options": [
              "Caso(s) base y caso(s) recursivo(s)",
              "Bucle while y sentencia break",
              "Bloque try y bloque except",
              "Puntero al inicio y fin de lista"
            ],
            "correct": 0,
            "explanation": "El caso base detiene la recursión retornando un valor directo; el caso recursivo reduce el problema hacia el caso base."
          },
          {
            "id": "q-rec-1-2",
            "type": "code-output",
            "difficulty": 2,
            "question": "¿Qué retorna esta función factorial con n=4?",
            "code": "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(4))",
            "options": [
              "24",
              "12",
              "16",
              "4"
            ],
            "correct": 0,
            "explanation": "factorial(4) = 4 * 3 * 2 * 1 = 24."
          },
          {
            "id": "q-rec-1-3",
            "type": "multiple-choice",
            "difficulty": 2,
            "question": "¿Qué excepción lanza Python si una función recursiva nunca alcanza su caso base?",
            "code": null,
            "options": [
              "RecursionError",
              "StackOverflowError",
              "InfiniteLoopError",
              "MemoryError"
            ],
            "correct": 0,
            "explanation": "Python lanza 'RecursionError: maximum recursion depth exceeded' cuando se supera el límite de llamadas en el call stack (típicamente 1000)."
          },
          {
            "id": "q-rec-1-4",
            "type": "fill-code",
            "difficulty": 2,
            "question": "Completa el caso base para calcular la suma de una lista recursivamente:",
            "code": "def suma(lista):\n    if _____:\n        return 0\n    return lista[0] + suma(lista[1:])",
            "options": [
              "not lista",
              "lista == 0",
              "len(lista) == 1",
              "lista is None"
            ],
            "correct": 0,
            "explanation": "Si la lista está vacía ('if not lista:' o 'if len(lista) == 0:'), la suma es 0, terminando la recursión."
          },
          {
            "id": "q-rec-1-5",
            "type": "true-false",
            "difficulty": 1,
            "question": "Cualquier algoritmo iterativo (con bucles for/while) puede expresarse también de forma recursiva.",
            "code": null,
            "options": [
              "Verdadero",
              "Falso"
            ],
            "correct": 0,
            "explanation": "Verdadero. La computación recursiva e iterativa son formalmente equivalentes en poder de cómputo (Turing-completas)."
          }
        ]
      },
      {
        "id": "recursion-2",
        "name": "Recursión en Estructuras",
        "questions": [
          {
            "id": "q-rec-2-1",
            "type": "code-output",
            "difficulty": 2,
            "question": "¿Qué calcula esta función sobre una estructura de árbol binario?",
            "code": "def contar_hojas(nodo):\n    if nodo is None:\n        return 0\n    if nodo.izq is None and nodo.der is None:\n        return 1\n    return contar_hojas(nodo.izq) + contar_hojas(nodo.der)",
            "options": [
              "El número de nodos que no tienen hijos (hojas)",
              "La altura total del árbol",
              "El valor máximo almacenado",
              "La suma de las llaves"
            ],
            "correct": 0,
            "explanation": "Si no tiene hijo izquierdo ni derecho es una hoja y suma 1; si es None suma 0; en otro caso suma las hojas de ambos subárboles."
          },
          {
            "id": "q-rec-2-2",
            "type": "code-output",
            "difficulty": 3,
            "question": "¿Cuál es la salida de aplanar (flatten) esta lista anidada?",
            "code": "def aplanar(lista):\n    resultado = []\n    for elem in lista:\n        if isinstance(elem, list):\n            resultado.extend(aplanar(elem))\n        else:\n            resultado.append(elem)\n    return resultado\n\nprint(aplanar([1, [2, [3, 4]], 5]))",
            "options": [
              "[1, 2, 3, 4, 5]",
              "[1, [2, 3, 4], 5]",
              "[[1, 2, 3, 4, 5]]",
              "[5, 4, 3, 2, 1]"
            ],
            "correct": 0,
            "explanation": "La recursión desciende en cada sublista acumulando los elementos individuales en un único nivel: [1, 2, 3, 4, 5]."
          },
          {
            "id": "q-rec-2-3",
            "type": "true-false",
            "difficulty": 2,
            "question": "En el recorrido in-order de un Árbol Binario de Búsqueda (BST), los nodos se visitan siempre en orden ascendente.",
            "code": null,
            "options": [
              "Verdadero",
              "Falso"
            ],
            "correct": 0,
            "explanation": "Verdadero. In-order visita subárbol izquierdo (menores), raíz (actual) y subárbol derecho (mayores), produciendo orden ascendente."
          }
        ]
      },
      {
        "id": "recursion-3",
        "name": "Backtracking",
        "questions": [
          {
            "id": "q-rec-3-1",
            "type": "multiple-choice",
            "difficulty": 2,
            "question": "¿En qué consiste la técnica de Backtracking (vuelta atrás)?",
            "code": null,
            "options": [
              "Explorar exhaustivamente candidatos recursivos y deshacer los pasos (retroceder) cuando un camino no es válido",
              "Invertir una lista ligada mediante punteros dobles",
              "Guardar en un archivo el estado anterior para recuperar tras un corte",
              "Reintentar peticiones HTTP fallidas con retroceso exponencial"
            ],
            "correct": 0,
            "explanation": "Backtracking construye soluciones paso a paso; tan pronto como determina que una opción no conducirá a solución válida, descarta esa rama ('poda') y retrocede."
          },
          {
            "id": "q-rec-3-2",
            "type": "multiple-choice",
            "difficulty": 3,
            "question": "En problemas de resolución de laberintos con backtracking, ¿por qué es fundamental marcar una celda como 'visitada' antes de llamar recursivamente a sus vecinos?",
            "code": null,
            "options": [
              "Para evitar ciclos infinitos volviendo a la celda de donde acabamos de venir",
              "Para calcular la distancia euclidiana al destino",
              "Porque Python exige que las matrices sean inmutables",
              "Para renderizar la celda de color rojo en pantalla"
            ],
            "correct": 0,
            "explanation": "Si no se marcan las celdas visitadas, el algoritmo oscilaría infinitamente entre celdas vecinas hasta agotar el call stack."
          },
          {
            "id": "q-rec-3-3",
            "type": "true-false",
            "difficulty": 2,
            "question": "La 'poda' (pruning) en un algoritmo de backtracking permite descartar ramas del árbol de búsqueda que no pueden contener una solución óptima o válida.",
            "code": null,
            "options": [
              "Verdadero",
              "Falso"
            ],
            "correct": 0,
            "explanation": "Verdadero. La poda ahorra tiempo computacional evitando explorar estados que sabemos de antemano que violan las restricciones."
          }
        ]
      },
      {
        "id": "rec-dev-practica",
        "name": "✍️ Desarrollo: Práctica de Algoritmos Recursivos",
        "questions": [
          {
            "id": "q-rec-dev-p1",
            "type": "write-code",
            "difficulty": 2,
            "question": "Escribe la llamada recursiva para calcular la potencia x^n sabiendo que x^n = x * x^(n-1):",
            "code": "def potencia(x, n):\n    if n == 0:\n        return 1\n    return _____",
            "placeholder": "x * potencia(...)",
            "hints": [
              "Multiplica x por la llamada a potencia con n - 1."
            ],
            "acceptedAnswers": [
              "x * potencia(x, n - 1)",
              "x * potencia(x, n-1)",
              "x*potencia(x, n-1)"
            ],
            "explanation": "El caso recursivo reduce el exponente acercándose al caso base n==0: x * potencia(x, n - 1)."
          }
        ]
      },
      {
        "id": "rec-dev-puc",
        "name": "🎓 Desarrollo Nivel Prueba PUC: Backtracking y Recursión Estructural",
        "questions": [
          {
            "id": "q-rec-dev-puc1",
            "type": "write-code",
            "difficulty": 3,
            "question": "[IIC2233 Examen] En un recorrido recursivo de un Árbol Binario, completa la condición de caso base cuando el nodo es None:",
            "code": "def buscar_nodo(nodo, valor):\n    # Caso base si el nodo no existe\n    if _____:\n        return False\n    if nodo.val == valor:\n        return True\n    return buscar_nodo(nodo.izq, valor) or buscar_nodo(nodo.der, valor)",
            "placeholder": "nodo is None",
            "hints": [
              "Usa 'nodo is None' o 'not nodo'."
            ],
            "acceptedAnswers": [
              "nodo is None",
              "not nodo",
              "nodo == None"
            ],
            "explanation": "En las preguntas de árboles de IIC2233, el caso base fundamental es 'if nodo is None:', retornando el valor neutro de búsqueda (False o None) al alcanzar ramas vacías."
          }
        ]
      }
    ]
  }
];

window.DUOPROGRA_PARTE2.simulacros = [
  {
    "id": "i1",
    "name": "Simulacro Interrogación 1 (I1)",
    "description": "Evaluación integral de la primera mitad: OOP Básico, OOP Avanzado (Herencia, Polimorfismo, MRO, Abstractas) y Estructuras de Datos Built-in.",
    "timeMinutes": 80,
    "passingScore": 60,
    "questions": [
      {
        "id": "q-sim1-1",
        "type": "code-output",
        "difficulty": 2,
        "question": "¿Qué imprime el siguiente código?",
        "code": "class A:\n    x = 10\n    def __init__(self):\n        self.x = 20\n\na = A()\nprint(A.x, a.x)",
        "options": [
          "10 20",
          "20 20",
          "10 10",
          "Error"
        ],
        "correct": 0,
        "explanation": "A.x accede al atributo de clase (10). a.x accede al atributo de instancia (20) que ensombrece al de clase."
      },
      {
        "id": "q-sim1-2",
        "type": "code-output",
        "difficulty": 3,
        "question": "¿Cuál es el orden de resolución de métodos (MRO) en esta herencia?",
        "code": "class A:\n    pass\nclass B(A):\n    pass\nclass C(A):\n    pass\nclass D(B, C):\n    pass\n\nprint([cls.__name__ for cls in D.__mro__[:4]])",
        "options": [
          "['D', 'B', 'C', 'A']",
          "['D', 'B', 'A', 'C']",
          "['D', 'C', 'B', 'A']",
          "['D', 'A', 'B', 'C']"
        ],
        "correct": 0,
        "explanation": "El algoritmo C3 Linearization resuelve primero D, luego la rama izquierda B, luego la rama derecha C, y finalmente la base común A y object."
      },
      {
        "id": "q-sim1-3",
        "type": "code-output",
        "difficulty": 2,
        "question": "¿Qué imprime este uso de super()?",
        "code": "class Base:\n    def saludo(self):\n        return 'Base'\n\nclass Derivada(Base):\n    def saludo(self):\n        return super().saludo() + ' -> Derivada'\n\nprint(Derivada().saludo())",
        "options": [
          "Base -> Derivada",
          "Derivada",
          "Base",
          "Error de recursión"
        ],
        "correct": 0,
        "explanation": "super().saludo() invoca la implementación en Base ('Base') y le concatena ' -> Derivada'."
      },
      {
        "id": "q-sim1-4",
        "type": "fill-code",
        "difficulty": 2,
        "question": "¿Cómo se define un método abstracto en Python con el módulo abc?",
        "code": "from abc import ABC, abstractmethod\n\nclass Figura(ABC):\n    _____\n    def area(self):\n        pass",
        "options": [
          "@abstractmethod",
          "@property",
          "@staticmethod",
          "@abstract"
        ],
        "correct": 0,
        "explanation": "El decorador correcto es @abstractmethod del módulo estándar 'abc'."
      },
      {
        "id": "q-sim1-5",
        "type": "code-output",
        "difficulty": 3,
        "question": "¿Qué valor tiene 'b' tras ejecutar este desempaquetado?",
        "code": "a, *b, c = [10, 20, 30, 40, 50]\nprint(b)",
        "options": [
          "[20, 30, 40]",
          "(20, 30, 40)",
          "[20, 30, 40, 50]",
          "20"
        ],
        "correct": 0,
        "explanation": "El operador '*' en desempaquetado captura los elementos intermedios siempre en una lista estándar [20, 30, 40]."
      },
      {
        "id": "q-sim1-6",
        "type": "multiple-choice",
        "difficulty": 2,
        "question": "¿Qué ocurre si intentas usar una lista como clave de un diccionario en Python?",
        "code": null,
        "options": [
          "Lanza TypeError: unhashable type: 'list'",
          "Python la convierte automáticamente a tupla",
          "Funciona correctamente",
          "Lanza KeyError"
        ],
        "correct": 0,
        "explanation": "Las listas son mutables y por ende no tienen función de hash (__hash__ es None). Las claves de dict deben ser hashables."
      },
      {
        "id": "q-sim1-7",
        "type": "code-output",
        "difficulty": 2,
        "question": "¿Qué imprime este código que usa defaultdict?",
        "code": "from collections import defaultdict\nd = defaultdict(int)\nd['a'] += 5\nprint(d['b'], d['a'])",
        "options": [
          "0 5",
          "None 5",
          "KeyError",
          "0 0"
        ],
        "correct": 0,
        "explanation": "defaultdict(int) inicializa automáticamente cualquier clave inexistente llamando a int(), que retorna 0."
      },
      {
        "id": "q-sim1-8",
        "type": "code-output",
        "difficulty": 2,
        "question": "¿Cuál es la salida de sobrecargar el operador '+' con __add__?",
        "code": "class Vector:\n    def __init__(self, x):\n        self.x = x\n    def __add__(self, otro):\n        return Vector(self.x + otro.x)\n\nv = Vector(3) + Vector(4)\nprint(v.x)",
        "options": [
          "7",
          "Vector(7)",
          "Error de tipo",
          "None"
        ],
        "correct": 0,
        "explanation": "v1 + v2 invoca v1.__add__(v2), que retorna una nueva instancia con x = 3 + 4 = 7."
      },
      {
        "id": "q-sim1-9",
        "type": "true-false",
        "difficulty": 1,
        "question": "En Python, los métodos mágicos __repr__ y __str__ tienen el mismo propósito: __str__ está pensado para ser informal/legible por usuarios y __repr__ formal/inequívoco para desarrolladores.",
        "code": null,
        "options": [
          "Verdadero",
          "Falso"
        ],
        "correct": 0,
        "explanation": "Verdadero. Si no se define __str__, Python recurre a __repr__ como alternativa por defecto."
      },
      {
        "id": "q-sim1-10",
        "type": "code-output",
        "difficulty": 3,
        "question": "¿Qué imprime la siguiente función con *args y **kwargs?",
        "code": "def func(*args, **kwargs):\n    return len(args) + len(kwargs)\n\nprint(func(1, 2, a=3, b=4, c=5))",
        "options": [
          "5",
          "2",
          "3",
          "0"
        ],
        "correct": 0,
        "explanation": "args recibe la tupla (1, 2) con longitud 2. kwargs recibe {'a': 3, 'b': 4, 'c': 5} con longitud 3. 2 + 3 = 5."
      },
      {
        "id": "q-sim1-11",
        "type": "fill-code",
        "difficulty": 2,
        "question": "Completa el decorador setter para la propiedad 'radio':",
        "code": "class Circulo:\n    def __init__(self, radio):\n        self._radio = radio\n    @property\n    def radio(self):\n        return self._radio\n    _____\n    def radio(self, valor):\n        self._radio = max(0, valor)",
        "options": [
          "@radio.setter",
          "@setter",
          "@property.setter",
          "@radio.set"
        ],
        "correct": 0,
        "explanation": "Para definir el setter de una propiedad ya decorada con @property, se utiliza @<nombre_propiedad>.setter."
      },
      {
        "id": "q-sim1-12",
        "type": "code-output",
        "difficulty": 2,
        "question": "¿Qué operación de conjuntos representa el operador '|'?",
        "code": "s1 = {1, 2, 3}\ns2 = {3, 4, 5}\nprint(s1 | s2)",
        "options": [
          "{1, 2, 3, 4, 5}",
          "{3}",
          "{1, 2, 4, 5}",
          "{1, 2}"
        ],
        "correct": 0,
        "explanation": "'|' es la unión de conjuntos; '&' es la intersección; '-' es la diferencia y '^' la diferencia simétrica."
      }
    ]
  },
  {
    "id": "i2",
    "name": "Simulacro Interrogación 2 (I2)",
    "description": "Evaluación integral de la segunda mitad: Estructuras Nodales, Excepciones, Threading, Networking y Serialización.",
    "timeMinutes": 80,
    "passingScore": 60,
    "questions": [
      {
        "id": "q-sim2-1",
        "type": "multiple-choice",
        "difficulty": 2,
        "question": "En una Pila (Stack) implementada con lista enlazada donde push() y pop() operan al inicio (cabeza), ¿cuál es la complejidad temporal de ambas operaciones?",
        "code": null,
        "options": [
          "O(1) ambas",
          "O(n) push y O(1) pop",
          "O(1) push y O(n) pop",
          "O(log n) ambas"
        ],
        "correct": 0,
        "explanation": "Insertar y remover en la cabeza de una lista enlazada requiere solo actualizar el puntero head, operación de tiempo constante O(1)."
      },
      {
        "id": "q-sim2-2",
        "type": "code-output",
        "difficulty": 2,
        "question": "¿Qué bloque de esta estructura try/except/else/finally se ejecuta SIEMPRE, haya o no excepción?",
        "code": "try:\n    x = 1 / 1\nexcept ZeroDivisionError:\n    print('Error')\nelse:\n    print('Éxito')\nfinally:\n    print('Siempre')",
        "options": [
          "finally",
          "else",
          "except",
          "try y else"
        ],
        "correct": 0,
        "explanation": "El bloque 'finally' está garantizado a ejecutarse siempre, incluso si hay return o si ocurre una excepción no capturada."
      },
      {
        "id": "q-sim2-3",
        "type": "code-output",
        "difficulty": 2,
        "question": "¿Qué imprime este código si la división es exitosa?",
        "code": "try:\n    res = 10 / 2\nexcept ZeroDivisionError:\n    print('Zero')\nelse:\n    print(f'Res: {int(res)}')",
        "options": [
          "Res: 5",
          "Zero",
          "5",
          "Nada"
        ],
        "correct": 0,
        "explanation": "El bloque 'else' se ejecuta si y solo si el bloque 'try' terminó sin levantar ninguna excepción."
      },
      {
        "id": "q-sim2-4",
        "type": "multiple-choice",
        "difficulty": 2,
        "question": "¿Por qué un servidor concurrente TCP debe ejecutar t.join() con cuidado o no ejecutarlo en el bucle principal de accept()?",
        "code": null,
        "options": [
          "Porque si hace join() inmediatamente después de start(), el servidor se bloqueará esperando a ese cliente y no podrá atender a nadie más",
          "Porque join() cierra el socket del cliente",
          "Porque join() duplica la memoria del proceso",
          "Porque join() cancela el hilo"
        ],
        "correct": 0,
        "explanation": "Si ejecutas t.join() en el hilo principal justo tras arrancar t, el hilo principal no volverá al accept() hasta que ese cliente se desconecte, perdiendo la concurrencia."
      },
      {
        "id": "q-sim2-5",
        "type": "code-output",
        "difficulty": 3,
        "question": "¿Qué condición de error genera este código en concurrencia?",
        "code": "l1 = threading.Lock()\nl2 = threading.Lock()\n# Hilo 1 toma l1 luego l2\n# Hilo 2 toma l2 luego l1",
        "options": [
          "Deadlock (Interbloqueo)",
          "Race Condition",
          "Starvation",
          "Memory Leak"
        ],
        "correct": 0,
        "explanation": "Adquirir múltiples cerraduras en orden inverso entre dos hilos es la causa clásica de Deadlock: cada hilo espera el recurso que el otro posee."
      },
      {
        "id": "q-sim2-6",
        "type": "multiple-choice",
        "difficulty": 2,
        "question": "¿Cuál es la forma correcta de definir una excepción personalizada en Python?",
        "code": null,
        "options": [
          "class MiError(Exception): pass",
          "def MiError(): raise Exception",
          "class MiError: pass",
          "MiError = Exception.new()"
        ],
        "correct": 0,
        "explanation": "Todas las excepciones personalizadas deben heredar directa o indirectamente de la clase base built-in 'Exception'."
      },
      {
        "id": "q-sim2-7",
        "type": "code-output",
        "difficulty": 2,
        "question": "¿Qué devuelve 'json.loads' al recibir un string JSON '{\"a\": 1, \"b\": true}'?",
        "code": "import json\nd = json.loads('{\"a\": 1, \"b\": true}')\nprint(d['b'])",
        "options": [
          "True",
          "true",
          "'true'",
          "1"
        ],
        "correct": 0,
        "explanation": "JSON 'true' se mapea al booleano nativo 'True' en Python."
      },
      {
        "id": "q-sim2-8",
        "type": "fill-code",
        "difficulty": 2,
        "question": "¿Cómo se asocia la IP y puerto al socket del servidor antes de llamar a listen()?",
        "code": "import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns._____(('localhost', 8080))\ns.listen()",
        "options": [
          "bind",
          "connect",
          "attach",
          "set_address"
        ],
        "correct": 0,
        "explanation": "El servidor usa bind() para vincular su socket a una tupla (host, port). El cliente usa connect()."
      },
      {
        "id": "q-sim2-9",
        "type": "multiple-choice",
        "difficulty": 2,
        "question": "En una cola (Queue) con lista ligada, ¿dónde conviene insertar y dónde eliminar para tener O(1) en ambas operaciones?",
        "code": null,
        "options": [
          "Insertar al final (tail) con puntero a cola y eliminar al inicio (head)",
          "Insertar al inicio y eliminar al final sin puntero a cola",
          "Ambas operaciones en la misma posición",
          "Solo es posible con arreglos, no con listas ligadas"
        ],
        "correct": 0,
        "explanation": "Manteniendo punteros a head y tail: eliminar de head es O(1) e insertar en tail es O(1). Eliminar de tail sería O(n) en lista simplemente ligada."
      },
      {
        "id": "q-sim2-10",
        "type": "true-false",
        "difficulty": 1,
        "question": "En Python, un objeto generador creado con 'yield' se puede recorrer múltiples veces con bucles 'for' sin necesidad de volver a invocar la función generadora.",
        "code": null,
        "options": [
          "Verdadero",
          "Falso"
        ],
        "correct": 1,
        "explanation": "Falso. Los generadores son de un solo uso (iteradores de un solo pase). Una vez consumidos, quedan agotados y lanzan StopIteration."
      }
    ]
  },
  {
    "id": "examen",
    "name": "Simulacro Examen Final",
    "description": "Examen comprensivo que cubre la totalidad de contenidos de IIC2233: OOP, Estructuras, Concurrencia, Redes, GUI, Recursión y Arquitectura de Software.",
    "timeMinutes": 120,
    "passingScore": 55,
    "questions": [
      {
        "id": "q-sim-ex-1",
        "type": "code-output",
        "difficulty": 3,
        "question": "¿Qué imprime este generador infinito con itertools o yield?",
        "code": "def gen():\n    x = 1\n    while True:\n        yield x\n        x *= 2\n\ng = gen()\nprint([next(g) for _ in range(4)])",
        "options": [
          "[1, 2, 4, 8]",
          "[1, 2, 3, 4]",
          "[2, 4, 8, 16]",
          "Error: bucle infinito"
        ],
        "correct": 0,
        "explanation": "Gracias a 'lazy evaluation', el generador solo calcula el siguiente valor al ser llamado con next(g). 1, 2, 4, 8."
      },
      {
        "id": "q-sim-ex-2",
        "type": "code-output",
        "difficulty": 3,
        "question": "¿Cuál es la salida de este código con métodos mágicos?",
        "code": "class Caja:\n    def __init__(self, items):\n        self.items = list(items)\n    def __len__(self):\n        return len(self.items)\n    def __getitem__(self, idx):\n        return self.items[idx] * 10\n\nc = Caja([1, 2, 3])\nprint(len(c), c[1])",
        "options": [
          "3 20",
          "3 2",
          "3 10",
          "Error de indexación"
        ],
        "correct": 0,
        "explanation": "len(c) invoca __len__ (3). c[1] invoca __getitem__(1) retornando self.items[1] * 10 = 2 * 10 = 20."
      },
      {
        "id": "q-sim-ex-3",
        "type": "code-output",
        "difficulty": 2,
        "question": "¿Qué orden de recorrido de árbol binario imprime primero la raíz, luego izquierdo y luego derecho?",
        "code": "def recorrido(nodo):\n    if nodo:\n        print(nodo.val)\n        recorrido(nodo.izq)\n        recorrido(nodo.der)",
        "options": [
          "Pre-order",
          "In-order",
          "Post-order",
          "Level-order"
        ],
        "correct": 0,
        "explanation": "Pre-order procesa primero la raíz actual, luego el subárbol izquierdo y finalmente el subárbol derecho."
      },
      {
        "id": "q-sim-ex-4",
        "type": "multiple-choice",
        "difficulty": 3,
        "question": "En PyQt, si un hilo secundario emite una señal que está conectada a un slot en la ventana principal, ¿en qué hilo se ejecuta el slot?",
        "code": null,
        "options": [
          "En el hilo principal de la GUI de forma automática y segura (Queued Connection)",
          "En el hilo secundario",
          "En un nuevo hilo creado por Qt",
          "Lanza un error de hilo cruzado"
        ],
        "correct": 0,
        "explanation": "Qt detecta que emisor y receptor viven en hilos distintos y despacha el slot a través de la cola de eventos del hilo principal (QueuedConnection), garantizando thread safety."
      },
      {
        "id": "q-sim-ex-5",
        "type": "code-output",
        "difficulty": 3,
        "question": "¿Qué imprime la función recursiva de Fibonacci optimizada o con caso base?",
        "code": "def f(n):\n    if n <= 1:\n        return n\n    return f(n-1) + f(n-2)\n\nprint(f(5))",
        "options": [
          "5",
          "8",
          "3",
          "13"
        ],
        "correct": 0,
        "explanation": "f(0)=0, f(1)=1, f(2)=1, f(3)=2, f(4)=3, f(5)=5."
      },
      {
        "id": "q-sim-ex-6",
        "type": "code-output",
        "difficulty": 2,
        "question": "¿Qué imprime la combinación de map y filter?",
        "code": "nums = [1, 2, 3, 4, 5, 6]\nres = list(map(lambda x: x * 2, filter(lambda x: x % 2 == 0, nums)))\nprint(res)",
        "options": [
          "[4, 8, 12]",
          "[2, 4, 6]",
          "[2, 6, 10]",
          "[4, 16, 36]"
        ],
        "correct": 0,
        "explanation": "filter selecciona los pares: [2, 4, 6]. map los multiplica por 2: [4, 8, 12]."
      },
      {
        "id": "q-sim-ex-7",
        "type": "multiple-choice",
        "difficulty": 2,
        "question": "¿Cuál es la principal ventaja de utilizar un 'generator expression' (x for x in data) frente a una 'list comprehension' [x for x in data]?",
        "code": null,
        "options": [
          "Consume O(1) memoria porque produce elementos bajo demanda uno a uno",
          "Ejecuta en múltiples núcleos de CPU concurrentemente",
          "Permite indexar elementos con corchetes g[0]",
          "Es inmutable como una tupla"
        ],
        "correct": 0,
        "explanation": "La expresión generadora usa evaluación perezosa (lazy evaluation) y no almacena toda la colección en RAM, consumiendo memoria constante O(1)."
      },
      {
        "id": "q-sim-ex-8",
        "type": "code-output",
        "difficulty": 3,
        "question": "¿Cuál es la salida de este código con herencia múltiple y llamada a super()?",
        "code": "class Base:\n    def accion(self):\n        print('Base')\n\nclass Izq(Base):\n    def accion(self):\n        super().accion()\n        print('Izq')\n\nclass Der(Base):\n    def accion(self):\n        super().accion()\n        print('Der')\n\nclass Final(Izq, Der):\n    def accion(self):\n        super().accion()\n        print('Final')\n\nFinal().accion()",
        "options": [
          "Base\\nDer\\nIzq\\nFinal",
          "Base\\nIzq\\nDer\\nFinal",
          "Final\\nIzq\\nDer\\nBase",
          "Error de ambigüedad"
        ],
        "correct": 0,
        "explanation": "MRO de Final es [Final, Izq, Der, Base]. Cada super() delega al siguiente en el MRO antes de imprimir su propio mensaje, por lo que imprime en el retorno del stack: Base, luego Der, luego Izq y finalmente Final."
      },
      {
        "id": "q-sim-ex-9",
        "type": "multiple-choice",
        "difficulty": 2,
        "question": "¿Qué método permite esperar a que una condición se cumpla entre hilos usando threading.Event?",
        "code": null,
        "options": [
          "event.wait()",
          "event.sleep()",
          "event.block()",
          "event.listen()"
        ],
        "correct": 0,
        "explanation": "threading.Event().wait() bloquea el hilo hasta que otro hilo invoque event.set()."
      },
      {
        "id": "q-sim-ex-10",
        "type": "true-false",
        "difficulty": 1,
        "question": "En Python, los parámetros por defecto mutables (como def f(lista=[]):) conservan sus modificaciones entre distintas llamadas a la función.",
        "code": null,
        "options": [
          "Verdadero",
          "Falso"
        ],
        "correct": 0,
        "explanation": "Verdadero. La lista por defecto se evalúa una sola vez al definir la función, por lo que es compartida por todas las invocaciones posteriores si no se suministra argumento."
      }
    ]
  }
];
window.DUOPROGRA_SIMULACROS = window.DUOPROGRA_PARTE2.simulacros;
