import { MatPaginatorIntl } from "@angular/material/paginator";

const getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} a ${endIndex} de ${length}`;
  };
  
  export function customMatPaginatorInitl() {
    const matPaginatorInitl: MatPaginatorIntl = new MatPaginatorIntl();
    matPaginatorInitl.itemsPerPageLabel = 'Ítems por página';
    matPaginatorInitl.nextPageLabel = 'Página siguiente';
    matPaginatorInitl.previousPageLabel = 'Página anterior';
    matPaginatorInitl.firstPageLabel = 'Primera página';
    matPaginatorInitl.lastPageLabel = 'Última página';
    matPaginatorInitl.getRangeLabel = getRangeLabel;
    return matPaginatorInitl;
  }