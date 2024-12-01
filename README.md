# Simple Blog

This project is a simple blog application built with NestJS and TypeScript, using PostgreSQL and TypeORM for database management. It utilizes MinIO as an S3-compatible service for storage and Firebase for authentication.

## Prerequisites

- Docker installed on your machine
- Node.js (for development purposes)
- A Firebase account for authentication
- A MinIO instance or access to an S3-compatible storage service

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd <repository-name>
```

## Create Environment Variables

Copy the sample environment file and rename it to .env:

```bash
cp env.sample .env
```

Update the values in the .env file with your credentials.

## Initial S3

Create a bucket with a name matching the one specified in the .env file, and ensure the bucket is publicly accessible so users can view the blog's media.

## Run Using Docker

Start the application with Docker Compose:

```bash
docker compose up -d
```

## Run Locally

Install dependencies and start the application in development mode:

```bash
npm install
npm run start:dev
```
