import { Component, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCadModalComponent } from '../../components/form-cad-modal/form-cad-modal';
import { BoardComponent } from '../../components/board/board';
import { Card } from '../../shared/models/card.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormCadModalComponent, BoardComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  @ViewChild('modal') modal!: FormCadModalComponent;
  @ViewChild(BoardComponent) board!: BoardComponent;

  abrirModal() {
    this.modal.abrirModal();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.board.onResize(window.innerWidth);
  }

  onNovoCard(card: Card) {
    this.board.onNovoCard(card);
  }

  ngAfterViewInit() {
    this.board.abrirModalCallback = () => this.abrirModal();
  }
}
