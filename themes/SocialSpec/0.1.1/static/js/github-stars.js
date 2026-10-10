class GitHubStars extends HTMLElement {
    async connectedCallback() {
        if (this.loading) return

        const [owner, repository, extra] = (this.getAttribute('repo') || '').split('/')
        if (!owner || !repository || extra) return

        this.loading = true
        try {
            const response = await fetch(
                `https://api.github.com/repos/${ encodeURIComponent(owner) }/${ encodeURIComponent(repository) }`,
                { headers: { Accept: 'application/vnd.github+json' } },
            )
            if (!response.ok) return

            const { stargazers_count } = await response.json()
            if (!Number.isInteger(stargazers_count)) return

            this.innerHTML = String(stargazers_count)
        } catch {
            // Keep the server-rendered fallback when GitHub is unavailable.
        } finally {
            this.loading = false
        }
    }
}

if (!customElements.get('github-stars')) {
    customElements.define('github-stars', GitHubStars)
}
