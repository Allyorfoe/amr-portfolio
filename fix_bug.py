import re

css_path = 'styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Replace any occurrence of #fff, #FFF, #000, #000000, rgba(255,255,255, and rgba(0,0,0,
css = re.sub(r'#fff\b|#FFF\b', 'var(--bg)', css)
css = re.sub(r'#ffffff\b|#FFFFFF\b', 'var(--bg)', css)
css = re.sub(r'#000\b|#000000\b', 'var(--navy)', css)
css = re.sub(r'rgba\(255,255,255,', r'rgba(245,240,232,', css)
css = re.sub(r'rgba\(0,0,0,', r'rgba(43,31,24,', css)

# Error validation CSS to append
error_css = """
/* Error Validation UI */
.error-msg {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--teal); /* Maps to Caramel #8C5A3C */
  margin-top: 0.35rem;
  animation: revealUpFast 0.2s ease forwards;
}

.error-input {
  border-color: var(--teal) !important;
  background: rgba(140,90,60,0.03) !important;
  box-shadow: 0 0 0 2px rgba(140,90,60,0.1) !important;
}

@keyframes revealUpFast {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
"""

if "/* Error Validation UI */" not in css:
    css += error_css

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

# Update main.js
js_path = 'main.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

new_js_logic = """// ============================================
// CONTACT FORM
// ============================================
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

function validateEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

function clearErrors() {
  document.querySelectorAll('.error-msg').forEach(el => el.remove());
  document.querySelectorAll('.error-input').forEach(el => el.classList.remove('error-input'));
}

function showError(inputEl, message) {
  inputEl.classList.add('error-input');
  const errorEl = document.createElement('div');
  errorEl.className = 'error-msg';
  errorEl.textContent = message;
  inputEl.parentElement.appendChild(errorEl);
}

if (form) {
  form.addEventListener('input', () => {
    formSuccess.classList.remove('show');
    clearErrors();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    formSuccess.classList.remove('show');

    const fname = document.getElementById('fname');
    const lname = document.getElementById('lname');
    const emailField = document.getElementById('emailField');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    let isValid = true;

    if (!fname.value.trim()) { showError(fname, "First name is required"); isValid = false; }
    if (!lname.value.trim()) { showError(lname, "Last name is required"); isValid = false; }
    
    const emailVal = emailField.value.trim();
    if (!emailVal) { 
      showError(emailField, "Email address is required"); isValid = false; 
    } else if (!validateEmail(emailVal)) {
      showError(emailField, "Please enter a valid format"); isValid = false; 
    }
    
    if (!subject.value.trim()) { showError(subject, "Subject is required"); isValid = false; }
    if (!message.value.trim()) { showError(message, "Message is required"); isValid = false; }

    if (!isValid) return;

    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    setTimeout(() => {
      form.reset();
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1500);
  });
}"""

# Using simple split to avoid regex backslash interpolation issues
js = js.split('// ============================================\n// CONTACT FORM')[0] + new_js_logic

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js)
print("Fixes applied.")
