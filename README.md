<h1 align="center" style="color:#4CAF50; font-size: 40px;">🧘 Wellness Session Platform</h1>
<h3 align="center" style="color:gray;">A Secure Platform for Creating and Managing Wellness Sessions</h3>

<p align="center" style="font-size: 16px;">
 The Wellness Session Platform is a full-stack application built for the Arvyax Full Stack Internship Assignment. It enables users to register, log in, create, save, and view wellness sessions (e.g., yoga, meditation) with auto-save functionality and a responsive UI.
</p>
<li><a href="https://agrifarmio.netlify.app/">LIVE DEMO</a></li>

<hr>

<h2>📚 Table of Contents</h2>

<ul>
  <li><a href="#about">About the Project</a></li>
  <li><a href="#structure">Folder & File Structure</a></li>
  <li><a href="#tech">Tech Stack</a></li>
  <li><a href="#dependencies">All Dependencies</a></li>
  <li><a href="#setup">How to Use This Project</a></li>
  <li><a href="#features">Key Features</a></li>
  <li><a href="#enhancements">Future Enhancements</a></li>
  <li><a href="#contact">Contact Me</a></li>
  <li><a href="#creator">Created By</a></li>
</ul>

<hr>

<h2 id="about">🧭 About the Project</h2>

<p>
The Wellness Session Platform is a full-stack web application designed to allow users to securely register, log in, create custom wellness sessions, save them as drafts, and view them on a dashboard. It features JWT-based authentication, MongoDB for data storage, and a responsive React frontend with auto-save functionality. This project simulates a real-world use case for Arvyax, focusing on secure and scalable full-stack development.
</p>

<ul>
 <li>Secure user authentication and protected routes.</li>
    <li>Create and save wellness sessions with title, tags, and JSON file URL.</li>
    <li>View public and user-specific sessions.</li>
    <li>Auto-save drafts with user feedback.</li>
</ul>

<hr>

<h2 id="structure">🗂️ Folder & File Structure</h2>

<pre>
WELLNESS/
├── BACKEND/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── sessionController.js
│   │   └── authController.js
│   ├── middleware/
│   │   ├── auth.js
│   ├── models/
│   │   ├── Session.js
│   │   ├── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── sessions.js
├── FRONTEND/
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── netlify.toml
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   └── src/
│       ├── app.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── assets/
│       ├── Components/
│       │   ├── AuthForm.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Home.jsx
│       │   ├── MySessions.jsx
│       │   ├── Navbar.jsx
│       │   ├── SessionEditor.jsx

</pre>

<hr>

<h2 id="tech">🧰 Tech Stack</h2>

<table>
  <tr><th>Part</th><th>Technology</th></tr>
  <tr><td>Frontend</td><td>React, Tailwind CSS, Vite</td></tr>
  <tr><td>Backend</td><td>Node.js, Express.js, MongoDB</td></tr>
  <tr><td>Deployment</td><td>Netlify (Frontend), Railway/Render (Backend)</td></tr>
</table>

<hr>

<h2 id="dependencies">📦 All Dependencies</h2>

<h3>🔧 Backend</h3>

<table>
<tr><th>Package</th><th>Version</th></tr>
<tr><td>bcrypt</td><td>^6.0.0</td></tr>
<tr><td>cors</td><td>^2.8.5</td></tr>
<tr><td>dotenv</td><td>^17.2.1</td></tr>
<tr><td>express</td><td>^5.1.0</td></tr>
<tr><td>jsonwebtoken</td><td>^9.0.2</td></tr>
<tr><td>mongoose</td><td>^8.16.5</td></tr>
<tr><td>nodemon</td><td>^3.1.10</td></tr>
>
</table>

<h3>🎨 Frontend</h3>

