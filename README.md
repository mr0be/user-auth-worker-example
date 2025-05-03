# user-auth-worker-example

A simple Vue.js web application with login authentication via Cloudflare Workers and a D1 database.  
Demonstrates a minimalist login process using a serverless API and secure password storage.

## Features

- User login with email and password  
- Password hashing  
- User information stored in a Cloudflare D1 database  
- Login protection for all pages  
- Serverless API using Cloudflare Workers  
- Easily extendable to support registration, sessions, or token-based login

## Technologies Used

- **Vue.js** – Frontend framework
- **Hono** - Web application framework
- **Cloudflare Workers** – Serverless backend  
- **Cloudflare D1** – SQL-based edge database  
- **Wrangler** – CLI for deploying Cloudflare projects


## Setup
- Create a D1 database npx wrangler d1 create <dbname>
- Store the created D1 settings in the wrangler.jsonc file
- Migration npx wrangler d1 migrations apply <dbname>

