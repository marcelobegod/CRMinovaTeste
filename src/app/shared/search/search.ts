import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html'  // agora usando arquivo externo
})
export class SearchComponent {
  @Input() small = false;
  @Output() onSearch = new EventEmitter<string>();
  termo: string = '';

  buscar() {
    if (this.termo.trim()) {
      this.onSearch.emit(this.termo);
    }
  }
}
