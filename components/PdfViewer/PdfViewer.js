import * as PDFJS from 'pdfjs-dist';
import { useRef, useState,useEffect } from 'react';
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

const PdfViewer = (filedata) => {

    const [file, setFiles] = useState(filedata);
    let renderedPdf;
    const pageRenderRef = useRef(null);
    const DEFAULT_SCALE = 1;
    let scale = 1;
    // function zoomIn() {
        
    //     scale += 0.1;
    //     draw();
    // }
    // function draw() {
    //     // Clear the canvas
    //     const canvas = document.getElementById('canvas-elem');
    //     const ctx = canvas.getContext('2d');

    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
        
    //     // Set the scale transform
    //     ctx.setTransform(scale, 0, 0, scale, 0, 0);
        
    //     // Draw on the canvas
    //     // ...
    //   }

    // useEffect(() => {
        console.log("file",file.file);
        const loadingTask = PDFJS.getDocument({data : new Int8Array( file.file)});
        loadingTask.promise.then(
            (pdf) => {
              renderedPdf = pdf;
              const container = pageRenderRef.current;
              const pageNo = 0;
              fetchPageNo(pageNo, renderedPdf, container);
            },
            (error) => {
              console.log("PDF error "+error);
            })
      // });
    const fetchPageNo = (pageNo, pdf, container) => {
        if (pageNo < pdf._pdfInfo.numPages) {
          pageNo += 1;
          createContextForCanvas(pdf, container, pageNo).then((page) => {
            fetchPageNo(page + 1, pdf, container);
          });
        }
      };

    const createContextForCanvas = (pdf, container, pageNo) => {
        return new Promise((resolve) => {
          pdf.getPage(pageNo).then(async (page) => {
            const viewport = page.getViewport({ scale: DEFAULT_SCALE });
    
            let canvasInHTML = {
              canvas: undefined,
              ctx: undefined
            };
    
            const li = document.createElement("div");
            li.setAttribute("id", "page-" + (page._pageIndex + 1));
            li.setAttribute("style", "position: relative;");
    
            canvasInHTML.canvas = document.createElement("canvas");
            canvasInHTML.ctx = canvasInHTML.canvas.getContext("2d");
            canvasInHTML.canvas.height = viewport.height;
            canvasInHTML.canvas.width = viewport.width;
            canvasInHTML.canvas.imageSmoothingEnabled = false;
            canvasInHTML.canvas.addEventListener('contextmenu', event => {
                event.preventDefault();
              });
    
            li.appendChild(canvasInHTML.canvas);
            container.appendChild(li);
    
            const renderContext = {
              canvasContext: canvasInHTML.ctx,
              viewport
            };
    
            let renderTask = page.render(renderContext);
    
            renderTask.promise.then(() => {
              if (pageNo !== null) {
                resolve(pageNo);
              }
            });
    
            if (pageRenderRef.current) {
              pageRenderRef.current = li;
            }
          });
        });
      };

    

    return (
        <div>
            {/* <h1>PDF.js Sample Example</h1> */}
            {/* <button onClick={zoomIn}>Zoom In</button>
             */}
            <div ref={pageRenderRef}></div>
        </div>
    )
}

export default PdfViewer;