import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'ymrlk-code-blog-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  userPrefix: string | undefined;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    // TODO Ideally fetch backend for user with prefix
    // TODO if something suspicious is passed fetch backend
    // TODO in case NOT Found user redirect to NOT_FOUND_USER_ROUTE or component

    this.activatedRoute.params.subscribe((params: Params) => this.userPrefix = params['user-prefix'])
  }

}
