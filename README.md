📝 MERN Notes App (Dockerized Sandbox)

A full-stack MERN (MongoDB, Express, React, Node.js) notes app, containerized with Docker so your team can run the entire project using just one command.

GitHub Repository: https://github.com/shayan-pz/mern-notes-sandbox.git￼

⸻

🚀 Project Features
	•	🧾 Add, view, and delete notes
	•	🐳 Dockerized frontend and backend
	•	🔐 MongoDB Atlas for cloud-based data storage
	•	✅ Secure config handling via .env
	•	👥 Easy to share and run as a team sandbox

⸻

📁 Project Structure

mern-notes-sandbox/
├── server/                  # Backend (Node + Express)
│   ├── Dockerfile
│   └── index.js, models/, routes/, ...
│
├── client/
│   └── client/              # Frontend (React)
│       ├── Dockerfile
│       └── src/, public/, ...
│
├── docker-compose.yml       # Runs both frontend and backend
├── .env                     # Contains your MongoDB URI (NOT COMMITTED)
├── .env.example             # Template for teammates
└── README.md                # This file


⸻

🧠 Prerequisites
	•	Install Docker Desktop￼
	•	Get your MongoDB Atlas connection string (URI)

⸻

🛠️ Getting Started (Team Instructions)

1. Clone the Project

git clone https://github.com/shayan-pz/mern-notes-sandbox.git
cd mern-notes-sandbox

2. Create your .env file

cp .env.example .env

Then open .env and paste in your actual MongoDB URI:

MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/notesapp?retryWrites=true&w=majority

✅ Do not commit this file. It’s ignored via .gitignore.

⸻

3. Start the App with Docker

docker compose up --build

This will:
	•	Build and run the backend on http://localhost:5000￼
	•	Build and run the frontend on http://localhost:3000￼

⸻

🧪 Test the App

Open your browser and:
	•	Go to http://localhost:3000
	•	Add a new note
	•	Delete a note
	•	Refresh the page to confirm it persists via MongoDB Atlas

You can also check:

curl http://localhost:5000/notes


⸻

🐳 Docker Setup Details

Backend: server/Dockerfile

FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD [“node”, “index.js”]

Frontend: client/client/Dockerfile

FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD [“npm”, “start”]

Compose File: docker-compose.yml

services:
  backend:
    build: ./server
    ports:
      - “5000:5000”
    env_file:
      - .env
    volumes:
      - ./server:/app

  frontend:
    build: ./client/client
    ports:
      - “3000:3000”
    volumes:
      - ./client/client:/app
    depends_on:
      - backend


⸻

🔐 .env and .env.example

✅ .env.example (template to share)

MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/notesapp?retryWrites=true&w=majority

🔒 .env (your real credentials)

MONGO_URI=mongodb+srv://notedev:yourPassword@cluster0.mongodb.net/notesapp?retryWrites=true&w=majority

This file is ignored via .gitignore to keep secrets safe

⸻

🧹 Optional Cleanup
	•	Remove version: from docker-compose.yml (no longer needed)
	•	Delete unused files from React starter template

⸻

✅ Shutting Down

To stop and clean up the containers:

docker compose down


⸻

👋 Need Help?

Contact the maintainer via GitHub Issues or pull requests.