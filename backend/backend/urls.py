from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import CustomTokenObtainPairView, CustomTokenRefreshView, CustomLogoutView, CustomTokenVerifyView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name="register"),
    path('api/user/login/', CustomTokenObtainPairView.as_view(), name="login"),
    path('api/user/verify/', CustomTokenVerifyView.as_view(), name="verify"),
    path('api/user/refresh/', CustomTokenRefreshView.as_view(), name="refresh"),
    path('api/user/logout/', CustomLogoutView.as_view(), name="logout"),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include("api.urls"))
]