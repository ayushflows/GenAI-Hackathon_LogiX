# Backend - GenAI Hackathon

This repository contains the backend code for the GenAI Hackathon project. The backend is built using Node.js and Express, and it provides APIs for generating analytics reports based on social media data.

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Setup Guide](#setup-guide)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

## Project Description
The backend application provides APIs to fetch data from various social media platforms, process the data, and generate analytics reports. It serves as the data provider for the frontend application.

## Features
- Fetch data from social media platforms
- Process and analyze data
- Generate analytics reports
- Provide APIs for frontend consumption
- Secure endpoints with JWT authentication

## Setup Guide

### Prerequisites
- Node.js (version 14.x or higher)
- npm (version 6.x or higher)
- MongoDB (version 4.x or higher)

### Installation
1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-repo/genai-hackathon-backend.git
    cd genai-hackathon-backend
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    db=<astradb token for authentication>
    langflow=<langflow token for its api>
    ```

## Usage

### Running the Application
To start the application, run:
```sh
npm start
```
The server will start on the port specified in the `.env` file (default is 3000).

### Running Tests
To run tests, use the following command:
```sh
npm test
```

### API Documentation
API documentation is available at `/api-docs` when the server is running.

## Folder Structure
```
/D:/GenAI-Hackathon/BackEnd
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   └── utils
├── tests
├── .env
├── package.json
└── README.md
```

## Contributing
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Create a pull request with a detailed description of your changes.
