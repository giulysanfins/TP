# Generated by Django 3.1.1 on 2020-09-03 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("func", "0002_transacao_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="transacao",
            name="image",
            field=models.ImageField(blank=True, upload_to="media/"),
        ),
    ]
