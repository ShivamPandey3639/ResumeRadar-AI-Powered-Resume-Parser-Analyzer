declare module "pdf-parse" {
  interface PDFData {
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: Record<string, unknown>;
    text: string;
    version: string;
  }

  interface PageData {
    pageIndex: number;
    pageInfo: Record<string, unknown>;
    pageContent: string;
  }

  function PDFParse(
    dataBuffer: Buffer,
    options?: {
      pagerender?: (pageData: PageData) => string;
      max?: number;
    }
  ): Promise<PDFData>;

  export default PDFParse;
}
