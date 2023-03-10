import {decompressArrayBuffer} from "../utils/CompressFile";
export const handleDownload = (file:ArrayBuffer,Name:String) => {
    const decompressedFile = decompressArrayBuffer(file);
    const blob = new Blob([decompressedFile], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = Name+'.pdf';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };