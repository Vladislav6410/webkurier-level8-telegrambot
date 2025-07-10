// 📁 engine/agents/layout-agent/layout-ui.js

export const LayoutUI = (() => {
  const previewId = "layout-preview";

  function init() {
    if (!document.getElementById(previewId)) {
      const container = document.createElement("div");
      container.id = previewId;
      container.style = `
        position: fixed;
        right: 0;
        top: 0;
        width: 50%;
        height: 100%;
        background: #fff;
        border-left: 1px solid #ccc;
        overflow: auto;
        z-index: 9999;
        display: none;
      `;
      document.body.appendChild(container);
    }
  }

  function show(html) {
    const container = document.getElementById(previewId);
    if (container) {
      container.innerHTML = html;
      container.style.display = "block";
    }
  }

  function hide() {
    const container = document.getElementById(previewId);
    if (container) {
      container.style.display = "none";
    }
  }

  function toggle(html) {
    const container = document.getElementById(previewId);
    if (container.style.display === "none") {
      show(html);
    } else {
      hide();
    }
  }

  return {
    init,
    show,
    hide,
    toggle,
  };
})();