from django.urls import path
from . import views

urlpatterns = [
    path('rag', views.rag_answer, name='rag_answer'),
    path('api/chat', views.chat_endpoint, name='chat_endpoint'),
] 