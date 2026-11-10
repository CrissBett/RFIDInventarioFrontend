# Sistema RFID de Gestión de Inventarios

Front-end web responsivo para el **Sistema de Gestión de Inventarios de Activos con Tecnología RFID**, desarrollado como proyecto formativo del programa **Análisis y Desarrollo de Software del SENA**.

Esta aplicación permite administrar las categorías utilizadas para clasificar los activos del sistema. El módulo está conectado con una API REST desarrollada en Spring Boot y constituye el primer incremento funcional del producto final.

## Información académica

- **Aprendiz:** Cristian Camilo Betancur Alzate
- **Programa:** Análisis y Desarrollo de Software
- **Ficha:** 3336117
- **Instructora:** Doris Matilde Ordoñez Lasso
- **Centro de formación:** Centro de Teleinformática y Producción Industrial
- **Institución:** Servicio Nacional de Aprendizaje, SENA
- **Evidencia:** GA7-220501096-AA4-EV03
- **Producto:** Componente front-end del proyecto formativo

## Descripción del proyecto

El Sistema RFID de Gestión de Inventarios busca mejorar el control y la trazabilidad de los activos empresariales mediante tecnologías web, servicios REST y lectura por radiofrecuencia.

La solución está diseñada para crecer progresivamente hasta incorporar:

1. Dashboard.
2. Categorías de activos.
3. Activos.
4. Ubicaciones y zonas.
5. Etiquetas y lecturas RFID.
6. Inventarios en campo.
7. Conciliación, alertas y auditoría.
8. Operación y configuración.

En esta evidencia se implementa completamente el módulo **Categorías de activos**. Los demás módulos se presentan en el menú como próximos incrementos del producto.

## Arquitectura general

La solución utiliza una arquitectura cliente-servidor:

```text
React + Vite
      |
      | HTTP / JSON
      v
API REST Spring Boot
      |
      | JPA / Hibernate
      v
Base de datos MySQL
```

El front-end y el back-end se mantienen como proyectos independientes:

- **Front-end:** React, Vite, JavaScript y CSS.
- **Back-end:** Java 21, Spring Boot 3.2.12 y Maven.
- **Persistencia:** MySQL 8.
- **Control de versiones:** Git y GitHub.

## Tecnologías utilizadas

### Front-end

- React
- Vite
- JavaScript
- HTML5
- CSS3
- Fetch API
- ESLint
- Git
- GitHub

### Back-end relacionado

- Java 21
- Spring Boot 3.2.12
- Spring Data JPA
- Hibernate ORM
- Jakarta Validation
- Apache Maven
- MySQL 8

## Identidad visual

La interfaz aplica los lineamientos principales del Manual de Identidad Corporativa de Ladrillera Santafé:

- Azul corporativo: `#1e2873`
- Naranja corporativo: `#fb6a00`
- Tipografía alternativa corporativa: Poppins
- Fondos claros y superficies blancas
- Estados visuales diferenciados para éxito, advertencia y error
- Diseño adaptable para computador, tableta y celular

## Funcionalidades implementadas

El módulo Categorías de activos permite:

- Consultar todas las categorías registradas.
- Buscar categorías por nombre o descripción.
- Registrar una categoría.
- Editar una categoría existente.
- Activar o inactivar una categoría.
- Eliminar una categoría con confirmación.
- Mostrar mensajes de éxito, advertencia y error.
- Mostrar un indicador durante las operaciones asíncronas.
- Validar los campos antes de enviar información.
- Adaptar el listado a tarjetas en dispositivos móviles.
- Informar cuáles módulos serán desarrollados en próximos incrementos.

## Validaciones del formulario

El formulario utiliza el contrato real de la entidad `CategoriaActivo`.

| Campo | Validación |
|---|---|
| `idCategoria` | Generado automáticamente por el back-end |
| `nombre` | Obligatorio y máximo 100 caracteres |
| `descripcion` | Obligatoria y máximo 255 caracteres |
| `activo` | Valor booleano obligatorio |

Ejemplo del objeto enviado a la API:

```json
{
  "nombre": "Equipos audiovisuales",
  "descripcion": "Proyectores, pantallas y sistemas de sonido",
  "activo": true
}
```

