# AUVNET Ecommerce

## Overview

AUVNET Ecommerce is an API that powers a basic online shopping platform. It provides CRUD operations for products, categories, users, and order management, with support for image uploads and secure user authentication.

[![technologies](https://skillicons.dev/icons?i=nodejs,mongodb,git,github,postman)](#backend)

## Table of Contents

- [Order Management System](#AUVNET-Ecommerce)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Schema Diagram for DB](#ERD-diagram-for-db)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Endpoints](#endpoints)
  - [Technology Stack](#technology-stack)
      - [Backend](#backend)
      - [Documentation](#documentation)
      - [Version Control](#version-control)
  - [How to Contribute](#how-to-contribute)

## Schema Diagram for DB
![ERD-ecommerce](https://github.com/user-attachments/assets/685f4cad-a2ef-41af-b4a1-bd4ceb16a214)

## Getting Started

### Prerequisites

Before getting started, ensure you have installed the following:

- Node.js and npm
- MongoDB

### Installation

1. Clone the repository: `$ git clone https://github.com/emadsamy-cell/AUVNET-Internship-Assessment.git`
2. Install dependencies: `$ npm install`
3. Configure environment variables: Create a `.env` file in the root directory.
   - Add values for environment variables
    ```bash
    MONGODB_URI="your-mongodb-connection-string"
    JWT_SECRET="your-secret-key"
    CLOUDINARY_URL="your-cloudinary-url"
4. Start the server:
      ```bash
    $ npm start
## Endpoints

You can check endpoints & documentation on Postman from [here](https://documenter.getpostman.com/view/26855550/2sA3s1pCqt)

## Technology Stack

The **AUVNET Ecommerce** uses the following technologies and tools:

#### Backend

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building fast and scalable network applications.
- **Express.js:** A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB:** A NoSQL database program that uses JSON-like documents with optional schemas, perfect for handling a flexible product catalog.
- **Mongoose:** A MongoDB object modeling tool designed to work in an asynchronous environment.
- **Cloudinary:** A cloud service that provides an end-to-end image and video management solution including uploads, storage, manipulations, optimizations, and delivery.
#### Documentation

- **Postman:** Used for documentation and to provide a collection for API requests.

#### Version Control

- **Git:** A distributed version control system.
- **GitHub:** A web-based platform for version control and collaboration.

## How to Contribute

If you'd like to contribute to the project or have suggestions for improvement, please do not hesitate to make pull request.
