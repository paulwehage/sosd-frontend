
# Software Sustainability Dashboard Frontend (SOSD)

This repository contains the frontend application for the Software Sustainability Dashboard, built with React and Vite.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js and npm**: Ensure Node.js and npm are installed. You can download them from [Node.js official website](https://nodejs.org/).
- **Git**: Ensure Git is installed for version control. You can download it from [Git's official website](https://git-scm.com/).
- **Backend**: Ensure the [SOSD Backend](https://github.com/paulwehage/sosd-backend) is running, as it is required for the frontend to function correctly.

## Getting Started

Follow these instructions to set up and run the frontend project on your local machine.

### Clone the Repository

```sh
git clone git@github.com:paulwehage/sosd-frontend.git
cd sosd-frontend
```

### Install Dependencies

1. Install the dependencies:

    ```sh
    npm install
    ```

### Running the Application

1. Start the development server:

    ```sh
    npm run dev
    ```

   This will start the Vite development server, and you can access the application at `http://localhost:5173`.

### Building for Production

1. To build the application for production, run:

    ```sh
    npm run build
    ```

   The production-ready files will be generated in the `dist` directory.

### Previewing the Production Build

1. To preview the production build locally, run:

    ```sh
    npm run preview
    ```

   This will start a local server to preview the production build at `http://localhost:4173`.

## Troubleshooting

- **Port Conflicts**: If the default ports (5173 for development, 4173 for production preview) are in use, you can change them in the respective configurations.
