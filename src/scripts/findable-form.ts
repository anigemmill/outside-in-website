/**
 * Findable forms (free check, contact). Netlify Forms, same pattern as
 * ContactForm: validate on submit, clear errors as fields are fixed, POST
 * urlencoded to "/", then swap the form for its [data-f-done] panel.
 * Without JavaScript the form posts normally to its action (a thanks page).
 *
 * Messages come from data-missing / data-invalid on each field.
 */
document.querySelectorAll<HTMLFormElement>('[data-f-form]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const label = form.querySelector<HTMLElement>('[data-submit-label]')!;
  const idle = label.textContent;
  const done = document.getElementById(form.dataset.done!) as HTMLElement | null;
  const fields = [...form.querySelectorAll<HTMLInputElement>('[data-err]')];

  const check = (el: HTMLInputElement) => {
    const err = document.getElementById(el.dataset.err!)!;
    const ok = el.checkValidity();
    el.setAttribute('aria-invalid', String(!ok));
    err.textContent = ok ? '' : (el.validity.valueMissing ? el.dataset.missing : el.dataset.invalid) || 'Please check this field.';
    return ok;
  };

  fields.forEach((el) => {
    const recheck = () => { if (el.getAttribute('aria-invalid') === 'true') check(el); };
    el.addEventListener('input', recheck);
    el.addEventListener('change', recheck);
  });

  const finish = () => { form.hidden = true; if (done) { done.hidden = false; done.focus(); } };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const invalid = fields.filter((el) => !check(el));
    if (invalid.length) {
      status.textContent = `Please fix ${invalid.length} field${invalid.length > 1 ? 's' : ''} above.`;
      invalid[0].focus();
      return;
    }
    submit.disabled = true;
    label.textContent = 'Sending…';
    status.textContent = '';
    try {
      const data = new FormData(form);
      if (data.get('company_website')) return finish(); // bot trap
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      finish();
    } catch {
      const email = form.dataset.email;
      status.innerHTML = '';
      const msg = document.createElement('span');
      msg.className = 'f-err';
      msg.append('Sorry, that didn’t send. Please try again, or email ');
      const a = document.createElement('a');
      a.href = `mailto:${email}`;
      a.textContent = email ?? '';
      msg.append(a, '.');
      status.appendChild(msg);
    } finally {
      submit.disabled = false;
      label.textContent = idle;
    }
  });
});
