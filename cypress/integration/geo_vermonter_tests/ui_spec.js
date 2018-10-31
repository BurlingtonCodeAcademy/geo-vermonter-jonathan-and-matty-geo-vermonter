
describe('Smoke Test', function () {
  it('Just checks if tests run', function () {
    expect(true).to.equal(true);
  });
});

describe('On initial page load', function () {
  before(() => cy.visit('/'));

  ['#map', 'nav',
    '#info', '#info #latitude', '#info #longitude',
    '#info #county', '#score',
    'button#start', 'button#guess', 'button#quit', 'button#quit',
    'button#north', 'button#south', 'button#east', 'button#west',
    '#score'
  ].forEach((selector) => {
    it('Should have a ' + selector + ' element', function () {
      cy.get(selector); // this will fail if the given element is missing
    });
  });
});

describe('After clicking start', () => {
  before(() => {
    cy.visit('/');
    cy.get('button#start').click();
  });

  it('the Start button should be disabled', () => {
    cy.get('button#start').should('be.disabled');
  });

  it('the Quit button should be enabled', () => {
    cy.get('button#quit').should('be.enabled');
  });

  it('the Guess button should be enabled', () => {
    cy.get('button#guess').should('be.enabled');
  });

  describe('the info fields', () => {
    ['#info #latitude', '#info #longitude',
      '#info #county'
    ].forEach((selector) => {
      it(selector + ' element should contain a question mark', function () {
        cy.get(selector).then((element) => {
          assert.equal('?', element.text());
        });
      });
    });
  });
});

describe('when user clicks "I Give Up"', () => {
  it('shows latitude & longitude', function () {
    cy.get('#quit').click();
    cy.get('#info #latitude').contains(/(44.0280737|43.0266422|44.4618829|44.441726|44.6793495|44.8245124|44.7882463|44.599563|43.9956247|44.7752604|43.5745438|44.2591756|42.9943272|43.5908061)/);
    cy.get('#info #longitude').contains(/(-73.1700055|-73.1353424|-72.1159899|-73.1626965|-71.7801148|-72.9760341|-73.3209557|-72.6278814|-72.3912821|-72.3065957|-73.0462729|-72.664821|-72.7004238|-72.5531194)/);
  });
});

describe('when user clicks "Guess"', () => {
  it('asks "What county are we in?" and lists the counties', function () {
    cy.get('#start').click();
    cy.get('#guess').click();
    cy.get('#guess-wrapper').contains('What county are we in?');
    cy.get('#guesslist').contains('Addison');
  });
  it('shows a dialog box with "Guess" and "Cancel" buttons', function () {
      cy.get('button#guessbutton').contains('Guess');
      cy.get('button#cancelbutton').contains('Cancel');
  });
});
