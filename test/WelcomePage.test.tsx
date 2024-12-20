import React from 'react';
import { beforeEach, describe, expect, test } from 'vitest';
import { screen, render } from '@testing-library/react';
import MainContent from '../src/components/layout/MainContent.tsx';


describe('WelcomePage', () => {
    beforeEach(() => {
        renderWelcomePage();
    });

    test('should render the welcome page', () => {
        const welcomeMessage = screen.getByText('Welcome to the React Testing Library course!');
        expect(welcomeMessage).toBeInTheDocument();
    });
});


const renderWelcomePage = () => {
    render(<MainContent />);
};