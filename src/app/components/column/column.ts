import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card';
import { Card } from '../../shared/models/card.model'; // 👈 novo import


@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './column.html',
  styleUrls: ['./column.css']
})

export class ColumnComponent {
  @Input() title!: string;
  @Input() cards: Card[] = []; // ✅ usa a interface Card corretamente
}
