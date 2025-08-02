// ==========================
// EXPORTER.JS – Export ZIP
// ==========================
document.getElementById('exportBtn').addEventListener('click', async () => {
  if (!window.currentTemplate) {
    alert("❗ No template loaded. Please choose a template first.");
    return;
  }

  const userData = getUserInput();
  const finalHTML = injectUserData(window.currentTemplate, userData);

  // ✅ Create a new ZIP file
  const zip = new JSZip();
  zip.file("index.html", finalHTML);

  // Optionally: Add a basic README or assets folder
  zip.file("README.txt", "This portfolio site was generated with Quickfolio.");

  // 💾 Generate and trigger download
  try {
    const content = await zip.generateAsync({ type: "blob" });

    // Create temporary link and click it
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = `${userData.name.replace(/\s+/g, "_").toLowerCase()}_portfolio.zip`;
    link.click();

    // ✅ Show success message
    showToast("✅ Portfolio exported successfully!");
  } catch (err) {
    console.error("Export failed:", err);
    showToast("❌ Something went wrong during export.", true);
  }
});

// ✅ Toast Message Helper
function showToast(message, isError = false) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = isError ? "#e74c3c" : "#2ecc71";
  toast.style.color = "white";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
  toast.style.zIndex = 9999;
  toast.style.transition = "opacity 0.3s ease";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
