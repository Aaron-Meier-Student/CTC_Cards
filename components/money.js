class Money {
    constructor() {
        this._money = 20;
        this._frozen = false;
        this.updateDisplay();
    }

    deposit(money) {
        if (this._frozen) return;
        this.money += Math.abs(money);
        this.updateDisplay();
    }
    withdraw(money) {
        if (this._frozen) return;
        if (this._money - Math.abs(money) < 0) return false;
        this._money -= Math.abs(money);
        this.updateDisplay();
        return true;
    }

    freeze() {
        this._frozen = true;
    }
    unfreeze() {
        this._frozen = false;
    }

    updateDisplay() {
        document.getElementById(
            "moneyDisplay"
        ).innerText = `$${this._money.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    }
}
