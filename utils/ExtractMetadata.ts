import CryptoJS from 'crypto-js';
export default async function extractMetadata(file: File){
    // Extract metadata from the file
    // Return the metadata

    const hash = file.text().then(text => CryptoJS.SHA256(text).toString());
    // var reader = new FileReader();
    // reader.onload = function() {
        // var binaryData = new Uint8Array(reader.result as ArrayBuffer);
        // const pdf_js = PDFJS.getDocument(binaryData);
    // const pdf_info = pdf.info;
        // const page_count = pdf_js.promise.then(pdf => pdf.getMetadata().then(metadata => metadata.info));
    // console.log(page_count);

    //     return page_count
    // }
    // reader.readAsBinaryString(file);    
    
    // return {
    //     subject: pdf.info.subject,
    //     created: pdf.info.creationDate,
    //     modified: pdf.info.modDate,
    //     creator: pdf.info.creator,
    //     producer: pdf.info.producer,
    //     title: pdf.info.title,
    // };

    return {
        size : file.size,
        name : file.name,
        type : file.type,
        lastModified : file.lastModified,
        hash : hash
    };
}