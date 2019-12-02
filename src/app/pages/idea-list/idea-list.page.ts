import { Component, OnInit } from '@angular/core';
import { IdeaService, Idea } from 'src/app/services/idea.service';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import { RestClientService } from '../../services/rest-client.service';
import { environment} from '../../../environments/environment';




@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.page.html',
  styleUrls: ['./idea-list.page.scss'],
})
export class IdeaListPage implements OnInit {
  private ideas: Observable<Idea[]>;


  constructor(public authService: AuthService, private ideaService: IdeaService, private toastService: ToastService, private oneSignal: OneSignal,
              private restClient: RestClientService) {
  }



  ngOnInit() {
    console.log();
    this.ideas = this.ideaService.getIdeas();
    this.oneSignal.startInit( environment.onesignal_api.appId, environment.onesignal_api.googleProjectNumber);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }



  delete_idea(idea: Idea) {
    console.log('Delete ', idea.id, 'from idea-list.page.ts');
    this.toastService.showToast('Meeting deleted', 'danger');
    this.ideaService.deleteIdea(idea.id);
  }

  try_get_request() {
       console.log('test');
       console.log(this.restClient.RecognizeGoogleApi());
  }
}
