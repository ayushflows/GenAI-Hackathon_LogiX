# FrontEnd - GenAI Hackathon

This repository contains the frontend code for the GenAI Hackathon project. The frontend is built using React and provides a user interface for generating analytics reports based on social media data.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Setup Guide](#setup-guide)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Description

The frontend application allows users to select a social media platform, account name, and post type to generate an analytics report. The application fetches data from the backend, processes it, and displays the results in a user-friendly manner.

## Features

- Select social media platform, account name, and post type
- Fetch distinct users based on the selected platform
- Generate analytics reports
- Display loading indicators and error messages
- Responsive design

## Setup Guide

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/GenAI-Hackathon.git
   cd GenAI-Hackathon/FrontEnd
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
VITE_APP_BACKEND_API=http://localhost:5000
```

### Running the Application

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To build the application for production, run:

```bash
npm run build
# or
yarn build
```

The production-ready files will be generated in the `dist` directory.

## Usage

1. Open the application in your browser.
2. Select a social media platform from the dropdown.
3. Select an account name from the dropdown.
4. Select a post type from the dropdown.
5. Click the "Generate Report" button to fetch and display the analytics report.

## Folder Structure

```
FrontEnd/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── api/
│   │   └── api.js
│   ├── assets/
│   │   └── ...
│   ├── components/
│   │   ├── ArcProgress.jsx
│   │   ├── Navbar.jsx
│   │   └── ...
│   ├── pages/
│   │   └── UserInputPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── .env
├── package.json
├── README.md
└── ...
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Create a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for more information.