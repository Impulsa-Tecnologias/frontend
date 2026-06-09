# Cibot-Chat (Frontend)

¡Bienvenido al repositorio del cliente frontend de **Cibot-Chat**! Esta es una aplicación web moderna e interactiva desarrollada con **React 19**, **Vite** y **TypeScript**, utilizando **Tailwind CSS** para un diseño estilizado y fluido. 

La interfaz permite a los usuarios interactuar con el asistente de IA, navegar por los menús del sistema, actualizar sus perfiles y gestionar su recetario personal.

Este proyecto está diseñado para consumir los endpoints proporcionados por el servicio Backend (puedes encontrarlo aquí: [Backend](https://github.com/Impulsa-Tecnologias/backend)).

---

## 🚀 Tecnologías Principales

* **React 19** & **TypeScript**
* **Vite** (Herramienta de construcción)
* **Bun** (Gestor de paquetes y entorno de ejecución)
* **Tailwind CSS v4** (Framework de estilos en cascada)
* **React Markdown** (Para renderizar las respuestas de la IA)

---

## 📋 Requisitos Previos

Antes de clonar e iniciar la aplicación, asegúrate de tener instalado en tu máquina local:

1. **Bun** (Se recomienda la versión estable más reciente). Si no lo tienes, puedes instalarlo ejecutando:
   ```bash
   powershell -c "irm bun.sh/install.ps1 | iex"
   ```
2. **El servicio Backend en ejecución** (para poder consumir los endpoints de autenticación, chats y recetas).

---

## ⚙️ Instalación y Configuración

Sigue estos pasos para levantar el entorno de desarrollo local:

### 1. Clonar el repositorio

Abre tu terminal y ejecuta los siguientes comandos:
```bash
git clone https://github.com/Impulsa-Tecnologias/frontend.git
cd frontend
```

### 2. Configurar las variables de entorno (.env)
El frontend necesita saber en qué dirección se encuentra escuchando la API del backend. En la raíz del proyecto verás un archivo llamado ``.env.example``.

#### 1. Copia el archivo y renombralo a .env:
```bash
cp .env.example .env
```

#### 2. Abre el archivo .env y asegúrate de que apunte a la dirección correcta de tu backend local:
```Fragmento de código
# URL base de la API de Spring Boot (Ajusta el puerto si tu backend usa otro)
VITE_API_URL=http://localhost:8082
```

⚠️ **Nota:** Las variables en el ``.env`` real están protegidas por el ``.gitignore`` y no se subirán al repositorio público.

### 3. Instalar dependencias y ejecutar

Usa el motor de **Bun** para resolver e instalar los paquetes de Node de forma masiva y arrancar el servidor de desarrollo:
```bash
# Instalar los paquetes necesarios
bun install

# Iniciar el servidor local en modo desarrollo
bun run dev
```
Una vez que la consola te indique que está listo, usualmente podrás abrir la aplicación en tu navegador ingresando a ``http://localhost:5173`` (o el puerto que te asigne Vite).

---

## 🛠️ Scripts Disponibles

En este proyecto puedes ejecutar los siguientes comandos mediante Bun:
* ``bun run dev``: Arranca la aplicación en entorno de desarrollo con Hot *Module Replacement* (HMR).
* ``bun run build``: Compila el código TypeScript y genera los archivos de producción optimizados en la carpeta ``/dist``.
* ``bun run lint``: Ejecuta ESLint para analizar el código en busca de errores de sintaxis o malas prácticas.
* ``bun run preview``: Sirve localmente los archivos compilados de la carpeta de producción para pruebas previas al despliegue.
