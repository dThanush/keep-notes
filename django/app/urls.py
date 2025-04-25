from django.urls import path
from .views import GroupListCreateView, GroupDetailView, NoteListCreateView, NoteDetailView

urlpatterns = [
    path('groups/', GroupListCreateView.as_view()),
    path('groups/<int:pk>/', GroupDetailView.as_view()),
    path('notes/', NoteListCreateView.as_view()),
    path('notes/<int:pk>/', NoteDetailView.as_view()),
]
