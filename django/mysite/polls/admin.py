from django.contrib import admin

# Register your models here.

from .models import Question, Choice, Json_config

class QuestionAdmin(admin.ModelAdmin):
    # ...
    list_display = ('question_text', 'pub_date')


class Json_configAdmin(admin.ModelAdmin):
    list_display = ('field_name', 'page_name', 'field_text')

admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
admin.site.register(Json_config, Json_configAdmin)

