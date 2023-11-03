export class BasePage {
    constructor(url) {
        this.url = url; 
    }

    async open() {
        await browser.url(this.url);
    }
}

