import expect  from 'chai';
import HomePage from "../pageobjects/HomePage.js";

describe('Check the title is correct', () => {
    it('should open EPAM.com and verify the title', async () => {
      await HomePage.open()
      const title = await HomePage.pageTitle;
    expect(title).toEqual('EPAM | Software Engineering & Product Development Services');
    });
  });
  
  describe('Check the ability to switch Light / Dark mode', () => {
    it('the theme should be change to opposite', async () => {
      await HomePage.open()
      await HomePage.switchTheme();
      const updatedTheme = await HomePage.getCurrentThemeMode();
    expect(updatedTheme).toEqual('Light');
    });
  });

  describe('Check that allow to change language to UA', () => {
    it('The sites context should be changed to UA', async () => {
      await HomePage.open()
      await HomePage.changeLanguageToUA();
      await HomePage.waitForPageToLoadUA();  
      const url = browser.getUrl();
      expect(url).toContain('https://careers.epam.ua/');
    });
  });

  describe('Check the policies list', () => {
    it('The policies list should include all necessary information', async () => {
      await HomePage.open()
      const arePoliciesPresent = await HomePage.areAllPoliciesPresent();
      const expectedPolicies = [
        'INVESTORS',
        'COOKIE POLICY',
        'OPEN SOURCE',
        'APPLICANT PRIVACY NOTICE',
        'PRIVACY POLICY',
        'WEB ACCESSIBILITY',
    ];
      expect(arePoliciesPresent).toEqual(expectedPolicies)

    });
  });
      
  describe('Check the search function', () => {
      it('the site should show the search result', async () => {
        await HomePage.open()
        await HomePage.searchButton.click();
        await HomePage.searchInput.setValue('AI');
        await HomePage.findButton.click();
        const searchResults = await $('h2.search-results__counter');
      expect(searchResults).toHaveText('479 results for "AI"');

    });
  });