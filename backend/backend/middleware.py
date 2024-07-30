from django.utils.deprecation import MiddlewareMixin
from django.http import HttpRequest

class TokenFromCookieMiddleware(MiddlewareMixin):
    def process_request(self, request : HttpRequest):
        access_token = request.COOKIES.get('access_token')
        if access_token:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'