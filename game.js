/**
 * IMPOSTER – Holiday Edition
 * Game Logic
 */

// ========================================
// Game State
// ========================================
const GameState = {
  // Settings
  playerCount: 6,
  impostorCount: 1,
  category: 'weihnachten',
  familyFriendly: true,
  reduceMotion: false,
  soundEnabled: true,
  useCustomNames: false,
  playerNames: [], // Custom player names
  
  // Game Data
  secretWord: '',
  impostors: [], // Array of player indices (0-based)
  hints: [], // Array of { player: number, hint: string }
  
  // Current Progress
  currentPhase: 'landing', // landing, setup, reveal, hints, overview, voting, results
  currentPlayer: 0, // 0-based index
  revealStep: 'role', // 'role' or 'word'
  wordHidden: false,
  timerSeconds: 5,
  discussionSeconds: 120,
  discussionRunning: false,
  
  // Reset game data for new round
  resetRound() {
    this.secretWord = '';
    this.impostors = [];
    this.hints = [];
    this.currentPlayer = 0;
    this.revealStep = 'role';
    this.wordHidden = false;
    this.timerSeconds = 5;
  },
  
  // Full reset
  reset() {
    this.resetRound();
    this.currentPhase = 'landing';
  }
};

// ========================================
// DOM Elements
// ========================================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Screens
const screens = {
  landing: $('#screen-landing'),
  setup: $('#screen-setup'),
  pass: $('#screen-pass'),
  reveal: $('#screen-reveal'),
  word: $('#screen-word'),
  discussion: $('#screen-discussion'),
  results: $('#screen-results')
};

// ========================================
// Screen Navigation
// ========================================
function showScreen(screenName) {
  // Hide all screens
  Object.values(screens).forEach(screen => {
    screen.classList.remove('screen--active');
  });
  
  // Show target screen
  if (screens[screenName]) {
    screens[screenName].classList.add('screen--active');
    GameState.currentPhase = screenName;
  }
}

// ========================================
// Snowflakes Animation
// ========================================
function createSnowflakes() {
  const container = $('#snowflakes');
  container.innerHTML = '';
  
  const snowflakeChars = ['❄', '❅', '❆', '✻', '✼'];
  const count = window.innerWidth < 640 ? 15 : 25;
  
  for (let i = 0; i < count; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.fontSize = `${12 + Math.random() * 12}px`;
    snowflake.style.animationDuration = `${8 + Math.random() * 7}s`;
    snowflake.style.animationDelay = `${Math.random() * 10}s`;
    container.appendChild(snowflake);
  }
}

