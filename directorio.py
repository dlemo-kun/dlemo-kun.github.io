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

# Obtener la lista de directorios en el directorio actual
directorios = [d for d in os.listdir('.') if os.path.isdir(d)]

# Mostrar los directorios con números
for i, directorio in enumerate(directorios, 1):
    print(f"{i}. {directorio}")

# Pedir al usuario que seleccione un directorio por su número
while True:
    try:
        seleccion = int(input("Selecciona un directorio por su número: "))
        if 1 <= seleccion <= len(directorios):
            directorio_seleccionado = directorios[seleccion - 1]
            print(f"Has seleccionado: {directorio_seleccionado}")
            break
        else:
            print("Número fuera de rango, intenta de nuevo.")
    except ValueError:
        print("Por favor, introduce un número válido.")

# Listar el contenido del directorio seleccionado
contenido_numerado = listar_contenido_numerado(directorio_seleccionado)



# Mostrar el contenido numerado
for linea in contenido_numerado:
    print(linea)
    
# # Copiar la lista al portapapeles
# pyperclip.copy(lista_formateada)
input("La lista ha sido copiada al portapapeles.")