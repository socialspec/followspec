document.querySelectorAll("header#hero").forEach((hero) => {
  const stage = hero.querySelector(".profile-stage")
  const widget = stage?.querySelector("social-widget")
  const files = [...(stage?.querySelectorAll("[data-demo-file]") || [])]
  if (!widget || !files.length) return

  const rail = files[0].closest(".spec-buttons-rail")
  const centerFile = (file, behavior = "smooth") => {
    if (!rail || !file || rail.scrollWidth <= rail.clientWidth) return
    rail.scrollTo({
      left: file.offsetLeft - (rail.clientWidth - file.offsetWidth) / 2,
      behavior,
    })
  }
  const sync = (tab, behavior) => {
    const active = files.find((file) => file.dataset.demoFile === tab)
    files.forEach((file) => {
      file.dataset.active = String(file === active)
    })
    centerFile(active, behavior)
  }

  widget.addEventListener("social-widget:tabchange", (event) => {
    const { tab } = event.detail
    widget.dataset.spec = tab
    sync(tab)
  })

  files.forEach((file) => file.addEventListener("click", () => {
    widget.dataset.spec = file.dataset.demoFile
    widget.setAttribute("active-tab", file.dataset.demoFile)
  }))

  let scrollTimer
  rail?.addEventListener("scroll", () => {
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
      const railCenter = rail.scrollLeft + rail.clientWidth / 2
      const nearest = files.reduce((best, file) => (
        Math.abs(file.offsetLeft + file.offsetWidth / 2 - railCenter) < Math.abs(best.offsetLeft + best.offsetWidth / 2 - railCenter)
          ? file
          : best
      ))
      if (nearest.dataset.demoFile === widget.getAttribute("active-tab")) return
      widget.dataset.spec = nearest.dataset.demoFile
      widget.setAttribute("active-tab", nearest.dataset.demoFile)
    }, 100)
  })

  sync(widget.getAttribute("active-tab"), "auto")
})
