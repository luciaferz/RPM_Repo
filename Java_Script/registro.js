let currentStep = 0;
const steps = document.querySelectorAll(".step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const progressBar = document.getElementById("progressBar");

showStep();

function showStep() {
  steps.forEach(s => s.classList.remove("active"));
  steps[currentStep].classList.add("active");

  prevBtn.style.display = currentStep === 0 ? "none" : "inline-block";

  if (currentStep === steps.length - 1) {
    nextBtn.textContent = "Finalizar";
  } else {
    nextBtn.textContent = "Siguiente";
  }

  progressBar.style.width = ((currentStep + 1) / steps.length) * 100 + "%";
}

nextBtn.addEventListener("click", () => {
  if (!validar()) return;

  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep();
  
  }else{
  // Obtener el nombre de usuario (PASO 3)
  const usuario = document.getElementById("usuario").value;

  // Guardarlo
  localStorage.setItem("usuario", usuario);

  // Mensaje opcional
  alert("Registro completado 🚀");

  // Redirigir al Home
  window.location.href = "../HTML/Home/Home.html";
}
});

prevBtn.addEventListener("click", () => {
  currentStep--;
  showStep();
});

function validar() {
  if (currentStep === 0) {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let confirm = document.getElementById("confirmPassword").value;

    if (!email || pass.length < 8 || pass !== confirm) {
      alert("Revisa los datos");
      return false;
    }
  }

  if (currentStep === 3) {
    if (!document.getElementById("terms").checked) {
      alert("Acepta los términos");
      return false;
    }
  }

  return true;
}