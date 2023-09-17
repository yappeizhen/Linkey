# Linkey

Linkey is a simple interface for users to shorten and manage their URLs

## Tech Stack

- Frontend: React Typescript
- Backend: NestJS
- Database: TypeORM with PostgreSQL

## Table of Contents

- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [API Documentation](#api-documentation)

## Getting Started

### Install dependencies

In the root folder of the repository:

```sh
npm install
```

### Environment Setup

Create a backend/.env file in your root folder by making a copy of backend/.env.example.

- If you are running your own postgres (not via docker-compose), update the variables accordingly.

```sh
cp backend/.env.example backend/.env
```

### Run locally

Start up the local development environment with full infrastructure by running:

```sh
npm run start-full
```

This should start up the frontend, backend, and a dockerized PosgreSQL database.

- Backend should now be served from http://localhost:8080
- Frontend should be served from http://localhost:3000.

# Running Tests

In the root directory, run the following command to run jest on backend.

```sh
npm run test
```

# API Documentation

## Base URL

All API requests are made to: [http://localhost:8080/](http://localhost:8080/)
