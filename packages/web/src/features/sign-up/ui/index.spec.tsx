import "@testing-library/jest-dom";
import { render, screen, userEvent } from 'shared/testing';
import { SignUpFormView } from './index';

describe('SignUpFormView', () => {
  const onSubmit = vi.fn();

  it('must trigger form submit on button click', async () => {
    render(<SignUpFormView isSubmitting={false} onSubmit={onSubmit} />);

    const submitWatcher = vi.fn();
    const form = screen.getByRole('form');
    const button = screen.getByRole('button');

    form.addEventListener('submit', submitWatcher);

    await userEvent.click(button);

    expect(submitWatcher).toBeCalledTimes(1);

    form.removeEventListener('submit', submitWatcher);
  });

  it('must trigger onSubmit callback on form submit', async () => {
    render(<SignUpFormView isSubmitting={false} onSubmit={onSubmit} />);

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(onSubmit).toBeCalledTimes(1);
  });

  it('submit button must be disabled when submitting', () => {
    render(<SignUpFormView isSubmitting={true} onSubmit={onSubmit} />);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('disabled');
  });
});
