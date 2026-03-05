import qrcode

def generate_qr_large(url, filename):
    # Usamos ERROR_CORRECT_H para que el QR sea más robusto a daños físicos (común en tarjetas)
    # y aumentamos box_size a 20 para una resolución mucho mayor.
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=20,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(filename)
    print(f"QR Code de alta resolución guardado como {filename}")

if __name__ == "__main__":
    url = "https://aireacondicionadoyrefrigeracionmexico.com/"
    filename = "qr_tarjeta_presentacion.png"
    generate_qr_large(url, filename)
