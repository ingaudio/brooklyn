import { EventWebPage } from './app.po';

describe('event-web App', () => {
  let page: EventWebPage;

  beforeEach(() => {
    page = new EventWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
