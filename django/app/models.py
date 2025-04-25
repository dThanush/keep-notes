from django.db import models

class Group(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=50, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Note(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=200)
    notes = models.TextField()
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.title
