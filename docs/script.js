const courseData = {
    programming: {
        title: "Programación (JavaScript)",
        levels: [
            {
                id: 1,
                title: "Nivel 1: Lógica y Algoritmos",
                lesson: {
                    title: "Pensamiento Lógico",
                    content: `
                        <h2>Fundamentos de la Lógica</h2>
                        <p>Antes de codificar, debemos pensar como una computadora. Esto implica desglosar problemas en pasos pequeños (algoritmos) y entender el flujo de control.</p>
                        <h3>Conceptos Clave:</h3>
                        <ul>
                            <li><strong>Secuencia:</strong> El orden importa. Las instrucciones se ejecutan una tras otra.</li>
                            <li><strong>Selección (If/Else):</strong> Tomar decisiones basadas en condiciones.</li>
                            <li><strong>Iteración (Bucles):</strong> Repetir acciones hasta que se cumpla una condición.</li>
                        </ul>
                    `
                },
                game: {
                    type: "mixed",
                    title: "Desafíos de Algoritmia",
                    exercises: [
                        // 1. Tipo de empleado
                        {
                            type: "sorter",
                            title: "1.-Tipo de empleado",
                            instruction: `Una empresa identifica el tipo de empleado:

1 → Administrativo

2 → Operativo

3 → Gerente`,
                            lines: [
                                "Inicio",
                                "Leer tipoEmpleado",
                                "Según tipoEmpleado Hacer",
                                "   Caso 1:",
                                "      Escribir \"Empleado administrativo\"",
                                "   Caso 2:",
                                "      Escribir \"Empleado operativo\"",
                                "   Caso 3:",
                                "      Escribir \"Empleado gerente\"",
                                "   Caso SiNo:",
                                "      Escribir \"Tipo no válido\"",
                                "FinSegún",
                                "Fin"
                            ]
                        },

                        // 2. Meta de ventas mensual
                        {
                            type: "flowchart-free",
                            title: "2.-  Meta de ventas mensual",
                            instruction: `Diseña un diagrama de flujo que:

Pida:

Meta de ventas

Ventas realizadas

Evaluación:

Si ventas ≥ meta → "Meta alcanzada"

Si ventas ≥ 80% de la meta → "Cerca de la meta"

Si ventas < 80% de la meta → "Meta no alcanzada"

Mostrar el porcentaje de cumplimiento`,
                            items: [
                                { id: "s", text: "Inicio" },
                                { id: "inp", text: "Leer Meta y Ventas" },
                                { id: "c1", text: "¿Ventas ≥ Meta?" },
                                { id: "r1", text: "\"Meta alcanzada\"" },
                                { id: "c2", text: "¿Ventas ≥ 80% Meta?" },
                                { id: "r2", text: "\"Cerca de la meta\"" },
                                { id: "r3", text: "\"Meta no alcanzada\"" },
                                { id: "calc", text: "Mostrar % Cumplimiento" },
                                { id: "f", text: "Fin" }
                            ],
                            solution: {
                                nodes: [
                                    { contentId: "s" }, { contentId: "inp" }, { contentId: "c1" },
                                    { contentId: "r1" }, { contentId: "c2" }, { contentId: "r2" },
                                    { contentId: "r3" }, { contentId: "calc" }, { contentId: "f" }
                                ],
                                edges: [
                                    ["s", "inp"],
                                    ["inp", "c1"],
                                    ["c1", "r1"], // Si
                                    ["c1", "c2"], // No
                                    ["c2", "r2"], // Si
                                    ["c2", "r3"], // No
                                    ["r1", "calc"],
                                    ["r2", "calc"],
                                    ["r3", "calc"],
                                    ["calc", "f"]
                                ]
                            }
                        },

                        // 3. Comisión de Ventas
                        {
                            type: "flowchart-free",
                            title: "3.- Diseña un diagrama de flujo que:", // User requested title matched to input structure
                            instruction: `Pida el monto de ventas del mes

Calcule la comisión según:

Ventas ≥ $20,000 → comisión 15%

Ventas entre $10,000 y $19,999 → comisión 10%

Ventas < $10,000 → comisión 5%

Muestre el monto de la comisión y el total a recibir`,
                            items: [
                                { id: "s", text: "Inicio" },
                                { id: "inp", text: "Leer Ventas" },
                                { id: "c1", text: "¿Ventas ≥ 20,000?" },
                                { id: "r1", text: "Comisión = 15%" },
                                { id: "c2", text: "¿Ventas ≥ 10,000?" },
                                { id: "r2", text: "Comisión = 10%" },
                                { id: "r3", text: "Comisión = 5%" },
                                { id: "out", text: "Mostrar Comisión y Total" },
                                { id: "f", text: "Fin" }
                            ],
                            solution: {
                                nodes: [
                                    { contentId: "s" }, { contentId: "inp" }, { contentId: "c1" },
                                    { contentId: "r1" }, { contentId: "c2" }, { contentId: "r2" },
                                    { contentId: "r3" }, { contentId: "out" }, { contentId: "f" }
                                ],
                                edges: [
                                    ["s", "inp"],
                                    ["inp", "c1"],
                                    ["c1", "r1"],
                                    ["c1", "c2"],
                                    ["c2", "r2"],
                                    ["c2", "r3"],
                                    ["r1", "out"],
                                    ["r2", "out"],
                                    ["r3", "out"],
                                    ["out", "f"]
                                ]
                            }
                        },

                        // 4. Evaluación de crédito
                        {
                            type: "flowchart-free",
                            title: "4.- Evaluación de crédito",
                            instruction: `Diseña un diagrama de flujo que:

Pida:

Ingresos mensuales

Historial crediticio (Bueno o Malo)

Decida si el crédito es aprobado:

Si ingresos ≥ $15,000 y historial bueno → "Crédito aprobado"

Si ingresos ≥ $15,000 y historial malo → "Aprobado con condiciones"

Si ingresos < $15,000 → "Crédito rechazado"`,
                            items: [
                                { id: "s", text: "Inicio" },
                                { id: "inp", text: "Leer Ingresos/Historial" },
                                { id: "c1", text: "¿Ingresos ≥ 15,000?" },
                                { id: "c2", text: "¿Historial Bueno?" },
                                { id: "r1", text: "\"Crédito aprobado\"" },
                                { id: "r2", text: "\"Aprobado con condiciones\"" },
                                { id: "r3", text: "\"Crédito rechazado\"" },
                                { id: "f", text: "Fin" }
                            ],
                            solution: {
                                nodes: [
                                    { contentId: "s" }, { contentId: "inp" }, { contentId: "c1" },
                                    { contentId: "c2" }, { contentId: "r1" }, { contentId: "r2" },
                                    { contentId: "r3" }, { contentId: "f" }
                                ],
                                edges: [
                                    ["s", "inp"],
                                    ["inp", "c1"],
                                    ["c1", "c2"], // Si ingresos >= 15000
                                    ["c1", "r3"], // No
                                    ["c2", "r1"], // Historial Bueno
                                    ["c2", "r2"], // Historial Malo
                                    ["r1", "f"],
                                    ["r2", "f"],
                                    ["r3", "f"]
                                ]
                            }
                        },

                        // 5. Precio con impuestos y envío
                        {
                            type: "flowchart-free",
                            title: "5.- Precio con impuestos y envío",
                            instruction: `Diseña un diagrama de flujo que:

Pida:

Precio del producto

¿Es envío nacional o internacional?

Cálculos:

Impuesto:

Nacional → 16%

Internacional → 25%

Envío:

Compra ≥ $2,000 → envío gratis

Compra < $2,000 → $150 de envío

Mostrar el total final`,
                            items: [
                                { id: "s", text: "Inicio" },
                                { id: "inp", text: "Leer Precio y Tipo" },
                                { id: "c1", text: "¿Es Nacional?" },
                                { id: "t1", text: "Impuesto = 16%" },
                                { id: "t2", text: "Impuesto = 25%" },
                                { id: "c2", text: "¿Compra ≥ 2,000?" },
                                { id: "e1", text: "Envío Gratis" },
                                { id: "e2", text: "Envío $150" },
                                { id: "out", text: "Mostrar Total" },
                                { id: "f", text: "Fin" }
                            ],
                            solution: {
                                nodes: [
                                    { contentId: "s" }, { contentId: "inp" }, { contentId: "c1" },
                                    { contentId: "t1" }, { contentId: "t2" }, { contentId: "c2" },
                                    { contentId: "e1" }, { contentId: "e2" }, { contentId: "out" }, { contentId: "f" }
                                ],
                                edges: [
                                    ["s", "inp"],
                                    ["inp", "c1"],
                                    ["c1", "t1"],
                                    ["c1", "t2"],
                                    ["t1", "c2"],
                                    ["t2", "c2"],
                                    ["c2", "e1"],
                                    ["c2", "e2"],
                                    ["e1", "out"],
                                    ["e2", "out"],
                                    ["out", "f"]
                                ]
                            }
                        },

                        // 6. Tipo de empleado (Pseudocódigo) - Same as 1 but with "Caso:"
                        {
                            type: "sorter",
                            title: "6.- Tipo de empleado",
                            instruction: `Caso:
Una empresa identifica el tipo de empleado:

1 → Administrativo

2 → Operativo

3 → Gerente`,
                            lines: [
                                "Inicio",
                                "Leer tipoEmpleado",
                                "Según tipoEmpleado Hacer",
                                "   Caso 1:",
                                "      Escribir \"Empleado administrativo\"",
                                "   Caso 2:",
                                "      Escribir \"Empleado operativo\"",
                                "   Caso 3:",
                                "      Escribir \"Empleado gerente\"",
                                "   Caso SiNo:",
                                "      Escribir \"Tipo no válido\"",
                                "FinSegún",
                                "Fin"
                            ]
                        },

                        // 7. Cantidad de productos vendidos
                        {
                            type: "sorter",
                            title: "7.- Cantidad de productos vendidos",
                            instruction: `Una tienda registra las ventas de 7 días y muestra el total vendido`,
                            lines: [
                                "Inicio",
                                "total ← 0",
                                "Para dia ← 1 Hasta 7 Hacer",
                                "   Leer venta",
                                "   total ← total + venta",
                                "FinPara",
                                "Escribir total",
                                "Fin"
                            ]
                        },

                        // 8. Ciclos
                        {
                            type: "sorter",
                            title: "8.- ciclos",
                            instruction: `Una empresa ingresa montos de ventas hasta que el usuario escriba 0.`,
                            lines: [
                                "Inicio",
                                "total ← 0",
                                "Repetir",
                                "   Leer venta",
                                "   total ← total + venta",
                                "Hasta Que venta = 0",
                                "Escribir total",
                                "Fin"
                            ]
                        },

                        // 9. Promedio de gastos
                        {
                            type: "sorter",
                            title: "9.- Promedio de gastos",
                            instruction: `calcule la media de gastos realizados en X cantidad de meses definidos.`,
                            lines: [
                                "Inicio",
                                "Escribir \"Ingrese la cantidad de meses:\"",
                                "Leer meses",
                                "suma ← 0",
                                "Para i ← 1 Hasta meses Hacer",
                                "   Escribir \"Ingrese gasto del mes \", i",
                                "   Leer gasto",
                                "   suma ← suma + gasto",
                                "FinPara",
                                "media ← suma / meses",
                                "Escribir \"La media de gastos es: \", media",
                                "Fin"
                            ]
                        },

                        // 10. Venta con descuento y recargo (compacto)
                        {
                            type: "flowchart-free",
                            title: "10.-Venta con descuento y recargo (compacto)",
                            instruction: `Diseña un diagrama de flujo para una venta que haga lo siguiente:

Entrada de datos

Monto de la compra

Tipo de cliente (Normal o VIP)

Forma de pago (Efectivo o Tarjeta)

2️ Proceso: Descuento por tipo de cliente

Si el cliente es VIP → 15% de descuento

Si es Normal → 5% de descuento

3️ Decisión: Forma de pago

Si paga en Efectivo → 5% de descuento adicional

Si paga con Tarjeta → 10% de recargo

4️ Proceso: Total final

Calcular el total final aplicando:

Descuentos

Recargo (si aplica)

5️ Decisión final

Si el total final ≥ $5,000 → Mostrar "Venta importante"

Si es menor → Mostrar "Venta regular"

6 Salida

Mostrar:

Monto original

Total de descuentos

Recargo (si hubo)

Total a pagar

Mensaje final`,
                            isExpanded: true,
                            items: [
                                { id: "s", text: "Inicio" },
                                { id: "inp", text: "Leer Datos" },
                                { id: "vip", text: "¿Es VIP?" },
                                { id: "d1", text: "Desc 15%" },
                                { id: "d2", text: "Desc 5%" },
                                { id: "pago", text: "¿Efectivo?" },
                                { id: "d3", text: "Desc Extra 5%" },
                                { id: "r1", text: "Recargo 10%" },
                                { id: "tot", text: "Calc Total Final" },
                                { id: "chk", text: "¿Total ≥ 5,000?" },
                                { id: "msg1", text: "\"Venta importante\"" },
                                { id: "msg2", text: "\"Venta regular\"" },
                                { id: "out", text: "Mostrar Todo" },
                                { id: "f", text: "Fin" }
                            ],
                            solution: {
                                nodes: [
                                    { contentId: "s" }, { contentId: "inp" }, { contentId: "vip" },
                                    { contentId: "d1" }, { contentId: "d2" }, { contentId: "pago" },
                                    { contentId: "d3" }, { contentId: "r1" }, { contentId: "tot" },
                                    { contentId: "chk" }, { contentId: "msg1" }, { contentId: "msg2" },
                                    { contentId: "out" }, { contentId: "f" }
                                ],
                                edges: [
                                    ["s", "inp"],
                                    ["inp", "vip"],
                                    ["vip", "d1"],
                                    ["vip", "d2"],
                                    ["d1", "pago"],
                                    ["d2", "pago"],
                                    ["pago", "d3"],
                                    ["pago", "r1"],
                                    ["d3", "tot"],
                                    ["r1", "tot"],
                                    ["tot", "chk"],
                                    ["chk", "msg1"],
                                    ["chk", "msg2"],
                                    ["msg1", "out"],
                                    ["msg2", "out"],
                                    ["out", "f"]
                                ]
                            }
                        }
                    ]
                }
            },
            {
                id: 2,
                title: "Nivel 2: DOM y Web Interitiva",
                lesson: {
                    title: "El Document Object Model (DOM)",
                    content: `
                        <h2>Controlando la Web</h2>
                        <p>El DOM es la estructura de árbol que representa tu página HTML. Con JavaScript, podemos modificarlo en tiempo real.</p>
                        <div class="code-block">document.getElementById('miBoton').style.color = 'red';</div>
                        <p>CSS Grid y Flexbox son esenciales para maquetar estos elementos de forma profesional.</p>
                    `
                },
                game: {
                    type: "mixed",
                    title: "Maestría Web",
                    exercises: [
                        { type: "match", title: "Selectores CSS", pairs: [{ es: ".clase", en: "Class" }, { es: "#id", en: "ID" }, { es: "*", en: "Universal" }, { es: "div > p", en: "Hijo directo" }] },
                        { type: "builder", title: "Crear Elemento", challenges: [{ goal: "Crear un div nuevo", correct: "const div = document.createElement('div')", blocks: ["const", "div", "=", "document.createElement('div')", "new Div()", ".append()"] }] },
                        { type: "quiz-item", question: "¿Qué propiedad cambia el color de fondo?", options: ["color", "background-color", "bg-color", "area-color"], correct: 1 },
                        { type: "sorter", title: "CSS Grid Layout", lines: [".container {", "  display: grid;", "  grid-template-columns: 1fr 1fr;", "  gap: 20px;", "}"] },
                        { type: "match", title: "Eventos JS", pairs: [{ es: "Click", en: "onclick" }, { es: "Cambio Input", en: "onchange" }, { es: "Envío Form", en: "onsubmit" }, { es: "Mouse Encima", en: "onmouseover" }] },
                        { type: "builder", title: "Query Selector", challenges: [{ goal: "Seleccionar botón con clase 'btn'", correct: "document.querySelector('.btn')", blocks: ["document", ".querySelector('.btn')", ".getElementById('btn')", "$('.btn')"] }] },
                        { type: "quiz-item", question: "¿Qué hace `display: flex;` por defecto?", options: ["Pone elementos en columna", "Pone elementos en fila", "Oculta elementos", "Centra todo"], correct: 1 },
                        { type: "sorter", title: "Estructura HTML5", lines: ["<!DOCTYPE html>", "<html>", "<head>...</head>", "<body>...</body>", "</html>"] },
                        { type: "match", title: "Posicionamiento", pairs: [{ es: "Fijo en pantalla", en: "fixed" }, { es: "Relativo a sí mismo", en: "relative" }, { es: "Absoluto al padre", en: "absolute" }, { es: "Pegajoso", en: "sticky" }] },
                        { type: "builder", title: "Fetch Básico", challenges: [{ goal: "Obtener datos de API", correct: "fetch('/api').then(res => res.json())", blocks: ["fetch('/api')", ".then(res => res.json())", ".get()", "await"] }] }
                    ]
                }
            },
            {
                id: 3,
                title: "Nivel 3: JavaScript Avanzado",
                lesson: {
                    title: "JavaScript Moderno (ES6+)",
                    content: `
                        <h2>Potencia y Elegancia</h2>
                        <p>Las últimas versiones de JS traen características poderosas como Funciones Flecha, Destructuring, Clases y Promesas.</p>
                        <div class="code-block">const suma = (a, b) => a + b;</div>
                    `
                },
                game: {
                    type: "mixed",
                    title: "Ingeniero de Software",
                    exercises: [
                        { type: "quiz-item", question: "¿Qué retorna `[1, 2, 3].map(x => x * 2)`?", options: ["[1, 2, 3]", "[2, 4, 6]", "6", "Error"], correct: 1 },
                        { type: "builder", title: "Promesa", challenges: [{ goal: "Crear promesa simple", correct: "new Promise((resolve, reject) => { })", blocks: ["new Promise", "((resolve, reject) => { })", "function Promise", "async"] }] },
                        { type: "match", title: "Métodos Array", pairs: [{ es: "¿Cumple alguno?", en: "some" }, { es: "¿Cumplen todos?", en: "every" }, { es: "Acumular valor", en: "reduce" }, { es: "Aplanar", en: "flat" }] },
                        { type: "sorter", title: "Async/Await Try-Catch", lines: ["try {", "  const data = await api.get();", "} catch (error) {", "  console.error(error);", "}"] },
                        { type: "quiz-item", question: "Local Storage guarda datos como:", options: ["Objetos", "Strings", "Arrays", "Binario"], correct: 1 },
                        { type: "builder", title: "Desestructuración Avanzada", challenges: [{ goal: "Renombrar al extraer", correct: "const { a: nuevoA } = objeto", blocks: ["const", "{ a: nuevoA }", "=", "objeto", "{ a as nuevoA }"] }] },
                        { type: "match", title: "Nuevas Estructuras", pairs: [{ es: "Valores únicos", en: "Set" }, { es: "Clave-Valor", en: "Map" }, { es: "Símbolo único", en: "Symbol" }, { es: "Entero gigante", en: "BigInt" }] },
                        { type: "quiz-item", question: "¿Cuál es la diferencia entre `==` y `===`?", options: ["Ninguna", "=== compara tipo y valor", "== es más rápido", "=== no existe"], correct: 1 },
                        { type: "sorter", title: "Módulo Export", lines: ["const miFunc = () => {};", "export default miFunc;", "import miFunc from './file';", "miFunc();"] },
                        { type: "builder", title: "Operador Spread", challenges: [{ goal: "Copiar array", correct: "const copy = [...original]", blocks: ["const", "copy", "=", "[...original]", "original.copy()", "spread"] }] }
                    ]
                }
            }
        ]
    },
    english: {
        title: "Inglés Técnico",
        levels: [
            {
                id: 1,
                title: "Nivel 1: Conceptos Básicos",
                lesson: {
                    title: "Vocabulario para Desarrolladores",
                    content: ` 
                        <h2>Conceptos Básicos</h2> 
                        <p>El inglés es el idioma universal de la tecnología. Aquí tienes algunos términos clave:</p> 
                        <ul> 
                            <li><strong>Bug:</strong> Error en el código.</li> 
                            <li><strong>Feature:</strong> Una nueva funcionalidad.</li> 
                        </ul> 
                    `
                },
                game: {
                    type: "mixed",
                    title: "English Practice",
                    exercises: [
                        {
                            type: "speech-practice",
                            title: "Speaking Practice",
                            text: "Menutech It is a company in constant development of software, at the forefront, committed to provide innovations to the different business models of our clients."
                        },
                        {
                            type: "listening-practice",
                            title: "Listening Practice",
                            script: "Remote work offers flexibility, but the main drawback is the loss of company culture and spontaneous collaboration.",
                            question: "According to the speaker, what is the main drawback of remote work?",
                            options: [
                                "Reduced productivity",
                                "Lack of flexibility",
                                "Loss of company culture and spontaneous collaboration",
                                "Increased costs for the company"
                            ],
                            correct: 2
                        }
                    ]
                }
            }
        ]
    },
    database: {
        title: "Bases de Datos (SQL)",
        levels: [
            {
                id: 1,
                title: "Nivel 1: SELECT Básico",
                lesson: {
                    title: "Fundamentos de SQL",
                    content: ` 
                        <h2>Structured Query Language</h2> 
                        <p>SQL se utiliza para comunicarse con bases de datos. Los comandos más comunes son:</p> 
                        <h3>SELECT</h3> 
                        <p>Para recuperar datos de una tabla.</p> 
                        <div class="code-block">SELECT nombre, edad FROM usuarios;</div> 
                    `
                },
                game: {
                    type: "builder",
                    title: "SQL Builder: SELECT Queries",
                    challenges: [
                        {
                            goal: "Pregunta 1: Selecciona todos los campos de la tabla 'usuarios'.",
                            correct: "SELECT * FROM usuarios",
                            blocks: ["SELECT", "*", "FROM", "usuarios", "WHERE", "id", "nombre"]
                        },
                        {
                            goal: "Pregunta 2: Obtener el total de ingresos generados por cada venta.",
                            correct: "SELECT SUM(precio * cantidad) FROM ventas",
                            blocks: ["SELECT", "SUM(precio * cantidad)", "FROM", "ventas", "COUNT(*)", "precio", "cantidad", "*"]
                        },
                        {
                            goal: "Pregunta 3: Mostrar únicamente el nombre del producto y su precio.",
                            correct: "SELECT nombre, precio FROM productos",
                            blocks: ["SELECT", "nombre", "precio", "FROM", "productos", "*", "WHERE", "categoria"]
                        },
                        {
                            goal: "Pregunta 4: Listar las ventas cuya cantidad vendida sea mayor a 5 unidades.",
                            correct: "SELECT * FROM ventas WHERE cantidad > 5",
                            blocks: ["SELECT", "*", "FROM", "ventas", "WHERE", "cantidad", ">", "5", "=", "<", ">="]
                        },
                        {
                            goal: "Pregunta 5: Mostrar las ventas que pertenezcan a la categoría 'Electrónica'.",
                            correct: "SELECT * FROM ventas WHERE categoria = 'Electrónica'",
                            blocks: ["SELECT", "*", "FROM", "ventas", "WHERE", "categoria", "=", "'Electrónica'", "LIKE", "'Ropa'", "'Alimentos'"]
                        },
                        {
                            goal: "Pregunta 6: Obtener las ventas donde el precio del producto sea mayor a 1,000.",
                            correct: "SELECT * FROM ventas WHERE precio > 1000",
                            blocks: ["SELECT", "*", "FROM", "ventas", "WHERE", "precio", ">", "1000", ">=", "=", "<", "500"]
                        },
                        {
                            goal: "Pregunta 7: Listar las ventas ordenadas por precio de menor a mayor.",
                            correct: "SELECT * FROM ventas ORDER BY precio ASC",
                            blocks: ["SELECT", "*", "FROM", "ventas", "ORDER BY", "precio", "ASC", "DESC", "WHERE", "cantidad"]
                        },
                        {
                            goal: "Pregunta 8: Mostrar las ventas ordenadas por cantidad vendida de mayor a menor.",
                            correct: "SELECT * FROM ventas ORDER BY cantidad DESC",
                            blocks: ["SELECT", "*", "FROM", "ventas", "ORDER BY", "cantidad", "DESC", "ASC", "LIMIT", "precio"]
                        },
                        {
                            goal: "Pregunta 9: Obtener solo las primeras 10 ventas registradas.",
                            correct: "SELECT * FROM ventas LIMIT 10",
                            blocks: ["SELECT", "*", "FROM", "ventas", "LIMIT", "10", "WHERE", "ORDER BY", "5", "20"]
                        },
                        {
                            goal: "Pregunta 10: Contar cuántas ventas existen en total en la base de datos.",
                            correct: "SELECT COUNT(*) FROM ventas",
                            blocks: ["SELECT", "COUNT(*)", "FROM", "ventas", "SUM(*)", "TOTAL(*)", "*", "AVG(*)"]
                        }
                    ]
                }
            }
        ]
    }
};

