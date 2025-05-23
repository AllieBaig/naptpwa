

export function showError(message) {
  let box = document.getElementById('mode-error-box');
  if (!box) {
    box = document.createElement('div');
    box.id = 'mode-error-box';
    box.style = `
      background: #ffe0e0;
      color: #900;
      padding: 1rem;
      margin: 1rem auto;
      text-align: center;
      border: 1px solid #f88;
      border-radius: 0.5rem;
      max-width: 600px;
      font-weight: bold;
    `;
    document.body.insertBefore(box, document.body.firstChild);
  }
  box.textContent = message;
}

