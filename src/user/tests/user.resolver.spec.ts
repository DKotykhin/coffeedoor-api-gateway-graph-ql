import { Test, TestingModule } from '@nestjs/testing';

import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';
import { FileUploadService } from '../../file-upload/file-upload.service';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
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

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
