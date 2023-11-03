import HomePage from "../pageobjects/HomePage.js";

describe('Check the title is correct', () => {
    it('should open EPAM.com and verify the title', async () => {
      await HomePage.open()
      const title = await HomePage.pageTitle;
    expect(title).to.equal('EPAM | Software Engineering & Product Development Services');
    });
  });
  
  
  
  