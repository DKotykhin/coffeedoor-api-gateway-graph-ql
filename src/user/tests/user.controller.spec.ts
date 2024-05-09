import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { FileUploadService } from '../../file-upload/file-upload.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: 'USER_SERVICE',
          useValue: {},
        },
        {
          provide: FileUploadService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
