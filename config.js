// Configurarea aplicației. Completează valorile de mai jos după pașii din GHID-INSTALARE.md.
window.APP_CONFIG = {
  // Entra ID → App registrations → aplicația ta → Overview
  tenantId: "8112f60e-b0f0-4905-a8fe-ffec36dc7e07",
  clientId: "1c45b690-3f57-42a9-8a01-7d04d2266533",

  // Adresa site-ului SharePoint unde se păstrează listele
  siteUrl: "https://dsbukarest.sharepoint.com/sites/DSBU-Gerteausleihe",

  // Conturile care administrează inventarul (pot adăuga/șterge echipamente și anula orice rezervare)
  admins: ["c.draghiciu@dsbu.ro", "c.ilovan@dsbu.ro"],

  // Numele școlii, afișat în antet
  schoolName: "Deutsche Schule Bukarest",

  // Logo afișat în antet în locul numelui școlii (fișier urcat lângă index.html). Lasă "" ca să afișezi doar numele.
  logo: "logo.png",

  // Limba implicită: "auto" (după limba browserului), "ro", "en" sau "de".
  // Fiecare utilizator o poate schimba din colțul paginii; alegerea lui se păstrează.
  language: "de",

  // Programul orelor (poți modifica orele sau adăuga/șterge rânduri)
  periods: [
    { s: "08:00", e: "08:50" },
    { s: "09:00", e: "09:50" },
    { s: "10:00", e: "10:50" },
    { s: "11:00", e: "11:50" },
    { s: "12:00", e: "12:50" },
    { s: "13:00", e: "13:50" },
    { s: "14:00", e: "14:50" },
    { s: "15:00", e: "15:50" }
  ]
};
