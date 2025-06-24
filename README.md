## 🗳️ Sistema de Votaciones – Prueba Técnica
Este proyecto es una API RESTful para la gestión de votaciones, incluyendo votantes, candidatos y votos, con validaciones para asegurar la integridad del sistema.

## 🚀 Requisitos
- Node.js v18+

- MySQL o MySQL Workbench

- Git

## ⚙️ Instalación y ejecución local
- Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/sistema-votaciones.git
cd Prueba-Tecnica-New-Inntech
```
Instala las dependencias:

```bash
npm install
```

**3. Configura tu base de datos:**

Asegúrate de tener una base de datos llamada votaciones o ajusta la conexión en models/db.js. Ejecuta este SQL para crear las tablas:

```sql

CREATE TABLE voter (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  has_voted BOOLEAN DEFAULT FALSE
);

CREATE TABLE candidate (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  party VARCHAR(255),
  votes INT DEFAULT 0
);

CREATE TABLE vote (
  id INT AUTO_INCREMENT PRIMARY KEY,
  voter_id INT NOT NULL,
  candidate_id INT NOT NULL,
  FOREIGN KEY (voter_id) REFERENCES voter(id),
  FOREIGN KEY (candidate_id) REFERENCES candidate(id)
);
```
**4 .Ejecuta el servidor:**

```bash

npm run dev
```

## 📦 Endpoints del API
🔹 Votantes
Método	Endpoint	Descripción
POST	/voters	Registrar un nuevo votante
GET	/voters	Listar votantes
GET	/voters/id	Ver detalles de un votante
DELETE	/voters/id	Eliminar un votante

🔹 Candidatos
Método	Endpoint	Descripción
POST	/candidates	Registrar un nuevo candidato
GET	/candidates	Listar candidatos
GET	/candidates/id	Ver detalles de un candidato
DELETE	/candidates/id	Eliminar un candidato

🔹 Votos
Método	Endpoint	Descripción
POST	/votes	Emitir un voto
GET	/votes	Ver todos los votos
GET	/votes/statistics	Ver estadísticas de votación


## EJemplos de Endpoints de Votantes(voters) con Postman

- **Get de Votantes**


- **Post de Votantes**


- **GetById de Votantes**


- **Delete de Votantes NOTA: La petición Delete solo funciona si el votante no ha votado.**

- **Ejemplo del middleware con la tabla voter y candidate**

# NOTA: Las rutas con candidatos funcionan de la misma manera, solo que con rutas diferentes las cuales se pueden ver en el apartado de Endpoints de la api


## Ejemplos del estadisticas con statistics de las rutas con Votes



