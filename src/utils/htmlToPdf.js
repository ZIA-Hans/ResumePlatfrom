import JsPDF from "jspdf";
import html2canvas from "html2canvas";
const A4Width = 592.28;
const A4Height = 841.89;

export function toPrintPdf(resumeName) {
    let name = resumeName || '未命名文件';
    const dom = document.querySelector('#visPdf');
    if(dom) {
        html2canvas(dom, {
            allowTaint: true,
        }).then((canvas) => {
            let contentWidth = canvas.width;
            let contentHeight = canvas.height;

            let pageHeight = (contentWidth / A4Width) * A4Height;
            let leftHeight = contentHeight;

            let position = 0;
            let imgWidth = A4Width;
            let imgHeight = (A4Width / contentWidth) * contentHeight;
            let pageData = canvas.toDataURL('image/jepg' , 1.0);
            let PDF = new JsPDF('portrait', 'pt', 'a4');
            if (leftHeight < pageHeight) {
                PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
            } else {
                while (leftHeight > 0) {
                    PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                    leftHeight -= pageHeight;
                    position -= A4Height;
                    if (leftHeight > 0) {
                        PDF.addPage();
                    }
                }
            }
            PDF.save(name + '.pdf');
        })
    }
}