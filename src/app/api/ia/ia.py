import sys
import json

def handler(data):
    try:
        # Intenta cargar los datos de entrada como JSON
        input_data = json.loads(data)
    except json.JSONDecodeError as e:
        # Maneja el error de decodificación JSON
        result = {
            "error": "Error al decodificar JSON",
            "details": str(e)
        }
        print(json.dumps(result))
        return
    
    # Procesa los datos si la decodificación fue exitosa
    text = input_data.get('text', '')

    # Verificar si el texto es mayor a 100 caracteres
    if len(text) > 100:
        result = {
            "message": "El texto es demasiado largo.",
            "input": text,
            "length": len(text)
        }
    else:
        result = {
            "message": "El texto está dentro del límite permitido.",
            "input": text,
            "length": len(text)
        }

    # Imprimir el resultado en la salida estándar
    print(json.dumps(result))

# Llamar a la función handler con los datos de entrada desde la línea de comandos
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Se esperaban datos de entrada como argumento.")
        sys.exit(1)
    handler(sys.argv[1])
