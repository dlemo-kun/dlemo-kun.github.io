import os
from datetime import datetime

# Configuración
base_url = "https://dlemo-kun.github.io"
directorio_raiz = "."  # Directorio donde está tu proyecto
output_file = "sitemap.xml"

# Función para listar archivos HTML llamados "index.html"
def listar_archivos_html(directorio):
    archivos_html = []
    for root, dirs, files in os.walk(directorio):
        for file in files:
            if file == "index.html":  # Solo incluir archivos llamados "index.html"
                ruta_completa = os.path.join(root, file)
                ruta_relativa = os.path.relpath(ruta_completa, directorio_raiz)
                archivos_html.append(ruta_relativa)
    return archivos_html

# Función para calcular la prioridad basada en la profundidad de la carpeta
def calcular_prioridad(ruta):
    # Cuenta cuántos niveles de profundidad tiene la ruta
    profundidad = ruta.count(os.sep)
    # Prioridad base es 1.0 para la raíz, y disminuye 0.1 por cada nivel
    return max(1.0 - (profundidad * 0.1), 0.1)  # No mayor que 1.0 no menor que 0.1

# Función para obtener la fecha de última modificación de un archivo
def obtener_fecha_modificacion(ruta):
    timestamp = os.path.getmtime(ruta)  # Obtiene el timestamp de la última modificación
    fecha = datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d')  # Formatea la fecha
    return fecha

# Función para generar la URL sin "index.html"
def generar_url(ruta_relativa):
    # Elimina "index.html" de la ruta
    ruta_sin_index = ruta_relativa.replace("index.html", "").rstrip(os.sep)
    # Construye la URL completa
    return f"{base_url}/{ruta_sin_index.replace(os.sep, '/')}"

# Generar el sitemap
def generar_sitemap(archivos):
    with open(output_file, "w", encoding="utf-8") as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        
        for archivo in archivos:
            ruta_completa = os.path.join(directorio_raiz, archivo)
            url = generar_url(archivo)
            prioridad = calcular_prioridad(archivo)
            fecha_modificacion = obtener_fecha_modificacion(ruta_completa)
            
            f.write("  <url>\n")
            f.write(f"    <loc>{url}</loc>\n")
            f.write(f"    <lastmod>{fecha_modificacion}</lastmod>\n")
            f.write("    <changefreq>weekly</changefreq>\n")
            f.write(f"    <priority>{prioridad:.1f}</priority>\n")
            f.write("  </url>\n")
        
        f.write("</urlset>\n")

# Ejecutar
if __name__ == "__main__":
    archivos_html = listar_archivos_html(directorio_raiz)
    generar_sitemap(archivos_html)
    print(f"sitemap generado en ./{output_file}")