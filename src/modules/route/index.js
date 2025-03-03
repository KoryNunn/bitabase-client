module.exports = function (opts, setRoute) {
  if (window.location.pathname === '/' && opts.defaultRoute !== '/') {
    setRoute(opts.defaultRoute)
    window.history.pushState({route: opts.defaultRoute}, document.title, opts.defaultRoute)
  }

  function changeRoute (newRoute) {
    return function (event) {
      event && event.preventDefault()
      let route = typeof newRoute === 'string' ? newRoute : newRoute()
      setRoute(route)
      if (route === '/' && opts.defaultRoute !== '/') {
        route = opts.defaultRoute
      }
      setRoute(route)
      window.history.pushState({route}, document.title, route)
    }
  }

  window.addEventListener('popstate', (event) => {
    if (event.state.route) {
      setRoute(event.state.route)
    }
  })

  return {
    changeRoute
  }
}
