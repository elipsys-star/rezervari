// Configurarea aplicației. Completează valorile de mai jos după pașii din GHID-INSTALARE.md.
window.APP_CONFIG = {
  // Entra ID → App registrations → aplicația ta → Overview
  tenantId: "PUNE-AICI-DIRECTORY-TENANT-ID",
  clientId: "PUNE-AICI-APPLICATION-CLIENT-ID",

  // Adresa site-ului SharePoint unde se păstrează listele
  siteUrl: "https://NUMESCOALA.sharepoint.com/sites/RezervariEchipamente",

  // Conturile care administrează inventarul (pot adăuga/șterge echipamente și anula orice rezervare)
  admins: ["admin@scoala.ro"],

  // Numele școlii, afișat în antet
  schoolName: "Școala noastră",

  // Limba implicită: "auto" (după limba browserului), "ro", "en" sau "de".
  // Fiecare utilizator o poate schimba din colțul paginii; alegerea lui se păstrează.
  language: "auto",

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
