/**
 * ÁLBUM DE BODA · DIOMEDES & NEILA
 * Recibe las fotos desde la página web y las guarda en una carpeta de Google Drive.
 *
 * 1) Pega aquí el ID de tu carpeta de Drive (la parte final del enlace:
 *    https://drive.google.com/drive/folders/ESTE_ES_EL_ID)
 */
const FOLDER_ID = '1ST0c2AiFOctnmK1lcxchy1tBWfBiYUah';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.action !== 'upload') return json_({ ok: false, error: 'Acción no válida' });

    const guest = String(body.guest || 'Invitado').slice(0, 60).replace(/[\\/:*?"<>|]/g, '');
    const message = String(body.message || '').slice(0, 400);
    const mime = String(body.mimeType || 'image/jpeg');
    if (!/^image\//.test(mime)) return json_({ ok: false, error: 'Solo imágenes' });
    const ext = String(body.ext || 'jpg').replace(/[^a-z0-9]/gi, '').slice(0, 5) || 'jpg';

    const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd_HH-mm-ss');
    const name = guest + '_' + stamp + '_' + Math.floor(Math.random() * 1000) + '.' + ext;

    const blob = Utilities.newBlob(Utilities.base64Decode(body.data), mime, name);
    const file = DriveApp.getFolderById(FOLDER_ID).createFile(blob);
    file.setDescription(JSON.stringify({ guest: guest, message: message }));
    // Necesario para que las miniaturas se vean en el álbum de la página
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return json_({ ok: true, id: file.getId() });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  const action = e && e.parameter && e.parameter.action;
  if (action !== 'list') return json_({ ok: true, info: 'Álbum de boda activo ♥' });

  const files = [];
  const it = DriveApp.getFolderById(FOLDER_ID).getFiles();
  while (it.hasNext()) {
    const f = it.next();
    if (!/^image\//.test(f.getMimeType())) continue;
    let meta = {};
    try { meta = JSON.parse(f.getDescription() || '{}'); } catch (x) {}
    files.push({ id: f.getId(), guest: meta.guest || '', date: f.getDateCreated().getTime() });
  }
  files.sort(function (a, b) { return b.date - a.date; });
  return json_({ ok: true, files: files });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