// Global State 
let currentState = {
    subject: null,
    levelIndex: 0,
    mode: 'learn', // 'learn' or 'game' 
};

// Completed Levels 
let completedLevels = new Set();

// DOM Elements 
const homeView = document.getElementById('home-view');
const levelView = document.getElementById('level-view');
const appView = document.getElementById('app-view');
const contentArea = document.getElementById('content-area');
const subjectTitle = document.getElementById('current-subject-title');
const levelSubjectTitle = document.getElementById('level-subject-title');
const backBtn = document.getElementById('btn-back');
const homeLevelBtn = document.getElementById('btn-home-level');
const navBtns = document.querySelectorAll('.nav-btn');
const cards = document.querySelectorAll('.card');

// Modal Elements 
const modal = document.getElementById('level-modal');
const modalScore = document.getElementById('modal-score-display');
const btnBackLevels = document.getElementById('btn-back-levels');

// Event Listeners
cards.forEach(card => {
    card.addEventListener('click', () => {
        const subject = card.getAttribute('data-subject');
        if (subject) openSubject(subject);
    });
});

if (backBtn) {
    backBtn.addEventListener('click', () => {
        if (currentState.subject) openSubject(currentState.subject);
    });
}

if (homeLevelBtn) {
    homeLevelBtn.addEventListener('click', goHome);
}

