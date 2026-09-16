"""Verify the contact-form email setup end to end.

    python check_email.py            # check config, then send a test email
    python check_email.py --dry-run  # check config only, send nothing

Prints no secret values — the password is only ever reported as set/unset
and by length.
"""

import argparse
import os
import smtplib
import sys

import django

PLACEHOLDER = 'your.address@gmail.com'


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true', help='check config only')
    args = parser.parse_args()

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_p.settings')
    django.setup()
    from django.conf import settings
    from django.core.mail import EmailMessage

    user = settings.EMAIL_HOST_USER
    password = settings.EMAIL_HOST_PASSWORD
    notify = settings.CONTACT_NOTIFY_EMAIL

    print('Configuration')
    print(f'  SMTP host      : {settings.EMAIL_HOST}:{settings.EMAIL_PORT} (TLS {settings.EMAIL_USE_TLS})')
    print(f'  Sends from     : {user or "(unset)"}')
    print(f'  Delivers to    : {notify}')
    print(f'  App password   : {"set, " + str(len(password)) + " chars" if password else "NOT SET"}')
    print(f'  Backend        : {settings.EMAIL_BACKEND.rsplit(".", 2)[-2]}')

    problems = []
    if not user or user == PLACEHOLDER:
        problems.append('EMAIL_HOST_USER is unset or still the placeholder address.')
    if not password:
        problems.append(
            'EMAIL_HOST_PASSWORD is empty, so Django only logs the mail instead of sending it.'
        )
    elif ' ' in password:
        problems.append(
            'EMAIL_HOST_PASSWORD contains spaces. Google displays the App Password in '
            '4-character groups — paste it as 16 characters with no spaces.'
        )
    elif len(password) != 16:
        problems.append(
            f'EMAIL_HOST_PASSWORD is {len(password)} characters; a Gmail App Password is 16. '
            'This is probably your account password, which Gmail will reject.'
        )

    if problems:
        print('\nNot ready:')
        for p in problems:
            print(f'  - {p}')
        print('\nGet an App Password: Google Account > Security > 2-Step Verification')
        print('(must be ON) > App passwords > generate one, then paste it into .env')
        return 1

    print('\nConfiguration looks right.')
    if args.dry_run:
        return 0

    print(f'Sending a test email to {notify} ...')
    try:
        sent = EmailMessage(
            subject='Portfolio contact form — test',
            body=(
                'This is a test from check_email.py.\n\n'
                'If you can read this, the contact form will deliver enquiries here.\n'
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[notify],
        ).send(fail_silently=False)
    except smtplib.SMTPAuthenticationError as exc:
        print('\nFAILED: Gmail rejected the credentials.')
        detail = str(exc)
        if 'Application-specific password required' in detail:
            print('  That is your account password. Gmail needs an App Password.')
        else:
            print('  Check the address, and that the App Password was pasted without spaces')
            print('  and has not been revoked.')
        return 1
    except (smtplib.SMTPConnectError, TimeoutError, OSError) as exc:
        print(f'\nFAILED: could not reach {settings.EMAIL_HOST}:{settings.EMAIL_PORT} — {exc}')
        print('  Port 587 is often blocked on office or campus networks. Try another network.')
        return 1
    except Exception as exc:
        print(f'\nFAILED: {type(exc).__name__}: {exc}')
        return 1

    if sent:
        print(f'\nSent. Check {notify} (look in Spam too — the first one often lands there).')
        return 0
    print('\nDjango reported nothing sent.')
    return 1


if __name__ == '__main__':
    sys.exit(main())
