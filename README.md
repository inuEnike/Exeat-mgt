# Gate Pass Management System

This system allows students to request an exeat without visiting the dean's or chief porter's office.

## Features
1. Students can request an exeat.
2. Students can track their exeat status: `PENDING`, `APPROVED`.
3. An email is sent to the chief porter when a student requests an exeat.
4. The chief porter approves the exeat, and an email is sent to the dean for further review and approval.
5. After the dean's approval, a success message is sent to the student.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)
- Bcrypt
- Nodemailer
