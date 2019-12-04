import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Base64 } from '@ionic-native/base64/ngx';
import { environment} from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

import { File } from '@ionic-native/file';



@Injectable({
  providedIn: 'root'
})
export class RestClientService {

    // tslint:disable-next-line:variable-name
    // private base_path = ' https://speech.googleapis.com/v1/speech:longrunningrecognize';
    // tslint:disable-next-line:variable-name
    private base_path = 'https://speech.googleapis.com/v1/speech:recognize';
    // tslint:disable-next-line:variable-name


    constructor(private http: HttpClient, private base64: Base64, private toastService: ToastService, private filePath: FilePath, private fileChooser: FileChooser) { }

    // tslint:disable-next-line:variable-name
    base_64_file: any;
    private file: File;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    postdata = {
        audio: {
            // tslint:disable-next-line:max-line-length
            // content: ''
            content: environment.audio.french.dialogue_boure_mp3

        },
        config: {
            encoding: 'ENCODING_UNSPECIFIED',
            languageCode: 'fr-FR'
        }
    };



    RecognizeGoogleApi() {
        this.convert_audio_to_base64();
        // this.Post_recognizeSpeech();
        // this.postItem();
    }

    convert_audio_to_base64() {
        // const path = '../../../resources/audio.wav'; // + 'audio.wav';
        // tslint:disable-next-line:label-position no-unused-expression

        this.fileChooser.open().then((data) => {
            alert('chooser ' + data);
            this.filePath.resolveNativePath(data).then(filePath => {
                console.log(filePath); // Display the actual filePath
                this.base64.encodeFile(filePath).then(base64File => {
                    // @ts-ignore
                    this.base_64_file = base64File;
                    this.base_64_file = this.base_64_file.substring(base64File.indexOf('base64,') + 7);
                    console.log('base64 :');
                    console.log(this.base_64_file);
                    this.postdata.audio.content = this.base_64_file;
                    this.Post_recognizeSpeech();
                }).catch(err => {
                    alert('erreur base64 => ' + err);
                });
            }).catch(err => {
                alert('erreur filepath => ' + err);
            });
        }).catch((error) => {
            alert('erreur chooser => ' + error);
        });
    }

    display_each_sentence(speech: any) {
        console.log(speech);
        for (const speaker of speech) {
            console.log(speaker.alternatives[0].transcript);
        }
    }
    // Get single student data by ID
    Post_recognizeSpeech() {
        console.log('Starting Google Speech...');
        // tslint:disable-next-line:max-line-length prefer-const
        let data: Observable<any>;
        let item: any;
        // tslint:disable-next-line:no-shadowed-variable max-line-length
        this.http.post(this.base_path + '?key=' + environment.google_api.apiKey, this.postdata, this.httpOptions).subscribe(data => {
            item = data;
            console.log(data);
            alert(data);
            // this.toastService.showToast(data, 'primary');
            console.log('Pas d erreur');
            // this.display_each_sentence(data['results']);
            return data;

        }, error => {
            // this.toastService.showToast(error.error.error.message, null);
            alert(error.error.error.message);
            console.log('Erreur');
            console.log(error);
            console.log(error.error.error.message);
        });
    }

}
