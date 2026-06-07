// Initialize Tencent CloudBase
const app = window.cloudbase.init({
  env: 'tubutu-d8gamtzfr877a0108'
});

const auth = app.auth({ persistence: 'local' });
const db = app.database();

export { app, auth, db };
