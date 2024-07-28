from django.urls import path
from . import views

urlpatterns = [
    path("my-products/", views.OwnProductsCreate.as_view(), name="my-products"),
    path("products/", views.ProductCatalogView.as_view(), name="product-list"),
    path("user/", views.GetUserView.as_view(), name="user-data"),
    path("products/delete/<int:pk>/", views.ProductDelete.as_view(), name="delete-product")
]