# Steam4All - Gender Equality in Tech

Steam4All is a web application dedicated to SDG 5 (Gender Equality), providing free, inclusive Python coding education directly in the browser using AI-powered assistance.

## 🚀 Deployment to GitHub Pages

Follow these steps to deploy this React application to GitHub Pages.

### 1. Prerequisites
*   **Node.js** and **npm** installed.
*   A **GitHub** account.
*   A created **GitHub Repository** for this project.

### 2. Setup & Installation
If you haven't already, initialize the project folder:

```bash
# Initialize git
git init

# Install dependencies (assuming a standard React setup)
npm install
```

### 3. Install `gh-pages`
This package helps publish the build folder to a specific branch on GitHub.

```bash
npm install gh-pages --save-dev
```

### 4. Configure `package.json`
Open your `package.json` file and make the following changes:

**A. Add the `homepage` field** (at the top level):
```json
"homepage": "https://<your-github-username>.github.io/<repository-name>",
```

**B. Add deployment scripts** (under `"scripts"`):
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
  "start": "react-scripts start",
  "build": "react-scripts build"
}
```
*(Note: If you are using Vite instead of Create-React-App, change `"deploy": "gh-pages -d dist"`).*

### 5. Environment Variables (API Key)
Since this app uses the Google Gemini API, you need to provide the API key during the build.

1.  Create a `.env` file in the root directory.
2.  Add your key (ensure the variable name matches what is used in `services/geminiService.ts`):
    ```env
    REACT_APP_API_KEY=your_actual_api_key_here
    ```
    *Note: If using standard Create React App, you may need to update the code in `geminiService.ts` to use `process.env.REACT_APP_API_KEY`.*

### 6. Deploy
1.  **Commit your code**:
    ```bash
    git add .
    git commit -m "Ready for deployment"
    ```
2.  **Link your repository**:
    ```bash
    git remote add origin https://github.com/<username>/<repo-name>.git
    ```
3.  **Run the deploy script**:
    ```bash
    npm run deploy
    ```

### 7. Finish
Go to your **GitHub Repository > Settings > Pages**. Ensure the source branch is set to `gh-pages`. Your site should be live at the URL defined in the `homepage` field!

## 🛠 Tech Stack
*   **Frontend**: React, TypeScript, Tailwind CSS
*   **AI Integration**: Google Gemini API
*   **Styling**: Lucide React Icons, Custom SVGs
