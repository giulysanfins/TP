from django.db import models


# Create your models here.
class Categoria(models.Model):
    nome = models.CharField(max_length=100)
    dt_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome


class Transacao(models.Model):
    data = models.DateTimeField(auto_now=True)
    email = models.CharField(max_length=20)
    nome = models.CharField(max_length=20)
    sobrenome = models.CharField(max_length=20)
    investimentos = models.ForeignKey(
        Categoria, on_delete=models.CASCADE, null=True, blank=True
    )
    # observacoes = models.TextField(null=True,blank=True)
    imagem = models.ImageField(
        default="images/default.png", upload_to="images", null=True, blank=True
    )

    def __str__(self):
        return self.email
