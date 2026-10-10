class SocialWidget extends HTMLElement {
  static observedAttributes = ["active-tab"]

  connectedCallback() {
    if (this.ready) return
    this.ready = true
    this.tabs = [...this.querySelectorAll("[data-profile-tab]")]
    this.panels = [...this.querySelectorAll("[data-profile-panel]")]
    if (!this.tabs.length) return
    this.addEventListener("click", this)
    this.render(this.activeTab || this.tabs[0].dataset.profileTab, false)
  }

  attributeChangedCallback(name, previous, current) {
    if (name === "active-tab" && previous !== current && this.ready) {
      this.render(current, true)
    }
  }

  get activeTab() {
    return this.getAttribute("active-tab")
  }

  set activeTab(tab) {
    this.setAttribute("active-tab", tab)
  }

  handleEvent(event) {
    if (event.type !== "click") return
    const tab = event.target.closest("[data-profile-tab]")
    if (tab && this.contains(tab)) {
      this.activeTab = tab.dataset.profileTab
      return
    }

    const follow = event.target.closest("[data-follow-toggle]")
    if (follow && this.contains(follow)) {
      const following = follow.dataset.following === "true"
      follow.dataset.following = String(!following)
      follow.setAttribute("aria-pressed", String(!following))
      follow.textContent = following ? "Follow" : "Following"
    }
  }

  render(tab, notify) {
    const selected = this.tabs.some((item) => item.dataset.profileTab === tab)
      ? tab
      : this.tabs[0].dataset.profileTab

    if (this.activeTab !== selected) {
      this.activeTab = selected
      return
    }

    this.tabs.forEach((item) => {
      const active = item.dataset.profileTab === selected
      item.setAttribute("aria-selected", String(active))
      item.tabIndex = active ? 0 : -1
    })
    this.panels.forEach((panel) => {
      panel.hidden = panel.dataset.profilePanel !== selected
    })

    const dm = this.querySelector("[data-profile-dm]")
    if (dm) dm.hidden = selected !== "contact"

    if (notify) {
      this.dispatchEvent(new CustomEvent("social-widget:tabchange", {
        bubbles: true,
        detail: { tab: selected },
      }))
    }
  }
}

customElements.define("social-widget", SocialWidget)
