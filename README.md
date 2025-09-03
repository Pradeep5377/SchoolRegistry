# School Registry 🏫

A full-stack web application built with Next.js and MySQL for adding and displaying school information. This project serves as a mini-project demonstrating key web development concepts including form handling, file uploads, database integration, and responsive design.

**Live Demo:** **[https://school-registry-chi.vercel.app/](https://school-registry-chi.vercel.app/)** 👈

---

## Features

-   **Add New Schools:** A responsive, two-column form to input school details, including name, address, contact information, and an image.
-   **Form Validation:** Client-side validation using `react-hook-form` to ensure data integrity.
-   **Image Uploads:** Ability to upload a school's image, which is handled by the backend API.
-   **Display Schools:** A clean, e-commerce style grid layout to display all the schools from the database.
-   **Responsive Design:** The entire application is fully responsive and works seamlessly on both desktop and mobile devices.
-   **Full-Stack Architecture:** Built with Next.js, utilizing API Routes for the backend and Server Components for data fetching.

---

## Tech Stack

-   **Frontend:** [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
-   **Backend:** [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
-   **Database:** [MySQL](https://www.mysql.com/)
-   **Form Management:** [React Hook Form](https://react-hook-form.com/)
-   **Deployment:** [Vercel](https://vercel.com/)

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later)
-   A running MySQL server (e.g., via XAMPP, MAMP, or Docker)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Pradeep5377/SchoolRegistry.git](https://github.com/Pradeep5377/SchoolRegistry.git)
    cd SchoolRegistry
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the database:**
    -   Connect to your local MySQL server.
    -   Create a new database.
        ```sql
        CREATE DATABASE school_project;
        ```
    -   Use the new database and run the following script to create the `schools` table:
        ```sql
        USE school_project;

        CREATE TABLE schools (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address TEXT NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            contact BIGINT,
            image VARCHAR(255),
            email_id VARCHAR(255) UNIQUE
        );
        ```

4.  **Set up environment variables:**
    -   Create a file named `.env.local` in the root of the project.
    -   Copy and paste the following, replacing the values with your local database credentials:
        ```env
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=your_local_db_password
        DB_DATABASE=school_project
        ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Screenshots

### Home Page
![Home Page Screenshot](https://github.com/Pradeep5f377/SchoolRegistry/raw/main/screenshots/home.jpg)

### Add School Form
![Add School Form Screenshot](https://github.com/Pradeep5377/SchoolRegistry/raw/main/screenshots/add-school.jpg)

### Show Schools Page
![Show Schools Page Screenshot](https://github.com/Pradeep5377/SchoolRegistry/raw/main/screenshots/show-schools.jpg)
