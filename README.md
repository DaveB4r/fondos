# Fondos
## Requerimientos de proyecto
1. Python
2. Anaconda
3. MongoDB Compass (mongo local)
4. Node js

## Instrucciones para ejecutar el proyecto
1. Clona el projecto entero con git clone: ```git clone https://github.com/DaveB4r/fondos.git```
2. En la carpeta fondos/db encontraras los archivos necesarios para crear las colecciones necesarias en MongoDB
  - en MongoDB crea una base de datos local llamada fondos
  - luego crea una colleccion llamada clientes e importa el archivo fondos/db/fondos.clientes.json
  - luego crea una colleccion llamada productos e importa el archivo fondos/db/fondos.productos.json
3. desde una consola o con git bash entra a la carpeta backend:
  - cd fondos/backend
  - Crea el entorno conda con ```conda env create -f environment.yml```
  - Activa el entorno con ```conda activate python-backen```
  - Ejecuta el comando ```python -m uvicorn app:app --reload```
4. desde otra consola o con git bash entra a la carpeta backend:
  - cd fondos/frontend
  - Ejecuta el comando ```npm install```
  - Ejecuta el comando ```npm run dev```

## Muchas gracias por la oportunidad