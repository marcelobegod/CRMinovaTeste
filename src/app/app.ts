import { DragDropModule } from '@angular/cdk/drag-drop';
import { FooterComponent } from './shared/footer/footer';
import { NavbarComponent } from './shared/navbar/navbar';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, DragDropModule],
  templateUrl: './app.html',
})
export class AppComponent {}
