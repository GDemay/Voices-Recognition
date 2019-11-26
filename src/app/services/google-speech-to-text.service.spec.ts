import { TestBed } from '@angular/core/testing';

import { GoogleSpeechToTextService } from './google-speech-to-text.service';

describe('GoogleSpeechToTextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleSpeechToTextService = TestBed.get(GoogleSpeechToTextService);
    expect(service).toBeTruthy();
  });
});
