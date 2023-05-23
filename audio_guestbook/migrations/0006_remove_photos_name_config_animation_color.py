# Generated by Django 4.2.1 on 2023-05-10 03:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('audio_guestbook', '0005_rename_cover_photos_image_alter_photos_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photos',
            name='name',
        ),
        migrations.AddField(
            model_name='config',
            name='animation_color',
            field=models.CharField(default='#000000', max_length=7),
            preserve_default=False,
        ),
    ]
