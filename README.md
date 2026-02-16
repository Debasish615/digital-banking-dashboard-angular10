# Digital Banking Dashboard (Angular 10)

Fintech-style banking dashboard built using Angular 10 demonstrating secure routing, modular architecture, and API-style data handling (mock JSON).

## Features
- Login screen with LocalStorage-based token simulation
- Route Protection using AuthGuard
- HTTP Interceptor to attach Authorization token
- Lazy-loaded Auth and Dashboard modules
- Dashboard summary cards: Balance / Total Credit / Total Debit
- Transaction list loaded from `assets/transactions.json`
- Logout support

## Tech Stack
- Angular 10
- TypeScript
- RxJS
- HTML/CSS
- Node.js (Node 16 used for compatibility)

## How to Run
```bash
npm install
ng serve
