from django.db import models

# Create your models here.
class Student(models.Model):
  id = models.IntegerField(primary_key=True)
  firstname = models.CharField(max_length=30)
  lastname = models.CharField(max_length=30)
  department = models.CharField(max_length=200)
