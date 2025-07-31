
// ========================
// TEMPLATE LOADER
// ========================
async function loadTemplate(templateName) {
  try {
    const res = await fetch(`/templates/${templateName}`);
    const templateHtml = await res.text();

    // Display the raw template in a preview div
    document.getElementById('preview').innerHTML = templateHtml;
    
    // Save raw template in case we want to inject data later
    window.currentTemplate = templateHtml;
  } catch (err) {
    console.error("Error loading template:", err);
  }
}
// ========================
// FAKE DATA FOR TESTING
// ========================
const fakeData = {
  name: "Annele Ndlovu",
  bio: "I’m a passionate full-stack dev from South Africa, building modern websites and apps.",
  projects: `
    <div class="project">
      <h3>Weather App</h3>
      <p>Built with React and OpenWeather API.</p>
    </div>
    <div class="project">
      <h3>Online Portfolio Builder</h3>
      <p>This is the tool you're looking at!</p>
    </div>
  `
};

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

// ========================
// TEMPLATE SELECT HANDLER
// ========================
document.getElementById('templatePicker').addEventListener('change', function () {
  loadTemplate(this.value);
});

// Load first template on page load
loadTemplate('template1.html');

function getFormData(){
  return{
    name: document.getElementById('name').value,
    bio: document.getElementById('bio').value,
    skill1: document.getElementById('skill1').value,
    skill2: document.getElementById('skill2').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,

  }



}
document.getElementById('loadBtn').addEventListener('click', () => {
  const userData = getFormData();
  const rendered = injectUserData(window.currentTemplate, userData);
  document.getElementById('preview').innerHTML = rendered;
  });