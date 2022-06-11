import Page from "./page";

class AuthPage extends Page {
  public get googleOAuthBtn() {
    return $$(".eb-oauth_container")[0];
  }

  public open() {
    return super.open("join");
  }

  public async login(email: string, password: string) {
    await this.googleOAuthBtn.click();

    await this.fillFormData(email, password);
  }

  public async closeModal() {
    browser
      .react$("Modal")
      .waitForExist({ timeout: 5000, timeoutMsg: "Modal did not appear" });
    await $(".eb-modal_closeBtn_container svg").click();
  }

  private async fillFormData(email: string, password: string) {
    let emailInput = await $('input[type="email"]');
    let passwordInput = await $('input[type="password"]');

    console.log("asasascsaasc");
    emailInput.waitForClickable({
      timeout: 5000,
      timeoutMsg: "Gmail email input did not appear",
    });
    //await emailInput.setValue(email);
    await emailInput.addValue(email);
    await $("button").click();

    passwordInput.waitForClickable({
      timeout: 5000,
      timeoutMsg: "Gmail password input did not appear",
    });
    await passwordInput.addValue(password);

    await $("button").click();
  }
}

export default new AuthPage();
