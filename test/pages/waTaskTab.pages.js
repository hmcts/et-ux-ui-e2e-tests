const { I } = inject();
const testConfig = require('../../config');

module.exports = {

  et1VettingLink: '//a[contains(.,"ET1 Vetting")]',
  assignToMe:'#action_claim',
  caseListText: 'Case list',

  verifyWAtaskTabPage(submissionReference) {
    I.waitForElement(this.et1VettingLink, 20);
    I.click(this.et1VettingLink);
  },

  clickAssignToMeLink() {
    I.refreshPage();
    I.waitForElement(this.assignToMe, 20);
    I.click(this.assignToMe);
    I.click(this.caseListLink);
  }
};

