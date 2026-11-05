# Windows Setup — Nepal Lens Studio

## Why you got ENOENT
You ran `npm install` in `C:\Users\nisan` — that folder has no `package.json`.  
You must run it **inside** the project folder: `C:\Users\nisan\nepal-lens-studio`

## Steps (Windows 10/11)

### 1. Install Node.js (if not yet)
1. Go to https://nodejs.org → Download LTS (20.x)
2. Install with defaults → Restart terminal
3. Verify:
```
node --version
npm --version
```
You should see v20.x and 10.x

### 2. Download the project
- Download `nepal-lens-studio.zip` from the workspace (see Files panel → /home/user/nepal-lens-studio.zip)
- Right-click → Extract All → to `C:\Users\nisan\Desktop\` or `C:\Users\nisan\nepal-lens-studio`
- Or clone if you have git:
```
git clone https://github.com/your-repo/nepal-lens-studio.git
```

### 3. Open terminal IN the project folder
**Option A — via File Explorer:**
1. Open folder `nepal-lens-studio` where you see `package.json`
2. Click address bar → type `cmd` → Enter (or `powershell`)

**Option B — via commands:**
```
cd /d C:\Users\nisan\nepal-lens-studio
dir
```
You MUST see `package.json` in `dir` output. If not, you're in wrong place.

### 4. Install
```
npm install --legacy-peer-deps
```
Wait 1-2 minutes. Ignore `deprecated` warnings — they are safe.

### 5. Run
```
npm run dev
```
Open http://localhost:3000 in browser.

Admin: http://localhost:3000/admin
Login: admin@nepallens.local / admin123

### Common fixes
- `ENOENT` → you are not inside `nepal-lens-studio` folder. Use `cd` and `dir` to check.
- `EACCES` → run terminal as Administrator, or delete `node_modules` and retry.
- Port in use → `npm run dev -- -p 3001` or close other Next.js
- 3D not showing → WebGL required; Chrome/Edge latest. Mobile shows static fallback — normal.