Ejemplo de una respuesta del servidor:

```json
{
  "idCategoria": 9,
  "nombre": "Equipos audiovisuales",
  "descripcion": "Proyectores, pantallas y sistemas de sonido",
  "activo": true
}
```

## Endpoints utilizados

La ruta base del recurso es:

```text
/api/categorias
```

| Operación | Método | Ruta | Respuesta esperada |
|---|---|---|---|
| Listar categorías | GET | `/api/categorias` | 200 OK |
| Consultar una categoría | GET | `/api/categorias/{idCategoria}` | 200 OK o 404 Not Found |
| Registrar una categoría | POST | `/api/categorias` | 201 Created |
| Actualizar una categoría | PUT | `/api/categorias/{idCategoria}` | 200 OK o 404 Not Found |
| Eliminar una categoría | DELETE | `/api/categorias/{idCategoria}` | 204 No Content o 404 Not Found |

## Estructura del proyecto

```text
rfid-inventario-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BotonAccion.jsx
│   │   ├── BuscadorCategorias.jsx
│   │   ├── CampoFormulario.jsx
│   │   ├── Encabezado.jsx
│   │   ├── FilaCategoria.jsx
│   │   ├── FormularioCategoria.jsx
│   │   ├── IndicadorCarga.jsx
│   │   ├── MensajeAlerta.jsx
│   │   ├── MenuLateral.jsx
│   │   ├── ModalConfirmacion.jsx
│   │   ├── PanelCategorias.jsx
│   │   ├── PiePagina.jsx
│   │   └── TablaCategorias.jsx
│   ├── services/
│   │   └── categoriaService.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## Responsabilidad de los componentes

### `App`

Administra el estado compartido, coordina las operaciones CRUD, controla la navegación y conecta la interfaz con el servicio de categorías.

### `Encabezado`

Muestra el nombre del sistema, el contexto general y el botón para abrir el menú en dispositivos móviles.

### `MenuLateral`

Presenta los ocho módulos funcionales del producto. El módulo Categorías está disponible y los módulos pendientes se identifican como próximos incrementos.

### `PanelCategorias`

Agrupa el formulario, el buscador, las alertas, el indicador de carga y el listado.

### `FormularioCategoria`

Permite registrar o editar los campos `nombre`, `descripcion` y `activo`.

### `CampoFormulario`

Proporciona campos reutilizables con etiqueta, límite de caracteres y mensajes de validación.

### `BuscadorCategorias`

Filtra las categorías visibles por nombre o descripción sin modificar los datos almacenados.

### `TablaCategorias`

Presenta los registros en una tabla para escritorio y permite su adaptación responsive.

### `FilaCategoria`

Representa una categoría individual y contiene las acciones para editar y eliminar.

### `BotonAccion`

Centraliza los botones primarios, secundarios y de peligro.

### `ModalConfirmacion`

Solicita confirmación antes de eliminar una categoría.

### `MensajeAlerta`

Presenta mensajes de éxito, información, advertencia y error.

### `IndicadorCarga`

Informa que existe una operación asíncrona en curso.

### `PiePagina`

Muestra la identificación académica, el nombre del producto y la versión.

## Requisitos previos

Para ejecutar el front-end se requiere:

- Node.js 20.19 o superior
- npm
- Git
- Navegador web actualizado
- API de Spring Boot disponible en el puerto `8081`
- MySQL en ejecución

Versiones utilizadas durante el desarrollo:

```text
Node.js: 26.13.0
npm: 11.20.0
Vite: 8.3.7
```

## Instalación del front-end

Clonar el repositorio:

```bash
git clone https://github.com/CrissBett/RFIDInventarioFrontend.git
```

Entrar en la carpeta:

```bash
cd RFIDInventarioFrontend
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173/
```

## Ejecución del back-end

El back-end relacionado está disponible en:

```text
https://github.com/CrissBett/RFIDCategoriaActivoSpring
```

Después de configurar MySQL, ingresar en la carpeta del back-end y ejecutar:

```powershell
.\mvnw.cmd spring-boot:run
```

La API estará disponible en:

```text
http://localhost:8081/api/categorias
```

El front-end y el back-end deben permanecer ejecutándose simultáneamente.

## Configuración de la URL de la API

El servicio utiliza esta configuración:

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:8081/api'
```

