import { UserRegistrationModule } from './user-registration.module';

describe('UserRegistrationModule', () => {
  let userRegistrationModule: UserRegistrationModule;

  beforeEach(() => {
    userRegistrationModule = new UserRegistrationModule();
  });

  it('should create an instance', () => {
    expect(userRegistrationModule).toBeTruthy();
  });
});
