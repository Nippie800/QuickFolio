// ========================
// TEMPLATE LOADER
// ========================
async function loadTemplate(templateName) {
  try {
    const res = await fetch(`templates/${templateName}`);
    const templateHtml = await res.text();

   // Store raw template
window.currentTemplate = templateHtml;

// Immediately inject data if form is filled
const userData = getUserInput();
const result = injectUserData(templateHtml, userData);

// Show the result in preview
document.getElementById('preview').innerHTML = result;


    // Save raw template in case we want to inject data later
    window.currentTemplate = templateHtml;
  }catch (err) {
  console.error("Error loading template:", err);
  document.getElementById('preview').innerHTML = `
    <p style="color: red;">🚫 Failed to load the selected template. Make sure you're running a local server and that the template files exist.</p>
  `;

  }
}

// ========================
// INJECT DATA FUNCTION
// ========================
function injectUserData(template, userData) {
  let output = template;
  for (const key in userData) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    output = output.replace(regex, userData[key]);
  }
  return output;
}