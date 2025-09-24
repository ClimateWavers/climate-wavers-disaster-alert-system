import random
from django.core.mail import EmailMessage
from .models import User, OneTimePassword
from django.conf import settings
from cryptography.fernet import Fernet

def generate_otp():
    otp = "".join(str(random.randint(0, 9)) for _ in range(6))
    return otp

# def send_code_to_user(email):
#     subject = "One-time passcode for Email verification"
#     otp_code = generate_otp()
#     user = User.objects.get(email=email)
#     current_site = "www.climatewavers.co.ke"
#     email_body = f"Hi {user.first_name}, thank you for signing up at {current_site}. Please verify your email with the one-time passcode: {otp_code}"

#     # Hash the OTP before saving it
#     otp_instance = OneTimePassword(user=user, code=otp_code)
#     otp_instance.code = otp_instance.encrypt_code(otp_code)  # Encrypt the OTP
#     otp_instance.save()

#     from_email = settings.DEFAULT_FROM_EMAIL
#     email = EmailMessage(subject=subject, body=email_body, from_email=from_email, to=[email])
#     email.send(fail_silently=True)

# def send_normal_email(data):
#     email=EmailMessage(
#         subject=data['email_subject'],
#         body=data['email_body'],
#         from_email=settings.EMAIL_HOST_USER,
#         to=[data['to_email']]
#     )
#     email.send()