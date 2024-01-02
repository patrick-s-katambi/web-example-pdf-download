export function numberFormatter() {
    this.number = NaN;
}

numberFormatter.prototype.setNumber = function (number) {
    this.number = number;
    return this;
};

numberFormatter.prototype.formatToThousands = function () {
    const formattedNumber = new Intl.NumberFormat().format(this.number);
    return formattedNumber;
};
