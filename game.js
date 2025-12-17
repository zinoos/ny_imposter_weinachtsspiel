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
  
  // Game Data
  secretWord: '',
  impostors: [], // Array of player indices (0-based)
  hints: [], // Array of { player: number, hint: string }
  votes: [], // Array of { voter: number, target: number }
  
  // Current Progress
  currentPhase: 'landing', // landing, setup, reveal, hints, overview, voting, results
  currentPlayer: 0, // 0-based index
  revealStep: 'role', // 'role' or 'word'
  wordHidden: false,
  timerSeconds: 5,
  discussionSeconds: 120,
  discussionRunning: false,
  selectedVote: null,
  
  // Reset game data for new round
  resetRound() {
    this.secretWord = '';
    this.impostors = [];
    this.hints = [];
    this.votes = [];
    this.currentPlayer = 0;
    this.revealStep = 'role';
    this.wordHidden = false;
    this.timerSeconds = 5;
    this.selectedVote = null;
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
  votePass: $('#screen-vote-pass'),
  vote: $('#screen-vote'),
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

function selectCategory(category) {
  GameState.category = category;
  
  // Update UI
  $$('.chip').forEach(chip => {
    chip.classList.toggle('chip--active', chip.dataset.category === category);
  });
}

function toggleOption(toggleId) {
  const toggle = $(`#${toggleId}`);
  const isPressed = toggle.getAttribute('aria-pressed') === 'true';
  toggle.setAttribute('aria-pressed', !isPressed);
  
  // Update state
  if (toggleId === 'toggle-family') {
    GameState.familyFriendly = !isPressed;
  } else if (toggleId === 'toggle-motion') {
    GameState.reduceMotion = !isPressed;
    document.body.classList.toggle('reduce-motion', !isPressed);
  }
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
  const playerNum = GameState.currentPlayer + 1;
  $('#pass-player').textContent = `Spieler ${playerNum}`;
  $('#pass-warning').textContent = `Nicht hinschauen, wenn du nicht Spieler ${playerNum} bist!`;
  $('#pass-progress').textContent = `Spieler ${playerNum}/${GameState.playerCount}`;
  
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
  const playerNum = GameState.currentPlayer + 1;
  const isImpostor = GameState.impostors.includes(GameState.currentPlayer);
  const wordCard = $('#word-card');
  const secretWordEl = $('#secret-word');
  const impostorTip = $('#impostor-tip');
  const timerContainer = $('#timer-container');
  const timerText = $('#timer-text');
  const hideBtn = $('#btn-hide');
  
  // Update header
  $('#word-header').textContent = `Spieler ${playerNum} – ${isImpostor ? 'Impostor 🎭' : 'Crew'}`;
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
// Voting Phase
// ========================================
function startVoting() {
  // Clean up discussion timer
  if (GameState.discussionTimerInterval) {
    clearInterval(GameState.discussionTimerInterval);
  }
  
  GameState.currentPlayer = 0;
  GameState.votes = [];
  showVotePassScreen();
}

function showVotePassScreen() {
  const playerNum = GameState.currentPlayer + 1;
  $('#vote-pass-player').textContent = `Spieler ${playerNum}`;
  $('#vote-progress').textContent = `Abgestimmt: ${GameState.votes.length}/${GameState.playerCount}`;
  
  showScreen('votePass');
}

function showVoteScreen() {
  const voterNum = GameState.currentPlayer + 1;
  $('#vote-current-player').textContent = `Spieler ${voterNum} stimmt ab:`;
  
  // Create player grid
  const grid = $('#player-grid');
  grid.innerHTML = '';
  
  for (let i = 0; i < GameState.playerCount; i++) {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.dataset.player = i;
    
    // Can't vote for yourself
    if (i === GameState.currentPlayer) {
      card.classList.add('player-card--disabled');
    }
    
    card.innerHTML = `
      <span class="player-card__icon">👤</span>
      <span class="player-card__name">Spieler ${i + 1}</span>
      <span class="player-card__check">✓</span>
    `;
    
    if (i !== GameState.currentPlayer) {
      card.addEventListener('click', () => selectVote(i));
    }
    
    grid.appendChild(card);
  }
  
  GameState.selectedVote = null;
  $('#btn-submit-vote').disabled = true;
  
  showScreen('vote');
}

function selectVote(playerIndex) {
  GameState.selectedVote = playerIndex;
  
  // Update UI
  $$('.player-card').forEach((card, i) => {
    card.classList.toggle('player-card--selected', i === playerIndex);
  });
  
  $('#btn-submit-vote').disabled = false;
}

function submitVote() {
  if (GameState.selectedVote === null) return;
  
  GameState.votes.push({
    voter: GameState.currentPlayer,
    target: GameState.selectedVote
  });
  
  GameState.currentPlayer++;
  
  if (GameState.currentPlayer >= GameState.playerCount) {
    // All votes collected, show results
    showResults();
  } else {
    showVotePassScreen();
  }
}

// ========================================
// Results Screen
// ========================================
function showResults() {
  // Count votes
  const voteCounts = {};
  GameState.votes.forEach(v => {
    voteCounts[v.target] = (voteCounts[v.target] || 0) + 1;
  });
  
  // Find player with most votes
  let maxVotes = 0;
  let votedPlayer = -1;
  
  Object.entries(voteCounts).forEach(([player, count]) => {
    if (count > maxVotes) {
      maxVotes = count;
      votedPlayer = parseInt(player);
    }
  });
  
  // Check for tie
  const playersWithMaxVotes = Object.entries(voteCounts)
    .filter(([_, count]) => count === maxVotes)
    .map(([player, _]) => parseInt(player));
  
  const isTie = playersWithMaxVotes.length > 1;
  
  // Update results UI
  if (isTie) {
    $('#result-voted-player').textContent = 'Gleichstand!';
    $('#result-vote-count').textContent = 'Niemand fliegt raus';
  } else {
    $('#result-voted-player').textContent = `Spieler ${votedPlayer + 1}`;
    $('#result-vote-count').textContent = `(${maxVotes} Stimmen)`;
  }
  
  // Determine winner
  const impostorCaught = !isTie && GameState.impostors.includes(votedPlayer);
  
  // Update impostor reveal
  const impostorNames = GameState.impostors
    .map(i => `Spieler ${i + 1}`)
    .join(' & ');
  
  $('#result-impostor-player').textContent = `🎭 ${impostorNames} 🎭`;
  
  // Update verdict
  const verdict = $('#result-verdict');
  if (isTie) {
    verdict.textContent = '❌ Keiner entlarvt!';
    verdict.className = 'result-card__verdict result-card__verdict--wrong';
  } else if (impostorCaught) {
    verdict.textContent = '✅ Richtig erkannt!';
    verdict.className = 'result-card__verdict result-card__verdict--correct';
  } else {
    verdict.textContent = '❌ Falsch getippt!';
    verdict.className = 'result-card__verdict result-card__verdict--wrong';
  }
  
  // Update winner banner
  const winnerBanner = $('#winner-banner');
  const winnerText = $('#winner-text');
  
  winnerBanner.classList.remove('winner-banner--crew', 'winner-banner--impostor');
  
  if (impostorCaught) {
    winnerBanner.classList.add('winner-banner--crew');
    winnerText.textContent = '🎄 CREW GEWINNT! 🎄';
    // Show confetti for crew win
    setTimeout(showConfetti, 1200);
  } else {
    winnerBanner.classList.add('winner-banner--impostor');
    winnerText.textContent = '🎭 IMPOSTOR ENTKOMMT! 🎭';
  }
  
  // Show word
  $('#final-word').textContent = GameState.secretWord;
  
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
  
  // Toggles
  $('#toggle-family').addEventListener('click', () => toggleOption('toggle-family'));
  $('#toggle-motion').addEventListener('click', () => toggleOption('toggle-motion'));
  
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
  $('#btn-to-vote').addEventListener('click', startVoting);
  
  // Vote pass
  $('#btn-vote-ready').addEventListener('click', showVoteScreen);
  
  // Vote
  $('#btn-submit-vote').addEventListener('click', submitVote);
  
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
    $('#toggle-motion').setAttribute('aria-pressed', 'true');
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
