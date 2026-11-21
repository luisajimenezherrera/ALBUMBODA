# Álbum de boda · Diomedes & Neila 💍

Archivos:
- `index.html` → la página del álbum (los invitados suben y ven las fotos)
- `qr.html` → tarjeta con el código QR para imprimir y poner en las mesas
- `apps-script/Codigo.gs` → el pequeño programa de Google que guarda las fotos en tu Drive

---

## Paso 1 · Crear la carpeta en Google Drive
1. Entra a https://drive.google.com y crea una carpeta, por ejemplo **"Fotos Boda Diomedes y Neila"**.
2. Ábrela y copia el **ID** que aparece al final del enlace:
   `https://drive.google.com/drive/folders/`**`1AbCdEfGh...`** ← eso es el ID.

## Paso 2 · Crear el Apps Script (el que recibe las fotos)
1. Entra a https://script.google.com → **Nuevo proyecto**.
2. Borra lo que aparece y pega todo el contenido de `apps-script/Codigo.gs`.
3. En la línea `const FOLDER_ID = '...'` pega el ID del Paso 1.
4. Guarda (icono del disquete).
5. Arriba a la derecha: **Implementar → Nueva implementación**.
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
6. Toca **Implementar**, autoriza los permisos con tu cuenta de Google
   (si aparece "Google no verificó esta app": *Configuración avanzada → Ir al proyecto*).
7. Copia la **URL de la aplicación web** (termina en `/exec`).

> Si después cambias el código, usa **Implementar → Administrar implementaciones → Editar → Nueva versión** para que la URL siga siendo la misma.

## Paso 3 · Conectar la página
Abre `index.html` con el Bloc de notas o VS Code, busca el bloque `CONFIG` y completa:

```js
SCRIPT_URL: "https://script.google.com/macros/s/XXXXX/exec",
DRIVE_FOLDER_URL: "https://drive.google.com/drive/folders/XXXXX",  // opcional
FECHA: "Sábado 12 de diciembre de 2026",
```

`DRIVE_FOLDER_URL` sirve como opción alternativa: si compartes la carpeta como **Editor con cualquier persona que tenga el enlace**, los invitados también pueden subir fotos directo a Drive. Si no la quieres compartir así, déjalo vacío y ese botón no se mostrará.

## Paso 4 · Publicar la página (gratis)
La opción más fácil es **Netlify Drop**:
1. Entra a https://app.netlify.com/drop
2. Arrastra la carpeta **BODA** completa.
3. Te dará un enlace como `https://diomedes-neila.netlify.app` (puedes cambiarle el nombre en la configuración del sitio).

(También funciona GitHub Pages o cualquier hosting.)

## Paso 5 · Imprimir el QR
1. Abre `https://TU-SITIO/qr.html`.
2. Verifica que el enlace sea el de tu página y toca **Generar QR**.
3. Toca **Imprimir** (o guarda como PDF) y coloca una tarjeta en cada mesa. 🌸

---

### Notas
- Las fotos se comprimen automáticamente (máx. 2400 px) para que suban rápido con datos móviles.
- Cada foto se guarda con el nombre del invitado y la fecha, y el mensaje para los novios va en la descripción del archivo en Drive.
- La página recuerda el nombre del invitado en su celular para la próxima vez.
- Las fotos quedan visibles para quien tenga el enlace (así se pueden ver en el álbum de la página).
