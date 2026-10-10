class RotatingText extends HTMLElement {

    wait = 1200;
    erase = 40;
    type = 80;
    pause = 1200;

    started = false;
    words = [];
    output = null;
    word = 0;
    count = 0;
    deleting = true;
    timer = null;

    ms(name, fallback) {
        const value = Number(this.getAttribute(name) ?? fallback);
        return Number.isFinite(value) && value >= 0 ? value : fallback;
    }

    connectedCallback() {
        if (this.started) return;
        const nodes = [...this.querySelectorAll(
            this.getAttribute("selector") || "span"
        )];
        if (!nodes.length) return;

        this.words = [];
        for (const node of nodes) {
            const letters = Array.from(node.textContent);
            if (!letters.length) return;
            this.words.push(letters);
        }
        this.started = true;

        this.wait = this.ms("wait", this.wait);
        this.erase = this.ms("delete-speed", this.erase);
        this.type = this.ms("type-speed", this.type);
        this.pause = this.ms("pause", this.pause);

        this.output = nodes[0];
        for (const node of nodes.slice(1)) node.remove();
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        this.count = this.words[0].length;
        this.schedule(this.wait);
    }

    schedule(delay) {
        this.timer = setTimeout(this.tick.bind(this), delay);
    }

    tick() {
        this.count += this.deleting ? -1 : 1;
        this.output.textContent = this.words[this.word]
            .slice(0, this.count).join("");

        let delay = this.deleting ? this.erase : this.type;
        if (this.deleting && this.count === 0) {
            this.deleting = false;
            this.word = (this.word + 1) % this.words.length;
            delay = this.type;
        } else if (!this.deleting &&
            this.count === this.words[this.word].length) {
            this.deleting = true;
            delay = this.pause;
        }
        this.schedule(delay);
    }

    disconnectedCallback() {
        clearTimeout(this.timer);
    }
}
customElements.define("rotating-text", RotatingText);
