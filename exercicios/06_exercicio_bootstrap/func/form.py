from django.forms import ModelForm
from django import forms
from .models import Transacao, Categoria


def _get_user_email_choices():
    return [(x.id, x.email) for x in Transacao.objects.all()]


def _get_investment_choices():
    return [(x.id, x.nome) for x in Categoria.objects.all()]


class NewUserForm(forms.Form):
    email = forms.CharField(max_length=20)
    nome = forms.CharField(max_length=20)
    sobrenome = forms.CharField(max_length=20)
    investimentos_id = forms.ChoiceField(choices=[], label="Investimentos")
    imagem = forms.ImageField(required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["investimentos_id"].choices = _get_investment_choices()


class GetUserForm(forms.Form):
    user_id = forms.ChoiceField(required=False, choices=[], label="Email")
    nome = forms.CharField(max_length=20, required=False)
    sobrenome = forms.CharField(max_length=20, required=False)
    investimentos_id = forms.ChoiceField(
        required=False, choices=[], label="Investimentos"
    )
    operation = forms.ChoiceField(
        required=False,
        choices=(("fetch", "Fetch"), ("edit", "Edit"), ("delete", "Delete")),
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["user_id"].choices = _get_user_email_choices()
        self.fields["investimentos_id"].choices = _get_investment_choices()
