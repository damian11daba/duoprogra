'use strict';

/**
 * ============================================================================
 * DuoProgra - Motor Principal de la Aplicación
 * Un SPA estilo Duolingo para aprender programación en Python.
 * ============================================================================
 *
 * Estructura del archivo:
 *   1.  Datos & Constantes
 *   2.  Estado (State Management)
 *   3.  Router SPA (hash-based)
 *   4.  Utilidades
 *   5.  Lógica de Racha (Streak)
 *   6.  Gamificación & Logros
 *   7.  Popup XP & Modales
 *   8.  Resaltado de Sintaxis
 *   9.  Actualización de Navegación
 *  10.  Renderizado: Home
 *  11.  Renderizado: Módulo
 *  12.  Renderizado: Lección (Quiz Engine)
 *  13.  Renderizado: Simulacro
 *  14.  Renderizado: Práctica
 *  15.  Renderizado: Resultados
 *  16.  Renderizado: Perfil
 *  17.  Listeners de Eventos
 *  18.  Inicialización
 */

(function () {

  // ==========================================================================
  // 1. DATOS & CONSTANTES
  // ==========================================================================

  /** Merge the two data source globals into unified arrays */
  const MODULES = [
    ...(window.DUOPROGRA_PARTE1 || []),
    ...(window.DUOPROGRA_PARTE2 || [])
  ];

  const SIMULACROS = (window.DUOPROGRA_PARTE2 && window.DUOPROGRA_PARTE2.simulacros) || [];

  /** Achievement definitions */
  const ACHIEVEMENTS = [
    { id: 'first-lesson', name: 'Primera Lección', icon: '🎓', description: 'Completa tu primera lección' },
    { id: 'perfect', name: 'Perfección', icon: '💯', description: 'Obtén 100% en una lección' },
    { id: 'streak-3', name: 'Racha de 3', icon: '🔥', description: 'Mantén una racha de 3 días' },
    { id: 'streak-7', name: 'Semana Completa', icon: '📅', description: 'Mantén una racha de 7 días' },
    { id: 'streak-30', name: 'Mes Dedicado', icon: '🏅', description: 'Mantén una racha de 30 días' },
    { id: 'xp-100', name: 'Centenario', icon: '⭐', description: 'Acumula 100 XP' },
    { id: 'xp-500', name: 'Estrella', icon: '🌟', description: 'Acumula 500 XP' },
    { id: 'xp-1000', name: 'Superestrella', icon: '💫', description: 'Acumula 1000 XP' },
    { id: 'module-complete', name: 'Módulo Completo', icon: '✅', description: 'Completa todos los ejercicios de un módulo' },
    { id: 'all-modules', name: 'Maestro Total', icon: '👑', description: 'Completa todos los módulos' },
    { id: 'simulacro-pass', name: 'Aprobado', icon: '📝', description: 'Aprueba un simulacro' },
    { id: 'simulacro-perfect', name: 'Simulacro Perfecto', icon: '🏆', description: 'Obtén 100% en un simulacro' },
    { id: 'speed-demon', name: 'Velocista', icon: '⚡', description: 'Completa una lección en menos de 2 minutos' },
    { id: 'no-mistakes', name: 'Sin Errores', icon: '🛡️', description: 'Completa 3 lecciones seguidas sin perder vidas' }
  ];

  /** XP per difficulty level */
  const XP_PER_DIFFICULTY = { 1: 10, 2: 20, 3: 30 };

  /** Perfect lesson bonus */
  const PERFECT_BONUS = 50;

  /** Simulacro pass bonus */
  const SIMULACRO_PASS_BONUS = 100;

  /** Streak milestones that trigger a modal */
  const STREAK_MILESTONES = [5, 10, 25, 50, 100];

  /** Module level thresholds */
  const MODULE_LEVELS = [
    { min: 0, max: 24, name: 'Bronce', badge: '🥉' },
    { min: 25, max: 49, name: 'Plata', badge: '🥈' },
    { min: 50, max: 74, name: 'Oro', badge: '🥇' },
    { min: 75, max: 100, name: 'Diamante', badge: '💎' }
  ];

  /** All view section IDs */
  const VIEW_IDS = [
    'view-home',
    'view-module',
    'view-lesson',
    'view-practice',
    'view-simulacro-select',
    'view-simulacro',
    'view-results',
    'view-profile'
  ];

  /** Storage key */
  const STORAGE_KEY = 'duoprogra-state';

  /** Timer reference for simulacro */
  let simulacroTimerInterval = null;

  /** Track consecutive perfect lessons (no lives lost) for achievement */
  let consecutivePerfectLessons = 0;

  /** Secret infinite lives cheat mode */
  let infiniteLivesSecret = false;
  try {
    infiniteLivesSecret = localStorage.getItem('duoprogra_secret_godmode') === 'true';
  } catch (e) {}

  /** Last results data for the results view */
  let lastResultsData = null;

  // ==========================================================================
  // 2. ESTADO (State Management)
  // ==========================================================================

  /** Default state shape */
  const DEFAULT_STATE = {
    xp: 0,
    streak: 0,
    lives: 5,
    maxLives: 5,
    lastPlayDate: null,
    completedLessons: {},
    moduleProgress: {},
    achievements: [],
    totalCorrect: 0,
    totalAnswered: 0,
    simulacroResults: {}
  };

  /** The live application state */
  let state = Object.assign({}, DEFAULT_STATE);

  /** Current session (not persisted) */
  let currentSession = null;

  /**
   * Save persistent state to localStorage.
   */
  function saveState() {
    try {
      const toSave = {
        xp: state.xp,
        streak: state.streak,
        lives: state.lives,
        maxLives: state.maxLives,
        lastPlayDate: state.lastPlayDate,
        completedLessons: state.completedLessons,
        moduleProgress: state.moduleProgress,
        achievements: state.achievements,
        totalCorrect: state.totalCorrect,
        totalAnswered: state.totalAnswered,
        simulacroResults: state.simulacroResults
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.warn('DuoProgra: No se pudo guardar el estado.', e);
    }
  }

  /**
   * Load persistent state from localStorage, merging with defaults.
   */
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        state = Object.assign({}, DEFAULT_STATE, parsed);
        // Ensure nested objects exist
        if (!state.completedLessons || typeof state.completedLessons !== 'object') {
          state.completedLessons = {};
        }
        if (!state.moduleProgress || typeof state.moduleProgress !== 'object') {
          state.moduleProgress = {};
        }
        if (!Array.isArray(state.achievements)) {
          state.achievements = [];
        }
        if (!state.simulacroResults || typeof state.simulacroResults !== 'object') {
          state.simulacroResults = {};
        }
      }
    } catch (e) {
      console.warn('DuoProgra: Estado corrupto, reiniciando.', e);
      state = Object.assign({}, DEFAULT_STATE);
      saveState();
    }
  }

  // ==========================================================================
  // 3. ROUTER SPA
  // ==========================================================================

  /**
   * Hide all views, then show the target view and call its renderer.
   * @param {string} hash - e.g. '#home', '#module/oop-basico'
   */
  function navigate(hash) {
    if (!hash || hash === '#' || hash === '#/') {
      hash = '#home';
    }

    // Hide all views
    VIEW_IDS.forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });

    // Parse the hash
    const parts = hash.replace(/^#\/?/, '').split('/');
    const route = parts[0] || 'home';

    // Show navbar for all views except lesson and simulacro (we still show it but adapt)
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.classList.remove('hidden');
    }

    switch (route) {
      case 'home':
        showView('view-home');
        renderHome();
        break;

      case 'module':
        if (parts[1]) {
          showView('view-module');
          renderModule(parts[1]);
        } else {
          navigate('#home');
        }
        break;

      case 'infinite':
        if (parts[1]) {
          showView('view-lesson');
          startInfinitePractice(parts[1]);
        } else {
          navigate('#home');
        }
        break;

      case 'lesson':
        if (parts[1] && parts[2]) {
          showView('view-lesson');
          startLesson(parts[1], parts[2]);
        } else {
          navigate('#home');
        }
        break;

      case 'practice':
        showView('view-practice');
        setupPractice();
        break;

      case 'simulacros':
        showView('view-simulacro-select');
        renderSimulacroSelect();
        break;

      case 'simulacro':
        if (parts[1]) {
          showView('view-simulacro');
          startSimulacro(parts[1]);
        } else {
          navigate('#simulacros');
        }
        break;

      case 'results':
        showView('view-results');
        renderResults();
        break;

      case 'profile':
        showView('view-profile');
        renderProfile();
        break;

      default:
        navigate('#home');
        break;
    }

    // Update location hash without triggering extra hashchange
    if (window.location.hash !== hash) {
      history.replaceState(null, '', hash);
    }

    updateNav();
  }

  /**
   * Show a specific view by removing .hidden.
   */
  function showView(viewId) {
    const el = document.getElementById(viewId);
    if (el) {
      el.classList.remove('hidden');
      el.classList.add('fade-in');
      // Remove animation class after it plays
      setTimeout(function () {
        el.classList.remove('fade-in');
      }, 500);
    }
  }

  /**
   * Set up hash-based routing.
   */
  function setupRouter() {
    window.addEventListener('hashchange', function () {
      navigate(window.location.hash);
    });
  }

  // ==========================================================================
  // 4. UTILIDADES
  // ==========================================================================

  /**
   * Get today's date as ISO string (YYYY-MM-DD).
   */
  function todayISO() {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Get yesterday's date as ISO string.
   */
  function yesterdayISO() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  }

  /**
   * Shuffle an array in-place (Fisher-Yates).
   */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  /**
   * Find a module by ID.
   */
  function findModule(moduleId) {
    return MODULES.find(function (m) { return m.id === moduleId; }) || null;
  }

  /**
   * Find a lesson inside a module.
   */
  function findLesson(moduleId, lessonId) {
    const mod = findModule(moduleId);
    if (!mod || !mod.lessons) return null;
    return mod.lessons.find(function (l) { return l.id === lessonId; }) || null;
  }

  /**
   * Find a simulacro by ID.
   */
  function findSimulacro(simId) {
    return SIMULACROS.find(function (s) { return s.id === simId; }) || null;
  }

  /**
   * Calculate the progress percentage for a module.
   * Returns 0-100.
   */
  function getModuleProgress(moduleId) {
    const mod = findModule(moduleId);
    if (!mod || !mod.lessons || mod.lessons.length === 0) return 0;
    let completed = 0;
    mod.lessons.forEach(function (lesson) {
      if (state.completedLessons[lesson.id]) {
        completed++;
      }
    });
    return Math.round((completed / mod.lessons.length) * 100);
  }

  /**
   * Get module level info based on progress percentage.
   */
  function getModuleLevel(progressPercent) {
    for (let i = MODULE_LEVELS.length - 1; i >= 0; i--) {
      if (progressPercent >= MODULE_LEVELS[i].min) {
        return MODULE_LEVELS[i];
      }
    }
    return MODULE_LEVELS[0];
  }

  /**
   * Check if a module is locked (requires previous module to have at least 1 completed lesson).
   * The first module is always unlocked. If infiniteLivesSecret (Modo Dios) is active, all modules are unlocked!
   */
  function isModuleLocked(moduleIndex) {
    if (infiniteLivesSecret) return false;
    if (moduleIndex === 0) return false;
    const prevModule = MODULES[moduleIndex - 1];
    if (!prevModule || !prevModule.lessons) return false;
    // Require at least one lesson completed in the previous module
    return !prevModule.lessons.some(function (l) {
      return !!state.completedLessons[l.id];
    });
  }

  /**
   * Check if a lesson is locked (requires previous lesson in the same module to be completed).
   * The first lesson is unlocked if the module is unlocked. If Modo Dios is active, all lessons are unlocked!
   */
  function isLessonLocked(moduleId, lessonIndex) {
    if (infiniteLivesSecret) return false;
    const mod = findModule(moduleId);
    if (!mod || !mod.lessons) return true;
    if (lessonIndex === 0) return false;
    const prevLesson = mod.lessons[lessonIndex - 1];
    return !state.completedLessons[prevLesson.id];
  }

  /**
   * Format seconds as MM:SS.
   */
  function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
  }

  /**
   * Safe getElementById with null check.
   */
  function el(id) {
    return document.getElementById(id);
  }

  /**
   * Escape HTML entities.
   */
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================================================
  // 5. LÓGICA DE RACHA (Streak)
  // ==========================================================================

  /**
   * Check streak on app init.
   */
  function checkStreak() {
    const today = todayISO();
    const yesterday = yesterdayISO();

    if (!state.lastPlayDate) {
      // Never played before
      state.streak = 0;
    } else if (state.lastPlayDate === today) {
      // Already played today — streak stays
    } else if (state.lastPlayDate === yesterday) {
      // Played yesterday — streak continues (will be incremented on first action today)
    } else {
      // More than 1 day gap — streak resets
      state.streak = 0;
    }
    saveState();
  }

  /**
   * Record activity for today. Increments streak if first action of the day.
   */
  function recordActivity() {
    const today = todayISO();
    if (state.lastPlayDate !== today) {
      // First action of the day
      if (state.lastPlayDate === yesterdayISO()) {
        state.streak++;
      } else {
        state.streak = 1;
      }
      state.lastPlayDate = today;
      saveState();

      // Check streak milestones
      if (STREAK_MILESTONES.indexOf(state.streak) !== -1) {
        showModal(
          '🔥 ¡Racha de ' + state.streak + ' días!',
          '¡Increíble! Has mantenido una racha de ' + state.streak + ' días consecutivos. ¡Sigue así!'
        );
      }
    }
  }

  // ==========================================================================
  // 6. GAMIFICACIÓN & LOGROS
  // ==========================================================================

  /**
   * Award an achievement if not already earned.
   * @returns {boolean} True if newly awarded.
   */
  function awardAchievement(achievementId) {
    if (state.achievements.indexOf(achievementId) !== -1) return false;
    state.achievements.push(achievementId);
    saveState();

    const ach = ACHIEVEMENTS.find(function (a) { return a.id === achievementId; });
    if (ach) {
      showModal(
        '🏆 ¡Logro Desbloqueado!',
        '<div style="text-align:center;font-size:3rem;margin-bottom:0.5rem;">' + ach.icon + '</div>' +
        '<h3 style="margin:0 0 0.5rem;">' + escapeHtml(ach.name) + '</h3>' +
        '<p>' + escapeHtml(ach.description) + '</p>'
      );
    }
    return true;
  }

  /**
   * Check all achievement conditions and award any newly earned ones.
   */
  function checkAchievements() {
    const completedCount = Object.keys(state.completedLessons).length;

    // First lesson
    if (completedCount >= 1) {
      awardAchievement('first-lesson');
    }

    // Perfect lesson (checked individually after each lesson in endLesson)

    // Streak achievements
    if (state.streak >= 3) awardAchievement('streak-3');
    if (state.streak >= 7) awardAchievement('streak-7');
    if (state.streak >= 30) awardAchievement('streak-30');

    // XP achievements
    if (state.xp >= 100) awardAchievement('xp-100');
    if (state.xp >= 500) awardAchievement('xp-500');
    if (state.xp >= 1000) awardAchievement('xp-1000');

    // Module complete
    MODULES.forEach(function (mod) {
      if (!mod.lessons || mod.lessons.length === 0) return;
      const allDone = mod.lessons.every(function (l) {
        return !!state.completedLessons[l.id];
      });
      if (allDone) {
        awardAchievement('module-complete');
      }
    });

    // All modules complete
    if (MODULES.length > 0) {
      const allModulesDone = MODULES.every(function (mod) {
        if (!mod.lessons || mod.lessons.length === 0) return true;
        return mod.lessons.every(function (l) {
          return !!state.completedLessons[l.id];
        });
      });
      if (allModulesDone) {
        awardAchievement('all-modules');
      }
    }

    // Simulacro achievements
    Object.keys(state.simulacroResults).forEach(function (simId) {
      const res = state.simulacroResults[simId];
      if (res.passed) awardAchievement('simulacro-pass');
      if (res.score === 100) awardAchievement('simulacro-perfect');
    });

    // No mistakes (3 consecutive) — tracked via consecutivePerfectLessons
    if (consecutivePerfectLessons >= 3) {
      awardAchievement('no-mistakes');
    }
  }

  // ==========================================================================
  // 7. POPUP XP & MODALES
  // ==========================================================================

  /**
   * Show a floating "+N XP" popup animation.
   */
  function showXpPopup(amount) {
    const popup = el('xp-popup');
    if (!popup) return;
    popup.textContent = '+' + amount + ' XP';
    popup.classList.remove('hidden');
    popup.style.animation = 'none';
    popup.offsetHeight; // trigger reflow
    popup.style.animation = 'xpFloat 1.5s ease forwards';
    setTimeout(function () {
      popup.classList.add('hidden');
    }, 1500);
  }

  /**
   * Show a custom modal dialog.
   * @param {string} title - HTML title
   * @param {string} bodyHtml - HTML body content
   * @param {Function} [onConfirm] - If provided, shows Confirmar/Cancelar buttons
   * @param {Function} [onCancel] - Cancel callback
   */
  function showModal(title, bodyHtml, onConfirm, onCancel) {
    const overlay = el('modal-overlay');
    const content = el('modal-content');
    if (!overlay || !content) return;

    let html = '<h2 style="margin-top:0;">' + title + '</h2>';
    html += '<div>' + bodyHtml + '</div>';
    html += '<div style="margin-top:1.5rem;display:flex;gap:0.75rem;justify-content:center;">';

    if (onConfirm) {
      html += '<button id="modal-confirm-btn" class="option-btn" style="background:#58CC02;color:#fff;padding:0.75rem 2rem;border:none;border-radius:12px;font-weight:700;cursor:pointer;">Confirmar</button>';
      html += '<button id="modal-cancel-btn" class="option-btn" style="background:#E5E5E5;color:#333;padding:0.75rem 2rem;border:none;border-radius:12px;font-weight:700;cursor:pointer;">Cancelar</button>';
    } else {
      html += '<button id="modal-close-btn" class="option-btn" style="background:#58CC02;color:#fff;padding:0.75rem 2rem;border:none;border-radius:12px;font-weight:700;cursor:pointer;">¡Genial!</button>';
    }

    html += '</div>';
    content.innerHTML = html;
    overlay.classList.remove('hidden');

    // Bind buttons
    const closeBtn = document.getElementById('modal-close-btn');
    const confirmBtn = document.getElementById('modal-confirm-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        overlay.classList.add('hidden');
      });
    }
    if (confirmBtn && onConfirm) {
      confirmBtn.addEventListener('click', function () {
        overlay.classList.add('hidden');
        onConfirm();
      });
    }
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function () {
        overlay.classList.add('hidden');
        if (onCancel) onCancel();
      });
    }
  }

  /**
   * Hide the modal overlay.
   */
  function hideModal() {
    const overlay = el('modal-overlay');
    if (overlay) overlay.classList.add('hidden');
  }

  // ==========================================================================
  // 8. RESALTADO DE SINTAXIS
  // ==========================================================================

  /**
   * Simple regex-based Python syntax highlighting.
   * Returns HTML string with <span> elements for tokens.
   */
  function highlightCode(code) {
    if (!code) return '';
    // First escape HTML
    let result = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Comments (must come first to avoid inner replacements)
    result = result.replace(/(#.*)/gm, '<span class="token-comment">$1</span>');

    // Multi-line strings and single-line strings
    result = result.replace(
      /"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g,
      '<span class="token-string">$&</span>'
    );

    // Keywords (only replace outside already generated HTML tags)
    result = result.replace(
      /(<[^>]*>)|(\b(def|class|if|elif|else|for|while|return|import|from|try|except|finally|raise|with|as|yield|lambda|pass|break|continue|and|or|not|in|is|True|False|None|self|super|print)\b)/g,
      function (match, tag, keyword) {
        if (tag) return tag;
        return '<span class="token-keyword">' + keyword + '</span>';
      }
    );

    // Numbers
    result = result.replace(
      /(<[^>]*>)|(\b\d+\.?\d*\b)/g,
      function (match, tag, number) {
        if (tag) return tag;
        return '<span class="token-number">' + number + '</span>';
      }
    );

    // Decorators
    result = result.replace(
      /(<[^>]*>)|(@\w+)/g,
      function (match, tag, decorator) {
        if (tag) return tag;
        return '<span class="token-decorator">' + decorator + '</span>';
      }
    );

    // Class names (capitalized words)
    result = result.replace(
      /(<[^>]*>)|(\b[A-Z]\w+\b)/g,
      function (match, tag, cls) {
        if (tag) return tag;
        return '<span class="token-class">' + cls + '</span>';
      }
    );

    // Function calls
    result = result.replace(
      /(<[^>]*>)|(\b\w+(?=\())/g,
      function (match, tag, fn) {
        if (tag) return tag;
        return '<span class="token-function">' + fn + '</span>';
      }
    );

    return result;
  }

  // ==========================================================================
  // 9. ACTUALIZACIÓN DE NAVEGACIÓN
  // ==========================================================================

  /**
   * Update the top navbar stats display.
   */
  function updateNav() {
    const navXp = el('nav-xp');
    const navStreak = el('nav-streak');
    const navLives = el('nav-lives');

    if (navXp) navXp.textContent = '⭐ ' + state.xp + ' XP';
    if (navStreak) navStreak.textContent = '🔥 ' + state.streak;

    if (navLives) {
      if (infiniteLivesSecret) {
        navLives.innerHTML = '❤️ ♾️';
        navLives.title = 'Modo Secreto Activado';
      } else if (currentSession && currentSession.type === 'lesson') {
        const hearts = '❤️'.repeat(Math.max(0, currentSession.lives));
        const empties = '🖤'.repeat(Math.max(0, state.maxLives - currentSession.lives));
        navLives.textContent = hearts + empties;
      } else if (currentSession && currentSession.type === 'practice') {
        navLives.textContent = '♾️';
      } else {
        navLives.textContent = '❤️'.repeat(state.maxLives);
      }
    }
  }

  // ==========================================================================
  // 10. RENDERIZADO: HOME
  // ==========================================================================

  /**
   * Render the home view with module cards and action buttons.
   */
  function renderHome() {
    const grid = el('module-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (MODULES.length === 0) {
      grid.innerHTML = '<div style="text-align:center;padding:3rem;"><p style="font-size:1.2rem;color:#888;">Cargando contenido...</p><p style="color:#aaa;">No se encontraron módulos. Asegúrate de que los archivos de datos estén cargados.</p></div>';
      return;
    }

    MODULES.forEach(function (mod, index) {
      const progress = getModuleProgress(mod.id);
      const level = getModuleLevel(progress);
      const locked = isModuleLocked(index);

      const card = document.createElement('div');
      card.className = 'module-card' + (locked ? ' module-card--locked' : '') + (progress === 100 ? ' module-card--completed' : '');
      card.style.borderLeftColor = mod.color || '#58CC02';

      card.innerHTML =
        '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.75rem;">' +
          '<span style="font-size:2.5rem;">' + (mod.icon || '📚') + '</span>' +
          '<div style="flex:1;">' +
            '<h3 style="margin:0;font-size:1.1rem;">' + escapeHtml(mod.name) + '</h3>' +
            '<p style="margin:0.25rem 0 0;font-size:0.85rem;color:#777;">' + escapeHtml(mod.description || '') + '</p>' +
          '</div>' +
          (locked ? '<span style="font-size:1.5rem;">🔒</span>' : '') +
        '</div>' +
        '<div class="progress-bar" style="margin-bottom:0.5rem;">' +
          '<div class="progress-fill" style="width:' + progress + '%;"></div>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;">' +
          '<span style="font-size:0.8rem;color:#888;">' + progress + '% completado</span>' +
          '<span style="font-size:0.85rem;font-weight:600;">' + level.badge + ' ' + level.name + '</span>' +
        '</div>';

      if (!locked) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function () {
          window.location.hash = '#module/' + mod.id;
        });
      }

      grid.appendChild(card);
    });

    // Simulacros button
    if (SIMULACROS.length > 0) {
      const simBtn = document.createElement('div');
      simBtn.className = 'module-card';
      simBtn.style.borderLeftColor = '#FF9600';
      simBtn.style.cursor = 'pointer';
      simBtn.innerHTML =
        '<div style="display:flex;align-items:center;gap:1rem;">' +
          '<span style="font-size:2.5rem;">📋</span>' +
          '<div>' +
            '<h3 style="margin:0;font-size:1.1rem;">Simulacros</h3>' +
            '<p style="margin:0.25rem 0 0;font-size:0.85rem;color:#777;">Practica con exámenes completos cronometrados</p>' +
          '</div>' +
        '</div>';
      simBtn.addEventListener('click', function () {
        window.location.hash = '#simulacros';
      });
      grid.appendChild(simBtn);
    }

    // Practice button
    const practiceBtn = document.createElement('div');
    practiceBtn.className = 'module-card';
    practiceBtn.style.borderLeftColor = '#CE82FF';
    practiceBtn.style.cursor = 'pointer';
    practiceBtn.innerHTML =
      '<div style="display:flex;align-items:center;gap:1rem;">' +
        '<span style="font-size:2.5rem;">🎯</span>' +
        '<div>' +
          '<h3 style="margin:0;font-size:1.1rem;">Modo Práctica</h3>' +
          '<p style="margin:0.25rem 0 0;font-size:0.85rem;color:#777;">Practica con preguntas de los módulos que elijas</p>' +
        '</div>' +
      '</div>';
    practiceBtn.addEventListener('click', function () {
      window.location.hash = '#practice';
    });
    grid.appendChild(practiceBtn);
  }

  // ==========================================================================
  // 11. RENDERIZADO: MÓDULO
  // ==========================================================================

  /**
   * Render the module detail view with the lesson path.
   */
  function renderModule(moduleId) {
    const mod = findModule(moduleId);
    if (!mod) {
      navigate('#home');
      return;
    }

    // Module header
    const header = el('module-header');
    if (header) {
      const progress = getModuleProgress(mod.id);
      const level = getModuleLevel(progress);
      header.innerHTML =
        '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;">' +
          '<span style="font-size:3rem;">' + (mod.icon || '📚') + '</span>' +
          '<div>' +
            '<h2 style="margin:0;">' + escapeHtml(mod.name) + '</h2>' +
            '<p style="margin:0.25rem 0 0;color:#777;">' + escapeHtml(mod.description || '') + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="progress-bar" style="margin-bottom:0.5rem;">' +
          '<div class="progress-fill" style="width:' + progress + '%;"></div>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;">' +
          '<span style="font-size:0.85rem;color:#888;">' + progress + '% completado</span>' +
          '<span style="font-size:0.9rem;font-weight:600;">' + level.badge + ' ' + level.name + '</span>' +
        '</div>';
    }

    // Lesson path
    const path = el('lesson-path');
    if (path && mod.lessons) {
      path.innerHTML = '';

      // Banner for Infinite Development Practice for this module
      const infBanner = document.createElement('div');
      infBanner.style.cssText = 'width:100%;max-width:440px;margin:0 auto 1.5rem;padding:1rem 1.25rem;background:linear-gradient(135deg, rgba(255,150,0,0.18), rgba(255,200,0,0.1));border:2px solid #FF9600;border-radius:16px;display:flex;align-items:center;justify-content:space-between;gap:1rem;box-shadow:0 4px 14px rgba(255,150,0,0.15);';
      infBanner.innerHTML =
        '<div style="text-align:left;">' +
          '<div style="font-weight:800;color:#FFC800;font-size:1rem;display:flex;align-items:center;gap:6px;">' +
            '<span>⚡ Práctica Infinita de Desarrollo</span>' +
          '</div>' +
          '<p style="margin:4px 0 0;font-size:0.82rem;color:#E6EDF3;line-height:1.4;">' +
            'Ejercicios abiertos de código y desarrollo para ' + escapeHtml(mod.name) + '. Entrena sin límite hasta cuando decidas salir.' +
          '</p>' +
        '</div>' +
        '<button id="btn-start-infinite" class="option-btn" type="button" style="margin:0;padding:10px 18px;font-size:0.88rem;background:#FF9600;color:#0D1117;border:none;border-radius:12px;cursor:pointer;font-weight:800;white-space:nowrap;box-shadow:0 3px 10px rgba(255,150,0,0.3);">' +
          'Entrenar ♾️' +
        '</button>';

      path.appendChild(infBanner);

      const startInfBtn = infBanner.querySelector('#btn-start-infinite');
      if (startInfBtn) {
        startInfBtn.addEventListener('click', function () {
          window.location.hash = '#infinite/' + mod.id;
        });
      }

      mod.lessons.forEach(function (lesson, idx) {
        const completed = !!state.completedLessons[lesson.id];
        const locked = isLessonLocked(mod.id, idx);
        const isCurrent = !completed && !locked;

        // Connector line (except for the first lesson)
        if (idx > 0) {
          const connector = document.createElement('div');
          connector.style.cssText = 'width:4px;height:40px;margin:0 auto;background:' + (state.completedLessons[mod.lessons[idx - 1].id] ? (mod.color || '#58CC02') : '#E5E5E5') + ';';
          path.appendChild(connector);
        }

        // Lesson circle wrapper
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:0.5rem;';

        const circle = document.createElement('div');
        circle.className = 'lesson-circle' +
          (completed ? ' lesson-circle--completed' : '') +
          (isCurrent ? ' lesson-circle--current' : '') +
          (locked ? ' lesson-circle--locked' : '');

        if (completed) {
          circle.innerHTML = '✅';
        } else if (locked) {
          circle.innerHTML = '🔒';
        } else {
          circle.innerHTML = '<span style="font-weight:700;">' + (idx + 1) + '</span>';
        }

        if (!locked) {
          circle.style.cursor = 'pointer';
          circle.addEventListener('click', function () {
            window.location.hash = '#lesson/' + mod.id + '/' + lesson.id;
          });
        }

        const label = document.createElement('span');
        label.style.cssText = 'font-size:0.85rem;color:' + (locked ? '#ccc' : '#555') + ';text-align:center;max-width:150px;';
        label.textContent = lesson.name || ('Lección ' + (idx + 1));

        // Show score if completed
        if (completed) {
          const scoreInfo = state.completedLessons[lesson.id];
          const scoreLabel = document.createElement('span');
          scoreLabel.style.cssText = 'font-size:0.75rem;color:#58CC02;font-weight:600;';
          scoreLabel.textContent = scoreInfo.score + '%';
          wrapper.appendChild(circle);
          wrapper.appendChild(label);
          wrapper.appendChild(scoreLabel);
        } else {
          wrapper.appendChild(circle);
          wrapper.appendChild(label);
        }

        path.appendChild(wrapper);
      });
    }
  }

  /**
   * Start an infinite development practice session for a specific module.
   * Exercises continue until the user decides to exit.
   */
  function startInfinitePractice(moduleId) {
    const mod = findModule(moduleId);
    if (!mod) {
      navigate('#home');
      return;
    }

    // Gather development questions:
    // First from window.DUOPROGRA_INFINITE (custom write exercises for this module)
    // Plus all write-code and write-answer questions from the module's own lessons
    let devPool = [];
    if (window.DUOPROGRA_INFINITE && window.DUOPROGRA_INFINITE[moduleId]) {
      devPool = devPool.concat(window.DUOPROGRA_INFINITE[moduleId]);
    }

    if (mod.lessons) {
      mod.lessons.forEach(function (lesson) {
        if (lesson.questions) {
          lesson.questions.forEach(function (q) {
            if (q.type === 'write-code' || q.type === 'write-answer') {
              // Avoid duplicates by id
              if (!devPool.some(function (item) { return item.id === q.id; })) {
                devPool.push(q);
              }
            }
          });
        }
      });
    }

    if (devPool.length === 0) {
      // Fallback: use all questions from dev lessons
      if (mod.lessons) {
        mod.lessons.forEach(function (lesson) {
          if (lesson.id.indexOf('dev') !== -1 && lesson.questions) {
            lesson.questions.forEach(function (q) {
              if (!devPool.some(function (item) { return item.id === q.id; })) {
                devPool.push(q);
              }
            });
          }
        });
      }
    }

    if (devPool.length === 0) {
      showModal('Sin ejercicios', 'No se encontraron ejercicios de desarrollo para este módulo.');
      return;
    }

    currentSession = {
      type: 'infinite',
      moduleId: moduleId,
      lessonId: 'infinite-dev',
      pool: devPool.slice(),
      questions: shuffle(devPool).slice(),
      currentIndex: 0,
      answers: [],
      correctCount: 0,
      lives: Infinity,
      startTime: Date.now(),
      xpEarned: 0,
      selectedOption: null
    };

    VIEW_IDS.forEach(function (id) {
      const viewEl = document.getElementById(id);
      if (viewEl) viewEl.classList.add('hidden');
    });
    showView('view-lesson');

    renderQuestion();
    updateNav();
  }

  // ==========================================================================
  // 12. RENDERIZADO: LECCIÓN (Quiz Engine)
  // ==========================================================================

  /**
   * Start a lesson session.
   */
  function startLesson(moduleId, lessonId) {
    const mod = findModule(moduleId);
    const lesson = findLesson(moduleId, lessonId);

    if (!mod || !lesson || !lesson.questions || lesson.questions.length === 0) {
      showModal('Error', 'No se encontraron preguntas para esta lección.');
      navigate('#module/' + moduleId);
      return;
    }

    currentSession = {
      type: 'lesson',
      moduleId: moduleId,
      lessonId: lessonId,
      questions: shuffle(lesson.questions),
      currentIndex: 0,
      answers: [],
      correctCount: 0,
      lives: state.maxLives,
      startTime: Date.now(),
      xpEarned: 0,
      selectedOption: null
    };

    // Update lives display
    const lessonLives = el('lesson-lives');
    if (lessonLives) {
      lessonLives.innerHTML = '❤️'.repeat(currentSession.lives);
    }

    renderQuestion();
    updateNav();
  }

  /**
   * Render the current question in the lesson view.
   */
  function renderQuestion() {
    if (!currentSession) return;

    const q = currentSession.questions[currentSession.currentIndex];
    if (!q) return;

    currentSession.selectedOption = null;

    // Progress bar & counter
    const progressFill = el('lesson-progress-fill');
    if (progressFill) {
      if (currentSession.type === 'infinite') {
        progressFill.style.width = '100%';
        progressFill.style.background = '#FF9600';
      } else {
        const pct = ((currentSession.currentIndex) / currentSession.questions.length) * 100;
        progressFill.style.width = pct + '%';
        progressFill.style.background = '';
      }
    }

    // Lives
    const lessonLives = el('lesson-lives');
    if (lessonLives) {
      if (currentSession.type === 'practice' || currentSession.type === 'infinite') {
        const countText = currentSession.type === 'infinite' ? (' <span style="font-size:0.8rem;color:#FFC800;font-weight:700;margin-left:4px;">(Completadas: ' + currentSession.correctCount + ')</span>') : '';
        lessonLives.innerHTML = '♾️' + countText;
      } else {
        lessonLives.innerHTML = '❤️'.repeat(Math.max(0, currentSession.lives)) + '🖤'.repeat(Math.max(0, state.maxLives - currentSession.lives));
      }
    }

    // Question text
    const questionText = el('question-text');
    if (questionText) {
      questionText.innerHTML = escapeHtml(q.question);
    }

    // Question code
    const questionCode = el('question-code');
    if (questionCode) {
      if (q.code) {
        questionCode.innerHTML = '<code>' + highlightCode(q.code) + '</code>';
        questionCode.classList.remove('hidden');
      } else {
        questionCode.innerHTML = '';
        questionCode.classList.add('hidden');
      }
    }

    // Options container
    const optionsContainer = el('options-container');
    if (!optionsContainer) return;
    optionsContainer.innerHTML = '';

    // Check button
    const checkBtn = el('check-btn');
    if (checkBtn) {
      checkBtn.disabled = true;
      checkBtn.textContent = 'Comprobar';
    }

    // Hide feedback
    const feedbackOverlay = el('feedback-overlay');
    if (feedbackOverlay) {
      feedbackOverlay.classList.add('hidden');
      feedbackOverlay.classList.remove('feedback-overlay--correct', 'feedback-overlay--wrong');
    }

    // Render based on question type
    if (q.type === 'order-code') {
      renderOrderCodeQuestion(q, optionsContainer);
    } else if (q.type === 'write-code' || q.type === 'write-answer') {
      renderWriteQuestion(q, optionsContainer);
    } else {
      // multiple-choice, true-false, code-output, fill-code
      renderStandardOptions(q, optionsContainer);
    }
  }

  /**
   * Render open write questions (write-code or write-answer) with hints and instant feedback.
   */
  function renderWriteQuestion(q, container) {
    currentSession.userTextAnswer = '';
    currentSession.usedScaffoldHint = false;
    currentSession.revealedAnswer = false;

    let html = '<div style="display:flex;flex-direction:column;gap:1rem;width:100%;position:relative;">';

    // Top action bar with Corner Buttons: [💡 Pista (-10% XP)] [👁️ Revelar Respuesta (Incorrecta)]
    html += '<div style="display:flex;justify-content:flex-end;gap:0.5rem;flex-wrap:wrap;margin-bottom:-0.25rem;">';
    html += '<button id="btn-request-scaffold" class="option-btn" type="button" style="margin:0;padding:6px 14px;font-size:0.8rem;background:rgba(28,176,246,0.15);color:#1CB0F6;border:1px solid #1CB0F6;border-radius:20px;cursor:pointer;font-weight:700;display:inline-flex;align-items:center;gap:4px;">';
    html += '<span>💡 Pedir Pista (-10% XP)</span>';
    html += '</button>';
    html += '<button id="btn-reveal-answer" class="option-btn" type="button" style="margin:0;padding:6px 14px;font-size:0.8rem;background:rgba(255,75,75,0.15);color:#FF7B72;border:1px solid #FF7B72;border-radius:20px;cursor:pointer;font-weight:700;display:inline-flex;align-items:center;gap:4px;">';
    html += '<span>👁️ Revelar Respuesta</span>';
    html += '</button>';
    html += '</div>';

    // Conceptual hints box
    if (q.hints && q.hints.length > 0) {
      html += '<div id="hints-concept-box" style="background:rgba(28,176,246,0.1);border:1px solid rgba(28,176,246,0.3);border-radius:12px;padding:0.75rem 1rem;">';
      html += '<div style="display:flex;align-items:center;gap:0.5rem;font-weight:bold;color:#1CB0F6;font-size:0.9rem;margin-bottom:0.25rem;">';
      html += '<span>💡 Pistas clave:</span>';
      html += '</div>';
      html += '<ul style="margin:0.25rem 0 0 1.25rem;padding:0;color:#E6EDF3;font-size:0.85rem;line-height:1.5;">';
      q.hints.forEach(function (hint) {
        html += '<li>' + escapeHtml(hint) + '</li>';
      });
      html += '</ul>';
      html += '</div>';
    }

    // Input area
    const isCode = (q.type === 'write-code');
    html += '<div>';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;">';
    html += '<label style="font-size:0.85rem;color:#A0B4BC;font-weight:600;">Escribe tu respuesta aquí:</label>';
    html += '<span id="scaffold-notice" style="font-size:0.75rem;color:#FFC800;display:none;">⚠️ Pista activa (-10% penalización)</span>';
    html += '</div>';
    if (isCode) {
      html += '<textarea id="write-answer-input" placeholder="' + escapeHtml(q.placeholder || 'Escribe tu código o expresión en Python...') + '" ' +
              'style="width:100%;min-height:95px;font-family:monospace;background:#0D1117;color:#58CC02;border:2px solid #30363D;border-radius:12px;padding:12px 14px;font-size:1rem;resize:vertical;box-sizing:border-box;outline:none;transition:all 0.2s;"></textarea>';
    } else {
      html += '<input type="text" id="write-answer-input" placeholder="' + escapeHtml(q.placeholder || 'Escribe tu respuesta...') + '" ' +
              'style="width:100%;background:#0D1117;color:#FFFFFF;border:2px solid #30363D;border-radius:12px;padding:12px 16px;font-size:1.05rem;box-sizing:border-box;outline:none;transition:all 0.2s;">';
    }
    html += '</div>';
    html += '</div>';

    container.innerHTML = html;

    const inputEl = document.getElementById('write-answer-input');
    const checkBtn = el('check-btn');
    const btnScaffold = document.getElementById('btn-request-scaffold');
    const btnReveal = document.getElementById('btn-reveal-answer');
    const scaffoldNotice = document.getElementById('scaffold-notice');

    if (inputEl) {
      inputEl.focus();
      inputEl.addEventListener('input', function () {
        const val = inputEl.value.trim();
        currentSession.userTextAnswer = val;
        if (checkBtn) {
          checkBtn.disabled = (val.length === 0);
        }
      });

      inputEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && (!isCode || e.ctrlKey)) {
          if (checkBtn && !checkBtn.disabled) {
            checkAnswer();
          }
        }
      });
    }

    // Button: Pedir Pista (Rellena plantilla / código incompleto y penaliza 10%)
    if (btnScaffold) {
      btnScaffold.addEventListener('click', function () {
        if (!currentSession.usedScaffoldHint) {
          currentSession.usedScaffoldHint = true;
          btnScaffold.style.opacity = '0.6';
          btnScaffold.disabled = true;
          if (scaffoldNotice) scaffoldNotice.style.display = 'inline';

          // Build a structural/pseudocode scaffold WITHOUT revealing the exact answer
          var hintCode = '';
          var isCode = (q.type === 'write-code');

          // Use the question's own scaffoldHint if provided, otherwise generate a structural template
          if (q.scaffoldHint) {
            hintCode = q.scaffoldHint;
          } else if (isCode) {
            // Generate a structural template from the answer's shape, not its content
            var target = (Array.isArray(q.acceptedAnswers) && q.acceptedAnswers[0]) || (typeof q.correct === 'string' ? q.correct : '');
            if (target.includes('def ')) {
              // Function definition question
              var fnMatch = target.match(/def\s+(\w+)\s*\(/);
              hintCode = fnMatch ? 'def ' + fnMatch[1] + '(...):
    # Escribe el cuerpo aquí
    return ...' : 'def mi_funcion(...):
    # Completa la función
    return ...';
            } else if (target.includes('class ')) {
              hintCode = 'class MiClase:
    def __init__(self, ...):
        # Inicializa atributos
        ...';
            } else if (target.includes('for ') || target.includes('while ')) {
              hintCode = '# Usa un ciclo para iterar
for elemento in ...:  # o while condicion:
    ...';
            } else if (target.includes('lambda')) {
              hintCode = 'lambda argumento: expresion_con(argumento)';
            } else if (target.includes('map(') || target.includes('filter(')) {
              hintCode = '# Recuerda: map(funcion, iterable) o filter(funcion, iterable)
resultado = list(map(lambda x: ..., coleccion))';
            } else {
              // Generic code scaffold
              var lines = target.split('
').length;
              hintCode = '# Pista estructural: tu solución tiene ' + lines + ' línea(s)
# Comienza con: ' + (target[0] || '...') + '...';
            }
          } else {
            // write-answer type: conceptual hint only
            hintCode = '# Pista: piensa en el concepto de ' + (q.question.length > 30 ? q.question.substring(0, 30) + '...' : q.question);
            // Clear for text input
            hintCode = 'Pista: revisa las notas sobre este tema y recuerda los métodos clave.';
          }

          if (inputEl) {
            inputEl.value = hintCode;
            currentSession.userTextAnswer = hintCode;
            inputEl.focus();
            if (checkBtn) checkBtn.disabled = false;
          }
        }
      });
    }

    // Button: Revelar Respuesta (Auto-completa, marca como incorrecta y califica)
    if (btnReveal) {
      btnReveal.addEventListener('click', function () {
        const target = (Array.isArray(q.acceptedAnswers) && q.acceptedAnswers[0]) || (typeof q.correct === 'string' ? q.correct : '');
        currentSession.revealedAnswer = true;
        if (inputEl) {
          inputEl.value = target;
          currentSession.userTextAnswer = target;
        }
        checkAnswer();
      });
    }
  }

  /**
   * Render standard option buttons (multiple-choice, true-false, code-output, fill-code).
   */
  function renderStandardOptions(q, container) {
    if (!q.options) return;

    const isCodeOutput = (q.type === 'code-output');

    q.options.forEach(function (optText, idx) {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.setAttribute('data-index', idx);

      if (isCodeOutput) {
        btn.innerHTML = '<code style="font-family:monospace;white-space:pre;">' + escapeHtml(optText) + '</code>';
      } else {
        btn.textContent = optText;
      }

      btn.addEventListener('click', function () {
        selectOption(idx);
      });

      container.appendChild(btn);
    });
  }

  /**
   * Render an order-code question with source/answer areas.
   */
  function renderOrderCodeQuestion(q, container) {
    if (!q.options) return;

    container.innerHTML =
      '<div style="margin-bottom:1rem;">' +
        '<p style="font-weight:600;margin-bottom:0.25rem;color:#A0B4BC;font-size:0.85rem;">👆 Haz clic para mover al área de respuesta (clic nuevamente para devolver):</p>' +
        '<div id="order-answer-area" style="min-height:70px;border:2px dashed #1CB0F6;border-radius:12px;padding:0.5rem;margin-bottom:1rem;display:flex;flex-direction:column;gap:0.5rem;background:rgba(28,176,246,0.05);"></div>' +
        '<p style="font-weight:600;margin-bottom:0.25rem;color:#A0B4BC;font-size:0.85rem;">📦 Líneas disponibles:</p>' +
        '<div id="order-source-area" style="display:flex;flex-direction:column;gap:0.5rem;"></div>' +
      '</div>';

    const sourceArea = document.getElementById('order-source-area');
    const answerArea = document.getElementById('order-answer-area');

    // Track the user's ordering - array of origIdx values in placement order
    currentSession.orderSelection = [];

    var shuffledIndices = shuffle(q.options.map(function (_, i) { return i; }));

    function bindItem(item, origIdx, inAnswer) {
      // Remove ALL listeners by cloning the node
      var newItem = item.cloneNode(true);
      if (item.parentNode) item.parentNode.replaceChild(newItem, item);

      newItem.addEventListener('click', function () {
        if (inAnswer) {
          // Move back to source
          sourceArea.appendChild(newItem);
          var pos = currentSession.orderSelection.indexOf(origIdx);
          if (pos !== -1) currentSession.orderSelection.splice(pos, 1);
          updateOrderCheckBtn();
          bindItem(newItem, origIdx, false);
        } else {
          // Move to answer
          answerArea.appendChild(newItem);
          currentSession.orderSelection.push(origIdx);
          updateOrderCheckBtn();
          bindItem(newItem, origIdx, true);
        }
      });
      return newItem;
    }

    shuffledIndices.forEach(function (origIdx) {
      var item = document.createElement('button');
      item.className = 'option-btn';
      item.style.cssText = 'font-family:monospace;text-align:left;white-space:pre-wrap;cursor:pointer;';
      item.textContent = q.options[origIdx];
      item.setAttribute('data-orig-index', origIdx);
      sourceArea.appendChild(item);
      bindItem(item, origIdx, false);
    });
  }

  /**
   * Update the check button state for order-code questions.
   */
  function updateOrderCheckBtn() {
    const checkBtn = el('check-btn');
    if (!checkBtn || !currentSession) return;
    const q = currentSession.questions[currentSession.currentIndex];
    if (!q || !q.options) return;

    // Enable check only when all items are placed
    checkBtn.disabled = (currentSession.orderSelection.length !== q.options.length);
  }

  /**
   * Handle selecting an option (for standard question types).
   */
  function selectOption(index) {
    if (!currentSession) return;

    currentSession.selectedOption = index;

    // Update visual selection
    const container = el('options-container');
    if (container) {
      const buttons = container.querySelectorAll('.option-btn');
      buttons.forEach(function (btn) {
        btn.classList.remove('option-btn--selected');
      });
      const selectedBtn = container.querySelector('[data-index="' + index + '"]');
      if (selectedBtn) {
        selectedBtn.classList.add('option-btn--selected');
      }
    }

    // Enable check button
    const checkBtn = el('check-btn');
    if (checkBtn) {
      checkBtn.disabled = false;
    }
  }

  /**
   * Check the user's answer against the correct answer.
   */
  function checkAnswer() {
    if (!currentSession) return;

    const q = currentSession.questions[currentSession.currentIndex];
    if (!q) return;

    let isCorrect = false;
    const container = el('options-container');

    if (q.type === 'order-code') {
      // Compare arrays
      const userOrder = currentSession.orderSelection || [];
      const correctOrder = q.correct; // array of indices
      isCorrect = (
        Array.isArray(correctOrder) &&
        userOrder.length === correctOrder.length &&
        userOrder.every(function (val, i) { return val === correctOrder[i]; })
      );

      // Highlight all items
      if (container) {
        const answerArea = document.getElementById('order-answer-area');
        if (answerArea) {
          const items = answerArea.querySelectorAll('.option-btn');
          items.forEach(function (item, i) {
            if (isCorrect) {
              item.classList.add('option-btn--correct');
            } else {
              const origIdx = parseInt(item.getAttribute('data-orig-index'), 10);
              if (correctOrder[i] === origIdx) {
                item.classList.add('option-btn--correct');
              } else {
                item.classList.add('option-btn--wrong');
              }
            }
            item.disabled = true;
            item.onclick = null;
          });
        }
      }
    } else if (q.type === 'write-code' || q.type === 'write-answer') {
      const userText = (currentSession.userTextAnswer || '').trim();
      const normalize = function (str) {
        return (str || '').replace(/\s+/g, ' ').replace(/['"]/g, '"').trim().toLowerCase();
      };

      const userNorm = normalize(userText);

      // Check if user's text matches correct answer or any valid accepted answer
      let accepted = [];
      if (Array.isArray(q.acceptedAnswers)) {
        accepted = q.acceptedAnswers;
      } else if (Array.isArray(q.correct)) {
        accepted = q.correct;
      } else if (typeof q.correct === 'string') {
        accepted = [q.correct];
      } else if (Array.isArray(q.options) && typeof q.correct === 'number') {
        accepted = [q.options[q.correct]];
      }

      // If user chose to reveal answer, it is always counted as incorrect
      if (currentSession.revealedAnswer) {
        isCorrect = false;
      } else {
        isCorrect = accepted.some(function (ans) {
          return normalize(ans) === userNorm;
        });
      }

      // Highlight input border
      const inputEl = document.getElementById('write-answer-input');
      if (inputEl) {
        inputEl.disabled = true;
        inputEl.style.borderColor = isCorrect ? '#58CC02' : '#FF4B4B';
        inputEl.style.background = isCorrect ? 'rgba(88,204,2,0.1)' : 'rgba(255,75,75,0.1)';
      }
    } else {
      // Standard: compare selectedOption to correct index
      isCorrect = (currentSession.selectedOption === q.correct);

      // Highlight correct/wrong
      if (container) {
        const buttons = container.querySelectorAll('.option-btn');
        buttons.forEach(function (btn) {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          if (idx === q.correct) {
            btn.classList.add('option-btn--correct');
          }
          if (idx === currentSession.selectedOption && !isCorrect) {
            btn.classList.add('option-btn--wrong');
          }
          btn.disabled = true;
        });
      }
    }

    // Record activity (for streak)
    recordActivity();

    // Calculate XP (if used scaffold hint, apply -10% penalty)
    let xpAmount = XP_PER_DIFFICULTY[q.difficulty] || 10;
    if (currentSession.usedScaffoldHint) {
      xpAmount = Math.max(1, Math.round(xpAmount * 0.9));
    }

    if (isCorrect) {
      currentSession.correctCount++;
      state.xp += xpAmount;
      currentSession.xpEarned += xpAmount;
      showXpPopup(xpAmount);
      showFeedback(true, q, currentSession.selectedOption, false);
    } else {
      if (currentSession.type !== 'practice' && !infiniteLivesSecret) {
        currentSession.lives--;
      }
      showFeedback(false, q, currentSession.selectedOption, currentSession.lives === 0 && currentSession.type !== 'practice' && !infiniteLivesSecret);
    }

    // Record answer
    let recordedUserAnswer = currentSession.selectedOption;
    if (q.type === 'order-code') {
      recordedUserAnswer = (currentSession.orderSelection || []).slice();
    } else if (q.type === 'write-code' || q.type === 'write-answer') {
      recordedUserAnswer = currentSession.userTextAnswer || '';
    }

    currentSession.answers.push({
      questionId: q.id,
      question: q.question,
      code: q.code,
      userAnswer: recordedUserAnswer,
      correct: q.correct,
      acceptedAnswers: q.acceptedAnswers,
      isCorrect: isCorrect,
      options: q.options,
      explanation: q.explanation,
      type: q.type
    });

    // Update stats
    state.totalAnswered++;
    if (isCorrect) state.totalCorrect++;
    saveState();
    updateNav();

    // Disable check button
    const checkBtn = el('check-btn');
    if (checkBtn) checkBtn.disabled = true;

    // Update lives display
    const lessonLives = el('lesson-lives');
    if (lessonLives) {
      if (infiniteLivesSecret) {
        lessonLives.innerHTML = '❤️ ♾️ <span style="font-size:0.8rem;color:#FFC800;font-weight:bold;">MODO DIOS</span>';
      } else if (currentSession.type !== 'practice') {
        lessonLives.innerHTML = '❤️'.repeat(Math.max(0, currentSession.lives)) + '🖤'.repeat(Math.max(0, state.maxLives - currentSession.lives));
      }
    }
  }

  /**
   * Show the feedback overlay after checking an answer with rich, detailed pedagogical explanations.
   */
  function showFeedback(correct, questionObj, userSelectedIndex, lessonWillEnd) {
    const overlay = el('feedback-overlay');
    const icon = el('feedback-icon');
    const title = el('feedback-title');
    const explanationEl = el('feedback-explanation');
    const continueBtn = el('feedback-continue');

    if (!overlay) return;

    overlay.classList.remove('hidden', 'feedback-overlay--correct', 'feedback-overlay--wrong');

    if (correct) {
      overlay.classList.add('feedback-overlay--correct');
      if (icon) icon.textContent = '🎉';
      if (title) title.textContent = '¡Excelente! Respuesta Correcta';
    } else {
      overlay.classList.add('feedback-overlay--wrong');
      if (icon) icon.textContent = '💡';
      if (title) {
        if (lessonWillEnd) {
          title.textContent = '¡Incorrecto! Se acabaron las vidas.';
        } else {
          title.textContent = '¡No del todo! Aprendamos juntos:';
        }
      }
      // Shake animation on question
      const questionText = el('question-text');
      if (questionText) {
        questionText.classList.add('shake');
        setTimeout(function () { questionText.classList.remove('shake'); }, 600);
      }
    }

    if (explanationEl) {
      let richHtml = '';

      if (questionObj) {
        // ALWAYS use questionObj (never un-scoped variables)
        if (!correct && (questionObj.type === 'write-code' || questionObj.type === 'write-answer')) {
          const userText = currentSession ? (currentSession.userTextAnswer || '') : '';
          let correctDisplay = '';
          if (Array.isArray(questionObj.acceptedAnswers)) {
            correctDisplay = questionObj.acceptedAnswers.join('  o  ');
          } else if (Array.isArray(questionObj.correct)) {
            correctDisplay = questionObj.correct.join('  o  ');
          } else if (typeof questionObj.correct === 'string') {
            correctDisplay = questionObj.correct;
          } else if (Array.isArray(questionObj.options) && typeof questionObj.correct === 'number') {
            correctDisplay = questionObj.options[questionObj.correct];
          }

          richHtml += '<div style="margin-bottom:0.75rem;padding:0.75rem 1rem;background:rgba(0,0,0,0.25);border-radius:10px;text-align:left;line-height:1.5;">';
          richHtml += '<div style="color:#FFA6A6;margin-bottom:0.35rem;">❌ <b>Lo que escribiste:</b> <span style="font-family:monospace;background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:4px;">' + (escapeHtml(userText) || '<i>(vacío)</i>') + '</span></div>';
          richHtml += '<div style="color:#A6FFA6;">✅ <b>Respuesta esperada:</b> <span style="font-family:monospace;background:rgba(255,255,255,0.15);padding:2px 6px;border-radius:4px;font-weight:bold;">' + escapeHtml(correctDisplay) + '</span></div>';
          richHtml += '</div>';
        } else if (correct && (questionObj.type === 'write-code' || questionObj.type === 'write-answer')) {
          const userText = currentSession ? (currentSession.userTextAnswer || '') : '';
          richHtml += '<div style="margin-bottom:0.6rem;padding:0.5rem 0.85rem;background:rgba(0,0,0,0.2);border-radius:8px;text-align:left;">';
          richHtml += '<div style="color:#E6EDF3;">🎯 <b>Tu código/respuesta:</b> <span style="font-family:monospace;background:rgba(255,255,255,0.15);padding:2px 6px;border-radius:4px;font-weight:bold;">' + escapeHtml(userText) + '</span></div>';
          richHtml += '</div>';
        } else if (!correct && questionObj.type !== 'order-code' && Array.isArray(questionObj.options)) {
          const correctText = questionObj.options[questionObj.correct];
          const userText = (userSelectedIndex !== null && userSelectedIndex !== undefined && questionObj.options[userSelectedIndex]) ? questionObj.options[userSelectedIndex] : null;

          richHtml += '<div style="margin-bottom:0.75rem;padding:0.75rem 1rem;background:rgba(0,0,0,0.25);border-radius:10px;text-align:left;line-height:1.5;">';
          if (userText) {
            richHtml += '<div style="color:#FFA6A6;margin-bottom:0.35rem;">❌ <b>Tu respuesta:</b> <span style="font-family:monospace;background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:4px;">' + escapeHtml(userText) + '</span></div>';
          }
          richHtml += '<div style="color:#A6FFA6;">✅ <b>Respuesta correcta:</b> <span style="font-family:monospace;background:rgba(255,255,255,0.15);padding:2px 6px;border-radius:4px;font-weight:bold;">' + escapeHtml(correctText) + '</span></div>';
          richHtml += '</div>';
        } else if (correct && questionObj.type !== 'order-code' && Array.isArray(questionObj.options)) {
          const correctText = questionObj.options[questionObj.correct];
          richHtml += '<div style="margin-bottom:0.6rem;padding:0.5rem 0.85rem;background:rgba(0,0,0,0.2);border-radius:8px;text-align:left;">';
          richHtml += '<div style="color:#E6EDF3;">🎯 <b>Acertaste:</b> <span style="font-family:monospace;background:rgba(255,255,255,0.15);padding:2px 6px;border-radius:4px;font-weight:bold;">' + escapeHtml(correctText) + '</span></div>';
          richHtml += '</div>';
        }

        // Detailed pedagogical concept breakdown & Why it is correct
        richHtml += '<div style="text-align:left;line-height:1.6;font-size:0.95rem;background:rgba(255,255,255,0.08);padding:0.85rem 1rem;border-radius:10px;border-left:4px solid ' + (correct ? '#58CC02' : '#FFD700') + ';margin-bottom:0.5rem;">';
        richHtml += '<div style="font-weight:bold;margin-bottom:0.4rem;color:' + (correct ? '#FFFFFF' : '#FFEDB3') + ';display:flex;align-items:center;gap:6px;">';
        richHtml += '<span>📖 Fundamento Teórico & Por qué es correcta:</span>';
        richHtml += '</div>';
        richHtml += '<div style="color:#FFFFFF;margin-bottom:0.5rem;">' + escapeHtml(questionObj.explanation || 'Respuesta verificada según los estándares de Python e IIC2233.') + '</div>';

        // Additional detailed feedback sections if incorrect
        if (!correct) {
          richHtml += '<div style="margin-top:0.6rem;padding-top:0.6rem;border-top:1px dashed rgba(255,255,255,0.2);font-size:0.88rem;color:#E6EDF3;">';
          richHtml += '🔍 <b style="color:#FFA6A6;">¿Por qué no es correcta tu opción?</b> ';
          richHtml += '<span>En Python, la semántica del lenguaje exige cumplir con los protocolos de memoria, tipos inmutables y orden de evaluación estándar evaluados en IIC2233. Repasa la sintaxis esperada arriba y recuerda los nombres de métodos dunder o funciones built-in.</span>';
          richHtml += '</div>';
          richHtml += '<div style="margin-top:0.4rem;font-size:0.85rem;color:#58CC02;font-weight:600;">';
          richHtml += '💡 <b>Tip de Examen PUC:</b> Asegúrate de verificar los casos borde (vacío, None, tipos mutables vs inmutables) y no confundir métodos de instancia con funciones globales.';
          richHtml += '</div>';
        }
        richHtml += '</div>';
      } else {
        richHtml = escapeHtml(questionObj || '');
      }

      explanationEl.innerHTML = richHtml;
    }

    if (continueBtn) {
      continueBtn.textContent = 'Continuar';
    }

    overlay.classList.add('slide-up');
    setTimeout(function () { overlay.classList.remove('slide-up'); }, 500);
  }

  /**
   * Continue after feedback overlay (go to next question or end lesson).
   */
  function continueAfterFeedback() {
    const overlay = el('feedback-overlay');
    if (overlay) overlay.classList.add('hidden');

    if (!currentSession) return;

    // If out of lives in lesson mode
    if (currentSession.lives <= 0 && currentSession.type === 'lesson') {
      endLesson(true);
      return;
    }

    // If more questions in queue
    if (currentSession.currentIndex < currentSession.questions.length - 1) {
      currentSession.currentIndex++;
      renderQuestion();
    } else {
      // End of questions list
      if (currentSession.type === 'infinite') {
        // Infinite mode: re-shuffle pool and append so user practices until they choose to exit
        const nextBatch = shuffle(currentSession.pool || []);
        currentSession.questions = currentSession.questions.concat(nextBatch);
        currentSession.currentIndex++;
        renderQuestion();
      } else if (currentSession.type === 'practice') {
        endLesson(false);
      } else {
        endLesson(false);
      }
    }
  }

  /**
   * End a lesson/practice session.
   * @param {boolean} failed - True if ran out of lives.
   */
  function endLesson(failed) {
    if (!currentSession) return;

    const totalQuestions = currentSession.questions.length;
    const score = totalQuestions > 0 ? Math.round((currentSession.correctCount / totalQuestions) * 100) : 0;
    const elapsedMs = Date.now() - currentSession.startTime;
    const elapsedSeconds = Math.floor(elapsedMs / 1000);

    // Perfect bonus
    if (!failed && score === 100) {
      state.xp += PERFECT_BONUS;
      currentSession.xpEarned += PERFECT_BONUS;
    }

    // Track consecutive perfect lessons (no lives lost)
    if (currentSession.type === 'lesson') {
      if (!failed && currentSession.lives === state.maxLives) {
        consecutivePerfectLessons++;
      } else {
        consecutivePerfectLessons = 0;
      }
    }

    // Speed demon check
    if (currentSession.type === 'lesson' && !failed && elapsedSeconds < 120) {
      awardAchievement('speed-demon');
    }

    // Save completed lesson
    if (currentSession.type === 'lesson' && !failed) {
      state.completedLessons[currentSession.lessonId] = {
        score: score,
        xpEarned: currentSession.xpEarned,
        date: todayISO(),
        moduleId: currentSession.moduleId
      };

      // Perfect lesson achievement
      if (score === 100) {
        awardAchievement('perfect');
      }
    }

    saveState();

    // Prepare results data
    lastResultsData = {
      type: currentSession.type,
      moduleId: currentSession.moduleId,
      lessonId: currentSession.lessonId,
      score: score,
      failed: failed,
      correctCount: currentSession.correctCount,
      totalQuestions: totalQuestions,
      xpEarned: currentSession.xpEarned,
      answers: currentSession.answers,
      elapsedSeconds: elapsedSeconds
    };

    // Check achievements after saving
    checkAchievements();

    // Clear session
    currentSession = null;
    updateNav();

    // Navigate to results
    window.location.hash = '#results';
  }

  // ==========================================================================
  // 13. RENDERIZADO: SIMULACRO
  // ==========================================================================

  /**
   * Start a simulacro session.
   */
  function startSimulacro(simulacroId) {
    const sim = findSimulacro(simulacroId);
    if (!sim || !sim.questions || sim.questions.length === 0) {
      showModal('Error', 'No se encontraron preguntas para este simulacro.');
      navigate('#simulacros');
      return;
    }

    // Clear any previous timer
    if (simulacroTimerInterval) {
      clearInterval(simulacroTimerInterval);
      simulacroTimerInterval = null;
    }

    currentSession = {
      type: 'simulacro',
      simulacroId: simulacroId,
      simulacroName: sim.name,
      passingScore: sim.passingScore || 60,
      questions: sim.questions.slice(), // Don't shuffle simulacro questions
      currentIndex: 0,
      answers: new Array(sim.questions.length).fill(null),
      startTime: Date.now(),
      timeRemaining: (sim.timeMinutes || 90) * 60,
      xpEarned: 0
    };

    // Start timer
    startSimulacroTimer();

    // Render
    renderSimulacroQuestion();
    renderSimulacroQuestionMap();
    updateNav();
  }

  /**
   * Start the countdown timer for the simulacro.
   */
  function startSimulacroTimer() {
    const timerDisplay = el('timer-display');

    function updateTimer() {
      if (!currentSession || currentSession.type !== 'simulacro') {
        clearInterval(simulacroTimerInterval);
        simulacroTimerInterval = null;
        return;
      }

      currentSession.timeRemaining--;

      if (timerDisplay) {
        timerDisplay.textContent = '⏱️ ' + formatTime(Math.max(0, currentSession.timeRemaining));

        // Warning state at 5 minutes remaining
        if (currentSession.timeRemaining <= 300) {
          timerDisplay.classList.add('timer-display--warning');
        } else {
          timerDisplay.classList.remove('timer-display--warning');
        }
      }

      // Auto-submit when time runs out
      if (currentSession.timeRemaining <= 0) {
        clearInterval(simulacroTimerInterval);
        simulacroTimerInterval = null;
        submitSimulacro(true);
      }
    }

    // Initial display
    if (timerDisplay) {
      timerDisplay.textContent = '⏱️ ' + formatTime(currentSession.timeRemaining);
      timerDisplay.classList.remove('timer-display--warning');
    }

    simulacroTimerInterval = setInterval(updateTimer, 1000);
  }

  /**
   * Render the current simulacro question.
   */
  function renderSimulacroQuestion() {
    if (!currentSession || currentSession.type !== 'simulacro') return;

    const q = currentSession.questions[currentSession.currentIndex];
    if (!q) return;

    // Question counter
    const counter = el('sim-question-counter');
    if (counter) {
      counter.textContent = 'Pregunta ' + (currentSession.currentIndex + 1) + ' de ' + currentSession.questions.length;
    }

    // Question text
    const questionText = el('sim-question-text');
    if (questionText) {
      questionText.innerHTML = escapeHtml(q.question);
    }

    // Question code
    const questionCode = el('sim-question-code');
    if (questionCode) {
      if (q.code) {
        questionCode.innerHTML = '<code>' + highlightCode(q.code) + '</code>';
        questionCode.classList.remove('hidden');
      } else {
        questionCode.innerHTML = '';
        questionCode.classList.add('hidden');
      }
    }

    // Options
    const optionsContainer = el('sim-options-container');
    if (optionsContainer && q.options) {
      optionsContainer.innerHTML = '';

      const isCodeOutput = (q.type === 'code-output');
      const savedAnswer = currentSession.answers[currentSession.currentIndex];

      if (q.type === 'order-code') {
        renderSimulacroOrderCode(q, optionsContainer, savedAnswer);
      } else {
        q.options.forEach(function (optText, idx) {
          const btn = document.createElement('button');
          btn.className = 'option-btn';
          btn.setAttribute('data-index', idx);

          if (isCodeOutput) {
            btn.innerHTML = '<code style="font-family:monospace;white-space:pre;">' + escapeHtml(optText) + '</code>';
          } else {
            btn.textContent = optText;
          }

          // Pre-select if previously answered
          if (savedAnswer !== null && savedAnswer === idx) {
            btn.classList.add('option-btn--selected');
          }

          btn.addEventListener('click', function () {
            selectSimulacroOption(idx);
          });

          optionsContainer.appendChild(btn);
        });
      }
    }

    // Update navigation buttons
    const prevBtn = el('sim-prev');
    const nextBtn = el('sim-next');
    if (prevBtn) prevBtn.disabled = (currentSession.currentIndex === 0);
    if (nextBtn) nextBtn.disabled = (currentSession.currentIndex === currentSession.questions.length - 1);

    // Update question map
    renderSimulacroQuestionMap();
  }

  /**
   * Render order-code question within a simulacro.
   */
  function renderSimulacroOrderCode(q, container, savedAnswer) {
    container.innerHTML =
      '<div style="margin-bottom:1rem;">' +
        '<p style="font-weight:600;margin-bottom:0.5rem;color:#777;font-size:0.85rem;">Ordena las líneas correctamente:</p>' +
        '<div id="sim-order-answer-area" style="min-height:60px;border:2px dashed #E5E5E5;border-radius:12px;padding:0.5rem;margin-bottom:1rem;display:flex;flex-direction:column;gap:0.5rem;"></div>' +
        '<p style="font-weight:600;margin-bottom:0.5rem;color:#777;font-size:0.85rem;">Líneas disponibles:</p>' +
        '<div id="sim-order-source-area" style="display:flex;flex-direction:column;gap:0.5rem;"></div>' +
      '</div>';

    const sourceArea = document.getElementById('sim-order-source-area');
    const answerArea = document.getElementById('sim-order-answer-area');

    // Initialize order selection for this question if not already saved
    if (!currentSession.simOrderSelections) {
      currentSession.simOrderSelections = {};
    }

    const questionIdx = currentSession.currentIndex;
    if (!currentSession.simOrderSelections[questionIdx]) {
      currentSession.simOrderSelections[questionIdx] = [];
    }
    const orderSel = currentSession.simOrderSelections[questionIdx];

    // Determine which items are already placed and which are still in the source
    const shuffledIndices = shuffle(q.options.map(function (_, i) { return i; }));
    const alreadyPlaced = orderSel.slice();
    const remaining = shuffledIndices.filter(function (i) { return alreadyPlaced.indexOf(i) === -1; });

    function createItem(origIdx, inAnswer) {
      const item = document.createElement('button');
      item.className = 'option-btn';
      item.style.cssText = 'font-family:monospace;text-align:left;white-space:pre;';
      item.textContent = q.options[origIdx];
      item.setAttribute('data-orig-index', origIdx);

      if (inAnswer) {
        item.addEventListener('click', function () {
          // Move back to source
          sourceArea.appendChild(item);
          const pos = currentSession.simOrderSelections[questionIdx].indexOf(origIdx);
          if (pos !== -1) currentSession.simOrderSelections[questionIdx].splice(pos, 1);
          saveSimOrderAnswer(questionIdx, q);
          rebindItem(item, origIdx, false);
        });
      } else {
        item.addEventListener('click', function () {
          // Move to answer
          answerArea.appendChild(item);
          currentSession.simOrderSelections[questionIdx].push(origIdx);
          saveSimOrderAnswer(questionIdx, q);
          rebindItem(item, origIdx, true);
        });
      }
      return item;
    }

    function rebindItem(item, origIdx, inAnswer) {
      // Remove old listeners by cloning
      const newItem = item.cloneNode(true);
      item.parentNode.replaceChild(newItem, item);

      if (inAnswer) {
        newItem.addEventListener('click', function () {
          sourceArea.appendChild(newItem);
          const pos = currentSession.simOrderSelections[questionIdx].indexOf(origIdx);
          if (pos !== -1) currentSession.simOrderSelections[questionIdx].splice(pos, 1);
          saveSimOrderAnswer(questionIdx, q);
          rebindItem(newItem, origIdx, false);
        });
      } else {
        newItem.addEventListener('click', function () {
          answerArea.appendChild(newItem);
          currentSession.simOrderSelections[questionIdx].push(origIdx);
          saveSimOrderAnswer(questionIdx, q);
          rebindItem(newItem, origIdx, true);
        });
      }
    }

    // Render already-placed items in answer area
    alreadyPlaced.forEach(function (origIdx) {
      answerArea.appendChild(createItem(origIdx, true));
    });

    // Render remaining items in source area
    remaining.forEach(function (origIdx) {
      sourceArea.appendChild(createItem(origIdx, false));
    });
  }

  /**
   * Save the order-code answer for a simulacro question.
   */
  function saveSimOrderAnswer(questionIdx, q) {
    if (!currentSession || !currentSession.simOrderSelections) return;
    const orderSel = currentSession.simOrderSelections[questionIdx];
    // Only save as a proper answer if all items placed
    if (orderSel.length === q.options.length) {
      currentSession.answers[questionIdx] = orderSel.slice();
    } else {
      currentSession.answers[questionIdx] = null;
    }
    renderSimulacroQuestionMap();
  }

  /**
   * Select an option in the simulacro (no check, just save).
   */
  function selectSimulacroOption(index) {
    if (!currentSession || currentSession.type !== 'simulacro') return;

    currentSession.answers[currentSession.currentIndex] = index;

    // Update visual
    const container = el('sim-options-container');
    if (container) {
      const buttons = container.querySelectorAll('.option-btn');
      buttons.forEach(function (btn) {
        btn.classList.remove('option-btn--selected');
      });
      const selected = container.querySelector('[data-index="' + index + '"]');
      if (selected) {
        selected.classList.add('option-btn--selected');
      }
    }

    // Update question map
    renderSimulacroQuestionMap();
  }

  /**
   * Render the question map (dots) for the simulacro.
   */
  function renderSimulacroQuestionMap() {
    if (!currentSession || currentSession.type !== 'simulacro') return;

    const mapContainer = el('sim-question-map');
    if (!mapContainer) return;

    mapContainer.innerHTML = '';

    currentSession.questions.forEach(function (_, idx) {
      const dot = document.createElement('span');
      dot.className = 'sim-q-dot';

      if (idx === currentSession.currentIndex) {
        dot.classList.add('sim-q-dot--current');
      }

      if (currentSession.answers[idx] !== null) {
        dot.classList.add('sim-q-dot--answered');
      } else {
        dot.classList.add('sim-q-dot--unanswered');
      }

      dot.textContent = String(idx + 1);
      dot.title = 'Pregunta ' + (idx + 1);
      dot.style.cursor = 'pointer';

      dot.addEventListener('click', function () {
        currentSession.currentIndex = idx;
        renderSimulacroQuestion();
      });

      mapContainer.appendChild(dot);
    });
  }

  /**
   * Navigate to the next simulacro question.
   */
  function simNext() {
    if (!currentSession || currentSession.type !== 'simulacro') return;
    if (currentSession.currentIndex < currentSession.questions.length - 1) {
      currentSession.currentIndex++;
      renderSimulacroQuestion();
    }
  }

  /**
   * Navigate to the previous simulacro question.
   */
  function simPrev() {
    if (!currentSession || currentSession.type !== 'simulacro') return;
    if (currentSession.currentIndex > 0) {
      currentSession.currentIndex--;
      renderSimulacroQuestion();
    }
  }

  /**
   * Submit the simulacro for grading.
   * @param {boolean} autoSubmit - True if time ran out.
   */
  function submitSimulacro(autoSubmit) {
    if (!currentSession || currentSession.type !== 'simulacro') return;

    // Check for unanswered questions
    const unanswered = currentSession.answers.filter(function (a) { return a === null; }).length;

    if (!autoSubmit && unanswered > 0) {
      showModal(
        '⚠️ ¿Estás seguro?',
        'Aún tienes <strong>' + unanswered + '</strong> pregunta' + (unanswered === 1 ? '' : 's') + ' sin responder.',
        function () {
          doSubmitSimulacro();
        }
      );
      return;
    }

    doSubmitSimulacro();
  }

  /**
   * Actually perform the simulacro submission.
   */
  function doSubmitSimulacro() {
    // Stop timer
    if (simulacroTimerInterval) {
      clearInterval(simulacroTimerInterval);
      simulacroTimerInterval = null;
    }

    const totalQ = currentSession.questions.length;
    let correctCount = 0;
    const reviewAnswers = [];

    currentSession.questions.forEach(function (q, idx) {
      const userAnswer = currentSession.answers[idx];
      let isCorrect = false;

      if (q.type === 'order-code') {
        if (Array.isArray(userAnswer) && Array.isArray(q.correct)) {
          isCorrect = userAnswer.length === q.correct.length &&
            userAnswer.every(function (val, i) { return val === q.correct[i]; });
        }
      } else {
        isCorrect = (userAnswer === q.correct);
      }

      if (isCorrect) correctCount++;

      reviewAnswers.push({
        questionId: q.id,
        question: q.question,
        code: q.code,
        userAnswer: userAnswer,
        correct: q.correct,
        isCorrect: isCorrect,
        options: q.options,
        explanation: q.explanation,
        type: q.type
      });
    });

    const score = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
    const passed = score >= currentSession.passingScore;

    // Award XP
    const xpEarned = (correctCount * 10) + (passed ? SIMULACRO_PASS_BONUS : 0);
    state.xp += xpEarned;

    // Save result
    state.simulacroResults[currentSession.simulacroId] = {
      score: score,
      passed: passed,
      date: todayISO()
    };

    state.totalAnswered += totalQ;
    state.totalCorrect += correctCount;

    saveState();

    // Record activity
    recordActivity();

    // Prepare results
    lastResultsData = {
      type: 'simulacro',
      simulacroId: currentSession.simulacroId,
      simulacroName: currentSession.simulacroName,
      score: score,
      passed: passed,
      passingScore: currentSession.passingScore,
      correctCount: correctCount,
      totalQuestions: totalQ,
      xpEarned: xpEarned,
      answers: reviewAnswers,
      elapsedSeconds: Math.floor((Date.now() - currentSession.startTime) / 1000)
    };

    // Check achievements
    checkAchievements();

    // Clear session
    currentSession = null;
    updateNav();

    // Navigate to results
    window.location.hash = '#results';
  }

  // ==========================================================================
  // 14. RENDERIZADO: PRÁCTICA
  // ==========================================================================

  /**
   * Set up the practice mode view with module checkboxes and options.
   */
  function setupPractice() {
    const container = el('practice-modules');
    if (!container) return;

    container.innerHTML = '';

    if (MODULES.length === 0) {
      container.innerHTML = '<p style="color:#888;">No hay módulos disponibles para practicar.</p>';
      return;
    }

    // Only inject module checkboxes (difficulty and count are now in the HTML, not duplicated here)
    MODULES.forEach(function (mod) {
      const label = document.createElement('label');
      label.className = 'practice-checkbox';
      const accentColor = mod.color || '#58CC02';
      const icon = mod.icon || '📚';
      label.innerHTML =
        '<input type="checkbox" class="practice-module-cb" value="' + mod.id + '" checked style="width:20px;height:20px;flex-shrink:0;accent-color:' + accentColor + ';cursor:pointer;">' +
        '<span style="font-size:1.4rem;">' + icon + '</span>' +
        '<span class="practice-checkbox-label" style="color:var(--text-primary);font-weight:600;">' + escapeHtml(mod.name) + '</span>';
      container.appendChild(label);
    });

    // Wire up Select All / Deselect All buttons
    const selAll = document.getElementById('practice-select-all');
    const deselAll = document.getElementById('practice-deselect-all');
    if (selAll) {
      selAll.addEventListener('click', function () {
        document.querySelectorAll('.practice-module-cb').forEach(function (cb) { cb.checked = true; });
      });
    }
    if (deselAll) {
      deselAll.addEventListener('click', function () {
        document.querySelectorAll('.practice-module-cb').forEach(function (cb) { cb.checked = false; });
      });
    }
  }

  /**
   * Start a practice session based on user selections.
   */
  function startPractice() {
    // Get selected modules
    const checkboxes = document.querySelectorAll('.practice-module-cb:checked');
    const selectedModuleIds = [];
    checkboxes.forEach(function (cb) {
      selectedModuleIds.push(cb.value);
    });

    if (selectedModuleIds.length === 0) {
      showModal('Atención', 'Selecciona al menos un módulo para practicar.');
      return;
    }

    // Get difficulty (from the HTML radio group named "difficulty")
    const diffRadio = document.querySelector('input[name="difficulty"]:checked');
    const diffValue = diffRadio ? diffRadio.value : 'todos';

    // Get question count (from the HTML radio group named "question-count")
    const countRadio = document.querySelector('input[name="question-count"]:checked');
    const countValue = countRadio ? parseInt(countRadio.value, 10) : 10;

    // Pool questions
    let pool = [];
    selectedModuleIds.forEach(function (modId) {
      const mod = findModule(modId);
      if (mod && mod.lessons) {
        mod.lessons.forEach(function (lesson) {
          if (lesson.questions) {
            lesson.questions.forEach(function (q) {
              var diffMap = { 'facil': 1, 'medio': 2, 'dificil': 3 };
              var targetDiff = diffMap[diffValue] || null;
              if (diffValue === 'todos' || diffValue === 'all' || !targetDiff || q.difficulty === targetDiff) {
                pool.push(q);
              }
            });
          }
        });
      }
    });

    if (pool.length === 0) {
      showModal('Sin preguntas', 'No se encontraron preguntas con los filtros seleccionados. Intenta con otra combinación.');
      return;
    }

    // Shuffle and take N
    pool = shuffle(pool);
    if (countValue > 0 && countValue < pool.length) {
      pool = pool.slice(0, countValue);
    }

    // Start the practice session (reuses lesson UI)
    currentSession = {
      type: 'practice',
      moduleId: null,
      lessonId: null,
      questions: pool,
      currentIndex: 0,
      answers: [],
      correctCount: 0,
      lives: Infinity,
      startTime: Date.now(),
      xpEarned: 0,
      selectedOption: null
    };

    // Show lesson view
    VIEW_IDS.forEach(function (id) {
      const viewEl = document.getElementById(id);
      if (viewEl) viewEl.classList.add('hidden');
    });
    showView('view-lesson');

    renderQuestion();
    updateNav();
  }

  // ==========================================================================
  // 15. RENDERIZADO: RESULTADOS
  // ==========================================================================

  /**
   * Render the results view after a lesson, practice, or simulacro.
   */
  function renderResults() {
    if (!lastResultsData) {
      // Nothing to show
      const container = el('results-score');
      if (container) {
        container.innerHTML = '<p style="text-align:center;color:#888;">No hay resultados para mostrar.</p>';
      }
      return;
    }

    const data = lastResultsData;
    const scoreEl = el('results-score');
    const reviewEl = el('results-review');

    if (scoreEl) {
      const scoreColor = data.score >= 60 ? '#58CC02' : '#FF4B4B';
      const passedText = data.failed ? '❌ No completada' : (data.score >= 60 ? '✅ ¡Aprobado!' : '⚠️ Necesitas mejorar');

      let header = '';

      if (data.type === 'simulacro') {
        header =
          '<h2 style="margin-bottom:1rem;">' + escapeHtml(data.simulacroName || 'Simulacro') + '</h2>' +
          '<p style="font-size:0.9rem;color:#888;">Puntaje mínimo para aprobar: ' + (data.passingScore || 60) + '%</p>';
      } else if (data.type === 'infinite') {
        header = '<h2 style="margin-bottom:1rem;color:#FFC800;">⚡ Sesión de Práctica Infinita Finalizada</h2>';
      } else if (data.type === 'practice') {
        header = '<h2 style="margin-bottom:1rem;">Resultado de Práctica</h2>';
      } else {
        header = '<h2 style="margin-bottom:1rem;">Resultado de Lección</h2>';
      }

      scoreEl.innerHTML =
        header +
        '<div style="width:150px;height:150px;border-radius:50%;border:8px solid ' + scoreColor + ';display:flex;align-items:center;justify-content:center;margin:1.5rem auto;">' +
          '<span style="font-size:2.5rem;font-weight:800;color:' + scoreColor + ';">' + data.score + '%</span>' +
        '</div>' +
        '<p style="text-align:center;font-size:1.2rem;font-weight:600;margin-bottom:0.5rem;">' + passedText + '</p>' +
        '<div style="display:flex;justify-content:center;gap:2rem;margin:1.5rem 0;">' +
          '<div class="stats-card" style="text-align:center;">' +
            '<span style="font-size:1.5rem;">⭐</span>' +
            '<p style="font-weight:700;margin:0.25rem 0 0;">' + data.xpEarned + ' XP</p>' +
          '</div>' +
          '<div class="stats-card" style="text-align:center;">' +
            '<span style="font-size:1.5rem;">✅</span>' +
            '<p style="font-weight:700;margin:0.25rem 0 0;">' + data.correctCount + '/' + data.totalQuestions + '</p>' +
          '</div>' +
          '<div class="stats-card" style="text-align:center;">' +
            '<span style="font-size:1.5rem;">⏱️</span>' +
            '<p style="font-weight:700;margin:0.25rem 0 0;">' + formatTime(data.elapsedSeconds) + '</p>' +
          '</div>' +
        '</div>' +
        '<div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:1rem;">' +
          '<button id="results-home-btn" class="option-btn" style="background:#58CC02;color:#fff;padding:0.75rem 2rem;border:none;border-radius:12px;font-weight:700;cursor:pointer;">Volver al Inicio</button>' +
          (data.type !== 'practice' ? '<button id="results-retry-btn" class="option-btn" style="background:#1CB0F6;color:#fff;padding:0.75rem 2rem;border:none;border-radius:12px;font-weight:700;cursor:pointer;">Repetir</button>' : '') +
        '</div>';

      // Bind results buttons
      const homeBtn = document.getElementById('results-home-btn');
      if (homeBtn) {
        homeBtn.addEventListener('click', function () {
          window.location.hash = '#home';
        });
      }

      const retryBtn = document.getElementById('results-retry-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', function () {
          if (data.type === 'simulacro') {
            window.location.hash = '#simulacro/' + data.simulacroId;
          } else if (data.type === 'lesson' && data.moduleId && data.lessonId) {
            window.location.hash = '#lesson/' + data.moduleId + '/' + data.lessonId;
          } else {
            window.location.hash = '#home';
          }
        });
      }
    }

    // Answer review
    if (reviewEl && data.answers) {
      reviewEl.innerHTML = '<h3 style="margin-bottom:1rem;">Revisión de Respuestas</h3>';

      data.answers.forEach(function (ans, idx) {
        const card = document.createElement('div');
        card.style.cssText = 'border:2px solid ' + (ans.isCorrect ? '#58CC02' : '#FF4B4B') + ';border-radius:12px;padding:1rem;margin-bottom:1rem;background:' + (ans.isCorrect ? '#F7FFF0' : '#FFF5F5') + ';';

        let answerHtml = '';

        if (ans.type === 'order-code') {
          const userOrderStr = Array.isArray(ans.userAnswer) ? ans.userAnswer.map(function (i) { return ans.options[i]; }).join(' → ') : 'Sin respuesta';
          const correctOrderStr = Array.isArray(ans.correct) ? ans.correct.map(function (i) { return ans.options[i]; }).join(' → ') : '';
          answerHtml =
            '<p><strong>Tu orden:</strong> ' + escapeHtml(userOrderStr) + '</p>' +
            (!ans.isCorrect ? '<p><strong>Orden correcto:</strong> ' + escapeHtml(correctOrderStr) + '</p>' : '');
        } else if (ans.type === 'write-code' || ans.type === 'write-answer') {
          const userAnswerText = ans.userAnswer || '<i>(vacío)</i>';
          let expectedStr = '';
          if (Array.isArray(ans.acceptedAnswers)) {
            expectedStr = ans.acceptedAnswers.join('  o  ');
          } else if (typeof ans.correct === 'string') {
            expectedStr = ans.correct;
          } else if (Array.isArray(ans.options) && typeof ans.correct === 'number') {
            expectedStr = ans.options[ans.correct];
          }
          answerHtml =
            '<p><strong>Lo que escribiste:</strong> <code style="font-family:monospace;background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:4px;">' + escapeHtml(userAnswerText) + '</code></p>' +
            (!ans.isCorrect ? '<p style="color:#58CC02;"><strong>Respuesta esperada:</strong> <code style="font-family:monospace;background:rgba(88,204,2,0.15);padding:2px 6px;border-radius:4px;font-weight:bold;">' + escapeHtml(expectedStr) + '</code></p>' : '');
        } else {
          const userAnswerText = (ans.userAnswer !== null && ans.userAnswer !== undefined && ans.options && ans.options[ans.userAnswer]) ? ans.options[ans.userAnswer] : 'Sin respuesta';
          const correctAnswerText = (ans.correct !== null && ans.correct !== undefined && ans.options && ans.options[ans.correct]) ? ans.options[ans.correct] : '';
          answerHtml =
            '<p><strong>Tu respuesta:</strong> ' + escapeHtml(userAnswerText) + '</p>' +
            (!ans.isCorrect ? '<p><strong>Respuesta correcta:</strong> ' + escapeHtml(correctAnswerText) + '</p>' : '');
        }

        card.innerHTML =
          '<div style="display:flex;align-items:flex-start;gap:0.75rem;">' +
            '<span style="font-size:1.2rem;">' + (ans.isCorrect ? '✅' : '❌') + '</span>' +
            '<div style="flex:1;">' +
              '<p style="font-weight:600;margin:0 0 0.5rem;">Pregunta ' + (idx + 1) + ': ' + escapeHtml(ans.question) + '</p>' +
              (ans.code ? '<pre class="code-block" style="margin-bottom:0.5rem;"><code>' + highlightCode(ans.code) + '</code></pre>' : '') +
              answerHtml +
              (ans.explanation ? '<p style="color:#666;font-size:0.85rem;margin-top:0.5rem;font-style:italic;">💡 ' + escapeHtml(ans.explanation) + '</p>' : '') +
            '</div>' +
          '</div>';

        reviewEl.appendChild(card);
      });
    }
  }

  // ==========================================================================
  // 16. RENDERIZADO: PERFIL
  // ==========================================================================

  /**
   * Render the profile view with stats, module progress, and achievements.
   */
  function renderProfile() {
    const statsEl = el('profile-stats');
    const modulesEl = el('profile-modules');
    const achievementsEl = el('profile-achievements');

    // Stats cards
    if (statsEl) {
      const accuracy = state.totalAnswered > 0 ? Math.round((state.totalCorrect / state.totalAnswered) * 100) : 0;
      const completedCount = Object.keys(state.completedLessons).length;

      statsEl.innerHTML =
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem;margin-bottom:2rem;">' +
          '<div class="stats-card">' +
            '<span style="font-size:2rem;">⭐</span>' +
            '<p style="font-size:1.5rem;font-weight:800;margin:0.25rem 0 0;">' + state.xp + '</p>' +
            '<p style="color:#888;font-size:0.85rem;margin:0;">XP Total</p>' +
          '</div>' +
          '<div class="stats-card">' +
            '<span style="font-size:2rem;">🔥</span>' +
            '<p style="font-size:1.5rem;font-weight:800;margin:0.25rem 0 0;">' + state.streak + '</p>' +
            '<p style="color:#888;font-size:0.85rem;margin:0;">Racha actual</p>' +
          '</div>' +
          '<div class="stats-card">' +
            '<span style="font-size:2rem;">📚</span>' +
            '<p style="font-size:1.5rem;font-weight:800;margin:0.25rem 0 0;">' + completedCount + '</p>' +
            '<p style="color:#888;font-size:0.85rem;margin:0;">Lecciones completadas</p>' +
          '</div>' +
          '<div class="stats-card">' +
            '<span style="font-size:2rem;">🎯</span>' +
            '<p style="font-size:1.5rem;font-weight:800;margin:0.25rem 0 0;">' + accuracy + '%</p>' +
            '<p style="color:#888;font-size:0.85rem;margin:0;">Precisión</p>' +
          '</div>' +
        '</div>';
    }

    // Module progress list
    if (modulesEl) {
      modulesEl.innerHTML = '<h3 style="margin-bottom:1rem;">Progreso por Módulo</h3>';

      if (MODULES.length === 0) {
        modulesEl.innerHTML += '<p style="color:#888;">No hay módulos disponibles.</p>';
      } else {
        MODULES.forEach(function (mod) {
          const progress = getModuleProgress(mod.id);
          const level = getModuleLevel(progress);

          const card = document.createElement('div');
          card.style.cssText = 'display:flex;align-items:center;gap:1rem;padding:0.75rem;border-radius:12px;background:#f9f9f9;margin-bottom:0.5rem;';
          card.innerHTML =
            '<span style="font-size:1.5rem;">' + (mod.icon || '📚') + '</span>' +
            '<div style="flex:1;">' +
              '<p style="font-weight:600;margin:0;">' + escapeHtml(mod.name) + '</p>' +
              '<div class="progress-bar" style="margin-top:0.25rem;">' +
                '<div class="progress-fill" style="width:' + progress + '%;"></div>' +
              '</div>' +
            '</div>' +
            '<span style="font-weight:600;font-size:0.85rem;">' + level.badge + ' ' + level.name + '</span>';

          modulesEl.appendChild(card);
        });
      }
    }

    // Achievements
    if (achievementsEl) {
      achievementsEl.innerHTML = '<h3 style="margin-bottom:1rem;">Logros</h3>';

      const grid = document.createElement('div');
      grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem;';

      ACHIEVEMENTS.forEach(function (ach) {
        const earned = state.achievements.indexOf(ach.id) !== -1;
        const card = document.createElement('div');
        card.className = 'achievement-card' + (earned ? ' achievement-card--earned' : '');
        card.innerHTML =
          '<span style="font-size:2rem;' + (earned ? '' : 'filter:grayscale(100%);opacity:0.5;') + '">' + ach.icon + '</span>' +
          '<p style="font-weight:600;margin:0.25rem 0 0;font-size:0.9rem;">' + escapeHtml(ach.name) + '</p>' +
          '<p style="color:#888;font-size:0.8rem;margin:0.25rem 0 0;">' + escapeHtml(ach.description) + '</p>';
        grid.appendChild(card);
      });

      achievementsEl.appendChild(grid);
    }
  }

  // ==========================================================================
  // 16b. RENDERIZADO: SIMULACRO SELECT
  // ==========================================================================

  /**
   * Render the simulacro selection grid (Official PUC exams tab).
   */
  function renderSimulacroSelect() {
    const grid = el('simulacro-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (SIMULACROS.length === 0) {
      grid.innerHTML = '<p style="text-align:center;color:#888;padding:2rem;">No hay simulacros disponibles.</p>';
      return;
    }

    SIMULACROS.forEach(function (sim) {
      const result = state.simulacroResults[sim.id];
      const card = document.createElement('div');
      card.className = 'simulacro-card' +
        (result ? (result.passed ? ' simulacro-card--passed' : ' simulacro-card--failed') : '');
      card.style.cursor = 'pointer';

      let statusHtml = '';
      if (result) {
        statusHtml =
          '<div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid rgba(255,255,255,0.1);">' +
            '<span style="font-weight:600;">' + (result.passed ? '✅ Aprobado' : '❌ Reprobado') + '</span>' +
            '<span style="float:right;font-weight:700;color:' + (result.passed ? '#58CC02' : '#FF4B4B') + ';">' + result.score + '%</span>' +
          '</div>';
      }

      card.innerHTML =
        '<h3 style="margin:0 0 0.5rem;">' + escapeHtml(sim.name) + '</h3>' +
        '<p style="color:var(--text-secondary);margin:0 0 0.5rem;">' + escapeHtml(sim.description || '') + '</p>' +
        '<p style="color:var(--text-muted);font-size:0.85rem;margin:0;">⏱️ ' + (sim.timeMinutes || 90) + ' min · ' + (sim.questions ? sim.questions.length : '?') + ' preguntas · Mínimo: ' + (sim.passingScore || 60) + '%</p>' +
        statusHtml;

      card.addEventListener('click', function () {
        window.location.hash = '#simulacro/' + sim.id;
      });

      grid.appendChild(card);
    });
  }

  /**
   * Populate the custom simulacro module checkboxes.
   */
  function populateSimCustomModules() {
    var container = el('sim-custom-modules');
    if (!container || container.childElementCount > 0) return; // Already populated

    MODULES.forEach(function (mod) {
      var label = document.createElement('label');
      label.className = 'practice-checkbox';
      label.innerHTML =
        '<input type="checkbox" class="sim-custom-module-cb" value="' + mod.id + '" checked style="width:20px;height:20px;flex-shrink:0;accent-color:' + (mod.color || '#FF9600') + ';cursor:pointer;">' +
        '<span style="font-size:1.4rem;">' + (mod.icon || '📚') + '</span>' +
        '<span class="practice-checkbox-label" style="color:var(--text-primary);font-weight:600;">' + escapeHtml(mod.name) + '</span>';
      container.appendChild(label);
    });

    // Wire up Select All / Deselect All for custom sim
    var selAll = el('sim-select-all');
    var deselAll = el('sim-deselect-all');
    if (selAll) {
      selAll.addEventListener('click', function () {
        document.querySelectorAll('.sim-custom-module-cb').forEach(function (cb) { cb.checked = true; });
      });
    }
    if (deselAll) {
      deselAll.addEventListener('click', function () {
        document.querySelectorAll('.sim-custom-module-cb').forEach(function (cb) { cb.checked = false; });
      });
    }
  }

  /**
   * Start a custom simulacro session built from module selections.
   */
  function startCustomSimulacro() {
    var selectedModuleIds = [];
    document.querySelectorAll('.sim-custom-module-cb:checked').forEach(function (cb) {
      selectedModuleIds.push(cb.value);
    });

    if (selectedModuleIds.length === 0) {
      showModal('Atención', 'Selecciona al menos un módulo para el simulacro.');
      return;
    }

    var timeRadio = document.querySelector('input[name="sim-custom-time"]:checked');
    var timeMinutes = timeRadio ? parseInt(timeRadio.value, 10) : 60;

    var countRadio = document.querySelector('input[name="sim-custom-count"]:checked');
    var questionCount = countRadio ? parseInt(countRadio.value, 10) : 10;

    // Pool questions from selected modules (all difficulty levels, all types)
    var pool = [];
    selectedModuleIds.forEach(function (modId) {
      var mod = findModule(modId);
      if (mod && mod.lessons) {
        mod.lessons.forEach(function (lesson) {
          if (lesson.questions) {
            lesson.questions.forEach(function (q) {
              pool.push(q);
            });
          }
        });
      }
    });

    // Also add matching questions from SIMULACROS bank
    SIMULACROS.forEach(function (sim) {
      if (sim.questions) {
        sim.questions.forEach(function (q) {
          pool.push(q);
        });
      }
    });

    if (pool.length === 0) {
      showModal('Sin preguntas', 'No se encontraron preguntas para los módulos seleccionados.');
      return;
    }

    pool = shuffle(pool);
    if (questionCount > 0 && questionCount < pool.length) {
      pool = pool.slice(0, questionCount);
    }

    // Clear any previous timer
    if (simulacroTimerInterval) {
      clearInterval(simulacroTimerInterval);
      simulacroTimerInterval = null;
    }

    var customId = 'custom_' + Date.now();
    currentSession = {
      type: 'simulacro',
      simulacroId: customId,
      simulacroName: 'Simulacro Personalizado (' + selectedModuleIds.length + ' módulos)',
      passingScore: 60,
      questions: pool,
      currentIndex: 0,
      answers: new Array(pool.length).fill(null),
      startTime: Date.now(),
      timeRemaining: timeMinutes * 60,
      xpEarned: 0
    };

    showView('view-simulacro');
    startSimulacroTimer();
    renderSimulacroQuestion();
    renderSimulacroQuestionMap();
    updateNav();
  }

  // ==========================================================================
  // 17. LISTENERS DE EVENTOS
  // ==========================================================================

  /**
   * Set up all event listeners using event delegation where appropriate.
   */
  function setupEventListeners() {
    // Check answer button
    const checkBtn = el('check-btn');
    if (checkBtn) {
      checkBtn.addEventListener('click', function () {
        checkAnswer();
      });
    }

    // Feedback continue button
    const feedbackContinue = el('feedback-continue');
    if (feedbackContinue) {
      feedbackContinue.addEventListener('click', function () {
        continueAfterFeedback();
      });
    }

    // Close lesson button
    const closeLesson = el('close-lesson');
    if (closeLesson) {
      closeLesson.addEventListener('click', function () {
        if (currentSession) {
          if (currentSession.type === 'infinite') {
            showModal(
              '¿Terminar Práctica Infinita?',
              '¿Deseas terminar tu sesión ahora y ver tus resultados? Has acumulado ' + currentSession.xpEarned + ' XP con ' + currentSession.correctCount + ' respuestas correctas.',
              function () {
                endLesson(false);
              }
            );
          } else {
            showModal(
              '¿Salir de la lección?',
              '¿Seguro que quieres salir? Perderás tu progreso en esta lección.',
              function () {
                const targetMod = currentSession.moduleId;
                currentSession = null;
                updateNav();
                if (targetMod) {
                  window.location.hash = '#module/' + targetMod;
                } else {
                  window.location.hash = '#home';
                }
              }
            );
          }
        } else {
          window.location.hash = '#home';
        }
      });
    }

    // Nav home button
    const navHome = el('nav-home-btn');
    if (navHome) {
      navHome.addEventListener('click', function () {
        // If in a session, confirm first
        if (currentSession) {
          showModal(
            '¿Salir?',
            '¿Seguro que quieres salir? Perderás tu progreso actual.',
            function () {
              if (simulacroTimerInterval) {
                clearInterval(simulacroTimerInterval);
                simulacroTimerInterval = null;
              }
              currentSession = null;
              updateNav();
              window.location.hash = '#home';
            }
          );
        } else {
          window.location.hash = '#home';
        }
      });
    }

    // Nav profile button
    const navProfile = el('nav-profile-btn');
    if (navProfile) {
      navProfile.addEventListener('click', function () {
        if (currentSession) {
          showModal(
            '¿Salir?',
            '¿Seguro que quieres salir? Perderás tu progreso actual.',
            function () {
              if (simulacroTimerInterval) {
                clearInterval(simulacroTimerInterval);
                simulacroTimerInterval = null;
              }
              currentSession = null;
              updateNav();
              window.location.hash = '#profile';
            }
          );
        } else {
          window.location.hash = '#profile';
        }
      });
    }

    // Back to home (module view)
    const backHome = el('back-to-home');
    if (backHome) {
      backHome.addEventListener('click', function () {
        window.location.hash = '#home';
      });
    }

    // Home bottom navigation buttons
    const goSimulacros = el('go-simulacros');
    if (goSimulacros) {
      goSimulacros.addEventListener('click', function () {
        window.location.hash = '#simulacros';
      });
    }
    const goPractice = el('go-practice');
    if (goPractice) {
      goPractice.addEventListener('click', function () {
        window.location.hash = '#practice';
      });
    }

    // Navbar quick-access buttons
    const navSimulacrosBtn = el('nav-simulacros-btn');
    if (navSimulacrosBtn) {
      navSimulacrosBtn.addEventListener('click', function () {
        window.location.hash = '#simulacros';
      });
    }
    const navPracticeBtn = el('nav-practice-btn');
    if (navPracticeBtn) {
      navPracticeBtn.addEventListener('click', function () {
        window.location.hash = '#practice';
      });
    }

    // Custom simulacro start button
    const startCustomSimBtn = el('start-custom-simulacro');
    if (startCustomSimBtn) {
      startCustomSimBtn.addEventListener('click', function () {
        startCustomSimulacro();
      });
    }

    // Simulacro tab switcher (Official vs Custom)
    var simTabOfficial = el('sim-tab-official');
    var simTabCustom = el('sim-tab-custom');
    var simOfficialContainer = el('sim-official-container');
    var simCustomContainer = el('sim-custom-container');
    if (simTabOfficial && simTabCustom) {
      simTabOfficial.addEventListener('click', function () {
        simTabOfficial.classList.add('option-btn--selected');
        simTabCustom.classList.remove('option-btn--selected');
        if (simOfficialContainer) simOfficialContainer.classList.remove('hidden');
        if (simCustomContainer) simCustomContainer.classList.add('hidden');
      });
      simTabCustom.addEventListener('click', function () {
        simTabCustom.classList.add('option-btn--selected');
        simTabOfficial.classList.remove('option-btn--selected');
        if (simCustomContainer) simCustomContainer.classList.remove('hidden');
        if (simOfficialContainer) simOfficialContainer.classList.add('hidden');
        // Populate module checkboxes for custom simulacro
        populateSimCustomModules();
      });
    }

    // Start practice button
    const startPracticeBtn = el('start-practice');
    if (startPracticeBtn) {
      startPracticeBtn.addEventListener('click', function () {
        startPractice();
      });
    }

    // Simulacro navigation buttons
    const simPrevBtn = el('sim-prev');
    if (simPrevBtn) {
      simPrevBtn.addEventListener('click', function () {
        simPrev();
      });
    }

    const simNextBtn = el('sim-next');
    if (simNextBtn) {
      simNextBtn.addEventListener('click', function () {
        simNext();
      });
    }

    // Simulacro submit button
    const simSubmitBtn = el('sim-submit');
    if (simSubmitBtn) {
      simSubmitBtn.addEventListener('click', function () {
        submitSimulacro(false);
      });
    }

    // Modal overlay click to close (only if no confirm callback)
    const modalOverlay = el('modal-overlay');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
          // Only close if there's no confirm button (meaning it's a simple info modal)
          const confirmBtn = document.getElementById('modal-confirm-btn');
          if (!confirmBtn) {
            modalOverlay.classList.add('hidden');
          }
        }
      });
    }

    // ------------------------------------------------------------------------
    // Secret Cheat: Type 'damian' to toggle God Mode
    // ------------------------------------------------------------------------
    let secretKeyBuffer = '';
    window.addEventListener('keydown', function (e) {
      if (!e.key || e.key.length !== 1) return;
      // Do not capture if typing in an input or textarea
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

      secretKeyBuffer += e.key.toLowerCase();
      if (secretKeyBuffer.length > 15) {
        secretKeyBuffer = secretKeyBuffer.slice(-15);
      }
      if (secretKeyBuffer.endsWith('damian')) {
        toggleSecretGodMode();
        secretKeyBuffer = '';
      }
    }, true);

    function toggleSecretGodMode() {
      infiniteLivesSecret = !infiniteLivesSecret;
      try {
        localStorage.setItem('duoprogra_secret_godmode', infiniteLivesSecret ? 'true' : 'false');
      } catch (err) {}
      updateNav();

      // Refresh current view if we are on home or module view to update locks
      const hash = window.location.hash || '#home';
      if (hash === '#home' || hash === '#/' || hash === '') {
        renderHome();
      } else if (hash.indexOf('#module/') === 0) {
        renderModule(hash.split('/')[1]);
      }

      const lessonLives = el('lesson-lives');
      if (lessonLives) {
        if (infiniteLivesSecret) {
          lessonLives.innerHTML = '❤️ ♾️ <span style="font-size:0.8rem;color:#FFC800;font-weight:bold;">MODO DIOS</span>';
        } else if (currentSession && currentSession.type !== 'practice') {
          lessonLives.innerHTML = '❤️'.repeat(Math.max(0, currentSession.lives)) + '🖤'.repeat(Math.max(0, state.maxLives - currentSession.lives));
        }
      }

      showModal(
        infiniteLivesSecret ? '⚡ ¡MODO DIOS ACTIVADO! ⚡' : '🛡️ Modo Dios Desactivado',
        infiniteLivesSecret
          ? '<p style="font-size:1.05rem;color:#58CC02;margin-bottom:0.75rem;">¡Bienvenido, <b>Damián</b>! Tienes poderes totales de administrador:</p>' +
            '<ul style="text-align:left;color:#E6EDF3;margin:0.5rem 0 1rem 1.5rem;line-height:1.6;">' +
            '<li>❤️ <b>Vidas Infinitas:</b> Nunca perderás vidas en ninguna lección.</li>' +
            '<li>🔓 <b>Acceso Total Desbloqueado:</b> Todos los 11 módulos y lecciones están abiertos inmediatamente sin candados.</li>' +
            '</ul>'
          : '<p style="color:#A0B4BC;">El modo Dios ha sido desactivado. Se restauró el sistema normal de 5 vidas y candados de progreso.</p>'
      );
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
      // Enter to check answer or continue
      if (e.key === 'Enter') {
        if (currentSession && currentSession.type !== 'simulacro') {
          const feedbackOverlay = el('feedback-overlay');
          if (feedbackOverlay && !feedbackOverlay.classList.contains('hidden')) {
            continueAfterFeedback();
          } else {
            const checkBtnEl = el('check-btn');
            if (checkBtnEl && !checkBtnEl.disabled) {
              checkAnswer();
            }
          }
        }
      }

      // Number keys 1-9 for quick option selection
      if (currentSession && e.key >= '1' && e.key <= '9') {
        const q = currentSession.questions[currentSession.currentIndex];
        if (q && q.type !== 'order-code') {
          const idx = parseInt(e.key, 10) - 1;
          if (q.options && idx < q.options.length) {
            if (currentSession.type === 'simulacro') {
              selectSimulacroOption(idx);
            } else {
              // Only if feedback is not showing
              const feedbackOverlay = el('feedback-overlay');
              if (!feedbackOverlay || feedbackOverlay.classList.contains('hidden')) {
                selectOption(idx);
              }
            }
          }
        }
      }

      // Escape to close modal
      if (e.key === 'Escape') {
        hideModal();
      }

      // Arrow keys for simulacro navigation
      if (currentSession && currentSession.type === 'simulacro') {
        if (e.key === 'ArrowLeft') simPrev();
        if (e.key === 'ArrowRight') simNext();
      }
    });
  }

  // ==========================================================================
  // 18. INICIALIZACIÓN
  // ==========================================================================

  document.addEventListener('DOMContentLoaded', function () {
    loadState();
    checkStreak();
    setupRouter();
    setupEventListeners();
    updateNav();
    navigate(window.location.hash || '#home');
  });

})();
