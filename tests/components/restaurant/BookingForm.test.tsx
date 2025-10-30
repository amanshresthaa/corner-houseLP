import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm, { BookingFormData } from '@/components/restaurant/BookingForm';

jest.mock('@/hooks/useContent', () => ({
  useContent: () => ({
    data: {
      forms: {
        labels: {
          name: 'Full Name',
          phone: 'Phone Number',
          email: 'Email Address',
          date: 'Date',
          time: 'Time',
          partySize: 'Guests',
          specialRequests: 'Special Requests',
          specialRequestsPlaceholder: 'Special requests',
          largeParty: '10+ (tell us more below)',
        },
        messages: {
          success: 'Booking request received!'
        }
      },
      global: {
        ui: {
          labels: {
            selectTime: 'Select time',
            guests: 'guests',
            guest: 'guest',
            guestsPlus: '10+ guests',
            confirmationMessage: 'We will confirm shortly',
            requiredFields: 'Required fields'
          },
          buttons: {
            submit: 'Request Booking'
          }
        }
      }
    }
  })
}));

describe('BookingForm', () => {
  it('submits form data and calls onComplete with reset helper', async () => {
    const user = userEvent.setup();
    const handleComplete = jest.fn((_: BookingFormData, helpers: { reset: () => void }) => {
      helpers.reset();
    });

    render(<BookingForm onComplete={handleComplete} />);

    await user.type(screen.getByLabelText(/Full Name/), 'Test User');
    await user.type(screen.getByLabelText(/Phone Number/), '01234 567890');
    await user.type(screen.getByLabelText(/Email Address/), 'test@example.com');
    await user.type(screen.getByLabelText(/Special Requests/), 'Window seat');

    // Select date & time
    fireEvent.change(screen.getByLabelText(/Date/), { target: { value: '2025-11-01' } });
    fireEvent.change(screen.getByLabelText(/Time/), { target: { value: '19:00' } });

    await user.click(screen.getByRole('button', { name: /Request Booking/ }));

    expect(handleComplete).toHaveBeenCalledTimes(1);
    expect(handleComplete.mock.calls[0][0]).toMatchObject({
      name: 'Test User',
      phone: '01234 567890',
      email: 'test@example.com',
      message: 'Window seat',
      time: '19:00'
    });

    // After reset helper, the name field should be cleared
    expect(screen.getByLabelText(/Full Name/)).toHaveValue('');
  });

  it('shows inline success message when enabled', async () => {
    const user = userEvent.setup();
    render(<BookingForm showInlineSuccess />);

    await user.type(screen.getByLabelText(/Full Name/), 'Inline User');
    await user.type(screen.getByLabelText(/Phone Number/), '01234 567890');
    fireEvent.change(screen.getByLabelText(/Date/), { target: { value: '2025-11-02' } });
    fireEvent.change(screen.getByLabelText(/Time/), { target: { value: '18:00' } });

    await user.click(screen.getByRole('button', { name: /Request Booking/ }));

    expect(await screen.findByRole('status')).toHaveTextContent('Booking request received!');
  });
});
