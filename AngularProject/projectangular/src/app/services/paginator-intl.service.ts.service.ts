import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginatorIntlService extends MatPaginatorIntl {

  constructor() {
    super();
    this.itemsPerPageLabel = 'Itens por página';
    this.nextPageLabel = 'Próxima página';
    this.previousPageLabel = 'Página anterior';
    this.firstPageLabel = 'Primeira página';
    this.lastPageLabel = 'Última página';
    this.getRangeLabel = this.getRangeLabel.bind(this);
  }

  // Defina a função `getRangeLabel` como uma propriedade com a assinatura apropriada
  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} – ${endIndex} de ${length}`;
  }
}
