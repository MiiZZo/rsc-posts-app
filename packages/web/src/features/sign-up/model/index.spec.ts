import { allSettled, fork } from 'effector';
import { routerModel } from 'shared/router';
import { notificationsModel } from 'shared/notifications';
import { paths } from 'shared/navigation';
import * as model from './index';
import { config } from '../config';


function getScope() {
  return fork({
    values: [
      [
        model.signUpForm.fields.email.$value,
        'example@gmail.com'
      ],
      [
        model.signUpForm.fields.password.$value,
        'example@gmail.com',
      ],
      [
        model.signUpForm.fields.username.$value,
        'example@gmail.com',
      ],
    ],
  });
}

describe('signUpModel', () => {
  let scope = getScope();
  const navigateWatcher = vi.fn();
  const notifyWatcher = vi.fn();
  model.signUpQuery.__executorFx.use(vi.fn());
  routerModel.navigateFx.use(navigateWatcher);
  notificationsModel.notifyFx.use(notifyWatcher);

  afterEach(() => {
    scope = getScope();
    vi.clearAllMocks();
  });

  it('must send form data', async () => {
    const startQueryWatcher = vi.fn();

    model.signUpQuery.start.watch(startQueryWatcher);
    
    await allSettled(model.signUpForm.submitted, {
      scope,
    });

    expect(startQueryWatcher).toBeCalledTimes(1);
  });

  it('must redirect user to sign in page after success request', async () => {
    await allSettled(model.signUpQuery.finished.success.event, {
      scope,
    });

    expect(navigateWatcher).toBeCalledTimes(1);
    expect(navigateWatcher).toBeCalledWith(paths.signIn());
  });

  it('must reset form after success request', async () => {
    const resetFormWatcher = vi.fn();

    model.signUpForm.cleared.watch(resetFormWatcher);

    await allSettled(model.signUpQuery.finished.success.event, {
      scope,
    });

    expect(resetFormWatcher).toBeCalledTimes(1);
  });

  it('must show user a notification after success request', async () => {
    await allSettled(model.signUpQuery.finished.success.event, {
      scope,
    });

    expect(notifyWatcher).toBeCalledTimes(1);
    expect(notifyWatcher).toBeCalledWith({ message: config.SUCCESS_SIGN_UP_MESSAGE, color: 'green' });
  });

  it('must show user a notification when EMAIL is already in use', async () => {
    await allSettled(model.signUpQuery.finished.emailBusy.event, {
      scope,
    });

    expect(notifyWatcher).toBeCalledTimes(1);
    expect(notifyWatcher).toBeCalledWith({ message: config.EMAIL_BUSY_MESSAGE, color: 'red' });
  });

  it('must show user a notification when USERNAME is already in use', async () => {
    await allSettled(model.signUpQuery.finished.usernameBusy.event, {
      scope,
    });

    expect(notifyWatcher).toBeCalledTimes(1);
    expect(notifyWatcher).toBeCalledWith({ message: config.USERNAME_BUSY_MESSSAGE, color: 'red' });
  });
});
