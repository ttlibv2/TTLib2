import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, Subscription, Subscriber, Observer } from 'rxjs';
import { PopupOption } from '../entity/interface';
import { PopupName } from '../entity/const';
import * as qs from 'querystring';
import 'rxjs/add/observable/interval';

@Injectable()
export class PopupService {

  /** @var {timeOut=60s} */
  private timeOut: number = 60;

  /** @var {delayTime=0.5s} */
  private delayTime: number = 500;

  /** option: `width`, `height`,... */
  private option: PopupOption = { width: 392, height: 465 };

  private pollTime: Subscription = null;
  private popup: Window = null;

  setTimeOut(second: number) {
    this.timeOut = second;
  }

  setDelayTime(second: number) {
    this.delayTime = second * 1000;
  }

  setOptions(option: PopupOption) {
    Object.assign(this.option, option);
  }

  private closePopup() {
    if (this.popup && this.pollTime) {
      this.pollTime.unsubscribe();
      this.popup.close();
    }
  }


  /**
   * @param url The URL of the page to open
   * @param {string} name (`_blank`, `_parent`, `_self`, `_top`, `name`)The target attribute or the name of the window
   */
  open(url: string, name: string, callback_url: string = window.location.host): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      let feature = qs.stringify(this.option, ",");
      this.popup = window.open(url, name, feature);
      let timeOut = this.timeOut * (1000 / this.delayTime > 0 ? 1000 / this.delayTime : 1);

      this.pollTime = Observable.interval(this.delayTime).subscribe(x => {
        if (x === timeOut - 1) 
        {
          observer.error({error: 'time_out'});
          this.closePopup();
        }

        else if (this.popup.closed) 
        {
          observer.error({error: 'popup_closed_by_user'});
          this.closePopup();
        }

        else 
        {
          try 
          {
            let document_url = this.popup.document.URL;
            if (document_url.indexOf(callback_url) != -1) 
            {
              this.closePopup();
              observer.next(document_url);
              observer.complete();
            }
          }
          catch (error) { }
        }
      });
    });



  }

}
