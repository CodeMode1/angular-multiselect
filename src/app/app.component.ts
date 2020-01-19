import { Component } from '@angular/core';

export class Item {
  public name: string;
  public value: string;
  public isSelected: boolean;
  constructor(name: string, value: string, isSelected: boolean) {
    this.name = name;
    this.value = value;
    this.isSelected = isSelected;
  }
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  isExpanded = false;
  public items: Item[] = [];
  public selectedItems: Item[] = [];
  public arrowPos: number = 0;

  constructor() {
    this.items.push(new Item("Quebec", "1", false));
    this.items.push(new Item("Ontario", "2", false));
    this.selectedItems.push(new Item("Quebec", "1", true));
    this.selectedItems.forEach(i => {
        const foundInList = this.items.find(i => i.value === i.value);
        if (foundInList !== undefined) {
          foundInList.isSelected = true;
        }
    });
  }

  onArrowUp($event) {
    // alert('onArrowUp');
    if (this.arrowPos > 0) {
      this.arrowPos--;
    }
  }

  onArrowDown($event) {
    // alert('onArrowDown');
    if (this.arrowPos < this.items.length - 1) {
      this.arrowPos++;
    }
  }

  onClickDiv($event) {
    this.isExpanded = true;
  }

  // TODO: do same for enter event
  onClickItem($event, item): void {
    if ($event) {
      // so that triggering checkbox doesnt also trigger li click which you then cancel
      // checkbox click.
      $event.stopPropagation();
    }
    this.selectItem(item);
    // emit selectedItems (currentValue) to parent component.
  }

  onEnter($event) {
    const item = this.items[this.arrowPos];
    this.selectItem(item);
  }

  private selectItem(item: Item): void {
    item.isSelected = !item.isSelected;
    if(item.isSelected) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    }
  }
}
