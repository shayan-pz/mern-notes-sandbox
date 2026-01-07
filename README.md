📝 MERN Notes Sandbox

A fully containerized sandbox project built with the MERN stack (MongoDB, Express, React, Node.js) and instrumented with Datadog APM for full observability.

⸻

🔧 Features
	•	Create, fetch, and delete notes
	•	MongoDB Atlas database
	•	React frontend and Express backend
	•	Dockerized with docker-compose
	•	Datadog APM (with custom port support)

🔁 We are intentionally using port 8136 for Datadog APM instead of the default 8126 to avoid conflicts with the Datadog Agent already running on our work laptops.

🐳 This setup runs the Datadog Agent in its own container, fully separated from the backend app. The backend sends traces over the Docker network to the agent via container name datadog-agent and port 8136.

🔑 Don’t forget to insert your actual Datadog API key￼ in the docker-compose.yml under the datadog-agent service, or the agent won’t be able to send traces.

⸻

🚀 Setup Instructions

1. Clone the repo

git clone https://github.com/your-username/mern-notes-sandbox.git
cd mern-notes-sandbox

2. Create your .env file in server/

MONGO_URI=your_mongodb_connection_string

🔐 Never commit .env — it’s gitignored.

3. Add your Datadog API key

Edit the docker-compose.yml under datadog-agent service:

    environment:
      - DD_API_KEY=your_actual_api_key_here

Or use an environment variable at runtime for better security.

4. Start the app

docker compose down
docker compose up --build

5. Trigger some requests

curl http://localhost:5000/notes

Or open the frontend at: http://localhost:3000￼

6. View traces in Datadog

👉 Datadog APM Dashboard￼

⸻

📁 Project Structure

mern-notes-sandbox/
├── server/
│   ├── index.js
│   ├── models/
│   └── routes/
├── client/client/
│   └── App.js
├── docker-compose.yml
└── README.md


⸻

🐶 Datadog APM Configuration

Backend environment variables:

- DD_AGENT_HOST=datadog-agent
- DD_TRACE_AGENT_PORT=8136
- DD_SERVICE=mern-notes-backend
- DD_ENV=dev

Datadog agent environment:

- DD_APM_ENABLED=true
- DD_APM_RECEIVER_PORT=8136

Port 8136 is exposed via:

ports:
  - "8136:8136"


⸻

✅ Quick Setup Summary

require('dd-trace').init();     # First line of server/index.js
.env with MONGO_URI             # Inside server/
DD_API_KEY in compose file      # For datadog-agent service
docker compose up --build      # Start everything


⸻

🧠 Author & Credits

Created by Shayan Parvizi

Contributions & improvements welcome!