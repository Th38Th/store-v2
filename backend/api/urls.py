from django.urls import path
from . import views

urlpatterns = [
    path("products/", views.ProductCatalogCreate.as_view(), name="product-list"),
    path("products/delete/<int:pk>/", views.ProductDelete.as_view(), name="delete-product")
]