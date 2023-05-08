# Generated by Django 4.2.1 on 2023-05-08 03:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('audio_guestbook', '0002_rename_audiobook_config'),
    ]

    operations = [
        migrations.AddField(
            model_name='config',
            name='speaker_ringtone_play_period',
            field=models.IntegerField(default=90),
        ),
        migrations.AddField(
            model_name='config',
            name='warning_message_length',
            field=models.IntegerField(default=90),
        ),
    ]
