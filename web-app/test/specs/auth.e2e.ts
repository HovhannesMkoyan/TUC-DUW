import AuthPage from "../pageobjects/auth.page";

describe("User Authentication", () => {
  it("should login with google", async () => {
    await AuthPage.open();
    browser.maximizeWindow();
    await AuthPage.closeModal();
    await AuthPage.login("developer.mkoyan@gmail.com", "122334johN");

    //expect(1).toEqual(1);
  });
});
