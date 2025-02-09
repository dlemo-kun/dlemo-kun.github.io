import os

def crear_carpetas_mes(ano):
    carpeta_principal = str(ano)
    if not os.path.exists(carpeta_principal):
        os.makedirs(carpeta_principal)
        print(f"Carpeta '{carpeta_principal}' creada.")
    else:
        print(f"La carpeta '{carpeta_principal}' ya existe.")

    meses = [
        "01-January", "02-February", "03-March", "04-April",
        "05-May", "06-June", "07-July", "08-August",
        "09-September", "10-October", "11-November", "12-December"
    ]

    for mes in meses:
        ruta_mes = os.path.join(carpeta_principal, mes)
        if not os.path.exists(ruta_mes):
            os.makedirs(ruta_mes)
            print(f"Subcarpeta '{mes}' creada en '{carpeta_principal}'.")
        else:
            print(f"La subcarpeta '{mes}' ya existe en '{carpeta_principal}'.")

def main():
    try:
        ano = int(input("Ingresa el año (por ejemplo, 2025): "))
        if ano < 1:
            print("Por favor, ingresa un año válido.")
            return
        crear_carpetas_mes(ano)
    except ValueError:
        print("Por favor, ingresa un número válido para el año.")

if __name__ == "__main__":
    main()