<table>
<tr><th>Package</th><th>Version</th></tr>
<tr><td>@tailwindcss/vite</td><td>^4.1.11</td></tr>
  <tr><td>axios</td><td>^1.11.0</td></tr>
  <tr><td>dotenv</td><td>^17.2.1</td></tr>
  <tr><td>lucide-react</td><td>^0.534.0</td></tr>
  <tr><td>react</td><td>^19.1.0</td></tr>
  <tr><td>react-dom</td><td>^19.1.0</td></tr>
  <tr><td>react-icons</td><td>^5.5.0</td></tr>
  <tr><td>react-router-dom</td><td>^7.7.1</td></tr>
  <tr><td>react-toastify</td><td>^11.0.5</td></tr>
  <tr><td>tailwindcss</td><td>^4.1.11</td></tr>
</table>

<hr>

<h2 id="setup">⚙️ How to Use This Project</h2>

<h3>🧩 Backend</h3>

```bash
cd BACKEND
npm install
# Create a .env file with necessary credentials (Mongo URI, JWT, Email)
npm run dev
<h3>🎨 Frontend</h3>
```bash
cd FRONTEND
npm install
npm run dev
<h3>🌐 Open your browser</h3>
```bash
http://localhost:5173

```

<<hr style="border: 1px solid #ddd; margin: 20px 0;">

  <h2 id="features">✨ Key Features</h2>
  <ul>
    <li>🔐 Secure user authentication with JWT and password hashing.</li>
    <li>📋 Create and save wellness sessions with title, tags, and JSON file URL.</li>
    <li>🖥️ View public sessions on the dashboard.</li>
    <li>📄 View user’s own sessions (drafts and published) on the "My Sessions" page.</li>
    <li>⏳ Auto-save drafts every 5 seconds with toast notifications.</li>
    <li>🎨 Responsive UI using Tailwind CSS.</li>
    <li style="color: #e74c3c;">📢 Publish sessions (in progress, currently returns 500 error).</li>
    <li style="color: #e74c3c;">✏️ Edit sessions (in progress, GET /my-sessions/:id returns 500 error).</li>
  </ul>

  <hr style="border: 1px solid #ddd; margin: 20px 0;">

  <h2 id="issues">⚠️ Known Issues</h2>
  <ul>
    <li><strong>Publish Functionality:</strong> POST /api/sessions/my-sessions/publish returns 500 (Internal Server Error) due to backend controller issues.</li>
    <li><strong>Session Editing:</strong> GET /api/sessions/my-sessions/:id returns 500, preventing session data from loading in the editor.</li>
  </ul>
  <p style="color: #e74c3c;">These issues are under investigation, likely due to database query errors or session ID mismatches.</p>

  <hr style="border: 1px solid #ddd; margin: 20px 0;">

  <h2 id="enhancements">🚀 Future Enhancements</h2>
  <ul>
    <li>🛠️ Fix publish and edit session functionality.</li>
    <li>🔒 Implement logout feature to clear JWT token.</li>
    <li>🌐 Deploy frontend to Vercel and backend to Render.</li>
    <li>📱 Enhance UI with advanced responsiveness for mobile devices.</li>
    <li>📊 Add session analytics dashboard for users.</li>
  </ul>

  <hr style="border: 1px solid #ddd; margin: 20px 0;">
            <h2 id="contact">📬 Contact Me</h2>
             <ul>
              <li><strong>Name:</strong> Aman Gupta</li>
               <li><strong>Email:</strong>  <a href="ag0567688@gmail.com">Send me an email</a> </li>
                <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/amangupta9454">LINKEDIN</a></li>
                 <li><strong>GitHub:</strong> <a href="https://github.com/amangupta9454">GITHUB</a></li>
                 <li><strong>Portfolio:</strong> <a href="https://guptaaman.netlify.app/">PORTFOLIO</a></li>
                  </ul> 
                  <hr>
                   <h2 id="creator">👨‍💻 Created By</h2> 
                   <p><strong>Aman Gupta</strong><br>B.Tech 3rd year Student | HIET Ghaziabad<br>Passionate about building secure and scalable full-stack applications 🧑‍💻</p>
                    <p align="center">⭐ If you found this project helpful, give it a star!</p>