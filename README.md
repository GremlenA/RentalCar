# Rental Car App 🚗

A modern, responsive web application for browsing and booking rental cars. Built with React and Next.js, offering a seamless user experience with advanced filtering, dynamic routing, and persistent state management.

## 📋 Table of Contents
- [Project Description](#project-description)
- [Main Features](#main-features)
- [Technologies Used](#technologies-used)
- [Installation Instructions](#installation-instructions)
- [Usage Instructions](#usage-instructions)

## 📖 Project Description
Rental Car is a frontend application designed to help users find their perfect rental vehicle. Users can view a catalog of cars, filter them based on their specific needs (brand, price, mileage), save their favorite cars for later, and view detailed information for each vehicle, including specifications, accessories, and rental conditions. The project includes a simulated booking process with an interactive date picker and beautiful toast notifications.

## ✨ Main Features
* **Interactive Catalog:** Browse a dynamically loaded grid of rental cars.
* **Advanced Filtering (Backend-ready):** Filter vehicles by brand, rental price, and mileage range.
* **Favorites System:** Add cars to a favorites list. The state is persisted in `localStorage` using Zustand, so favorites are saved even after a page refresh.
* **Detailed Car Pages:** Dynamic routing (`/catalog/[id]`) to view comprehensive details, features, and rental conditions of a specific car.
* **Interactive Booking Form:** A fully controlled booking form featuring a custom, compact date picker (`react-datepicker`).
* **Pagination (Load More):** Efficient data fetching with a "Load more" button to load subsequent pages of vehicles.
* **Modern UI/UX:** Clean design matching Figma specifications, complete with loading spinners and custom SVG icons.
* **User Notifications:** Stylish toast notifications (`react-hot-toast`) for successful booking actions.

## 🛠 Technologies Used
* **Framework:** Next.js (App Router) / React
* **State Management:** Zustand (with `persist` middleware)
* **Styling:** CSS Modules
* **Data Fetching:** Axios
* **Date Picker:** `react-datepicker`
* **Notifications:** `react-hot-toast`

## 🚀 Installation Instructions

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/rental-car-app.git](https://github.com/your-username/rental-car-app.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd rental-car-app
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Set up environment variables:**
    * Create a `.env.local` file in the root directory.
    * Add your API URL (example):
        ```env
        NEXT_PUBLIC_API_URL=[https://your-mock-api-url.com](https://your-mock-api-url.com)
        ```

## 💻 Usage Instructions

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
2.  **Open the application:**
    Open your browser and navigate to `http://localhost:3000`.
3.  **Navigate the App:**
    * Click **"View Catalog"** on the Home page to start browsing.
    * Use the dropdowns and inputs at the top of the Catalog page to **filter** the cars. Click "Search" to apply.
    * Click the **Heart icon** on any car card to add it to your Favorites.
    * Click **"Read more"** to view a car's details and access the booking form.
    * Fill out the booking form, select a date, and click **"Send"** to see the success notification.