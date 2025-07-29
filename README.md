# Todo App - Automated Tests Setup

## Prerequisites

- Node.js 18+
- npm

## Backend Setup

```bash
cd backend
npm install
npm test

## Frontend (UI) Tests

cd frontend
npm install
npm install --save-dev cypress
npx cypress run
