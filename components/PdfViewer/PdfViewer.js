import * as PDFJS from 'pdfjs-dist';
import { useRef, useState,useEffect } from 'react';
import { getSession } from '../../utils/sessionhandling';
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

const PdfViewer = (filedata) => {

    const [file, setFiles] = useState(filedata);
    let renderedPdf;
    const pageRenderRef = useRef(null);
    const DEFAULT_SCALE = 1.2;
    let scale = 1;

    // useEffect(() => {
        console.log("file",file.file);
        const loadingTask = PDFJS.getDocument({data :  new Int8Array( file.file)});
        loadingTask.promise.then(
            (pdf) => {
              renderedPdf = pdf;
              const container = pageRenderRef.current;
              const pageNo =0;
              // fetchPageNo(pageNo, renderedPdf, container);
              for(let i=0;i<pdf.numPages;i++){
                createContextForCanvas(pdf, container, i+1);
              }
              // console.log(pdf);
            },
            (error) => {
              console.log("PDF error "+error);
            })
      // });

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
              viewport: viewport
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
            <div style={{ paddingLeft: '0', 
                          paddingRight: '0',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          display: 'block',
                          width: '650px'}}  ref={pageRenderRef}>
                            {/* <h1>PDF.js Sample Example</h1> */}
            {/* <button onClick={zoomIn}>Zoom In</button>
             */}
        </div>
    )
}

export default PdfViewer;

 