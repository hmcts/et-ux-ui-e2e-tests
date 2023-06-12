const { I } = inject();

module.exports = {
  processLogin(test_case_username, test_case_password) {
    I.waitForVisible('#username', 30);
    I.fillField('#username', test_case_username);
    I.fillField('#password', test_case_password);
    I.wait(5);
    I.click('[type="submit"]');
    //I.waitForElement('#main-content', 50);
  },
};
