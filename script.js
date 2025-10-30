// ====== EDIT THESE TWO LINES ======
const GITHUB_USERNAME = "annasalfa"; // <- your GitHub username
const CV_PDF_URL = "Curriculum_Vitae_-_Annas_Al_Farisi_Riwayadi_New.pdf"; // or https://your-domain/cv-annas.pdf
// ==================================

// Featured projects — quick to edit without touching HTML
const featured = [
  {
    title: "AI Agent Reasoning System",
    meta: "LangChain • LangGraph • Docker",
    desc: "Multi-role reasoning pipeline (Researcher/Critic/Synthesizer) for automated research and ideation.",
    url: "https://github.com/" + GITHUB_USERNAME + "/ai-agent-reasoning"
  },
  {
    title: "n8n Invoice Automation Bot",
    meta: "n8n • AWS S3 • Telegram API",
    desc: "Generates and sends PDF invoices via Telegram/WhatsApp; reduces manual work by ~90%.",
    url: "https://github.com/" + GITHUB_USERNAME + "/n8n-invoice-bot"
  },
  {
    title: "NAS with DDNS & Port Forwarding",
    meta: "OpenMediaVault • DuckDNS • Linux",
    desc: "Self-hosted storage with secure external access on dynamic IP (no static IP cost).",
    url: "https://github.com/" + GITHUB_USERNAME + "/nas-ddns-implementation"
  },
  {
    title: "Bapenda Kabupaten Puncak Website",
    meta: "HTML • CSS • JS • PHP",
    desc: "Official government website project, public information portal and news publishing.",
    url: "https://github.com/" + GITHUB_USERNAME + "/bapenda-puncak-site"
  }
];

// Render featured cards
const featuredGrid = document.getElementById("featuredGrid");
featured.forEach((p) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <h3><a href="${p.url}" target="_blank" rel="noopener">${p.title}</a></h3>
    <div class="meta">${p.meta}</div>
    <p>${p.desc}</p>
    <div>${p.meta.split("•").map(t => `<span class='pill'>${t.trim()}</span>`).join("")}</div>
  `;
  featuredGrid.appendChild(card);
});

// Update year & CV link
document.getElementById("year").textContent = new Date().getFullYear();
const cvLink = document.getElementById("cvLink");
if (CV_PDF_URL && CV_PDF_URL !== "#") {
  cvLink.href = CV_PDF_URL;
  cvLink.textContent = "download";
} else {
  cvLink.removeAttribute("href");
  cvLink.removeAttribute("download");
}

// Fetch latest repos from GitHub (public, sorted by updated)
async function loadRepos() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=12&sort=updated`);
    if (!res.ok) throw new Error("GitHub API error");
    const data = await res.json();
    const list = document.getElementById("repoList");
    list.innerHTML = "";
    data
      .filter((r) => !r.fork)
      .slice(0, 8)
      .forEach((r) => {
        const item = document.createElement("div");
        item.className = "repo";
        const lang = r.language ? `<span class="pill">${r.language}</span>` : "";
        const topics = (r.topics || []).slice(0, 3).map((t) => `<span class='pill'>${t}</span>`).join("");
        item.innerHTML = `
          <div class="left">
            <a class="name" href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a>
            <div class="small">${r.description || ""}</div>
          </div>
          <div class="right">
            ${lang}${topics}
            <span title="Stars">★ ${r.stargazers_count}</span>
            <span title="Updated">⟳ ${new Date(r.updated_at).toLocaleDateString()}</span>
          </div>
        `;
        list.appendChild(item);
      });
  } catch (e) {
    document.getElementById("repoList").innerHTML =
      '<div class="small" style="color:#fca5a5">Failed to load repositories. Check your username or try again later.</div>';
  }
}
loadRepos();
