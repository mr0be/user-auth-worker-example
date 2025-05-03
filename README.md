# user-auth-worker-example
Einfache Vue.js-Webanwendung mit Login-Authentifizierung über Cloudflare Workers und D1-Datenbank. Zeigt ein minimalistisches Login-Verfahren mit serverloser API und Passwortspeicherung.

## Funktionen

- Benutzer-Login mit E-Mail und Passwort
- Passwort-Hashing
- Speicherung der Benutzerinformationen in einer D1-Datenbank
- Login-Schutz für alle Seiten
- Serverlose API über Cloudflare Workers
- Einfach erweiterbar um Registrierung, Sessions oder Token-Login

## Verwendete Technologien

- Vue.js (Frontend)
- Cloudflare Workers (Backend)
- Cloudflare D1 (Datenbank)
- Wrangler (CLI für Cloudflare-Projekte)

## Einrichten
- Erstellen einer D1 Datenbank  npx wrangler d1 create <dbname>
- Die erzeugten D1 Settings in die Datei wrangler.jsonc hinterlegen
- Migration npx wrangler d1 migrations apply <dbname>

