# Rezervări echipamente – ghid de instalare (M365)

Totul este gratuit: folosește doar ce e inclus în M365 Education (Entra ID + SharePoint) și GitHub Pages pentru găzduire.
Timp estimat: 20–30 de minute, o singură dată.

Fișierele aplicației (toate trei trebuie urcate împreună):
- `index.html` – aplicația
- `config.js` – setările școlii (le completezi la pasul 4)
- `msal-browser.min.js` – biblioteca oficială Microsoft pentru autentificare (v3.28.1)

---

## Pasul 1 – Site-ul SharePoint

1. SharePoint admin center → **Sites → Active sites** → **+ Create** → **Other options** → șablon **Team site** (team site fără grup M365).
2. Site name: `Rezervari Echipamente`. Verifică adresa: `https://NUMESCOALA.sharepoint.com/sites/RezervariEchipamente`. Notează-o. La **Primary administrator** pune contul tău.
3. Deschide site-ul → ⚙️ **Setări** → **Permisiuni site** → **Setări avansate permisiuni** → grupul **Rezervari Echipamente Members** → **New → Add users** și adaugă profesorii (nivelul acestui grup este **Editare**).
   - Cel mai simplu: un grup M365 / de securitate „Profesori”. Evită „Toată lumea cu excepția utilizatorilor externi” dacă și elevii au conturi în tenant.

## Pasul 2 – GitHub Pages (găzduirea gratuită)

1. Fă-ți cont gratuit pe https://github.com (poate fi pe emailul școlii).
2. **New repository** → nume `rezervari` → **Public** → **Create**.
3. **Add file → Upload files** → încarcă `index.html`, `config.js`, `msal-browser.min.js` → **Commit**.
4. **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → **Save**.
5. După 1–2 minute, adresa aplicației apare sus: `https://UTILIZATOR.github.io/rezervari/`. Notează-o **exact**, cu `/` la final.

> `config.js` conține doar ID-uri publice (nu parole sau secrete), deci e în regulă într-un repository public.

## Pasul 3 – Înregistrarea aplicației în Entra ID

1. https://entra.microsoft.com → **Identitate → Aplicații → Înregistrări aplicații** → **+ Înregistrare nouă**.
2. Nume: `Rezervari Echipamente`. Tip conturi: **Doar conturile din acest director organizațional (un singur tenant)**.
3. Redirect URI: platforma **Single-page application (SPA)**, adresa de la Pasul 2 (ex. `https://UTILIZATOR.github.io/rezervari/`) → **Înregistrare**.
4. Din pagina **Overview** copiază **Application (client) ID** și **Directory (tenant) ID**.
5. **Permisiuni API** → **+ Adăugați o permisiune** → **Microsoft Graph** → **Permisiuni delegate** → bifează:
   - `User.Read` (de obicei există deja)
   - `Sites.ReadWrite.All`
   - `Sites.Manage.All` (folosită doar o dată, de tine, ca să creeze listele)
6. Apasă **Acordați consimțământul de administrator pentru …** → **Da**. Toate trei trebuie să aibă bifă verde.

> Permisiunile sunt *delegate*: aplicația poate face doar ce poate face deja profesorul logat în SharePoint. Profesorii nu au acces la alte site-uri prin această aplicație dacă nu îl aveau deja.

## Pasul 4 – Completează `config.js`

Pe GitHub, deschide `config.js` → creionul ✏️ (Edit) și completează:

```js
tenantId: "Directory (tenant) ID de la pasul 3",
clientId: "Application (client) ID de la pasul 3",
siteUrl:  "https://NUMESCOALA.sharepoint.com/sites/RezervariEchipamente",
admins:   ["adresa.ta@scoala.ro"],      // cine administrează inventarul
schoolName: "Școala Gimnazială nr. ...",
```

Poți modifica tot aici și **programul orelor** (`periods`). **Commit changes**, apoi așteaptă un minut.

## Pasul 5 – Prima pornire (tu, ca admin)

1. Deschide `https://UTILIZATOR.github.io/rezervari/` → **Intră cu contul școlii**.
2. Aplicația îți afișează **Prima pornire** → **Creează listele**. Se creează automat în site listele `Echipamente` și `Rezervari`, cu toate coloanele.
3. Tab **Inventar** → adaugă echipamentele (ex. „Laptopuri – 25”, „iPad-uri – 30”).

## Pasul 6 – Permisiunile pe liste (important)

În site-ul SharePoint → ⚙️ → **Conținut site**:

**Lista `Rezervari`** – fiecare profesor își poate modifica/anula doar rezervările proprii:
1. Lista → ⚙️ **Setări listă** → **Setări avansate**.
2. *Acces la citire*: **Citire toate elementele**.
3. *Acces la creare și editare*: **Creare elemente și editare elemente care au fost create de utilizator**.
4. **OK**. (Tu, ca proprietar al site-ului, poți anula în continuare orice rezervare.)

**Lista `Echipamente`** – doar adminii modifică inventarul:
1. Lista → ⚙️ **Setări listă** → **Permisiuni pentru această listă** → **Opriți moștenirea permisiunilor**.
2. Bifează grupul **Membri** → **Editare permisiuni utilizator** → doar **Citire** → **OK**.

## Pasul 7 – Trimite linkul profesorilor

Trimite adresa `https://UTILIZATOR.github.io/rezervari/` (email, Teams, site-ul școlii). Profesorii intră cu contul M365 al școlii. Prima dată pot vedea ecranul Microsoft de autentificare; nu li se cer alte aprobări, pentru că ai acordat tu consimțământul la pasul 3.

---

## Întrebări frecvente

**Un profesor vede „Nu pot deschide site-ul SharePoint”.** Nu e membru al site-ului de la Pasul 1. Adaugă-l în grupul Membri.

**„Nu ai drept de scriere în lista de rezervări”.** Profesorul are doar drept de Citire pe site. Trebuie să fie în grupul Membri (Editare).

**Vreau să văd toate rezervările în tabel / să le export în Excel.** Deschide lista `Rezervari` în SharePoint → **Export → Excel**.

**Schimb ceva în aplicație (orele, numele școlii, adminii).** Editează `config.js` pe GitHub. Modificarea apare în ~1 minut.

**Am schimbat adresa aplicației.** Actualizează Redirect URI-ul din Entra ID (Pasul 3.3). Trebuie să fie identic, inclusiv `/` de la final.

**Rezervări simultane.** Aplicația verifică disponibilitatea chiar înainte de salvare și imediat după. Dacă doi profesori iau ultimele bucăți în aceeași secundă, rezervarea salvată a doua se anulează automat, iar profesorul este anunțat.
