import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ymrlk-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {

  @Input() tagTitle = '';
  @Input() isSelected = false;

  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  select(): void {
    this.isSelected = true;
    this.selected.emit(this.tagTitle);
  }

}
