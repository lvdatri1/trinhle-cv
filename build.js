const fs = require("fs");
const data = JSON.parse(fs.readFileSync("cv-data.json", "utf8"));

const D = data;

function esc(s) {
  return (s || "").replace(/&/g, "&amp;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── LANDSCAPE ──────────────────────────────────────────────
function buildLandscape() {
  const skillTags = D.skills.map(s => `        <span>${esc(s)}</span>`).join("\n");

  const timeline = D.experience.map(e => {
    const desc = e.desc ? `\n            <div class="company-desc">${esc(e.desc)}</div>` : "";
    const bullets = e.bullets.map(b => `                <li>${b}</li>`).join("\n");
    return `            <div class="timeline-item">
              <div class="date">${e.date}</div>
              <div class="role-title">${e.title}</div>
              <div class="company">${esc(e.company)}</div>${desc}
              <ul>
${bullets}
              </ul>
            </div>`;
  }).join("\n\n");

  const certs = D.certifications.map(c => `          <li>${esc(c)}</li>`).join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Trinh Le - CV</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
      line-height:1.6; background:#eef1f5; color:#2d2d2d; padding:40px 20px;
    }
    .cv {
      max-width:1050px; margin:0 auto; background:#fff; border-radius:12px;
      box-shadow:0 4px 24px rgba(0,0,0,.08);
      display:grid; grid-template-columns:300px 1fr; overflow:hidden;
    }
    .sidebar { background:#1a2332; color:#d3d9e2; padding:40px 28px; display:flex; flex-direction:column; gap:28px; }
    .sidebar h2 { font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#8896a8; margin-bottom:10px; padding-bottom:4px; border-bottom:1px solid #2d384a; }
    .sidebar ul { list-style:none; padding:0; }
    .sidebar li { font-size:13px; margin-bottom:6px; }
    .sidebar li strong { color:#fff; }
    .contact-item { display:flex; align-items:center; gap:10px; font-size:13px; margin-bottom:8px; color:#c8ceda; }
    .contact-item a { color:#8ab4f8; text-decoration:none; }
    .contact-item a:hover { text-decoration:underline; }
    .contact-icon { width:18px; text-align:center; font-size:15px; flex-shrink:0; }
    .photo-placeholder { width:120px; height:120px; border-radius:50%; background:#2d384a; margin:0 auto 8px; display:flex; align-items:center; justify-content:center; font-size:40px; color:#556477; border:3px solid #2c6faa; }
    .sidebar .profile-short { text-align:center; }
    .sidebar .profile-short h1 { font-size:22px; font-weight:700; color:#fff; letter-spacing:1px; }
    .sidebar .profile-short .role { font-size:14px; color:#8ab4f8; margin-top:2px; }
    .skill-tags { display:flex; flex-wrap:wrap; gap:6px; }
    .skill-tags span { background:#2d384a; color:#c8ceda; font-size:11px; padding:4px 10px; border-radius:12px; }

    .main { padding:40px 40px 40px 36px; }
    .section { margin-bottom:32px; }
    .section:last-child { margin-bottom:0; }
    .section-title { font-size:13px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#1a2332; border-bottom:3px solid #1a2332; padding-bottom:6px; margin-bottom:16px; }

    .profile-text p { font-size:14px; margin-bottom:10px; }
    .profile-text ul { padding-left:18px; font-size:14px; }
    .profile-text li { margin-bottom:5px; }

    .timeline { position:relative; padding-left:24px; }
    .timeline::before { content:""; position:absolute; left:6px; top:6px; bottom:6px; width:2px; background:#d0d5dd; }
    .timeline-item { position:relative; margin-bottom:28px; }
    .timeline-item:last-child { margin-bottom:0; }
    .timeline-item::before { content:""; position:absolute; left:-20px; top:6px; width:10px; height:10px; border-radius:50%; background:#2c6faa; border:2px solid #fff; box-shadow:0 0 0 2px #2c6faa; }
    .timeline-item .date { font-size:12px; font-weight:600; color:#2c6faa; text-transform:uppercase; letter-spacing:.5px; margin-bottom:2px; }
    .timeline-item .role-title { font-size:16px; font-weight:700; color:#1a2332; }
    .timeline-item .company { font-size:14px; font-weight:500; color:#555; margin-bottom:4px; }
    .timeline-item .company-desc { font-size:12px; color:#888; font-style:italic; margin-bottom:6px; }
    .timeline-item ul { padding-left:18px; font-size:13.5px; }
    .timeline-item li { margin-bottom:4px; }

    .compact-list { list-style:none; padding:0; }
    .compact-list li { font-size:14px; padding:4px 0; border-bottom:1px solid #f0f2f4; }
    .compact-list li:last-child { border-bottom:none; }
    .compact-list li strong { color:#1a2332; }
    hr { border:none; border-top:1px solid #e6e8eb; margin:10px 0; }

    @media (max-width:768px) { .cv { grid-template-columns:1fr; } .sidebar { padding:28px 20px; } .main { padding:28px 20px; } }
    @media print { body { background:#fff; padding:0; } .cv { box-shadow:none; border-radius:0; max-width:100%; } .sidebar { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }
  </style>
</head>
<body>
<div class="cv">
  <div class="sidebar">
    <div class="profile-short">
      <div class="photo-placeholder">TL</div>
      <h1>${esc(D.name)}</h1>
      <div class="role">${esc(D.role)}</div>
    </div>
    <div>
      <h2>Contact</h2>
      <div class="contact-item"><span class="contact-icon">\ud83d\udccd</span> ${esc(D.location)}</div>
      <div class="contact-item"><span class="contact-icon">\ud83d\udcde</span> ${esc(D.phone)}</div>
      <div class="contact-item"><span class="contact-icon">\u2709\ufe0f</span> ${esc(D.email)}</div>
      <div class="contact-item"><span class="contact-icon">\ud83d\udd17</span> <a href="${esc(D.linkedin)}">linkedin.com/in/trinhle-b34b6334</a></div>
      <div class="contact-item"><span class="contact-icon">\ud83c\udf10</span> <a href="${esc(D.cvUrl)}">${esc(D.cvUrl)}</a></div>
    </div>
    <div>
      <h2>Core Expertise</h2>
      <div class="skill-tags">
${skillTags}
      </div>
    </div>
    <div>
      <h2>Certifications</h2>
      <ul>
${certs}
      </ul>
    </div>
    <div>
      <h2>Interests</h2>
      <ul><li>${esc(D.interests)}</li></ul>
    </div>
  </div>

  <div class="main">
    <div class="section">
      <div class="section-title">Executive Profile</div>
      <div class="profile-text">
        <p>${D.profile[0]}</p>
        <ul>
${D.profileHighlights.map(h => `          <li>${h}</li>`).join("\n")}
        </ul>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Professional Experience</div>
      <div class="timeline">
${timeline}
      </div>
    </div>

    <div class="section">
      <div class="section-title">Education</div>
      <ul class="compact-list">
${D.education.map(e => `        <li>${e}</li>`).join("\n")}
      </ul>
    </div>

    <hr />
    <p style="font-size:12px;color:#999;"><em>Last Updated: ${esc(D.lastUpdated)}</em></p>
  </div>
</div>
</body>
</html>`;
}

// ─── PORTRAIT ────────────────────────────────────────────────
function buildPortrait() {
  const skillTags = D.skills.map(s => `        <span>${esc(s)}</span>`).join("\n");

  const timeline = D.experience.map(e => {
    const desc = e.desc ? `\n            <div class="company-desc">${esc(e.desc)}</div>` : "";
    const bullets = e.bullets.map(b => `                <li>${b}</li>`).join("\n");
    return `          <div class="timeline-item">
              <div class="date">${e.date}</div>
              <div class="role-title">${e.title}</div>
              <div class="company">${esc(e.company)}</div>${desc}
              <ul>
${bullets}
              </ul>
            </div>`;
  }).join("\n\n");

  const certs = D.certifications.map(c => `          <li>${esc(c)}</li>`).join("\n");
  const edu = D.education.map(e => `        <li>${e}</li>`).join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Trinh Le - CV (Portrait)</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
      line-height:1.6; background:#eef1f5; color:#2d2d2d; padding:40px 20px;
    }
    .cv {
      max-width:780px; margin:0 auto; background:#fff; border-radius:12px;
      box-shadow:0 4px 24px rgba(0,0,0,.08); padding:44px 48px;
    }
    .header { text-align:center; margin-bottom:28px; }
    .header h1 { font-size:28px; font-weight:700; color:#1a2332; letter-spacing:1.5px; }
    .header .role { font-size:16px; color:#2c6faa; font-weight:600; margin-top:2px; }
    .header .subtitle { font-size:13px; color:#888; font-style:italic; margin-top:2px; }
    .header .contact { display:flex; flex-wrap:wrap; justify-content:center; gap:6px 20px; margin-top:10px; font-size:13px; color:#555; }
    .header .contact a { color:#2c6faa; text-decoration:none; }
    .header .contact a:hover { text-decoration:underline; }

    .section { margin-bottom:24px; }
    .section-title { font-size:12px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#1a2332; border-bottom:3px solid #1a2332; padding-bottom:5px; margin-bottom:12px; }

    .profile-text p { font-size:13.5px; margin-bottom:8px; }
    .profile-text ul { padding-left:18px; font-size:13.5px; }
    .profile-text li { margin-bottom:4px; }

    .skill-tags { display:flex; flex-wrap:wrap; gap:5px; margin-top:4px; }
    .skill-tags span { background:#eef1f5; color:#1a2332; font-size:11px; padding:3px 10px; border-radius:10px; border:1px solid #d0d5dd; }

    .timeline { position:relative; padding-left:20px; }
    .timeline::before { content:""; position:absolute; left:5px; top:6px; bottom:6px; width:2px; background:#d0d5dd; }
    .timeline-item { position:relative; margin-bottom:22px; }
    .timeline-item:last-child { margin-bottom:0; }
    .timeline-item::before { content:""; position:absolute; left:-16px; top:5px; width:8px; height:8px; border-radius:50%; background:#2c6faa; border:2px solid #fff; box-shadow:0 0 0 2px #2c6faa; }
    .timeline-item .date { font-size:11px; font-weight:600; color:#2c6faa; text-transform:uppercase; letter-spacing:.5px; margin-bottom:1px; }
    .timeline-item .role-title { font-size:15px; font-weight:700; color:#1a2332; }
    .timeline-item .company { font-size:13px; font-weight:500; color:#555; margin-bottom:3px; }
    .timeline-item .company-desc { font-size:11.5px; color:#999; font-style:italic; margin-bottom:4px; }
    .timeline-item ul { padding-left:16px; font-size:13px; }
    .timeline-item li { margin-bottom:3px; }

    .compact-list { list-style:none; padding:0; }
    .compact-list li { font-size:13.5px; padding:3px 0; border-bottom:1px solid #f0f2f4; }
    .compact-list li:last-child { border-bottom:none; }
    .compact-list li strong { color:#1a2332; }

    .inline-section { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
    hr { border:none; border-top:1px solid #e6e8eb; margin:10px 0; }

    @media print { body { background:#fff; padding:0; font-size:11px; } .cv { box-shadow:none; border-radius:0; padding:28px 32px; max-width:100%; } }
  </style>
</head>
<body>
<div class="cv">
  <div class="header">
    <h1>${esc(D.name)}</h1>
    <div class="role">${esc(D.role)}</div>
    <div class="subtitle">${esc(D.subtitle)}</div>
    <div class="contact">
      <span>\ud83d\udccd ${esc(D.location)}</span>
      <span>\ud83d\udcde ${esc(D.phone)}</span>
      <span>\u2709\ufe0f ${esc(D.email)}</span>
      <span>\ud83d\udd17 <a href="${esc(D.linkedin)}">linkedin.com/in/trinhle-b34b6334</a></span>
      <span>\ud83c\udf10 <a href="${esc(D.cvUrl)}">${esc(D.cvUrl)}</a></span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Executive Profile</div>
    <div class="profile-text">
      <p>${D.profile[0]}</p>
      <ul>
${D.profileHighlights.map(h => `        <li>${h}</li>`).join("\n")}
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Core Expertise</div>
    <div class="skill-tags">
${skillTags}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Professional Experience</div>
    <div class="timeline">
${timeline}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Education</div>
    <ul class="compact-list">
${edu}
    </ul>
  </div>

  <div class="inline-section">
    <div class="section">
      <div class="section-title">Certifications</div>
      <ul class="compact-list">
${certs}
      </ul>
    </div>
    <div class="section">
      <div class="section-title">Interests</div>
      <p style="font-size:13.5px;color:#444;">${esc(D.interests)}</p>
    </div>
  </div>

  <hr />
  <p style="font-size:11px;color:#999;"><em>Last Updated: ${esc(D.lastUpdated)}</em></p>
</div>
</body>
</html>`;
}

// ─── WRITE FILES ─────────────────────────────────────────────
fs.writeFileSync("cvweb.html", buildLandscape());
fs.writeFileSync("cvweb-portrait.html", buildPortrait());
console.log("Generated cvweb.html and cvweb-portrait.html from cv-data.json");
