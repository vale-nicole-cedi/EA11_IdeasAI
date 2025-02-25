import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader,IonCardContent, IonCardTitle } from '@ionic/angular/standalone';
import { OpenaiService } from '../openai.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardContent, IonCardTitle, FormsModule],
})
export class HomePage {
  constructor(private router: Router, private openAIService: OpenaiService) {}
  ideaPrompt: string = '';
  generatedIdea: string = '';

  async generateIdea() {
    if (this.ideaPrompt.trim() === '') {
      alert('Please enter a prompt');
      return;
    }
    this.generatedIdea = await this.openAIService.generateIdea(this.ideaPrompt);
  }
}
