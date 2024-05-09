from django.contrib import admin
from django.urls import path

from app.views import ReactView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', ReactView.as_view(), name="x"),
    path('<int:pk>/', ReactView.as_view(), name="xx"),

]
