import BasePage from "./BasePage.js";

class HomePage extends BasePage {
    constructor() {
        super('https://www.epam.com');
    }

    get themeToggle() {
      return $('[theme-switcher]');
    }
  
    get languageSelectorButton() {
      return $('[location-selector__button-language]');
    }
  
    get languageOptionUA() {
      return $('[lang="uk"]');
    }
  
    get pageTitle() {
      return browser.getTitle();
    }
  
    switchTheme() {
      this.themeToggle.click();
    }
  
    changeLanguageToUA() {
      this.languageSelectorButton.click();
      this.languageOptionUA.click();
    }
  }
  
  export default new HomePage();

