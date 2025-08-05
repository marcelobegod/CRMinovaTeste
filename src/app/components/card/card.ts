import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../shared/models/card.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class CardComponent {
  @Input() card!: Card;
  @Output() cardClicked = new EventEmitter<Card>();

  onClick() {
    this.cardClicked.emit(this.card);
  }
}
