🚫 Offensive Content Filter API (Express + OpenAI)

This is a minimal Express.js API that uses OpenAI to detect offensive language before allowing users to create posts and comments.
✨ Features

    🔐 Uses OpenAI to scan post & comment content

    📝 Blocks offensive submissions with custom error

    ⚡ Fast and lightweight Express server

    ✅ Centralized error handling

    🧪 Ready for expansion (JWT, MongoDB, etc.)

📦 Tech Stack

    Node.js / Express

    OpenAI API

    TypeScript

    Post & Comment endpoints

    Centralized error handling middleware

🚀 How It Works

    A user sends a POST request with content.

    The server sends the content to OpenAI.

    If OpenAI detects offensive or inappropriate language, the request is rejected.

    If it's clean, the post/comment is created successfully.

🔧 Setup

1.Clone the repo:

git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

2.Install dependencies:
npm install
3.Create a .env file and add your OpenAI API key:
OPENAI_API_KEY=your_openai_api_key
4.Start the server
ts-node index.ts
