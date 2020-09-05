from django.conf.urls import url
from . import views
from django.urls import path

# criei essa file no meu app func para n precisar ficar importando na pasta principal


urlpatterns = [
    url(r"$^", views.paginaInicial),
    url(r"visualizar/", views.visualizar, name="url_visualizar"),
    url(r"cadastrar/", views.cadastrar, name="url_cadastrar"),
    url(r"alterar/", views.alterar, name="url_alterar")
]
