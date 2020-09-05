from django.shortcuts import redirect, render
from .models import Transacao
from .form import GetUserForm, NewUserForm


# Create your views here.
def paginaInicial(request):
    data = {}
    data["transacoes"] = ["t1", "t2", "t3"]
    return render(request, "sites/index.html", data)


def visualizar(request):
    data = {}
    data["transacoes"] = Transacao.objects.all()
    return render(request, "sites/visualizar.html", data)


def cadastrar(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            image_dict = (
                {"imagem": request.FILES["imagem"]}
                if request.FILES.get("imagem") is not None
                else {}
            )
            new_user = Transacao(
                email=data["email"],
                nome=data["nome"],
                sobrenome=data["sobrenome"],
                investimentos_id=data["investimentos_id"],
                **image_dict
            )
            new_user.save()
            return redirect("url_visualizar")
    return render(request, "sites/cadastrar.html", {"form": NewUserForm()})


def alterar(request):
    if request.method == "POST":
        req_form = GetUserForm(request.POST)
        if req_form.is_valid():
            user_obj = Transacao.objects.get(id=req_form.cleaned_data["user_id"])
            if req_form.cleaned_data["operation"] == "edit":
                for k, v in req_form.cleaned_data.items():
                    if k in ["user_id", "operation"]:
                        continue
                    setattr(user_obj, k, v)
                user_obj.save()
            elif req_form.cleaned_data["operation"] == "delete":
                user_obj.delete()
                form = GetUserForm()

            if req_form.cleaned_data["operation"] in ["edit", "fetch"]:
                form = GetUserForm(
                    {
                        "user_id": user_obj.id,
                        "nome": user_obj.nome,
                        "sobrenome": user_obj.sobrenome,
                        "investimentos_id": user_obj.investimentos_id,
                    }
                )
    else:
        form = GetUserForm()
    return render(request, "sites/alterar.html", {"form": form})


def linkar(request):
    return render(request, "sites/linkar.html")
