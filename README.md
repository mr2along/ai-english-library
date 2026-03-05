# AI English Library (WebLLM + Node + Codespaces)

A **learning library** for English (B1–B2) with:
- **On-device AI Quiz** using **WebLLM** (no API key needed).
- Filter by **Level / Unit / Type** (Quiz, Article, Vocabulary, Grammar).
- **Manual YouTube embed** (privacy-enhanced).
- **Suggested videos** via server-side **YouTube Data API v3**.

## Run in GitHub Codespaces (recommended)

1. Open repository → **Code › Codespaces › Create codespace on main**.  
   You can also start from a **Blank** template then add these files.  
   _Docs: Creating a codespace from a template._  
   (https://docs.github.com/en/codespaces/developing-in-a-codespace/creating-a-codespace-from-a-template)  

2. (Optional for “Suggest videos”) add **Codespaces Secret**:
   - Settings → Codespaces → **New secret**
   - Name: `YOUTUBE_API_KEY` → Value: your API key  
   _Docs: Codespaces secrets manage env vars securely._  
   (https://docs.github.com/en/codespaces/managing-your-codespaces/managing-your-account-specific-secrets-for-github-codespaces)

3. In the Codespace terminal:
   ```bash
   npm i
   npm run dev