if (navBtns) {
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-mode');
            if (mode) switchMode(mode);
        });
    });
}

// Navigation Functions 
function openSubject(subject) {
    currentState.subject = subject;
    levelSubjectTitle.textContent = courseData[subject].title;
    renderLevelSelection(subject);
    homeView.classList.remove('active');
    homeView.classList.add('hidden');
    appView.classList.remove('active');
    appView.classList.add('hidden');
    levelView.classList.remove('hidden');
    setTimeout(() => levelView.classList.add('active'), 50);
}

function renderLevelSelection(subject) {
    const container = document.getElementById('levels-container');
    container.innerHTML = '';

    courseData[subject].levels.forEach((level, index) => {
        const levelCard = document.createElement('div');
        levelCard.className = 'level-card fade-in';
        levelCard.style.animationDelay = `${index * 0.1}s`;

        // ALL LEVELS UNLOCKED by request
        // const isUnlocked = index === 0 || completedLevels.has(`${subject}-${courseData[subject].levels[index-1].id}`);

        // Remove locking UI logic, render all as unlocked
        levelCard.innerHTML = ` 
            <span>Nivel ${level.id}</span> 
            <h3>${level.title}</h3> 
            <p>${level.lesson.title}</p> 
        `;
        levelCard.addEventListener('click', () => {
            loadLevel(subject, index);
        });


        container.appendChild(levelCard);
    });
}

// Global variable to store candidate information
let candidateInfo = {
    name: '',
    evaluator: '',
    position: ''
};

// 1. Level System Logic
function loadLevel(subject, levelIndex) {
    console.log('loadLevel called:', subject, levelIndex);
    // Show candidate form before starting exam
    showCandidateForm(subject, levelIndex);
}

function showCandidateForm(subject, levelIndex) {
    console.log('showCandidateForm called');
    const modal = document.getElementById('candidate-modal');
    const form = document.getElementById('candidate-form');
    const skipBtn = document.getElementById('skip-candidate-form');

    if (!modal) {
        console.error('Candidate modal not found!');
        // Fallback: start exam directly with defaults
        candidateInfo.name = 'Test Candidate';
        candidateInfo.evaluator = 'Test Evaluator';
        candidateInfo.position = 'Test Position';
        startExam(subject, levelIndex);
        return;
    }

    if (!form) {
        console.error('Candidate form not found!');
        candidateInfo.name = 'Test Candidate';
        candidateInfo.evaluator = 'Test Evaluator';
        candidateInfo.position = 'Test Position';
        startExam(subject, levelIndex);
        return;
    }

    console.log('Modal and form found, resetting and showing...');

    // Reset form
    form.reset();

    // Show modal
    modal.classList.add('active');
    console.log('Modal should now be visible');

    // Handle skip button (for testing)
    if (skipBtn) {
        skipBtn.onclick = () => {
            console.log('Skip button clicked - using default values');
            candidateInfo.name = 'Test Candidate';
            candidateInfo.evaluator = 'Test Evaluator';
            candidateInfo.position = 'Test Position';
            modal.classList.remove('active');
            startExam(subject, levelIndex);
        };
    }

    // Handle form submission
    form.onsubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');

        // Store candidate information
        candidateInfo.name = document.getElementById('candidate-name').value.trim();
        candidateInfo.evaluator = document.getElementById('evaluator-name').value.trim();
        candidateInfo.position = document.getElementById('target-position').value.trim();

        console.log('Candidate info:', candidateInfo);

        // Validate
        if (!candidateInfo.name || !candidateInfo.evaluator || !candidateInfo.position) {
            alert('Por favor completa todos los campos');
            return;
        }

        // Hide modal
        modal.classList.remove('active');
        console.log('Modal hidden, starting exam...');

        // Now start the exam
        startExam(subject, levelIndex);
    };
}

function startExam(subject, levelIndex) {
    console.log('startExam called:', subject, levelIndex);
    currentState.subject = subject;
    currentState.levelIndex = levelIndex;
    currentState.mode = 'game'; // Force Game Mode

    // 1. Switch Views (Navigation)
    const levelView = document.getElementById('level-view');
    const appView = document.getElementById('app-view');
    const homeView = document.getElementById('home-view');

    // Hide others
    if (homeView) homeView.classList.add('hidden');
    if (levelView) {
        levelView.classList.remove('active');
        levelView.classList.add('hidden');
    }

    // Show App View
    if (appView) {
        appView.classList.remove('hidden');
        // Force reflow
        void appView.offsetWidth;
        appView.classList.add('active');
    }

    // 2. Update Header
    const levelData = courseData[subject].levels[levelIndex];
    if (subjectTitle) subjectTitle.textContent = levelData.title;

    // 3. Render Game Directly
    renderContent();
}

function goHome() {
    const levelView = document.getElementById('level-view');
    const appView = document.getElementById('app-view');
    const homeView = document.getElementById('home-view');

    levelView.classList.remove('active');
    levelView.classList.add('hidden');
    appView.classList.remove('active');
    appView.classList.add('hidden');
    homeView.classList.remove('hidden');
    setTimeout(() => homeView.classList.add('active'), 50);
    currentState.subject = null;
}

// Content Rendering Engine 
function renderContent() {
    // Ensure contentArea exists
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;

    contentArea.innerHTML = '';
    const data = courseData[currentState.subject].levels[currentState.levelIndex];

    if (currentState.mode === 'learn') {
        renderLesson(data.lesson);
    } else {
        renderGame(data.game);
    }
}