En el computador local se utiliza:

```text
http://localhost:8081/api
```

Para probar desde un celular conectado a la misma red, se debe crear un archivo `.env.local` con la dirección IP LAN del computador:

```env
VITE_API_BASE_URL=http://192.168.x.x:8081/api
```

El valor `192.168.x.x` debe reemplazarse por la dirección real del equipo que ejecuta Spring Boot.

Los archivos `.env` con configuraciones locales o credenciales no deben publicarse en GitHub.

## Configuración CORS

El controlador de categorías autoriza actualmente el origen de desarrollo:

```java
@CrossOrigin(origins = "http://localhost:5173")
```

Esta configuración permite que React consuma la API durante el desarrollo local.

Para pruebas desde otros dispositivos o para despliegue se deberá ajustar la configuración CORS de forma controlada, evitando autorizar orígenes innecesarios en producción.

## Scripts disponibles

### Iniciar el entorno de desarrollo

```bash
npm run dev
```

### Validar el código con ESLint

```bash
npm run lint
```

### Generar la versión de producción

```bash
npm run build
```

### Previsualizar la versión de producción

```bash
npm run preview
```

## Pruebas realizadas

Se verificaron manualmente las siguientes operaciones:

- Carga de categorías desde MySQL.
- Registro de una categoría desde React.
- Actualización del nombre y la descripción.
- Cambio del estado activo o inactivo.
- Eliminación mediante modal de confirmación.
- Búsqueda por nombre.
- Limpieza del criterio de búsqueda.
- Validación de campos obligatorios.
- Actualización automática del listado.
- Mensajes de éxito y error.
- Conexión React-Spring Boot.
- Compilación con Vite.
- Validación completa con ESLint.
- Diseño adaptable para diferentes tamaños de pantalla.

## Comandos de validación ejecutados

```bash
npm run lint
npm run build
```

Ambos comandos finalizaron correctamente durante el desarrollo.

## Repositorios

### Front-end

```text
https://github.com/CrissBett/RFIDInventarioFrontend
```

### Back-end

```text
https://github.com/CrissBett/RFIDCategoriaActivoSpring
```

## Módulos previstos

El producto continuará creciendo mediante incrementos:

1. Activos.
2. Ubicaciones y zonas.
3. Etiquetas RFID.
4. Lecturas RFID.
5. Inventarios en campo.
6. Conciliación de discrepancias.
7. Alertas.
8. Auditoría.
9. Mantenimiento.
10. Usuarios y roles.
11. Parámetros del sistema.
12. Integración con ERP.
13. PWA.
14. Aplicación Android mediante Capacitor.
15. Integración con lectores RFID compatibles.

## Evolución móvil y RFID

La aplicación se desarrolla con enfoque Mobile-First.

La evolución prevista incluye:

- Instalación como Progressive Web App.
- Trabajo con conectividad limitada.
- Empaquetado para Android mediante Capacitor.
- Captura manual de etiquetas.
- Simulador RFID para pruebas académicas.
- Integración futura con Zebra DataWedge o con el SDK del lector seleccionado.

Un celular convencional no reemplaza por sí solo un lector RFID UHF industrial. La lectura real dependerá del hardware compatible y del método de integración disponible.

## Control de versiones

El proyecto utiliza la rama principal:

```text
main
```

Commits principales:

```text
chore: crear proyecto React con Vite
feat: implementar servicio HTTP de categorias
feat: implementar interfaz responsive de categorias
```

Las dependencias, compilaciones y metadatos locales permanecen excluidos mediante `.gitignore`.

## Archivos excluidos de la entrega

No deben incluirse en el ZIP final:

```text
node_modules/
dist/
.git/
.env
.env.local
```

Estas carpetas y archivos pueden regenerarse mediante `npm install` y `npm run build`.

## Autor

**Cristian Camilo Betancur Alzate**  
Aprendiz de Análisis y Desarrollo de Software  
Ficha 3336117  
Servicio Nacional de Aprendizaje, SENA

## Estado del proyecto

Versión actual:

```text
1.0.0 - Módulo Categorías de activos
```

Estado:

```text
CRUD funcional conectado con Spring Boot y MySQL
```