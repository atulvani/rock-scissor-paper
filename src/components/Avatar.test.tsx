import React from 'react';
import { render } from '@testing-library/react';
import { Avatar } from './Avatar';

test('renders avatar with the initial character of the name', () => {
    const { baseElement: elt } = render(<Avatar player="John Doe" />);
    expect(elt.textContent).toBe('J');
});

test('renders avatar with ? when the name is empty', () => {
    const { baseElement: elt } = render(<Avatar player="" />);
    expect(elt.textContent).toBe('?');
});
