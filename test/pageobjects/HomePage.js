import BasePage from "./BasePage.js";

class HomePage extends BasePage {
    constructor() {
        super('https://www.epam.com');
    }

    get languageSelectorButton() {
        return $('button.location-selector__button');
    }
  
    get languageOptionUA() {
        return $('a.location-selector__link[href="https://careers.epam.ua"][lang="uk"]');
    }
  
    get pageTitle() {
        return browser.getTitle();
    }

    get policiesList() {
        return $('.footer-links .policies');
    }

    get policyItemsLeft() {
        return $$('ul.policies-left a.fat-links');
    }

    get policyItemsRight() {
        return $$('ul.policies-right a.fat-links');
    }

    get searchButton() {
        return $('.header-search-ui button.header-search__button')
    }
    
    get searchInput() {
        return $('input#new_form_search');
    }

    get findButton() {
        return $('button.custom-button');
    }
    
    async areAllPoliciesPresent() {
      const expectedPolicies = [
          'INVESTORS',
          'COOKIE POLICY',
          'OPEN SOURCE',
          'APPLICANT PRIVACY NOTICE',
          'PRIVACY POLICY',
          'WEB ACCESSIBILITY',
      ];
  
      const policyItemTexts = await Promise.all(this.policyItemsLeft.concat(this.policyItemsRight).map(async (element) => {
        return element.getText();
    }));

        return expectedPolicies.every(policy => policyItemTexts.includes(policy));
    }
  
    async getCurrentThemeMode() {
        const bodyElement = $('body');
        const bodyClasses = await bodyElement.getAttribute('class');

        if (bodyClasses.includes('dark-mode')) {
            return 'Dark';
        } else if (bodyClasses.includes('light-mode')) {
            return 'Light';
        }
    }

    async closeCookiesPopup() {
        const cookiesPopup = $('#onetrust-banner-sdk');
        if (cookiesPopup.isDisplayed()) {
          const closeButton = $('#onetrust-accept-btn-handler');
          closeButton.waitForClickable();
          closeButton.click();
        }
      }

    async switchTheme() {
        const switchButton = $('.theme-switcher-ui .theme-switcher .switch');
        await switchButton.waitForDisplayed({ timeout: 3000 });
        await switchButton.click(); 
    }

    async changeLanguageToUA() {
        await this.languageSelectorButton.waitForClickable({ timeout: 3000 });
        await this.languageSelectorButton.click(); 
        await this.languageOptionUA.click(); 
    }

    async waitForPageToLoadUA() {
        browser.waitUntil(() => {
            return browser.getUrl() === 'https://careers.epam.ua/';
        }, {
            timeout: 10000,
            timeoutMsg: 'Page did not load after language change',
            interval: 1000,
        });
    }
}

export default new HomePage();
