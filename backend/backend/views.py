from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from django.contrib.auth import authenticate
from django.middleware.csrf import get_token

from rest_framework_simplejwt.views import TokenObtainPairView

class CustomTokenObtainPairView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            response = Response({'message': 'Login successful'})
            response.set_cookie('access_token', access_token, httponly=True, secure=True, samesite='Strict')
            response.set_cookie('refresh_token', refresh_token, httponly=True, secure=True, samesite='Strict')
            get_token(request)  # Ensure the CSRF token is sent with the response
            return response

        return Response({'error': 'Invalid credentials'}, status=400)
    
class CustomTokenRefreshView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        
        if not refresh_token:
            return Response({'error': 'Refresh token not provided'}, status=400)
        
        try:
            # Use the refresh token to create new access and refresh tokens
            refresh = RefreshToken(refresh_token)
            new_access_token = str(refresh.access_token)
            new_refresh_token = str(refresh)

            # Create the response and set the new tokens in HttpOnly cookies
            response = Response({'message': 'Token refreshed successfully'})
            response.set_cookie('access_token', new_access_token, httponly=True, secure=True, samesite='Strict')
            response.set_cookie('refresh_token', new_refresh_token, httponly=True, secure=True, samesite='Strict')
            get_token(request)  # Ensure the CSRF token is sent with the response
            return response
        
        except Exception as e:
            return Response({'error': str(e)}, status=400)    

class CustomLogoutView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()

            response = Response({'message': 'Logout successful'})
            response.delete_cookie('access_token')
            response.delete_cookie('refresh_token')
            return response

        except Exception as e:
            return Response({'error': str(e)}, status=400)
        
class CustomTokenVerifyView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get('access_token')
        
        if not token:
            return Response({'valid': False, 'error': 'Token missing!'}, status=200)
        
        try:
            # Decode and validate the token
            access_token = AccessToken(token)
            return Response({'valid': True, 'user_id': access_token['user_id']})
        
        except TokenError as e:
            return Response({'valid': False, 'error': str(e)}, status=400)
        except InvalidToken as e:
            return Response({'valid': False, 'error': str(e)}, status=400)