# 💼 Job Board Frontend (Angular)

This is the frontend application for the **Job Board Management System**, developed using **Angular**. It connects to a Spring Boot backend to enable users (recruiters and applicants) to manage job offers, applications, and hiring processes efficiently.

> 🔗 Backend available here: [Job Board Backend (Spring Boot)](https://github.com/AlejoAmaris03/JobBoard_Backend)

---

## 📌 Features

- 👤 User authentication
  - JWT-based login
  - 🔐 **Google Authentication** integration
  - Roles: `Admin`, `Recruiter`, `Applicant`
- 📝 Applicants can:
  - Browse and apply to job offers
  - View and manage their applications
- 📢 Recruiters can:
  - Create and manage job postings
  - Review applications received
- 🛠️ Admin panel to manage users and oversee platform activity
- 🔒 Route guards based on roles
- 📲 Responsive UI for desktop and mobile

---

## ⚙️ Tech Stack

- **Angular 19+**
- **TypeScript**
- **RxJS**
- **Angular Router**
- **HttpClient** (for backend communication)
- **SweetAlert2** / **Toastr** for user notifications

---

## 📁 Project Structure
<img width="171" height="395" alt="image" src="https://github.com/user-attachments/assets/3eb8672f-15b6-4293-bbd2-6cdac75749c9" />

---

## 🖼️ Screenshots

Here are some views from the project:

- 🏠 Landing Page  
<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/c08c13dd-1b05-4c4c-9010-ca7cf0d5000e" />

- 🔐 Login page  
<img width="1919" height="915" alt="image" src="https://github.com/user-attachments/assets/fd37cc80-ef88-487a-9823-71a8fa261193" />

- 🧑‍💼 Manage jobs (recruiter)  
<img width="1919" height="909" alt="image" src="https://github.com/user-attachments/assets/642e0b6e-70f4-4754-8b92-ba436c95b837" />

- 🧑‍💼 Manage applications (recruiter)
<img width="1919" height="905" alt="image" src="https://github.com/user-attachments/assets/078f4b19-a87a-41d3-8eba-2618ea5eaa0f" />

- 🧑‍💼 Manage applications (applicant)
<img width="1919" height="911" alt="image" src="https://github.com/user-attachments/assets/d6a00d46-aa36-4abe-aa69-95c3fadc1067" />

- 🧑‍💼 Manage resume (applicant)
<img width="1919" height="911" alt="image" src="https://github.com/user-attachments/assets/103a2738-dffb-41c3-bd28-22f179fd5d4b" />

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Angular CLI 16+

---

### Installation
1. **Clone the repo**
   ```bash
   git clone https://github.com/AlejoAmaris03/JobBoard_Frontend.git
   cd JobBoard_Frontend-main

2. Install dependencies
   ```bash
   npm install

3. Run the dev server
   ```bash
   ng serve

4. Navigate to http://localhost:4200/ in your browser.

5. **Backend Connection**
- Make sure your backend Spring Boot app is running at http://localhost:8080.
