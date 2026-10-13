// Discordの招待URLを設定してください。例: https://discord.gg/xxxxxxxx
const DISCORD_INVITE_URL = "";

document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".accordion-trigger");

  function setExpanded(trigger, expanded) {
    const targetId = trigger.getAttribute("aria-controls");
    const target = targetId ? document.getElementById(targetId) : null;
    trigger.setAttribute("aria-expanded", String(expanded));

    if (target) {
      target.hidden = !expanded;
    }

    const plus = trigger.querySelector(".card-plus, .news-plus, .large-plus");
    if (plus) plus.textContent = expanded ? "−" : "+";

    if (trigger.classList.contains("panel-toggle")) {
      trigger.textContent = expanded ? "−" : "+";
      trigger.setAttribute("aria-label", expanded ? "詳細を閉じる" : "詳細を開く");
    }
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      setExpanded(trigger, !expanded);
    });
  });

  // モバイル用ナビゲーション
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "メニューを開く");
      });
    });
  }

  // DiscordリンクはURLを設定するまで無効化
  document.querySelectorAll(".discord-link").forEach((link) => {
    if (DISCORD_INVITE_URL.trim()) {
      link.href = DISCORD_INVITE_URL.trim();
      link.classList.remove("is-unconfigured");
      link.removeAttribute("aria-disabled");
      link.removeAttribute("title");
    } else {
      link.href = "#";
      link.classList.add("is-unconfigured");
      link.setAttribute("aria-disabled", "true");
      link.title = "script.js の DISCORD_INVITE_URL に招待URLを設定してください";
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const note = document.getElementById("discord-note");
        if (note) note.textContent = "script.js の DISCORD_INVITE_URL に招待URLを設定してください。";
      });
    }
  });

  // スクロール位置に合わせてナビの項目を強調
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-link")];

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-25% 0px -65% 0px" });

    sections.forEach((section) => observer.observe(section));
  }
});
