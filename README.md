<div align="center"><img src="https://user-images.githubusercontent.com/31413093/197097625-5b3bd3cf-2bd6-4a3a-8059-a1fe9f28100b.svg" height="100px" alt="Product Management App Logo"/></div>

<h2 align="center">Product Management App</h2>

<div align="center">
<a href="https://reactjs.org/"><image src="https://img.shields.io/static/v1?label=React&message=^18&style=for-the-badge&labelColor=FFFFFF&logo=react&color=61DAFB"/></a> <a href="https://www.typescriptlang.org/"><image src="https://img.shields.io/static/v1?label=TypeScript&message=^5&style=for-the-badge&labelColor=FFFFFF&logo=typescript&color=3178C6"/></a> <a href="https://tailwindcss.com/"><image src="https://img.shields.io/static/v1?label=Tailwind%20CSS&message=^3&style=for-the-badge&labelColor=FFFFFF&logo=tailwindcss&color=06B6D4"/></a> <a href="https://vitejs.dev/"><image src="https://img.shields.io/static/v1?label=Vite&message=^5&style=for-the-badge&labelColor=FFFFFF&logo=vite&color=646CFF"/></a>
</div>

## Introduction

The Product Management App is a robust solution for managing product inventories. Built with modern web technologies, it offers a seamless and efficient user experience for handling product data.

Key technologies:
- React for building user interfaces
- TypeScript for type safety
- Vite for fast development and building
- Tailwind CSS for responsive design
- shadcn/ui for modern UI components
- usehooks-ts for efficient state management

## Features

- View a list of products
- Add new products
- Edit existing products
- Delete products
- Search products by name or description
- Sort products by name or creation date
- Persist data in local storage

## Getting Started

### Prerequisites

This project requires [Node.js](https://nodejs.org/) version 18+ or 20+ and uses [pnpm](https://pnpm.io/) as the package manager.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/product-management-app.git
   cd product-management-app
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

### Running the App

To start the development server:

```sh
pnpm run dev
```

This will launch the app at `http://localhost:5173`.

## Project Structure

- `src/App.tsx`: Main application component
- `src/components/`: React components (ProductList, ProductDetails, etc.)
- `public/`: Static assets

