// Grab & Log — Landing Page Scripts

const CONVERTKIT_API_KEY = '-eImnznUphk-kI1HzCVq7g'
const CONVERTKIT_FORM_ID = '9259470'

const input = document.getElementById('email-input')
const btn   = document.getElementById('waitlist-btn')
const error = document.getElementById('email-error')

btn.addEventListener('click', async () => {
  const email = input.value.trim()

  // Clear previous error
  error.textContent = ''
  error.classList.add('hidden')

  // Basic email validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.textContent = 'Please enter a valid email address.'
    error.classList.remove('hidden')
    return
  }

  // Loading state
  btn.textContent = 'Joining...'
  btn.disabled = true
  input.disabled = true

  try {
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: CONVERTKIT_API_KEY, email }),
      }
    )

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(`${res.status} — ${JSON.stringify(body)}`)
    }

    // Success state
    btn.textContent = "You're on the list!"
    btn.style.background = '#4e6300'
    btn.style.color = '#cafd00'

  } catch (err) {
    console.error('Waitlist error:', err)
    // Error state — re-enable so user can retry
    btn.textContent = 'Join the exclusive early-access waitlist'
    btn.disabled = false
    input.disabled = false
    error.textContent = `Error: ${err.message}`
    error.classList.remove('hidden')
  }
})
