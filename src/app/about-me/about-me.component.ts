import { Component } from '@angular/core';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

  cv: any = null;
  loading = true;

  constructor(private contentSvc: ContentService) {

  }

  ngOnInit() {
    this.contentSvc.getCV().subscribe(
      cvData => {
        this.cv = cvData;
        this.loading = false;
      }
    )
  }

}
