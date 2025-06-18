// A simulated frontend application state manager
class StateManager {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = new Set();
  }

  getState() {
    return { ...this.state };
  }

  setState(partialState) {
    const prevState = this.getState();
    this.state = { ...this.state, ...partialState };
    this.notifyListeners(prevState, this.state);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners(prevState, newState) {
    for (const listener of this.listeners) {
      listener(prevState, newState);
    }
  }
}

// No one left a comment, so let's find out what this code does
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Example usage of the StateManager in a simulated component
const appState = new StateManager({ count: 0, theme: 'light' });

appState.subscribe((prev, next) => {
  if (prev.count !== next.count) {
    console.log('Count changed from', prev.count, 'to', next.count);
  }
  if (prev.theme !== next.theme) {
    console.log('Theme changed from', prev.theme, 'to', next.theme);
  }
});

// Simulate some automatic state changes
function simulateUserActions() {
  let count = 0;
  const interval = setInterval(() => {
    appState.setState({ count: ++count });
    if (count >= 5) clearInterval(interval);
  }, 500);
}

// Simulate DOM interactions (imaginary HTML elements)
document.getElementById('increment')?.addEventListener('click', () => {
  const current = appState.getState().count;
  appState.setState({ count: current + 1 });
});

document.getElementById('toggle-theme')?.addEventListener(
  'click',
  debounce(() => {
    const currentTheme = appState.getState().theme;
    appState.setState({ theme: currentTheme === 'light' ? 'dark' : 'light' });
  }, 300)
);

// Start the simulation
simulateUserActions();
