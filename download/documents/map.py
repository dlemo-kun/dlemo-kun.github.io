import os
from datetime import datetime

base_url = "/download/documents"
directorio_raiz = "./download/documents/"
output_file = "map.xml"

def listar_archivos_html(directorio):
    archivos_html = []
    for item in os.listdir(directorio):
        item_path = os.path.join(directorio, item)
        if os.path.isdir(item_path):
            index_path = os.path.join(item_path, "index.html")
            if os.path.exists(index_path):
                ruta_relativa = os.path.relpath(index_path, directorio_raiz)
                archivos_html.append(ruta_relativa)
    return archivos_html

def calcular_prioridad(ruta):
    profundidad = ruta.count(os.sep)
    return max(1.0 - (profundidad * 0.1), 0.1) 

def obtener_fecha_modificacion(ruta):
    timestamp = os.path.getmtime(ruta)
    fecha = datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d')
    return fecha

def generar_url(ruta_relativa):
    ruta_sin_index = ruta_relativa.replace("index.html", "").rstrip(os.sep)
    return f"{base_url}/{ruta_sin_index.replace(os.sep, '/')}"

def generar_map(archivos):
    with open(directorio_raiz + output_file, "w", encoding="utf-8") as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write("<urlset>\n")
        
        for archivo in archivos:
            ruta_completa = os.path.join(directorio_raiz, archivo)
            url = generar_url(archivo)
            fecha_modificacion = obtener_fecha_modificacion(ruta_completa)
            
            f.write("  <url>\n")
            f.write(f"    <loc>{url}</loc>\n")
            f.write(f"    <lastmod>{fecha_modificacion}</lastmod>\n")
            f.write("  </url>\n")
        
        f.write("</urlset>\n")

if __name__ == "__main__":
    archivos_html = listar_archivos_html(directorio_raiz)
    generar_map(archivos_html)
    print(f"map generado en {directorio_raiz + output_file}")