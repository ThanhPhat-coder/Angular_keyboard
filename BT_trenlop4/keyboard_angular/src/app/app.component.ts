import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements AfterViewInit {
  words: string[] = [
    'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon',
    'mango', 'nectarine', 'orange', 'papaya', 'quince', 'raspberry', 'strawberry', 'tangerine', 'ugli', 'vanilla',
    'watermelon', 'xigua', 'yam', 'zucchini', 'apricot', 'blackberry', 'blueberry', 'cantaloupe', 'dragonfruit',
    'grapefruit', 'jackfruit', 'kumquat', 'lychee', 'mulberry', 'olive', 'peach', 'pineapple', 'pomegranate', 'plum',
    'avocado', 'broccoli', 'cabbage', 'carrot', 'cauliflower', 'celery', 'cucumber', 'eggplant', 'garlic', 'kale',
    'lettuce', 'mushroom', 'onion', 'pea', 'pepper', 'potato', 'pumpkin', 'radish', 'spinach', 'squash',
    'tomato', 'turnip', 'zucchini', 'artichoke', 'arugula', 'asparagus', 'beet', 'bell pepper', 'brussels sprouts',
    'caper', 'chive', 'collard', 'corn', 'dill', 'endive', 'fennel', 'ginger', 'horseradish', 'jicama', 'leek', 'okra',
    'parsnip', 'rhubarb', 'rutabaga', 'shallot', 'swede', 'watercress', 'yam', 'zest'
  ];
  currentWord: string = '';
  currentIndex: number = 0;
  timeLeft: number = 30;
  timer: any;
  wordCount: number = 0;
  wpm: number | null = null;

  @ViewChild('wordDisplay') wordDisplay!: ElementRef;
  @ViewChild('input') input!: ElementRef;
  @ViewChild('startButton') startButton!: ElementRef;
  @ViewChild('keys') keys!: ElementRef;

  ngAfterViewInit() {
    this.keys.nativeElement.querySelectorAll('.key').forEach((key: any) => {
      const keyText = key.textContent;
      key.innerHTML = `<span>${keyText}</span>`;
      key.classList.add('led');
    });
  }

  startGame() {
    this.resetGame();
    this.currentIndex = 0;
    this.newWord();
    this.input.nativeElement.value = '';
    this.input.nativeElement.disabled = false;
    this.input.nativeElement.focus();

    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 1000);
  }

  resetGame() {
    clearInterval(this.timer);
    this.timeLeft = 30;
    this.wordCount = 0;
    this.wpm = null;
    this.resetKeyColors();
  }

  newWord() {
    this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
    this.wordDisplay.nativeElement.textContent = this.currentWord;
  }

  resetKeyColors() {
    this.keys.nativeElement.querySelectorAll('.key').forEach((key: any) => {
      key.classList.remove('correct', 'incorrect', 'pressed');
    });
  }

  handleKeyPress(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    const keyElement = this.keys.nativeElement.querySelector(`.key[data-key="${key}"]`);
  
    if (keyElement) {
      keyElement.classList.add('pressed');
  
      if (this.currentWord[this.currentIndex] === key) {
        keyElement.classList.add('correct');
        keyElement.classList.remove('incorrect');
        this.currentIndex++;
        if (this.currentIndex === this.currentWord.length) {
          this.wordCount++;
          this.newWord();
          this.currentIndex = 0;
          this.input.nativeElement.value = '';
          this.resetKeyColors();
        }
      } else {
        keyElement.classList.add('incorrect');
        keyElement.classList.remove('correct');
      }
  
      setTimeout(() => {
        keyElement.classList.remove('pressed', 'correct', 'incorrect');
      }, 200);
    }
  }
  
  
  

  endGame() {
    clearInterval(this.timer);
    this.input.nativeElement.disabled = true;
    this.wpm = (this.wordCount * 60) / 30;
  }
}
