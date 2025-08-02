// ==========================
// FORM HANDLER
// ==========================
document.getElementById('loadBtn').addEventListener('click', () => {
  const userData = getUserInput();

  console.log("Captured User Data:", userData); // Debug

  if (window.currentTemplate) {
    const result = injectUserData(window.currentTemplate, userData);
    document.getElementById('preview').innerHTML = result;
  }
  // Optional: Live preview on input
const formInputs = document.querySelectorAll('#portfolioForm input');
formInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (window.currentTemplate) {
      const userData = getUserInput();
      const result = injectUserData(window.currentTemplate, userData);
      document.getElementById('preview').innerHTML = result;
    }
  });
});

});

// Grab form values and store as JSON-like object
function getUserInput() {
  const title1 = document.getElementById('projectTitle1').value;
  const link1 = document.getElementById('projectLink1').value;
  const title2 = document.getElementById('projectTitle2').value;
  const link2 = document.getElementById('projectLink2').value;

  const projectsHTML = `
    <div class="project">
      <h3><a href="${link1}" target="_blank">${title1}</a></h3>
      <p>A short description of this project can go here.</p>
    </div>
    <div class="project">
      <h3><a href="${link2}" target="_blank">${title2}</a></h3>
      <p>Another short project description can go here.</p>
    </div>
  `;

  return {
    name: document.getElementById('name').value,
    bio: document.getElementById('bio').value,
    skill1: document.getElementById('skill1').value,
    skill2: document.getElementById('skill2').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    projects: projectsHTML
  };
}
