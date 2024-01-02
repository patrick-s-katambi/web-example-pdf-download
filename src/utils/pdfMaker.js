import pdfmaker from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfmaker.vfs = pdfFonts.pdfMake.vfs;

export function pdfGenerator() {
    this.docDefinition = {};
    this.pdfmaker = pdfmaker;
}

/**
 *
 * @param {import("pdfmake/interfaces").TDocumentDefinitions} docDefinition
 * @returns
 */
pdfGenerator.prototype.setDocDefinition = function (docDefinition) {
    this.docDefinition = docDefinition;
    return this;
};

pdfGenerator.prototype.createPdf = function () {
    this.pdf = this.pdfmaker.createPdf(this.docDefinition);
    return this;
};

/**
 *
 * @param {string} filename
 */
pdfGenerator.prototype.downloadPdf = function (filename = "file") {
    this.pdf.download(filename);
};

pdfGenerator.prototype.openPdf = function () {
    this.pdf.open();
};

export default pdfGenerator;
