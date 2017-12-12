const API_URL = 'http://localhost:3000'
module.exports = {
  ENV: '"development"',
  NODE_ENV: '"development"',
  DEBUG_MODE: true,
  USER_SERVICE: `"${API_URL}/users"`,
  NOTE_SERVICE: `"${API_URL}/notes"`,
}
