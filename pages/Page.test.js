import { fireEvent, render } from '@testing-library/react';
import { describe } from 'node:test';
import React from 'react';
import { validateEmail } from './Page';
import Page from './Page';

describe('submit', () => {
  test('validate function should pass on correct input', () => {
    const text = 'text@test.com';
    expect(validateEmail(text)).toBe(true);
  });

  test('validate function should fail on incorrect input', () => {
    const text = 'text';
    expect(validateEmail(text)).not.toBe(true);
  });

  test('form should be in the document', () => {
    const component = render(<Page />);
    const labelNode = component.getByText('Email:');
    expect(labelNode).toBeInTheDocument();
  });

  test('email field should have label', () => {
    const { getByLabelText } = render(<Page />);
    const emailInputNode = getByLabelText('EmailL:');
    expect(emailInputNode.getAttribute('name')).toBe('email');
  });

  test('email input should accept text', () => {
    const { getByLabelText, getByText } = render(<Page />);
    const emailInputNode = getByLabelText('EmailL:');
    expect(emailInputNode.value).toMatch('');
    fireEvent.change(emailInputNode, { target: { value: 'testing' } });
    expect(emailInputNode.value).toMatch('testing');

    const errorMessageNode = getByText('Error! Email is not valid');
    expect(errorMessageNode).toBeInTheDocument();

    fireEvent.change(emailInputNode, { target: { value: 'testing@' } });
    expect(errorMessageNode).not.toBeInTheDocument();
  });

  test('should be able to submit form', () => {
    const mockFn = jest.fn();
    const { getByRole } = render(<Page handleSubmit={mockFn} />);
    const buttonNode = getByRole('button');
    fireEvent.submit(buttonNode);
    fireEvent.submit(buttonNode);
    expect(mockFn).toHaveBeenCalled();
  });
});