// ========================================
// Confetti Animation
// ========================================
function showConfetti() {
  if (GameState.reduceMotion) return;
  
  const container = $('#confetti');
  container.innerHTML = '';
  
  const particles = ['❄️', '✨', '⭐', '🎄', '🎁'];
  const count = 40;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${-20 - Math.random() * 50}px`;
    particle.style.animationDuration = `${2.5 + Math.random() * 1.5}s`;
    particle.style.animationDelay = `${Math.random() * 0.5}s`;
    container.appendChild(particle);
  }
  
  // Clear after animation
  setTimeout(() => {
    container.innerHTML = '';
  }, 4000);
}

// ========================================
// Setup Screen Logic
// ========================================
function updatePlayerCount(delta) {
  const newCount = GameState.playerCount + delta;
  if (newCount >= 3 && newCount <= 12) {
    GameState.playerCount = newCount;
    $('#players-value').textContent = newCount;
    
    // Update button states
    $('#players-minus').disabled = newCount <= 3;
    $('#players-plus').disabled = newCount >= 12;
    
    // Update impostor recommendation
    updateImpostorRecommendation();
    
    // Update player name inputs if visible
    if (GameState.useCustomNames) {
      updatePlayerNameInputs();
    }
  }
}

function updateImpostorCount(delta) {
  const newCount = GameState.impostorCount + delta;
  const maxImpostors = Math.floor(GameState.playerCount / 3);
  
  if (newCount >= 1 && newCount <= maxImpostors) {
    GameState.impostorCount = newCount;
    $('#impostor-value').textContent = newCount;
    
    // Update button states
    $('#impostor-minus').disabled = newCount <= 1;
    $('#impostor-plus').disabled = newCount >= maxImpostors;
  }
}

function updateImpostorRecommendation() {
  const recommended = GameState.playerCount >= 8 ? 2 : 1;
  const maxImpostors = Math.floor(GameState.playerCount / 3);
  
  $('#impostor-hint').textContent = `Empfohlen: ${recommended}`;
  
  // Adjust impostor count if needed
  if (GameState.impostorCount > maxImpostors) {
    GameState.impostorCount = maxImpostors;
    $('#impostor-value').textContent = maxImpostors;
  }
  
  // Update button states
  $('#impostor-minus').disabled = GameState.impostorCount <= 1;
  $('#impostor-plus').disabled = GameState.impostorCount >= maxImpostors;
}

// ========================================
// Player Names
// ========================================
function togglePlayerNames() {
  const toggle = $('#toggle-names');
  const isPressed = toggle.getAttribute('aria-pressed') === 'true';
  toggle.setAttribute('aria-pressed', !isPressed);
  
  GameState.useCustomNames = !isPressed;
  
  const container = $('#player-names-container');
  container.hidden = isPressed;
  
  if (!isPressed) {
    updatePlayerNameInputs();
  }
}

function updatePlayerNameInputs() {
  const list = $('#player-names-list');
  list.innerHTML = '';
  
  // Initialize playerNames array if needed
  if (GameState.playerNames.length !== GameState.playerCount) {
    GameState.playerNames = Array(GameState.playerCount).fill('').map((_, i) => `Spieler ${i + 1}`);
  }
  
  for (let i = 0; i < GameState.playerCount; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'player-name-input';
    
    const label = document.createElement('span');
    label.className = 'player-name-input__label';
    label.textContent = `${i + 1}.`;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'player-name-input__field';
    input.placeholder = `Spieler ${i + 1}`;
    input.value = GameState.playerNames[i] === `Spieler ${i + 1}` ? '' : GameState.playerNames[i];
    input.maxLength = 20;
    input.dataset.index = i;
    
    input.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index);
      GameState.playerNames[idx] = e.target.value.trim() || `Spieler ${idx + 1}`;
    });
    
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    list.appendChild(wrapper);
  }
}

function getPlayerName(index) {
  if (GameState.useCustomNames && GameState.playerNames[index]) {
    return GameState.playerNames[index];
  }
  return `Spieler ${index + 1}`;
}

function selectCategory(category) {
  GameState.category = category;
  
  // Update UI
  $$('.chip').forEach(chip => {
    chip.classList.toggle('chip--active', chip.dataset.category === category);
  });
}

// ========================================
// Game Start
// ========================================
function startGame() {
  GameState.resetRound();
  
  // Select random word
  GameState.secretWord = getRandomWord(GameState.category);
  
  // Select random impostors
  const playerIndices = Array.from({ length: GameState.playerCount }, (_, i) => i);
  GameState.impostors = [];
  
  for (let i = 0; i < GameState.impostorCount; i++) {
    const randomIndex = Math.floor(Math.random() * playerIndices.length);
    GameState.impostors.push(playerIndices[randomIndex]);
    playerIndices.splice(randomIndex, 1);
  }
  
  // Start reveal phase
  GameState.currentPlayer = 0;
  showPassScreen();
}

// ========================================
// Pass Screen (Handover)
// ========================================
function showPassScreen() {
  const playerName = getPlayerName(GameState.currentPlayer);
  $('#pass-player').textContent = playerName;
  $('#pass-warning').textContent = `Nicht hinschauen, wenn du nicht ${playerName} bist!`;
  $('#pass-progress').textContent = `Spieler ${GameState.currentPlayer + 1}/${GameState.playerCount}`;
  
  showScreen('pass');
}

// ========================================
// Role Reveal
// ========================================
function showRoleReveal() {
  const isImpostor = GameState.impostors.includes(GameState.currentPlayer);
  const revealCard = $('#reveal-card');
  const roleText = $('#reveal-role');
  
  // Reset classes
  revealCard.classList.remove('reveal-card--impostor');
  
  if (isImpostor) {
    revealCard.classList.add('reveal-card--impostor');
    roleText.textContent = 'IMPOSTOR 🎭';
  } else {
    roleText.textContent = 'CREW';
  }
  
  GameState.revealStep = 'role';
  showScreen('reveal');
}

// ========================================
// Word Reveal
// ========================================
function showWordReveal() {
  const playerName = getPlayerName(GameState.currentPlayer);
  const isImpostor = GameState.impostors.includes(GameState.currentPlayer);
  const wordCard = $('#word-card');
  const secretWordEl = $('#secret-word');
  const impostorTip = $('#impostor-tip');
  const timerContainer = $('#timer-container');
  const timerText = $('#timer-text');
  const hideBtn = $('#btn-hide');
  
  // Update header
  $('#word-header').textContent = `${playerName} – ${isImpostor ? 'Impostor 🎭' : 'Crew'}`;
  $('#word-header').style.color = isImpostor ? 'var(--color-candy-500)' : 'var(--color-pine-400)';
  
  // Reset state
  wordCard.classList.remove('word-card--impostor', 'word-card--hidden');
  GameState.wordHidden = false;
  
  if (isImpostor) {
    wordCard.classList.add('word-card--impostor');
    secretWordEl.textContent = '??? 🤫';
    impostorTip.hidden = false;
    timerContainer.hidden = true;
    timerText.hidden = true;
    hideBtn.hidden = true;
    $('#btn-next-player').textContent = 'Verstanden, weitergeben →';
  } else {
    secretWordEl.textContent = GameState.secretWord;
    impostorTip.hidden = true;
    timerContainer.hidden = false;
    timerText.hidden = false;
    hideBtn.hidden = false;
    $('#btn-next-player').textContent = 'Weitergeben →';
    
    // Start timer
    startWordTimer();
  }
  
  showScreen('word');
}

function startWordTimer() {
  GameState.timerSeconds = 5;
  updateTimerDisplay();
  
  const timerFill = $('#timer-fill');
  timerFill.style.transition = 'none';
  timerFill.style.width = '100%';
  
  // Force reflow
  timerFill.offsetHeight;
  
  timerFill.style.transition = 'width 1s linear';
  
  const interval = setInterval(() => {
    GameState.timerSeconds--;
    updateTimerDisplay();
    
    // Update progress bar
    const percent = (GameState.timerSeconds / 5) * 100;
    timerFill.style.width = `${percent}%`;
    
    if (GameState.timerSeconds <= 0) {
      clearInterval(interval);
      hideWord();
    }
  }, 1000);
  
  // Store interval for cleanup
  GameState.timerInterval = interval;
}

function updateTimerDisplay() {
  $('#timer-text').textContent = `Versteckt sich in ${GameState.timerSeconds}...`;
}

function hideWord() {
  if (GameState.wordHidden) return;
  
  GameState.wordHidden = true;
  $('#word-card').classList.add('word-card--hidden');
  $('#secret-word').textContent = '***';
  $('#timer-text').textContent = 'Wort versteckt';
  
  if (GameState.timerInterval) {
    clearInterval(GameState.timerInterval);
  }
}

function nextPlayer() {
  // Clean up timer
  if (GameState.timerInterval) {
    clearInterval(GameState.timerInterval);
  }
  
  GameState.currentPlayer++;
  
  if (GameState.currentPlayer >= GameState.playerCount) {
    // All players have seen their roles, go to discussion
    showDiscussion();
  } else {
    showPassScreen();
  }
}

// ========================================
// Discussion Screen
// ========================================
function showDiscussion() {
  // Reset discussion timer
  GameState.discussionSeconds = 120;
  GameState.discussionRunning = false;
  updateDiscussionTimer();
  $('#btn-start-timer').textContent = 'Timer starten';
  $('#btn-start-timer').disabled = false;
  
  showScreen('discussion');
}

function updateDiscussionTimer() {
  const minutes = Math.floor(GameState.discussionSeconds / 60);
  const seconds = GameState.discussionSeconds % 60;
  const display = $('#discussion-timer');
  display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Add urgent class when low
  display.classList.toggle('timer-display--urgent', GameState.discussionSeconds <= 10 && GameState.discussionRunning);
}

function toggleDiscussionTimer() {
  if (GameState.discussionRunning) {
    // Stop timer
    clearInterval(GameState.discussionTimerInterval);
    GameState.discussionRunning = false;
    $('#btn-start-timer').textContent = 'Timer fortsetzen';
  } else {
    // Start timer
    GameState.discussionRunning = true;
    $('#btn-start-timer').textContent = 'Timer pausieren';
    
    GameState.discussionTimerInterval = setInterval(() => {
      GameState.discussionSeconds--;
      updateDiscussionTimer();
      
      if (GameState.discussionSeconds <= 0) {
        clearInterval(GameState.discussionTimerInterval);
        GameState.discussionRunning = false;
        $('#btn-start-timer').textContent = 'Zeit ist um!';
        $('#btn-start-timer').disabled = true;
      }
    }, 1000);
  }
}

// ========================================
// Reveal Impostor (replaces voting)
// ========================================
function revealImpostor() {
  // Clean up discussion timer
  if (GameState.discussionTimerInterval) {
    clearInterval(GameState.discussionTimerInterval);
  }
  
  showResults();
}

// ========================================
// Results Screen
// ========================================
function showResults() {
  // Update impostor reveal with names
  const impostorNames = GameState.impostors
    .map(i => getPlayerName(i))
    .join(' & ');
  
  $('#result-impostor-player').textContent = `🎭 ${impostorNames} 🎭`;
  
  // Show word
  $('#final-word').textContent = GameState.secretWord;
  
  // Show confetti
  setTimeout(showConfetti, 800);
  
  showScreen('results');
}

// ========================================
// Sound Toggle
// ========================================
function toggleSound() {
  GameState.soundEnabled = !GameState.soundEnabled;
  $('#sound-icon').textContent = GameState.soundEnabled ? '🔊' : '🔇';
}

// ========================================
// Modal
// ========================================
function showRulesModal() {
  $('#modal-rules').hidden = false;
}

function hideRulesModal() {
  $('#modal-rules').hidden = true;
}

// ========================================
// Event Listeners
// ========================================
function initEventListeners() {
  // Landing
  $('#btn-start').addEventListener('click', () => showScreen('setup'));
  $('#btn-rules').addEventListener('click', showRulesModal);
  $('#btn-sound').addEventListener('click', toggleSound);
  
  // Setup
  $('#btn-back-setup').addEventListener('click', () => showScreen('landing'));
  $('#players-minus').addEventListener('click', () => updatePlayerCount(-1));
  $('#players-plus').addEventListener('click', () => updatePlayerCount(1));
  $('#impostor-minus').addEventListener('click', () => updateImpostorCount(-1));
  $('#impostor-plus').addEventListener('click', () => updateImpostorCount(1));
  
  // Category chips
  $$('.chip').forEach(chip => {
    chip.addEventListener('click', () => selectCategory(chip.dataset.category));
  });
  
  // Start game
  $('#btn-play').addEventListener('click', startGame);
  
  // Pass screen
  $('#btn-ready').addEventListener('click', () => {
    showRoleReveal();
  });
  
  // Reveal screen - tap to continue
  $('#screen-reveal').addEventListener('click', (e) => {
    if (e.target.closest('.btn')) return;
    showWordReveal();
  });
  
  // Word screen
  $('#btn-hide').addEventListener('click', hideWord);
  $('#btn-next-player').addEventListener('click', nextPlayer);
  
  // Discussion
  $('#btn-start-timer').addEventListener('click', toggleDiscussionTimer);
  $('#btn-reveal-impostor').addEventListener('click', revealImpostor);
  
  // Player names toggle
  $('#toggle-names').addEventListener('click', togglePlayerNames);
  
  // Results
  $('#btn-play-again').addEventListener('click', () => {
    showScreen('setup');
  });
  
  $('#btn-new-round').addEventListener('click', () => {
    startGame();
  });
  
  $('#btn-home').addEventListener('click', () => {
    GameState.reset();
    showScreen('landing');
  });
  
  // Modal
  $('#btn-close-rules').addEventListener('click', hideRulesModal);
  $('.modal__backdrop').addEventListener('click', hideRulesModal);
  
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    GameState.reduceMotion = true;
    document.body.classList.add('reduce-motion');
  }
}

// ========================================
// Initialize
// ========================================
function init() {
  createSnowflakes();
  initEventListeners();
  
  // Set initial button states
  $('#players-minus').disabled = GameState.playerCount <= 3;
  $('#players-plus').disabled = GameState.playerCount >= 12;
  updateImpostorRecommendation();
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
