import secrets

secret_key = secrets.token_urlsafe(32)
print("Your JWT Secret Key:", secret_key)
