// ═══════════════════════════════════════════════════════════════
// DECISION COST AUDIT AI — Vercel Proxy
// MDC — Millionnaire de Cœur — Maria Francheteau
// Reçoit POST du browser (sans CORS), appelle Apps Script en GET
// ═══════════════════════════════════════════════════════════════

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyRpr8zQbTDVAD1HsDnxcospfXSCj6ENjsvwbP2zBnHgZe3ZmVHEVmPuxsLn62glx_tYg/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Appel Apps Script en GET avec ?payload= pour éviter les problèmes
    // de redirection POST (Google redirige les POST → perd le body)
    const payload = encodeURIComponent(JSON.stringify(req.body));
    const url = APPS_SCRIPT_URL + '?payload=' + payload;

    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow'
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: 'Invalid response from backend', raw: text };
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
