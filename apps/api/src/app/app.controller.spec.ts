import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';

describe('AppController', () => {

  let app: TestingModule;

  beforeAll(async () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      // const appController = app.get<AppController>(AppController);
    });
  });
});
