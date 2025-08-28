  // Toggle Password Visibility
    document.querySelectorAll('.toggle-password').forEach(icon => {
      icon.addEventListener('click', () => {
        const input = document.querySelector(icon.dataset.target);
        if (input.type === 'password') {
          input.type = 'text';
          icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
          input.type = 'password';
          icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
      });
    });

    // Add Skills
    const addSkillBtn = document.getElementById('cc-add-skill');
    const skillInput = document.getElementById('cc-skill-input');
    const skillTags = document.getElementById('cc-skill-tags');

    addSkillBtn.addEventListener('click', () => {
      const skill = skillInput.value.trim();
      if (skill) {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.textContent = skill;
        const remove = document.createElement('span');
        remove.className = 'remove-skill';
        remove.innerHTML = '&times;';
        remove.setAttribute('aria-label', 'Remove skill');
        remove.onclick = () => tag.remove();
        tag.appendChild(remove);
        skillTags.appendChild(tag);
        skillInput.value = '';
      }
    });

    // Confirm Password Validation
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordInput = document.getElementById('password');
    const confirmError = document.getElementById('cc-confirm-error');

    function validateConfirm() {
      if (confirmPasswordInput.value && confirmPasswordInput.value !== passwordInput.value) {
        confirmError.classList.remove('d-none');
        confirmPasswordInput.setAttribute('aria-invalid', 'true');
      } else {
        confirmError.classList.add('d-none');
        confirmPasswordInput.removeAttribute('aria-invalid');
      }
    }

    confirmPasswordInput.addEventListener('input', validateConfirm);
    passwordInput.addEventListener('input', validateConfirm);

    // Form Validation
    document.getElementById('create-account-form').addEventListener('submit', (e) => {
      let valid = true;
      const form = e.target;
      form.querySelectorAll('input[required], select[required]').forEach(input => {
        const error = input.parentElement.querySelector('.error-text') || input.closest('.mb-3')?.querySelector('.error-text');
        if (!input.checkValidity()) {
          valid = false;
          if (error) error.classList.remove('d-none');
        } else {
          if (error) error.classList.add('d-none');
        }
      });
      validateConfirm();
      if (!confirmError.classList.contains('d-none')) {
        valid = false;
      }
      if (!valid) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    // Accessibility: highlight selected radio cards
    document.querySelectorAll('.radio-card input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', () => {
        document.querySelectorAll('.radio-card label').forEach(label => label.style.borderColor = '#ddd');
        if (radio.checked) {
          radio.nextElementSibling.style.borderColor = '#108a00';
        }
      });
    });

    // Disable motion if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('*').forEach(el => { el.style.transition = 'none'; });
    }

    // Working Days dropdown with add button
const addDayBtn = document.getElementById('cc-add-day');
const daySelect = document.getElementById('cc-day-select');
const dayTags = document.getElementById('cc-day-tags');

addDayBtn.addEventListener('click', () => {
  const day = daySelect.value;
  if (day && day !== "") {
    // Prevent duplicates
    const exists = [...dayTags.children].some(tag => tag.dataset.value === day);
    if (!exists) {
      const tag = document.createElement('span');
      tag.className = 'skill-tag';
      tag.dataset.value = day;
      tag.textContent = day;

      const remove = document.createElement('span');
      remove.className = 'remove-skill';
      remove.innerHTML = '&times;';
      remove.setAttribute('aria-label', 'Remove day');
      remove.onclick = () => tag.remove();

      tag.appendChild(remove);
      dayTags.appendChild(tag);
    }
    // Reset dropdown
    daySelect.selectedIndex = 0;
  }
});

