// src/app/shared/services/date-utils.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateUtilsService {
  parseDateLocal(isoDate: string): Date {
    const [ano, mes, dia] = isoDate.split('-').map(Number);
    return new Date(ano, mes - 1, dia);
  }

  toISODateLocal(date: Date): string {
    const ano = date.getFullYear();
    const mes = ('0' + (date.getMonth() + 1)).slice(-2);
    const dia = ('0' + date.getDate()).slice(-2);
    return `${ano}-${mes}-${dia}`;
  }

  formatDateBr(date: Date): string {
    const dia = ('0' + date.getDate()).slice(-2);
    const mes = ('0' + (date.getMonth() + 1)).slice(-2);
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
}
