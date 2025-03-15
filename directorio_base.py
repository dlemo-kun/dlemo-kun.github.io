# Este codigo no lo hice yo

import pyperclip
import os

def listar_contenido_numerado(directorio, nivel=1, prefijo=''):
    contenido = []
    elementos = sorted(os.listdir(directorio))
    
    for i, elemento in enumerate(elementos, 1):
        ruta_completa = os.path.join(directorio, elemento)
        numero = f"{prefijo}{i}"
        if os.path.isdir(ruta_completa):
            contenido.append(f"{numero}. {elemento}")
            subcontenido = listar_contenido_numerado(ruta_completa, nivel + 1, f"{numero}.   ")
            contenido.extend(subcontenido)
        else:
            contenido.append(f"{numero}. {elemento}")
    
    return contenido

# Obtener el directorio actual donde se encuentra el script
directorio_actual = os.getcwd()

# Listar el contenido del directorio actual
contenido_numerado = listar_contenido_numerado(directorio_actual)

# Mostrar el contenido numerado
for linea in contenido_numerado:
    print(linea)
    
# Copiar la lista al portapapeles
pyperclip.copy("\n".join(contenido_numerado))
input("La lista ha sido copiada al portapapeles. Presiona Enter para salir.")