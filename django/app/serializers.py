from rest_framework import serializers
from .models import Group, Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    notes = NoteSerializer(many=True, read_only=True)
    
    class Meta:
        model = Group
        fields = '__all__'
