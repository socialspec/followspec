class HyperFeed extends HTMLElement {
    connectedCallback() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this, { once: true })
            return
        }

        this.ready()
    }

    disconnectedCallback() {
        this.controls?.removeEventListener('click', this)
        window.removeEventListener('hashchange', this)
    }

    handleEvent(event) {
        const eventName = event.type[0].toUpperCase() + event.type.slice(1)
        const handler = this[`on${ eventName }`]
        if (handler) handler.call(this, event)
    }

    onDOMContentLoaded() {
        this.ready()
    }

    onClick(event) {
        const filter = event.target.closest('a[data-tag]')
        if (!filter || !this.controls.contains(filter)) return

        event.preventDefault()
        window.location.hash = filter.dataset.tag === 'all' ? '' : filter.dataset.tag
        this.select(filter.dataset.tag)
    }

    onHashchange() {
        this.select(this.selectedTag)
    }

    ready() {
        this.controls = document.getElementById(this.getAttribute('controls'))
        if (!this.controls) return

        this.controls.addEventListener('click', this)
        window.addEventListener('hashchange', this)
        this.select(this.selectedTag)
    }

    get selectedTag() {
        return decodeURIComponent(window.location.hash.slice(1)) || 'all'
    }

    select(tag) {
        const selectedTag = tag || 'all'
        for (const item of this.querySelectorAll('[data-feed-item]')) {
            const tags = Array.from(item.querySelectorAll('[data-tag]'), (element) => element.dataset.tag)
            item.hidden = selectedTag !== 'all' && !tags.includes(selectedTag)
        }

        for (const filter of this.controls.querySelectorAll('a[data-tag]')) {
            filter.dataset.active = String(filter.dataset.tag === selectedTag)
            filter.toggleAttribute('aria-current', filter.dataset.tag === selectedTag)
        }
    }
}

customElements.define('hyper-feed', HyperFeed)
