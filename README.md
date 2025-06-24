## 🗳️ Sistema de Votaciones – Prueba Técnica
Este proyecto es una API RESTful  con el modelo MVC para la gestión de votaciones, incluyendo votantes, candidatos y votos, con validaciones para asegurar la integridad del sistema.

## 🚀 Requisitos
- Node.js v18+

- MySQL o MySQL Workbench

- Git

## ⚙️ 1. Instalación y ejecución local
- Clona el repositorio:
  - Ejecuta los siguientes comandos en una terminal
```bash
https://github.com/JuanOspina18/Prueba-Tecnica-New-Inntech.git
cd Prueba-Tecnica-New-Inntech
```
   - **NOTA: No cerrar la terminal porque se necesitará mas adelante**
- Instala las dependencias:
 Con el siguiente comando instalas todas las dependencias necesarias para que funcione el proyecto
```bash
npm install
```

**2. Configura tu base de datos:**
Ya sea en la terminal de MySQL o MySQL Workbech crea una nueva conexión y ejecuta el siguiente script en una nueva query

```sql

CREATE DATABASE PruebaTecnica;

USE PruebaTecnica;

CREATE TABLE Voter (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  has_voted BOOLEAN DEFAULT FALSE
);

CREATE TABLE Candidate (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  party VARCHAR(255),
  votes INT DEFAULT 0
);

CREATE TABLE Vote (
  id INT AUTO_INCREMENT PRIMARY KEY,
  voter_id INT NOT NULL,
  candidate_id INT NOT NULL,
  FOREIGN KEY (voter_id) REFERENCES Voter(id),
  FOREIGN KEY (candidate_id) REFERENCES Candidate(id),
  UNIQUE KEY unique_vote (voter_id)
);

```
**Despues en el la ruta /src/models/db.js en la constante **pool** puedes cambiar los valores de user,password,port(puerto de conexion), asi como el nombre de la base de datos si quieres cambiarle el nombre al momento de ejecutar el anterior script**

**3 .Ejecuta el servidor:**
- En la Terminal del punto 1 ejecuta el siguiente comando
```bash
npm run dev
```

## 📦 Endpoints del API
    🔹 Votantes
    Método	Endpoint	Descripción
    POST	/voters  	Registrar un nuevo votante
    GET	/voters	        Listar votantes
    GET	/voters/id	Listar votante por medio del ID
    DELETE	/voters/id	Eliminar un votante
    
    🔹 Candidatos
    Método	Endpoint	Descripción
    POST	/candidates	Registrar un nuevo candidato
    GET	/candidates	Listar candidatos
    GET	/candidates/id	Ver detalles de un candidato
    DELETE	/candidates/id	Eliminar un candidato
    
    🔹 Votos
    Método	Endpoint	        Descripción
    POST	/votes	                Emitir un voto
    GET	/votes	                Ver todos los votos
    GET	/votes/statistics	Ver estadísticas de votación


## Ejemplos de Endpoints de Votantes(voters) con Postman

- **Get de Votantes**
  ![Captura de pantalla 2025-06-23 202629](https://github.com/user-attachments/assets/b652af57-04d1-4122-9e5d-83e27fa0bbb3)


- **Post de Votantes**
  ![Captura de pantalla 2025-06-23 203139](https://github.com/user-attachments/assets/460a88e9-ef72-472c-a6c0-79df9ef35d85)


- **GetById de Votantes**
  ![Captura de pantalla 2025-06-23 203612](https://github.com/user-attachments/assets/3594552f-8853-4b39-a056-af230895c607)


- **Delete de Votantes NOTA: La petición Delete solo funciona si el votante no ha votado.**
  ![Captura de pantalla 2025-06-23 203706](https://github.com/user-attachments/assets/f7c0cafe-3f35-4b09-bf5e-4e4a2909e94f)


- **Ejemplo del middleware con la tabla voter y candidate**
  - **Creacion de candidate que ya esta en la tabla voter**
    ![image](https://github.com/user-attachments/assets/e6b9e1cc-60ce-47ed-a5d8-50b9fffea6aa)

  - **Creacion de voter que ya esta en la tabla de candidate**
    ![image](https://github.com/user-attachments/assets/eae7783a-55ef-4dec-9ca0-ec3bf87e18ac)


# NOTA: Las rutas con candidatos funcionan de la misma manera, solo que con rutas diferentes las cuales se pueden ver en el apartado de Endpoints de la api

## Ejemplos de los endpoints de Votes
  - **Post de Votes**
  ![Captura de pantalla 2025-06-23 205049](https://github.com/user-attachments/assets/cc457971-dcb2-4385-a78e-b2af4c46feca)

  - **Get de Votes**
    ![Captura de pantalla 2025-06-23 205120](https://github.com/user-attachments/assets/4e10b8dc-b90f-452f-935c-62cf10003d32)

    
## Ejemplos de estadisticas de los endpoints de Votes
  - **Ejemplo de las estadisticas con la ruta **statistics****
  ![Captura de pantalla 2025-06-23 205209](https://github.com/user-attachments/assets/00eb8428-6bd9-4517-8a26-fd41c555a1a4)

  - **Ejemplo de las estadisticas con mas de un candidato**
  ![Captura de pantalla 2025-06-23 205702](https://github.com/user-attachments/assets/60a12614-874a-41ed-a5dc-53f01362c35e)




