const sleeper = ms =>
  x => new Promise(resolve => setTimeout(() => resolve(x), ms))
export { sleeper as default }
