# AutoSpa

## Live link - [AutoSpa](https://autospa-client.vercel.app/)

## 🔗 Server side repository - [auto-spa-server](https://github.com/syedfarhanreza/autospa-server)

## Admin Access 
 -user: admin@admin.com
 -password: admin

## Introduction

The AutoSpa car wash and service booking platform allows users to explore various car maintenance services and schedule convenient time slots for their vehicle care. Users can easily select their desired services, book appointments, and manage upcoming bookings. Administrators can oversee user roles, manage available slots based on services, and handle all bookings efficiently.

This guide will help you set up and run the project locally on your machine.

## Features

- Debounced API calls to optimize search functionality and reduce excessive requests
- Service comparison tool to help users choose the best option
- Countdown timer for upcoming bookings

## Technology Stack

- Frontend: React.js
- Language: TypeScript
- UI: Shadcn and Tailwind CSS
- State Management: Redux Toolkit & Redux Query

## Getting Started

To get started with the project, follow these instructions:

### Prerequisites

Make sure you have the following software installed on your machine:

- Git
- Node.js (v20.9.0 recommended)
- npm or any package installer

### Cloning the Repository

Clone the project repository with the following command:

```
git clone https://github.com/syedfarhanreza/autospa-client

```

### Installing Dependencies

After cloning the project, open the terminal, navigate to the project folder, and run: `npm install`

```
npm install

```

### Setting Up Environment Variables

Create a .env file in the root directory of the project and add your MongoDB credentials:

```
VITE_BASE_API=https://autospa-server-github.vercel.app/api
```

### Running the Project

Once you have set up the environment variables, you can run the project locally.

```
npm run dev

```

### Accessing the Project

```
http://localhost:5173
```
