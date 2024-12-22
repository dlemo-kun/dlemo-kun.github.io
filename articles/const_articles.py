import os
import re
# import pyperclip

# Directorio donde están los archivos HTML
directory = os.path.dirname(os.path.abspath(__file__))
# directory = '/ruta/a/tu/carpeta'

# Obtener y ordenar archivos HTML
files = [f for f in os.listdir(directory) if f.endswith('.html')]
files.sort(key=lambda f: int(re.search(r'(\d+)', f).group()))

# Crear la cadena de formato adecuado
articles = ', '.join([f'"{file}"' for file in files])
output = f'const articles = [{articles}];'

# Copiar al portapapeles
# pyperclip.copy(output)
# print("Cadena copiada al portapapeles:")
input(output)