
/*Creación del usuario para acceder a la BD.*/

CREATE USER 'juego'@'localhost' IDENTIFIED BY 'juego';

# Base de datos 
CREATE DATABASE juego;
USE juego;

# Tabla

CREATE TABLE cursos (
	curso VARCHAR(10),
	CONSTRAINT PK_CURSOS PRIMARY KEY(curso)
);

CREATE TABLE usuarios (
	nombre VARCHAR(30), 
	puntuacion INT NOT NULL,
	curso VARCHAR(10),
	CONSTRAINT PK_USUARIOS PRIMARY KEY(nombre),
	CONSTRAINT FK_CURSO_USUARIOS FOREIGN KEY(curso)
 	REFERENCES cursos(curso)
);



INSERT INTO cursos VALUES ("1ºESO");
INSERT INTO cursos VALUES ("2ºESO");
INSERT INTO cursos VALUES ("3ºESO");
INSERT INTO cursos VALUES ("4ºESO");
INSERT INTO cursos VALUES ("1ºBACH");
INSERT INTO cursos VALUES ("2ºBACH");
INSERT INTO cursos VALUES ("FPB Auto");
INSERT INTO cursos VALUES ("FBP Elec");
INSERT INTO cursos VALUES ("SMR");
INSERT INTO cursos VALUES ("DAW");
INSERT INTO cursos VALUES ("ASIR");
INSERT INTO cursos VALUES ("APSD");
INSERT INTO cursos VALUES ("MCO");
INSERT INTO cursos VALUES ("ASCT");
INSERT INTO cursos VALUES ("IEA");
INSERT INTO cursos VALUES ("STI");
INSERT INTO cursos VALUES ("GA");
INSERT INTO cursos VALUES ("EVA");

INSERT INTO usuarios VALUES ('Guillermo', 4000, "DAW");

commit;

# Privilegios ( otorgarlos siendo root)
GRANT ALL PRIVILEGES ON juego.* TO 'juego'@'localhost';

FLUSH PRIVILEGES;

