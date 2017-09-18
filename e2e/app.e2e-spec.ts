import { RoundTableV2.0Page } from './app.po';

describe('round-table-v2.0 App', () => {
  let page: RoundTableV2.0Page;

  beforeEach(() => {
    page = new RoundTableV2.0Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
