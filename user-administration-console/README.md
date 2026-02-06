# 🧑‍💻 User Administration Console (React CRUD App)

A simple and extensible **React + TypeScript CRUD application** for managing user data.
The app demonstrates clean architecture, form validation, API integration, and a **configuration-driven approach** that allows new fields to be added with minimal code changes.

---

## ✨ Features

* Create, Read, Update, Delete users
* Form validation using **Yup + React Hook Form**
* Search with debounce
* Pagination
* Confirmation dialog for delete
* Mock backend using **JSON-server**
* Extensible, schema-driven form architecture
* Clean UI using **Material UI**

---

## 🧱 Tech Stack

* **React** (Vite)
* **TypeScript**
* **Material UI**
* **React Hook Form**
* **Yup**
* **Axios**
* **JSON-server** (mock API)

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/coderRaj07/user-administration-console
cd user-administration-console
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Start the mock backend (JSON-server)

```bash
npx json-server --watch server/db.json --port 3001
```

This starts JSON-server on:

```
http://localhost:3001
```

API endpoint used by the app:

```
GET /users
POST /users
PUT /users/:id
DELETE /users/:id
```

Mock data is stored in:

```
server/db.json
```

---

### 4️⃣ Start the frontend application

```bash
npm run dev
```

Open the app in your browser:

```
http://localhost:5173
```

---

## 🧪 Testing the Application

Manual testing was performed for:

* Create user with validation
* Update existing user
* Delete user with confirmation dialog
* Search users (debounced)
* Pagination behavior
* Error handling when backend is unavailable

To test error handling, stop JSON-server and try any action.

---

## 🧠 Architecture & Design Decisions

### Configuration-Driven Forms

The form UI is generated from a **field configuration object**, not hardcoded inputs.

* UI fields live in `userFields`
* Validation rules live in `userValidationSchema`
* Form rendering logic remains unchanged as schema evolves

This ensures:

* Minimal UI changes
* Better maintainability
* Easy extensibility

---

## ➕ How to Add a New Field (Schema Evolution)

This app is intentionally designed so that **adding a new field requires only small, predictable changes**.

### Example: Add `Date of Birth (dob)`

---

### 1️⃣ Update the User type

**`src/types/user.ts`**

```ts
export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob?: string; // NEW FIELD
}
```

---

### 2️⃣ Add field to UI configuration

**`src/config/userSchema.ts`**

```ts
{
  name: "dob",
  label: "Date of Birth",
  type: "date",
  required: false,
}
```

The form input will appear automatically.

---

### 3️⃣ Add validation rule (optional)

Still in **`userSchema.ts`**:

```ts
dob: yup
  .string()
  .nullable()
  .test(
    "age-check",
    "User must be at least 18 years old",
    (value) => {
      if (!value) return true;
      const dob = new Date(value);
      const age =
        new Date().getFullYear() - dob.getFullYear();
      return age >= 18;
    }
  ),
```

---

### 4️⃣ (Optional) Update mock data

**`server/db.json`**

```json
{
  "id": 1,
  "firstName": "Rajendra",
  "lastName": "Bisoi",
  "email": "raj@example.com",
  "phone": "9876123456",
  "dob": "2000-03-02"
}
```

---

### ✅ No changes required in:

* `UserForm.tsx`
* `UsersPage.tsx`
* API layer
* Table logic

That’s the benefit of the schema-driven approach.

---

## 🧠 Validation Strategy

* Required fields are enforced via Yup
* Length constraints prevent invalid data
* Phone numbers are validated for digit length
* Validation logic is centralized and easy to evolve

---

## 🧩 Folder Structure (Simplified)

```
src/
 ├── api/              # API calls
 ├── components/       # Reusable UI components
 ├── config/           # Field config + validation schema
 ├── hooks/            # Custom hooks (debounce)
 ├── pages/            # Page-level components
 ├── types/            # TypeScript interfaces
 └── App.tsx
server/
 └── db.json           # Mock backend data
```

---

## 📌 Assumptions

* JSON-server is used as a mock backend
* API responses follow a simple REST structure
* Authentication is out of scope for this task
* Focus is on clarity, extensibility, and correctness

---

## 🏁 Conclusion

This project demonstrates:

* Clean React architecture
* Strong form validation
* Thoughtful extensibility design
* Practical API integration
* Production-ready patterns for small to medium apps

---
