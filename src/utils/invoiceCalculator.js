/**
 *
 * @param {{ description: string; unitCost: number; qtyHrRate: number; }[]} data
 */
export function invoiceCalculator(data) {
    /**@type {{ description: string; unitCost: number; qtyHrRate: number; }[]} */
    this.data = data;
    this.subtotal = 0;
    this.tax = 0;
    this.total = 0;
}

invoiceCalculator.prototype.calculateSubtotal = function () {
    this.subtotal =
        +this.data
            .reduce((accumulator, iterator) => iterator.qtyHrRate * iterator.unitCost + accumulator, 0)
            .toFixed(2) ?? 0;

    return this;
};

/**
 *
 * @param {number} taxRate
 * @param {number} discount
 */
invoiceCalculator.prototype.calculateTax = function (taxRate = 0, discount = 0) {
    this.discount = discount;
    this.tax = (taxRate / 100) * (this.subtotal ?? 0 - discount);

    return this;
};

invoiceCalculator.prototype.calculateTotal = function () {
    this.total = this.tax + (this.subtotal - this.discount);

    return this;
};
