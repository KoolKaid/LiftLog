# Lift Log

A workout tracker that runs in your phone's browser. No account needed, works offline after the first visit.

## Put it online with GitHub Pages (free)

1. On github.com, create a new **public** repository, for example `lift-log`.
2. Tap **Add file → Upload files** and upload every file in this folder (all of them sit at the top level, no subfolders).
3. Commit the upload.
4. Go to **Settings → Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, pick the **main** branch and the **/ (root)** folder, then Save.
5. After a minute or two, your app is at `https://YOUR-USERNAME.github.io/lift-log/`.

## Install on your iPhone

Open that link in Safari, tap **Share → Add to Home Screen**. Always open it from the home screen icon so your data stays in one place.

## Move your workouts over from the Claude version

1. In the Claude version, open the gear menu and tap **Export to Excel**. Save the file to Files.
2. In this app, open the gear menu and tap **Import from Excel**, then pick that file.

## Updating the app later

Upload the changed files to the repository. Also open `sw.js` and change `liftlog-v1` to `liftlog-v2` (and so on) so phones pick up the new version. Your workouts are not touched by updates.

## Back up

Your workouts are stored on your phone. Export to Excel every couple of weeks; the History tab reminds you.
