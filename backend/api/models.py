from django.db import models
from django.contrib.auth.models import User

def content_file_name(instance, filename):
    return '/'.join(['content', instance.user.username, filename])

# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=100)
    #image = models.ImageField(upload_to=content_file_name)
    description = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=10)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")

    # change management
    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title