function renderLesson(lesson) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <div class="lesson-content fade-in">
            <h1>${lesson.title}</h1>
            <div class="lesson-body">
                ${lesson.content}
            </div>
            <div style="text-align: center; margin-top: 3rem;">
                 <button class="game-btn" onclick="document.querySelector('[data-mode=\\'game\\']').click()">
                    Ir a la Práctica 🎮
                </button>
            </div>
        </div>
    `;
}

function renderGame(game) {
    const contentArea = document.getElementById('content-area');

    // Setup Workspace
    contentArea.innerHTML = `
        <div class="game-container fade-in" id="game-workspace">
             <div class="level-progress">
               <div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div>
            </div>
            <div id="active-game-area" style="width:100%; height:100%;"></div>
        </div>
    `;

    const container = document.getElementById('active-game-area');
    const exercises = game.exercises || [game];
    let currentExerciseIdx = 0;

    // Session Score
    let stats = { correct: 0, incorrect: 0, empty: 0 };

    function loadExercise() {
        if (currentExerciseIdx >= exercises.length) {
            handleLevelComplete(stats, exercises.length);
            return;
        }

        container.innerHTML = '';
        const ex = exercises[currentExerciseIdx];

        // Update Progress
        const progress = ((currentExerciseIdx) / exercises.length) * 100;
        const fill = document.querySelector('.progress-fill');
        if (fill) fill.style.width = `${progress}%`;

        // Advance Handler
        const onStepComplete = (status) => {
            // Normalize status
            let finalStatus = status;
            if (status === true) finalStatus = 'correct';
            if (status === false) finalStatus = 'incorrect';

            if (finalStatus === 'correct') stats.correct++;
            else if (finalStatus === 'incorrect') stats.incorrect++;
            else if (finalStatus === 'empty') stats.empty++;
            else stats.incorrect++; // Fallback

            currentExerciseIdx++;
            loadExercise();
        };

        try {
            if (ex.type === 'sorter') setupPseudocodeBuilder(ex, container, onStepComplete);
            else if (ex.type === 'flowchart-free') setupFlowchartCanvas(ex, container, onStepComplete);
            else if (ex.type === 'quiz-item') setupQuizItem(ex, container, onStepComplete);
            else if (ex.type === 'match') setupMatch(ex, container, onStepComplete);
            else if (ex.type === 'builder') setupBuilder(ex, container, onStepComplete);
            else if (ex.type === 'quiz-diagram') setupQuizDiagram(ex, container, onStepComplete);
            else if (ex.type === 'speech-practice') setupSpeechPractice(ex, container, onStepComplete);
            else if (ex.type === 'listening-practice') setupListeningPractice(ex, container, onStepComplete);
            else if (ex.type === 'mixed') setupMixedGame(ex, container);
            else {
                console.warn('Unknown type:', ex.type);
                onStepComplete('correct');
            }
        } catch (err) {
            console.error(err);
            container.innerHTML = `<div class="feedback-msg incorrect">Error cargando ejercicio: ${err.message}</div>`;
            const skipBtn = document.createElement('button');
            skipBtn.className = 'game-btn';
            skipBtn.textContent = 'Saltar Error';
            skipBtn.style.marginTop = '1rem';
            skipBtn.onclick = () => onStepComplete('incorrect');
            container.appendChild(skipBtn);
        }
    }

    // Start
    loadExercise();
}

// --- SUPABASE SAVE FUNCTION ---
async function saveExamResults(results, total) {
    console.log('🔵 saveExamResults called');

    // Supabase Configuration
    const supabaseUrl = 'https://ojpyfjgkffmzwvukjagf.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcHlmamdrZmZtend2dWtqYWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDIwMzYsImV4cCI6MjA3OTcxODAzNn0.dlVYmoMumBse_O1PLBx0FeNITqY4YktefD6l_uonSgo';
    let supabase = null;

    try {
        if (window.supabase && typeof window.supabase.createClient === 'function') {
            supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
        }
    } catch (e) {
        console.error('❌ Error initializing Supabase client:', e);
    }

    if (!supabase) {
        console.error('❌ Supabase client not initialized!');
        return false;
    }

    // Calculate Summary Stats
    let correct = 0, incorrect = 0, empty = 0, scoreSum = 0;

    // Normalize Details
    let detailsJSON = [];

    if (Array.isArray(results)) {
        console.log('  - Results is array, processing...');
        results.forEach(r => {
            if (r.status === 'correct') correct++;
            else if (r.status === 'incorrect') incorrect++;
            else empty++;
            scoreSum += (r.score || 0);
            detailsJSON.push(r);
        });
    } else if (typeof results === 'object') {
        console.log('  - Results is object (legacy)');
        correct = results.correct;
        incorrect = results.incorrect;
        empty = results.empty;
        // Legacy scoring doesn't have detailed score sum, assume 100/0
        scoreSum = (correct * 100);
    } else {
        console.log('  - Results is number (simple score)');
        correct = results;
        incorrect = total - results;
        scoreSum = (correct * 100);
    }

    // Determine overall percentage
    const finalScorePct = Math.round(scoreSum / total);

    console.log('  - Calculated stats:', { correct, incorrect, empty, finalScorePct });

    const record = {
        candidate_name: candidateInfo.name,
        evaluator_name: candidateInfo.evaluator,
        target_position: candidateInfo.position,
        exam_type: currentState.subject,
        score_percentage: finalScorePct,
        correct_count: correct,
        incorrect_count: incorrect,
        empty_count: empty,
        details: JSON.stringify(detailsJSON)
    };

    console.log("📤 Saving to Supabase:", record);

    try {
        console.log("📤 Attempting to save to Supabase...", record);
        const { data, error } = await supabase
            .from('exam_results')
            .insert([record])
            .select();

        if (error) {
            console.error("❌ Supabase Error:", error);
            return false;
        } else {
            console.log("✅ Saved Success:", data);
            return true;
        }
    } catch (err) {
        console.error("❌ Exception during save:", err);
        return false;
    }
}

async function handleLevelComplete(results, total) {
    console.log('🏁 handleLevelComplete called');
    console.log('  - results:', results);
    console.log('  - total:', total);

    // 1. SAVE TO DB AUTOMATICALLY
    try {
        await saveExamResults(results, total);
    } catch (err) {
        console.error("❌ Failed to save results:", err);
    }

    // results can be Array (New) or Number/Object (Legacy)
    let correctCount = 0;
    let incorrectCount = 0;
    let emptyCount = 0;
    let detailsHTML = '';

    if (Array.isArray(results)) {
        // New Detailed Mode
        results.forEach(r => {
            if (r.status === 'correct') correctCount++;
            else if (r.status === 'incorrect') incorrectCount++;
            else emptyCount++;

            // Generate Detail Item
            if (r.type === 'speech-practice' && r.details) {
                const diffHtml = generateTextDiff(r.details.target, r.details.transcript);
                detailsHTML += `
                    <div style="background:rgba(0,0,0,0.2); padding:1rem; margin-top:1rem; border-radius:8px; text-align:left;">
                        <h4 style="margin-bottom:0.5rem; color:var(--secondary-color);"> Speaking: ${r.details.score}% Match</h4>
                        <p style="font-size:0.9rem; margin-bottom:0.5rem; color:#aaa;">Transcribed:</p>
                        <div style="background:#0f172a; padding:0.8rem; border-radius:4px; font-family:monospace; line-height:1.6;">
                            ${diffHtml}
                        </div>
                    </div>
                `;
            }
        });
        total = results.length;
    } else if (typeof results === 'object') {
        correctCount = results.correct;
        incorrectCount = results.incorrect;
        emptyCount = results.empty;
    } else {
        correctCount = results; // Legacy number
    }

    const isPass = correctCount >= (total * 0.6);

    if (isPass) {
        completedLevels.add(`${currentState.subject}-${courseData[currentState.subject].levels[currentState.levelIndex].id}`);
    }

    const modal = document.getElementById('level-modal');
    const modalContent = modal.querySelector('.modal-content');

    const scoreDisplay = `
        <div style="display: flex; gap: 1rem; justify-content: center; font-size: 1.2rem; flex-wrap: wrap;">
            <div style="color: var(--success);">✔ ${correctCount} Correctas</div>
            <div style="color: var(--error);">✖ ${incorrectCount} Incorrectas</div>
            <div style="color: var(--text-secondary);">⚪ ${emptyCount} Vacías</div>
        </div>
    `;

    modalContent.innerHTML = `
        <h2 class="modal-title">${isPass ? '¡Nivel Completado!' : '¡Buen Intento!'}</h2>
        <div class="modal-score" style="font-size: 3rem; color: var(--accent-color); margin: 1rem 0;">
            ${Math.round((correctCount / total) * 100)}%
        </div>
        ${scoreDisplay}
        
        <div class="evaluator-view" style="max-height: 200px; overflow-y: auto; margin: 1rem 0; padding-right: 5px;">
            ${detailsHTML}
        </div>

        <p class="modal-msg">${isPass ? '¡Has dominado este tema!' : 'Vuelve a intentarlo para mejorar.'}</p>
        <div class="modal-actions">
           <button class="modal-btn" onclick="document.getElementById('level-modal').classList.remove('active'); goHome()">Menú Principal</button>
           <button class="modal-btn secondary" onclick="location.reload()">Reiniciar</button>
        </div>
    `;

    modal.classList.add('active');
}

// Helper: Text Diff Generator
function generateTextDiff(target, transcript) {
    if (!transcript) return `<span style="color:var(--error)">[No Audio]</span>`;

    const targetWords = target.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    const userWords = transcript.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);

    // Very simple matching for demo: if user has word, mark green.
    // For robust diffing we need a library, but this approximates User request.

    return targetWords.map(word => {
        if (userWords.includes(word)) {
            return `<span style="color:var(--success)">${word}</span>`;
        } else {
            return `<span style="color:var(--error)">${word}</span>`;
        }
    }).join(' ');
}

// ---------------- GAME ENGINES ---------------- 

// 1. Mixed Game Logic (Wrapper) 
function setupMixedGame(game, container) {
    let currentExerciseIndex = 0;
    // New Score Object
    let stats = { correct: 0, incorrect: 0, empty: 0 };

    container.innerHTML = `<div id="mixed-exercise-area"></div>`;
    const exerciseArea = document.getElementById('mixed-exercise-area');

    function loadExercise() {
        // Safety check
        if (currentExerciseIndex >= game.exercises.length) {
            handleLevelComplete(stats, game.exercises.length);
            return;
        }

        const exercise = game.exercises[currentExerciseIndex];

        exerciseArea.innerHTML = ` 
            <div class="exercise-header fade-in"> 
                <h3>Ejercicio ${currentExerciseIndex + 1}/${game.exercises.length}</h3> 
                <h2>${exercise.title}</h2> 
                ${exercise.instruction ? `<p>${exercise.instruction}</p>` : ''} 
            </div> 
            <div id="exercise-content" class="fade-in"></div> 
            <div id="exercise-feedback-overlay" class="feedback-msg" style="margin-top:1rem; min-height: 1.5rem;"></div>
        `;

        const contentContainer = document.getElementById('exercise-content');

        // Pass onComplete callback
        // status can be: 'correct', 'incorrect', 'empty' (or boolean true/false for legacy)
        const onComplete = (status) => handleExerciseComplete(status);

        if (exercise.type === 'flowchart-free') setupFlowchartCanvas(exercise, contentContainer, onComplete);
        else if (exercise.type === 'quiz-diagram') setupQuizDiagram(exercise, contentContainer, onComplete);
        else if (exercise.type === 'quiz-item') setupQuizItem(exercise, contentContainer, onComplete);
        else if (exercise.type === 'sorter') setupPseudocodeBuilder(exercise, contentContainer, onComplete);
        else if (exercise.type === 'builder') setupBuilder(exercise, contentContainer, onComplete);
        else if (exercise.type === 'speech-practice') setupSpeechPractice(exercise, contentContainer, onComplete);
        else if (exercise.type === 'listening-practice') setupListeningPractice(exercise, contentContainer, onComplete);
        else if (exercise.type === 'match') setupMatch(exercise, contentContainer, onComplete);
    }

    function handleExerciseComplete(status) {
        // Normalizing legacy boolean returns
        let finalStatus = status;
        if (status === true) finalStatus = 'correct';
        if (status === false) finalStatus = 'incorrect';

        // Update stats
        if (finalStatus === 'correct') stats.correct++;
        else if (finalStatus === 'incorrect') stats.incorrect++;
        else if (finalStatus === 'empty') stats.empty++;
        else stats.incorrect++; // Default fallback

        const feedback = document.getElementById('exercise-feedback-overlay');
        if (feedback) {
            let msg = "";
            let cls = "";
            if (finalStatus === 'correct') { msg = "✔ ¡Correcto!"; cls = "correct"; }
            else if (finalStatus === 'incorrect') { msg = "✖ Incorrecto"; cls = "incorrect"; }
            else { msg = "⚪ Saltado / Vacío"; cls = "incorrect"; } // Visual warning but allowed

            feedback.textContent = msg;
            feedback.className = `feedback-msg ${cls}`;
        }

        setTimeout(() => {
            currentExerciseIndex++;
            if (currentExerciseIndex < game.exercises.length) {
                loadExercise();
            } else {
                handleLevelComplete(stats, game.exercises.length);
            }
        }, 1500);
    }

    loadExercise();
}

// 2. Flowchart Canvas Logic (Refactored for 3-Panel & Manual Interactions)
function setupFlowchartCanvas(exercise, container, onSuccess) {
    // Handle Expanded Mode
    const isExpanded = exercise.isExpanded || false;
    const workspaceClass = isExpanded ? "flowchart-workspace expanded" : "flowchart-workspace";
    const controlsStyle = isExpanded ? "position: absolute; top: 10px; right: 20px; z-index: 100;" : "margin-top:1rem;";

    // New 3-Panel HTML Structure
    container.innerHTML = ` 
        <div class="exercise-header fade-in" style="margin-bottom: 2rem; text-align: center;">
            <h2 style="color: var(--primary-color); margin-bottom: 0.5rem;">${exercise.title || 'Diagrama de Flujo'}</h2>
            <p style="color: var(--text-secondary); font-size: 1.1rem;">${exercise.instruction || 'Crea el diagrama solicitado.'}</p>
        </div>

        <div class="${workspaceClass}"> 
            <!-- Panel 1: Symbols -->
            <div class="palette"> 
                <h4>Símbolos</h4> 
                <div id="shape-palette" class="palette-items"> 
                    <div class="draggable-shape" draggable="true" data-shape="oval">Inicio/Fin</div> 
                    <div class="draggable-shape" draggable="true" data-shape="parallelogram">Entrada/Salida</div> 
                    <div class="draggable-shape" draggable="true" data-shape="diamond">Decisión</div> 
                    <div class="draggable-shape" draggable="true" data-shape="rectangle">Proceso</div> 
                </div> 
                
                <div style="margin-top: auto; padding: 1rem; color: #888; font-size: 0.8rem;">
                    💡 Arrastra símbolos al centro.<br>
                    💡 Arrastra desde los puntos blancos para conectar.<br>
                    💡 Supr/Backspace para borrar.
                </div>
            </div> 
             
            <!-- Panel 2: Canvas -->
            <div class="canvas-area-wrapper" tabindex="0"> 
                <div id="canvas-area" class="canvas-area" style="width: 100%; height: 100%; position: relative;"> 
                    <svg id="connections-layer" style="position: absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:0;"></svg> 
                    <svg id="temp-connection-layer" style="position: absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:25;"></svg> 
                </div> 
                <div class="canvas-controls"> 
                     <button id="btn-clear-canvas" class="game-btn small" style="padding: 0.5rem; background-color: var(--error);">🗑 Limpiar Todo</button> 
                </div> 
            </div> 
