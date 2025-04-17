import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  start = '';
  end = '';
  trips: any[] = [];

  colors = ['#5D57A3', '#007BFF', '#FFA726', '#90A4AE', '#5D57A3'];

  addTrip() {
    const from = this.start.trim().slice(0, 3).toUpperCase();
    const to = this.end.trim().slice(0, 3).toUpperCase();

    if (!from || !to) return;

    const newTrip = {
      from,
      to,
      level: 1,
      arrow: false,
      display: `${from} - ${to}`,
      color: this.colors[this.trips.length % this.colors.length],
      up: false,
      down: false
    };

    const lastTrip = this.trips[this.trips.length - 1];
    const secondlastTrip = this.trips[this.trips.length - 2];

    if (from === to) {
      newTrip.level = 2;
    }

    if (lastTrip) {
      if (lastTrip.to !== from) {
        newTrip.arrow = true;
      }

      if (lastTrip.from === from && lastTrip.to === to) {
        newTrip.level = 2;
        lastTrip.level = 2;
        if (secondlastTrip) {
          secondlastTrip.up = true;
        }
      }
      if (lastTrip.level == 2 && newTrip.level == 1) {
        newTrip.down = true;
        newTrip.up = false;
      }
    }

    const isRepeated = this.trips.some(t => t.from === from && t.to === to);
    if (isRepeated) {
      newTrip.level = 2;
    }

    this.trips.push(newTrip);
    this.start = '';
    this.end = '';
  }

}