\t
            <!-- Panel 3: Text -->
            <div class="text-palette">
                <h4>Datos / Texto</h4> 
                <div id="text-palette" class="palette-items"> 
                    ${exercise.items.sort(() => Math.random() - 0.5).map(item => ` 
                        <div class="draggable-text" draggable="true" id="${item.id}"> 
                            ${item.text} 
                        </div> 
                    `).join('')} 
                </div> 
            </div>
        </div> 
        
        <!-- Controls: Top Floating -->
        <div class="top-right-controls">
            <div id="fc-feedback" class="feedback-toast" style="display:none;"></div> 
            <button id="btn-check-fc" class="btn-next">Siguiente ➡</button>
            ${isExpanded ? '<div style="background:rgba(0,0,0,0.5); padding:5px 10px; border-radius:15px; font-size:0.8rem;">Modo Extendido</div>' : ''}
        </div>
    `;
    const canvas = document.getElementById('canvas-area');
    const canvasWrapper = document.querySelector('.canvas-area-wrapper');
    const shapePalette = document.getElementById('shape-palette');
    const textPalette = document.getElementById('text-palette');
    const tempSvg = document.getElementById('temp-connection-layer');
    const connSvg = document.getElementById('connections-layer');

    let activeDragShape = null;
    let dragStartX = 0, dragStartY = 0;
    let dragOrigL = 0, dragOrigT = 0;
    let draggedShapeType = null;
    let draggedTextId = null;
    let selectedShape = null;

    // Connection Logic State
    let isConnecting = false;
    let connectionStartNode = null;
    let tempLine = null;

    // --- SETUP DRAG from PALETTES ---
    shapePalette.querySelectorAll('.draggable-shape').forEach(shape => {
        shape.addEventListener('dragstart', (e) => {
            draggedShapeType = shape.getAttribute('data-shape');
            draggedTextId = null;
        });
    });

    textPalette.querySelectorAll('.draggable-text').forEach(txt => {
        txt.addEventListener('dragstart', (e) => {
            draggedTextId = txt.id;
            draggedShapeType = null;
        });
    });

    canvas.addEventListener('dragover', (e) => e.preventDefault());
    canvas.addEventListener('drop', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (draggedShapeType) {
            createShapeOnCanvas(draggedShapeType, x, y);
        }
    });

    // --- SELECTION & DELETION LOGIC ---
    canvas.addEventListener('mousedown', (e) => {
        // Deselect if clicking empty space
        if (e.target === canvas || e.target.id === 'connections-layer') {
            selectShape(null);
        }
    });

    function selectShape(shape) {
        if (selectedShape) selectedShape.classList.remove('selected');
        selectedShape = shape;
        if (selectedShape) selectedShape.classList.add('selected');
        canvasWrapper.focus(); // Ensure we capture key events
    }

    canvasWrapper.addEventListener('keydown', (e) => {
        if ((e.key === 'Delete' || e.key === 'Backspace') && selectedShape) {
            deleteShape(selectedShape);
            selectShape(null);
        }
    });

    function deleteShape(shape) {
        // Remove connections
        const lines = connSvg.querySelectorAll('line');
        lines.forEach(line => {
            if (line.getAttribute('data-from') === shape.id || line.getAttribute('data-to') === shape.id) {
                line.remove();
            }
        });
        // Remove shape
        shape.remove();
        // Return text content to palette if needed? (Simplification: Text is cloned/persistent in palette, so just delete)
    }

    document.getElementById('btn-clear-canvas').onclick = function () {
        cleanupListeners();
        setupFlowchartCanvas(exercise, container, onSuccess);
    };

    // --- DRAG INSIDE CANVAS ---
    const SNAP_SIZE = 20;

    function onWindowMouseMove(e) {
        // 1. Move Shape
        if (activeDragShape) {
            if (!document.getElementById('canvas-area')) { cleanupListeners(); return; }
            e.preventDefault();

            let newLeft = dragOrigL + (e.clientX - dragStartX);
            let newTop = dragOrigT + (e.clientY - dragStartY);

            newLeft = Math.round(newLeft / SNAP_SIZE) * SNAP_SIZE;
            newTop = Math.round(newTop / SNAP_SIZE) * SNAP_SIZE;

            activeDragShape.style.left = `${newLeft}px`;
            activeDragShape.style.top = `${newTop}px`;
            updateConnections();
        }

        // 2. Drag Connection Line
        if (isConnecting && tempLine) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            tempLine.setAttribute('x2', x);
            tempLine.setAttribute('y2', y);
        }
    }

    function onWindowMouseUp(e) {
        if (activeDragShape) {
            activeDragShape = null;
        }

        if (isConnecting) {
            // Check if dropped on a shape (handled by mouseup on shape)
            // If we are here, it means we dropped on empty space
            cancelConnection();
        }
    }

    function cleanupListeners() {
        window.removeEventListener('mousemove', onWindowMouseMove);
        window.removeEventListener('mouseup', onWindowMouseUp);
    }
    window.removeEventListener('mousemove', onWindowMouseMove);
    window.removeEventListener('mouseup', onWindowMouseUp);
    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onWindowMouseUp);

    // --- CREATE SHAPE ---
    function createShapeOnCanvas(type, x, y) {
        const div = document.createElement('div');
        div.className = `canvas-shape shape-${type}`;

        x = Math.round(x / SNAP_SIZE) * SNAP_SIZE;
        y = Math.round(y / SNAP_SIZE) * SNAP_SIZE;

        div.style.left = `${x - 40}px`;
        div.style.top = `${y - 20}px`;
        div.setAttribute('data-shape-type', type);
        div.setAttribute('id', `node-${Date.now()}-${Math.floor(Math.random() * 1000)}`);

        const textCont = document.createElement('div');
        textCont.className = 'shape-text-area';
        div.appendChild(textCont);

        // Add Connection Anchors
        ['top', 'right', 'bottom', 'left'].forEach(pos => {
            const anchor = document.createElement('div');
            anchor.className = `connection-anchor anchor-${pos}`;
            div.appendChild(anchor);

            // Start Connection
            anchor.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                e.preventDefault();
                startConnection(div, e);
            });
        });

        // Drop Text
        div.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (draggedTextId) div.classList.add('drag-over');
        });
        div.addEventListener('dragleave', () => div.classList.remove('drag-over'));
        div.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            div.classList.remove('drag-over');
            if (draggedTextId) {
                const textEl = document.getElementById(draggedTextId);
                if (textEl) {
                    textCont.innerHTML = '';
                    textCont.appendChild(textEl.cloneNode(true)); // Clone to allow reuse if text deleted
                    div.setAttribute('data-content-id', draggedTextId);
                    // Reset styles for the cloned element inside shape
                    const inside = textCont.firstElementChild;
                    inside.style.position = 'static';
                    inside.style.border = 'none';
                    inside.style.background = 'transparent';
                    inside.className = '';
                }
            }
        });

        // Selection
        div.addEventListener('mousedown', (e) => {
            if (e.button === 0 && !isConnecting) {
                e.stopPropagation();
                selectShape(div);
                activeDragShape = div;
                dragStartX = e.clientX;
                dragStartY = e.clientY;
                dragOrigL = div.offsetLeft;
                dragOrigT = div.offsetTop;
            }
        });

        // End Connection (Receive)
        div.addEventListener('mouseup', (e) => {
            if (isConnecting && connectionStartNode && connectionStartNode !== div) {
                e.stopPropagation();
                createConnection(connectionStartNode, div);
                cancelConnection();
            }
        });

        canvas.appendChild(div);
        selectShape(div); // Auto-select new shape
    }

    // --- CONNECTION LOGIC ---
    function startConnection(sourceNode, e) {
        isConnecting = true;
        connectionStartNode = sourceNode;

        // Create Temp Line
        tempLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tempLine.setAttribute('stroke', '#fff');
        tempLine.setAttribute('stroke-width', '2');
        tempLine.setAttribute('stroke-dasharray', '5,5');

        // Center of source
        const x = sourceNode.offsetLeft + sourceNode.offsetWidth / 2;
        const y = sourceNode.offsetTop + sourceNode.offsetHeight / 2;

        tempLine.setAttribute('x1', x);
        tempLine.setAttribute('y1', y);
        tempLine.setAttribute('x2', x); // Start with 0 length
        tempLine.setAttribute('y2', y);

        tempSvg.appendChild(tempLine);
    }

    function cancelConnection() {
        isConnecting = false;
        connectionStartNode = null;
        if (tempLine) {
            tempLine.remove();
            tempLine = null;
        }
    }

    function createConnection(node1, node2) {
        if (connSvg.querySelector(`line[data-from="${node1.id}"][data-to="${node2.id}"]`)) return;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('stroke', '#00e5ff');
        line.setAttribute('stroke-width', '3');
        line.setAttribute('marker-end', 'url(#arrowhead)');
        line.setAttribute('data-from', node1.id);
        line.setAttribute('data-to', node2.id);
        updateLineCoords(line, node1, node2);
        connSvg.appendChild(line);
    }

    function updateLineCoords(line, n1, n2) {
        if (!n1 || !n2) return;
        const x1 = n1.offsetLeft + n1.offsetWidth / 2;
        const y1 = n1.offsetTop + n1.offsetHeight / 2;
        const x2 = n2.offsetLeft + n2.offsetWidth / 2;
        const y2 = n2.offsetTop + n2.offsetHeight / 2;

        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
    }

    function updateConnections() {
        if (!connSvg) return;
        if (!connSvg.querySelector('defs')) {
            connSvg.innerHTML = ` 
                <defs> 
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"> 
                        <polygon points="0 0, 10 3.5, 0 7" fill="#00e5ff" /> 
                    </marker> 
                </defs> 
            ` + connSvg.innerHTML;
        }

        connSvg.querySelectorAll('line').forEach(line => {
            const n1 = document.getElementById(line.getAttribute('data-from'));
            const n2 = document.getElementById(line.getAttribute('data-to'));
            if (n1 && n2) updateLineCoords(line, n1, n2);
            else line.remove();
        });
    }

    // --- VALIDATION ---
    document.getElementById('btn-check-fc').onclick = () => {
        const feedback = document.getElementById('fc-feedback');
        const nodes = Array.from(canvas.querySelectorAll('.canvas-shape')).map(s => ({
            id: s.id,
            contentId: s.getAttribute('data-content-id'),
        }));
        const edges = Array.from(connSvg.querySelectorAll('line')).map(l => ({
            from: l.getAttribute('data-from'),
            to: l.getAttribute('data-to')
        }));

        const nodeMap = {};
        nodes.forEach(n => nodeMap[n.id] = n.contentId);

        // Check 1: Empty or Missing Content
        if (nodes.length === 0) {
            feedback.innerHTML = "<span>⚪</span> Respuesta vacía";
            feedback.className = "feedback-toast incorrect";
            feedback.style.display = 'block';

            document.getElementById('btn-check-fc').disabled = true;
            setTimeout(() => {
                feedback.style.display = 'none';
                if (onSuccess) onSuccess('empty');
            }, 2000);
            return;
        }

        // Check 2: Connectivity and Logic
        let correctEdgesCount = 0;
        const requiredEdges = exercise.solution.edges;

        requiredEdges.forEach(req => {
            const [fromContent, toContent] = req;
            const exists = edges.some(edge => {
                return nodeMap[edge.from] === fromContent && nodeMap[edge.to] === toContent;
            });
            if (exists) correctEdgesCount++;
        });

        // Determine Pass/Fail strictly
        // For "flowchart-free", we require key connections. 
        // If the user has roughly the right edges, we give it to them, or if strict match needed:
        const isPerfect = correctEdgesCount === requiredEdges.length;
        // Looser check: at least 80% edges correct? Or just strict as per user request for "correct/incorrect".
        // Let's stick to strict or high threshold.
        const threshold = Math.ceil(requiredEdges.length * 0.8);
        const isPass = correctEdgesCount >= threshold;

        feedback.style.display = 'block';
        document.getElementById('btn-check-fc').disabled = true;

        if (isPass) {
            feedback.innerHTML = "<span>✔</span> ¡Correcto!";
            feedback.className = "feedback-toast correct";
            setTimeout(() => {
                feedback.style.display = 'none';
                if (onSuccess) onSuccess('correct');
            }, 2000);
        } else {
            feedback.innerHTML = `<span>✖</span> Incorrecto`;
            feedback.className = "feedback-toast incorrect";
            setTimeout(() => {
                feedback.style.display = 'none';
                if (onSuccess) onSuccess('incorrect');
            }, 2000);
        }
    };
}

// 3. Quiz Diagram Logic 
function setupQuizDiagram(exercise, container, onSuccess) {
    let hasAnswered = false;
    const diagramHTML = ` 
        <div class="static-diagram"> 
            <div class="node-oval">E</div> 
            <div class="arrow">⬇</div> 
            <div class="node-diamond"><span>>2</span></div> 
            <div class="path-split"> 
                <div class="path-left"> 
                    <div class="label-yes">Sí</div> 
                    <div class="arrow-horiz">⬅</div> 
                    <div class="arrow-vert">⬇ (+2)</div> 
                    <div class="node-diamond">° 3</div> 
                    <div class="path-split-inner"> 
                        <div class="path-inner-left"> 
                           <div class="label-no">No</div> 
                           <div class="arrow-horiz">⬅</div> 
                           <div class="arrow-vert">⬇ (-1)</div> 
                           <div class="node-diamond">° 2</div> 
                           <div class="path-return"> 
                                <div class="label-yes">Sí</div> 
                                <div class="arrow-ret">⤴ (-1)</div> 
                           </div> 
                           <div class="path-inner-right"> 
                                <div class="label-no">No</div> 
                                <div class="arrow-right">➡</div> 
                           </div> 
                        </div> 
                        <div class="path-inner-right"> 
                            <div class="label-yes">Sí</div> 
                            <div class="arrow-right">➡</div> 
                        </div> 
                    </div> 
                </div> 
                <div class="path-right"> 
                    <div class="label-no">No</div> 
                    <div class="arrow-vert">⬇ (+1)</div> 
                    <div class="line-vert"></div> 
                </div> 
            </div> 
            <div class="merge-point"></div> 
            <div class="arrow">⬇ (+2)</div> 
            <div class="arrow">⬇ (+3)</div> 
            <div class="node-oval">S</div> 
        </div> 
    `;

    container.innerHTML = ` 
        <div class="quiz-diagram-container" style="display:flex; justify-content:center; margin-bottom: 2rem;"> 
            ${diagramHTML} 
        </div> 
        <div class="game-question"> 
            <h3>${exercise.question}</h3> 
        </div> 
        <div class="game-options"> 
            ${exercise.options.map((opt, idx) => ` 
                <button class="game-btn option-btn" data-index="${idx}">${opt}</button> 
            `).join('')} 
        </div> 
        <div id="quiz-img-feedback" class="feedback-msg"></div> 
    `;

    const btns = container.querySelectorAll('.option-btn');
    const feedback = document.getElementById('quiz-img-feedback');

    btns.forEach(btn => {
        btn.onclick = () => {
            if (hasAnswered) return;
            hasAnswered = true;
            const selected = parseInt(btn.getAttribute('data-index'));
            btns.forEach(b => b.disabled = true);

            if (selected === exercise.correct) {
                feedback.innerHTML = "<span>✔</span> ¡Correcto!";
                feedback.className = "feedback-msg correct";
                btn.style.backgroundColor = 'var(--success)';
                if (onSuccess) onSuccess(true);
            } else {
                feedback.innerHTML = "<span>✖</span> Incorrecto";
                feedback.className = "feedback-msg incorrect";
                btn.style.backgroundColor = 'var(--error)';
                btns[exercise.correct].style.backgroundColor = 'var(--success)';
                if (onSuccess) onSuccess(false);
            }
        };
    });
}

// 4. Quiz Logic 
function setupQuiz(game, container) {
    let currentQuestionIndex = 0;
    let score = 0;

    function showQuestion() {
        const q = game.questions[currentQuestionIndex];
        container.innerHTML = ` 
            <div class="game-question"> 
                <p>Pregunta ${currentQuestionIndex + 1}/${game.questions.length}</p> 
                <h3>${q.question}</h3> 
            </div> 
            <div class="game-options"> 
                ${q.options.map((opt, idx) => ` 
                    <button class="game-btn" onclick="handleQuizAnswer(${idx}, ${q.correct})">${opt}</button> 
                `).join('')} 
            </div> 
            <div id="feedback" class="feedback-msg"></div> 
        `;
    }

    window.handleQuizAnswer = (selected, correct) => {
        const feedback = document.getElementById('feedback');
        const btns = document.querySelectorAll('.game-btn');

        btns.forEach(btn => btn.disabled = true);

        if (selected === correct) {
            feedback.innerHTML = "<span>✔</span> ¡Correcto!";
            feedback.className = "feedback-msg correct";
            score++;
        } else {
            feedback.innerHTML = "<span>✖</span> Incorrecto";
            feedback.className = "feedback-msg incorrect";
            btns[selected].style.backgroundColor = 'var(--error)';
        }
        btns[correct].style.backgroundColor = 'var(--success)';

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < game.questions.length) {
                showQuestion();
            } else {
                handleLevelComplete(score, game.questions.length);
            }
        }, 2000);
    };

    showQuestion();
}

// 5. Match Logic 
function setupMatch(game, container, onComplete) {
    let selectedEs = null;
    let selectedEn = null;
    let matches = 0;
    const esTerms = [...game.pairs].sort(() => Math.random() - 0.5);
    const enTerms = [...game.pairs].sort(() => Math.random() - 0.5);

    container.innerHTML = ` 
        <p>Empareja la palabra en español con su traducción en inglés.</p> 
        <div class="match-grid" style="display:flex; justify-content:space-around; gap:2rem;"> 
            <div id="col-es" style="display:flex; flex-direction:column; gap:1rem; flex:1"></div> 
            <div id="col-en" style="display:flex; flex-direction:column; gap:1rem; flex:1"></div> 
        </div> 
        <div id="match-feedback" class="feedback-msg" style="margin-top:1rem;"></div> 
    `;

    const colEs = document.getElementById('col-es');
    const colEn = document.getElementById('col-en');

    esTerms.forEach(pair => {
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.textContent = pair.es;
        btn.dataset.term = pair.es;
        btn.onclick = () => selectTerm('es', btn, pair.es);
        colEs.appendChild(btn);
    });

    enTerms.forEach(pair => {
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.textContent = pair.en;
        btn.dataset.term = pair.en;
        const originalPair = game.pairs.find(p => p.en === pair.en);
        btn.dataset.match = originalPair.es;

        btn.onclick = () => selectTerm('en', btn, originalPair.es);
        colEn.appendChild(btn);
    });

    function selectTerm(lang, btn, matchKey) {
        if (btn.classList.contains('matched')) return;
        const col = lang === 'es' ? colEs : colEn;
        Array.from(col.children).forEach(b => {
            if (!b.classList.contains('matched')) b.style.borderColor = 'var(--primary-color)';
        });
        btn.style.borderColor = '#fff';
        if (lang === 'es') selectedEs = { btn, key: matchKey };
        else selectedEn = { btn, key: matchKey };
        checkMatch();
    }

    function checkMatch() {
        if (selectedEs && selectedEn) {
            const feedback = document.getElementById('match-feedback');
            if (selectedEs.key === selectedEn.key) {
                feedback.textContent = "¡Match! ✔";
                feedback.className = "feedback-msg correct";
                selectedEs.btn.classList.add('matched');
                selectedEn.btn.classList.add('matched');
                selectedEs.btn.style.backgroundColor = 'var(--success)';
                selectedEn.btn.style.backgroundColor = 'var(--success)';
                matches++;
            } else {
                feedback.textContent = "Inténtalo de nuevo";
                feedback.className = "feedback-msg incorrect";
                const b1 = selectedEs.btn;
                const b2 = selectedEn.btn;
                b1.style.borderColor = 'var(--error)';
                b2.style.borderColor = 'var(--error)';
                setTimeout(() => {
                    b1.style.borderColor = 'var(--primary-color)';
                    b2.style.borderColor = 'var(--primary-color)';
                }, 500);
            }
            selectedEs = null;
            selectedEn = null;
            if (matches === game.pairs.length) {
                setTimeout(() => {
                    if (onComplete) onComplete(true);
                    else handleLevelComplete(matches, game.pairs.length);
                }, 1000);
            }
        }
    }
}

// 6. Speech Practice Engine (New - Exam Mode + Manual Next)
function setupSpeechPractice(game, container, onComplete) {
    const targetText = game.text || "Hello world";

    container.innerHTML = `
        <div class="speech-container fade-in">
            <h3 style="color:var(--secondary-color); margin-bottom:0.3rem; font-size:1.2rem;">Evaluación de Pronunciación:</h3>
            <p style="color:#aaa; font-size:0.9rem; margin-bottom:1rem;">Lee la frase en voz alta. Presiona <strong style="color:var(--error);">STOP</strong> cuando termines.</p>
            
            <blockquote id="target-quote" style="font-size: 1.2rem; margin: 1rem auto; max-width:700px; border-left: 4px solid var(--primary-color); padding: 1rem; background:rgba(124, 77, 255, 0.1); border-radius:8px; color: var(--text-highlight); line-height:1.6;">
                "${targetText}"
            </blockquote>

            <div style="margin: 1.5rem 0; position:relative;">
                <div class="mic-wrapper" style="margin:0 auto;">
                    <button id="btn-mic" class="mic-button">
                        <i class="fas fa-microphone" style="font-size:2.5rem;"></i>
                    </button>
                    <div class="mic-ring"></div>
                </div>
                
                <!-- Recording Timer -->
                <div id="recording-timer" style="position:absolute; top:-35px; left:50%; transform:translateX(-50%); font-size:1.3rem; font-weight:bold; color:var(--error); opacity:0; transition:opacity 0.3s;">
                    <i class="fas fa-circle" style="font-size:0.7rem; animation:blink 1s infinite;"></i> <span id="timer-display">0:00</span>
                </div>
                
                <!-- Instruction Label -->
                <p id="mic-instruction" style="margin-top:1rem; font-size:1rem; color:var(--text-secondary); font-weight:500;">
                    Presiona el micrófono para comenzar
                </p>
            </div>

            <div class="audio-visualizer" id="visualizer" style="margin:1rem auto; justify-content:center;">
                <div class="bar"></div><div class="bar"></div><div class="bar"></div>
                <div class="bar"></div><div class="bar"></div><div class="bar"></div>
                <div class="bar"></div><div class="bar"></div><div class="bar"></div>
                <div class="bar"></div>
            </div>

            <div class="transcription-box" id="transcription-box" style="margin:1rem auto; max-width:700px; min-height:60px; padding:1rem; background:rgba(255,255,255,0.05); border-radius:12px; border:2px solid rgba(124, 77, 255, 0.3);">
                <p id="user-speech" style="color:var(--text-secondary); font-size:1rem; margin:0;">Tu transcripción aparecerá aquí...</p>
            </div>
            
            <button id="btn-next-speech" class="game-btn fade-in hidden" style="margin-top:1.5rem; background:linear-gradient(135deg, var(--primary-color), #6200ea); padding:1rem 2.5rem; font-size:1rem; border-radius:50px; box-shadow:0 8px 20px rgba(124, 77, 255, 0.4); transition:all 0.3s;">
                Siguiente Pregunta <i class="fas fa-arrow-right" style="margin-left:0.5rem;"></i>
            </button>
        </div>
    `;

    const btnMic = document.getElementById('btn-mic');
    const btnNext = document.getElementById('btn-next-speech');
    const userSpeech = document.getElementById('user-speech');
    const visualizer = document.getElementById('visualizer');
    const micInstruction = document.getElementById('mic-instruction');
    const recordingTimer = document.getElementById('recording-timer');
    const timerDisplay = document.getElementById('timer-display');

    let timerInterval = null;
    let seconds = 0;

    // Speech API Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        userSpeech.textContent = "⚠️ Tu navegador no soporta reconocimiento de voz.";
        userSpeech.style.color = "var(--error)";
        btnMic.disabled = true;
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;

    let isRecording = false;
    let finalTranscript = '';
    let hasRecorded = false; // To prevent multiple logic runs

    btnMic.onclick = () => {
        if (!isRecording) {
            // Start Recording
            recognition.start();
            isRecording = true;
            hasRecorded = false;

            btnMic.classList.add('recording');
            btnMic.innerHTML = '<i class="fas fa-stop" style="font-size:2rem;"></i>';
            visualizer.classList.add('active');
            micInstruction.textContent = 'Presiona STOP cuando termines de hablar';
            micInstruction.style.color = 'var(--error)';

            // Start Timer
            seconds = 0;
            recordingTimer.style.opacity = '1';
            timerInterval = setInterval(() => {
                seconds++;
                const mins = Math.floor(seconds / 60);
                const secs = seconds % 60;
                timerDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
            }, 1000);

            userSpeech.textContent = "";
            finalTranscript = "";
            btnNext.classList.add('hidden');
        } else {
            // Stop Recording
            recognition.stop();
            isRecording = false;

            btnMic.classList.remove('recording');
            btnMic.innerHTML = '<i class="fas fa-microphone" style="font-size:2.5rem;"></i>';
            visualizer.classList.remove('active');
            micInstruction.textContent = 'Grabación completada';
            micInstruction.style.color = 'var(--success)';

            // Stop Timer
            clearInterval(timerInterval);
            recordingTimer.style.opacity = '0';

            // Show Next Button
            btnNext.classList.remove('hidden');
        }
    };

    btnNext.onclick = () => {
        // Calculate and Finish
        const similarity = calculateLevenshteinSimilarity(targetText, finalTranscript);
        const status = similarity >= 60 ? 'correct' : 'incorrect';

        onComplete({
            status: status,
            score: similarity,
            transcript: finalTranscript,
            target: targetText
        });
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        userSpeech.textContent = finalTranscript + interimTranscript;
    };

    recognition.onerror = (event) => {
        console.error("Speech Error:", event.error);

        if (userSpeech) {
            userSpeech.textContent = "Error de reconocimiento: " + event.error;
            userSpeech.style.color = "var(--error)";
        }

        if (micInstruction) {
            micInstruction.textContent = "Hubo un error. Inténtalo de nuevo o continúa.";
            micInstruction.style.color = "var(--error)";
        }

        if (btnNext) {
            btnNext.classList.remove('hidden');
        }

        if (visualizer) {
            visualizer.classList.remove('active');
        }
    }
}

// 6.5. Listening Practice Engine (New - TTS Based)
function setupListeningPractice(game, container, onComplete) {
    const script = game.script || "Remote work offers flexibility, but the main drawback is the loss of company culture and spontaneous collaboration.";
    const question = game.question || "According to the speaker, what is the main drawback of remote work?";
    const options = game.options || [
        "Reduced productivity",
        "Lack of flexibility",
        "Loss of company culture and spontaneous collaboration",
        "Increased costs for the company"
    ];
    const correctIndex = game.correct || 2;

    let playsLeft = 2;
    let hasAnswered = false;

    container.innerHTML = `
        <div class="speech-container fade-in">
            <h3 style="color:var(--secondary-color); margin-bottom:0.3rem; font-size:1.2rem;">Practice 6: Simulated Listening</h3>
            <p style="color:#aaa; font-size:0.9rem; margin-bottom:1rem;">Listen to the recording and answer the question. You can only listen twice.</p>
            
            <div style="margin: 1.5rem 0;">
                <div class="mic-wrapper" style="margin:0 auto;">
                    <button id="btn-play-audio" class="mic-button">
                        <i class="fas fa-volume-up" style="font-size:2.5rem;"></i>
                    </button>
                    <div class="mic-ring"></div>
                </div>
            </div>
            
            <div class="audio-visualizer" id="visualizer" style="margin:1rem auto; justify-content:center;">
                <div class="bar"></div><div class="bar"></div><div class="bar"></div>
                <div class="bar"></div><div class="bar"></div><div class="bar"></div>
                <div class="bar"></div><div class="bar"></div><div class="bar"></div>
                <div class="bar"></div>
            </div>
            
            <p style="font-size:1.1rem; margin:1rem 0; color:var(--text-secondary);">
                🔊 Plays left: <span id="plays-counter" style="color:var(--accent-color); font-weight:bold; font-size:1.2rem;">${playsLeft}</span>
            </p>
            
            <div style="margin-top:1.5rem; width:100%; max-width:700px; margin-left:auto; margin-right:auto;">
                <h4 style="color:var(--text-highlight); margin-bottom:1rem; font-size:1.1rem; line-height:1.5;">${question}</h4>
                <div id="options-container" style="display:flex; flex-direction:column; gap:0.8rem;">
                    ${options.map((opt, idx) => `
                        <button class="game-btn listening-option" data-index="${idx}" style="text-align:left; padding:1rem 1.2rem; font-size:0.95rem; border-radius:12px; transition:all 0.3s; border:2px solid rgba(124, 77, 255, 0.3);">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div id="listening-feedback" class="feedback-msg" style="margin-top:1.5rem; font-size:1rem;"></div>
        </div>
    `;

    const btnPlay = document.getElementById('btn-play-audio');
    const visualizer = document.getElementById('visualizer');
    const playsCounter = document.getElementById('plays-counter');
    const feedback = document.getElementById('listening-feedback');
    const optionButtons = container.querySelectorAll('.listening-option');

    // Text-to-Speech Setup
    const synth = window.speechSynthesis;

    btnPlay.onclick = () => {
        if (playsLeft <= 0) {
            feedback.textContent = "No more plays available.";
            feedback.className = "feedback-msg incorrect";
            return;
        }

        if (synth.speaking) return; // Already playing

        const utterance = new SpeechSynthesisUtterance(script);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;

        utterance.onstart = () => {
            btnPlay.classList.add('recording');
            visualizer.classList.add('active');
        };

        utterance.onend = () => {
            btnPlay.classList.remove('recording');
            visualizer.classList.remove('active');
            playsLeft--;
            playsCounter.textContent = playsLeft;

            if (playsLeft === 0) {
                btnPlay.disabled = true;
                btnPlay.style.opacity = '0.5';
                btnPlay.style.cursor = 'not-allowed';
            }
        };

        synth.speak(utterance);
    };

    optionButtons.forEach((btn, idx) => {
        btn.onclick = () => {
            if (hasAnswered) return;
            hasAnswered = true;

            optionButtons.forEach(b => b.disabled = true);

            if (idx === correctIndex) {
                btn.style.background = 'var(--success)';
                feedback.textContent = "✓ Correct!";
                feedback.className = "feedback-msg correct";

                setTimeout(() => onComplete('correct'), 1000);
            } else {
                btn.style.background = 'var(--error)';
                optionButtons[correctIndex].style.background = 'var(--success)';
                feedback.textContent = "✗ Incorrect. The correct answer is highlighted.";
                feedback.className = "feedback-msg incorrect";

                setTimeout(() => onComplete('incorrect'), 2000);
            }
        };
    });
}

// Levenshtein Distance Helper (String Similarity)
function calculateLevenshteinSimilarity(s1, s2) {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    const updateS1 = longer.toLowerCase().replace(/[^a-z0-9]/g, ''); // Remove punctuation
    const updateS2 = shorter.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (updateS1.length === 0) return 0; // Both empty

    const costs = new Array();
    for (let i = 0; i <= updateS1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= updateS2.length; j++) {
            if (i == 0) costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (updateS1.charAt(i - 1) != updateS2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[updateS2.length] = lastValue;
    }

    const distance = costs[updateS2.length];
    return Math.round((1.0 - distance / updateS1.length) * 100);
}

// 7. Builder Logic (SQL) 
function setupBuilder(game, container, onComplete) {
    let currentChallengeIndex = 0;
    let currentQuery = [];
    let internalCorrect = 0;

    function showChallenge() {
        const challenge = game.challenges[currentChallengeIndex];
        currentQuery = [];

        container.innerHTML = ` 
            <h3>Misión: ${challenge.goal}</h3> 
            <div id="query-display" style="background:#000; color:#0f0; padding:1rem; margin:1rem 0; min-height:3rem; font-family:monospace; border-radius:4px;"></div> 
            <div id="blocks-area" class="game-options"> 
                ${challenge.blocks.sort(() => Math.random() - 0.5).map(block => ` 
                    <button class="game-btn block-btn">${block}</button> 
                `).join('')} 
            </div> 
            <div style="display:flex; gap:1rem; justify-content:center; margin-top:1rem;"> 
                <button class="game-btn" style="border-color:var(--error)" onclick="resetQuery()">Borrar</button> 
                <button class="game-btn" style="border-color:var(--success)" onclick="checkQuery()">Verificar</button> 
            </div> 
            <div id="builder-feedback" class="feedback-msg" style="margin-top:1rem;"></div> 
        `;

        document.querySelectorAll('.block-btn').forEach(btn => {
            btn.onclick = () => {
                currentQuery.push(btn.textContent);
                updateDisplay();
            };
        });
    }

    window.updateDisplay = () => {
        const display = document.getElementById('query-display');
        display.textContent = currentQuery.join(' ');
    };

    window.resetQuery = () => {
        currentQuery = [];
        updateDisplay();
        document.getElementById('builder-feedback').textContent = '';
    };

    window.checkQuery = () => {
        const challenge = game.challenges[currentChallengeIndex];
        const userString = currentQuery.join(' ');
        const feedback = document.getElementById('builder-feedback');

        const isCorrect = (userString === challenge.correct);

        if (isCorrect) {
            internalCorrect++;
            feedback.textContent = "¡Consulta Correcta!";
            feedback.className = "feedback-msg correct";
        } else {
            feedback.textContent = "Error de sintaxis o lógica";
            feedback.className = "feedback-msg incorrect";
        }

        setTimeout(() => {
            currentChallengeIndex++;
            if (currentChallengeIndex < game.challenges.length) {
                showChallenge();
            } else {
                // Final of this builder challenge set
                const finalResults = {
                    correct: internalCorrect,
                    incorrect: game.challenges.length - internalCorrect,
                    empty: 0
                };

                if (onComplete) {
                    // If part of a larger mixed test, send success status
                    // but we might want to pass the count instead.
                    // For now, let's keep it simple.
                    onComplete(isCorrect);
                } else {
                    handleLevelComplete(finalResults, game.challenges.length);
                }
            }
        }, 1500);
    };

    showChallenge();
}

// 7. Pseudocode Builder (Drag & Drop Version)
function setupPseudocodeBuilder(game, container, onComplete) {
    // 1. Define Solution & Palette
    const solutionKeywords = game.lines.map(line => {
        const firstWord = line.trim().split(' ')[0];
        const knownKeywords = ['Inicio', 'Fin', 'Leer', 'Escribir', 'Si', 'Sino', 'FinSi', 'Para', 'FinPara', 'Repetir', 'Hasta', 'Según', 'Caso', 'FinSegún'];
        return knownKeywords.includes(firstWord) ? firstWord : 'Proceso';
    });

    const keywords = ['Inicio', 'Fin', 'Leer', 'Escribir', 'Si', 'Sino', 'FinSi', 'Para', 'FinPara', 'Repetir', 'Hasta', 'Proceso', 'Según', 'Caso', 'FinSegún'];

    // 2. Render UI
    // 2. Render UI (Glassmorphism + 2 Columns)
    container.innerHTML = `
        <div class="exercise-header fade-in" style="margin-bottom: 2rem; text-align: center;">
            <h2 style="color: var(--primary-color); margin-bottom: 0.5rem;">${game.title}</h2>
            <p style="color: var(--text-secondary); font-size: 1.1rem;">${game.instruction}</p>
        </div>

        <div class="pseudocode-container">
            <div class="ps-palette">
                <h4>Bloques</h4>
                ${keywords.map(k => `<div class="ps-keyword" draggable="true" data-keyword="${k}">${k}</div>`).join('')}
            </div>
            <div id="ps-editor" class="ps-editor">
                <div style="color:#64748b; font-style:italic; text-align:center; margin-top:50px; pointer-events:none;" id="ps-placeholder">
                    Arrastra los bloques aquí...
                </div>
            </div>
        </div>

        <div class="top-right-controls">
            <div id="ps-feedback" class="feedback-toast" style="display:none;"></div> 
            <button id="btn-check-ps" class="btn-next">Siguiente ➡</button>
        </div>
    `;

    // 3. Logic
    const editor = document.getElementById('ps-editor');
    const paletteItems = container.querySelectorAll('.ps-keyword');
    let draggedKeyword = null;

    // Drag Source
    paletteItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedKeyword = item.getAttribute('data-keyword');
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('text/plain', draggedKeyword);
        });

        // Click fallback
        item.addEventListener('click', () => addPsLine(item.getAttribute('data-keyword')));
    });

    // Drop Target
    editor.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        editor.style.background = 'rgba(30, 41, 59, 1)';
    });
    editor.addEventListener('dragleave', () => editor.style.background = '');
    editor.addEventListener('drop', (e) => {
        e.preventDefault();
        editor.style.background = '';
        const dataKey = draggedKeyword || e.dataTransfer.getData('text/plain');
        if (dataKey) addPsLine(dataKey);
    });

    // Helper: Add Line
    function addPsLine(keyword) {
        if (document.getElementById('ps-placeholder')) document.getElementById('ps-placeholder').remove();

        const lineDiv = document.createElement('div');
        lineDiv.className = 'ps-line';
        lineDiv.setAttribute('data-keyword', keyword);

        // Context-aware placeholder
        let placeholder = "...";
        if (keyword === 'Inicio') placeholder = "Nombre del algoritmo";
        else if (keyword === 'Leer') placeholder = "variable";
        else if (keyword === 'Escribir') placeholder = "\"Mensaje\"";
        else if (keyword === 'Si') placeholder = "condición Entonces";

        lineDiv.innerHTML = `
            <span class="ps-line-keyword">${keyword}</span>
            <input type="text" class="ps-line-input" placeholder='${placeholder}'>
            <span class="ps-line-remove" title="Borrar línea" onclick="this.parentElement.remove()">×</span>
        `;

        editor.appendChild(lineDiv);
        const input = lineDiv.querySelector('input');
        if (input) input.focus();
        editor.scrollTop = editor.scrollHeight;
    }

    // 4. Check & Advance Logic
    // 4. Check & Advance Logic
    document.getElementById('btn-check-ps').onclick = () => {
        const feedback = document.getElementById('ps-feedback');
        if (!feedback) return;

        const btn = document.getElementById('btn-check-ps');
        if (btn) btn.disabled = true;

        const currentLines = Array.from(editor.querySelectorAll('.ps-line'));

        if (currentLines.length === 0) {
            feedback.innerHTML = `<span>⚠️</span> Respuesta vacía`;
            feedback.className = "feedback-toast incorrect";
            feedback.style.display = 'block';
            // Advance anyway with 'empty' status
            setTimeout(() => {
                feedback.style.display = 'none';
                if (onComplete) onComplete('empty');
            }, 1500);
            return;
        }

        const currentKeywords = currentLines.map(div => div.getAttribute('data-keyword'));

        let isCorrect = true;
        if (currentKeywords.length !== solutionKeywords.length) isCorrect = false;
        else {
            for (let i = 0; i < solutionKeywords.length; i++) {
                if (currentKeywords[i] !== solutionKeywords[i]) {
                    isCorrect = false;
                    break;
                }
            }
        }

        // Visual Feedback
        feedback.style.display = 'block';
        if (isCorrect) {
            feedback.innerHTML = `<span>✔</span> ¡Correcto!`;
            feedback.className = "feedback-toast correct";
        } else {
            feedback.innerHTML = `<span>✖</span> Incorrecto`;
            feedback.className = "feedback-toast incorrect";
        }

        // ALWAYS ADVANCE with specific status
        setTimeout(() => {
            feedback.style.display = 'none';
            if (onComplete) onComplete(isCorrect ? 'correct' : 'incorrect');
        }, 2000);
    };
}

// 8. Quiz Item Logic (Single Question)
function setupQuizItem(exercise, container, onComplete) {
    let hasAnswered = false;
    container.innerHTML = `
        <div class="game-question">
            <h3>${exercise.question}</h3>
        </div>
        <div class="game-options">
            ${exercise.options.map((opt, idx) => `
                <button class="game-btn option-btn" data-index="${idx}">${opt}</button>
            `).join('')}
        </div>
    `;

    const btns = container.querySelectorAll('.option-btn');

    btns.forEach(btn => {
        btn.onclick = () => {
            if (hasAnswered) return;
            hasAnswered = true;
            const selected = parseInt(btn.getAttribute('data-index'));
            btns.forEach(b => b.disabled = true);

            const isCorrect = (selected === exercise.correct);

            // Visual feedback
            if (isCorrect) {
                btn.style.backgroundColor = 'var(--success)';
            } else {
                btn.style.backgroundColor = 'var(--error)';
                btns[exercise.correct].style.backgroundColor = 'var(--success)';
            }

            if (onComplete) onComplete(isCorrect);
        };
    });
}

