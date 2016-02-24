from __future__ import unicode_literals

import datetime

from django.utils import timezone
from django.db import models

# Create your models here.

class Json_config(models.Model):
    page_name = models.CharField(max_length=20)
    field_name = models.CharField(max_length=20)
    field_text = models.CharField(max_length=200)

    def __str__(self):
        return self.page_name + '-' + self.field_name + '-' + self.field_text

    class Meta:
        ordering = ('field_name', 'page_name')

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.question_text

    def was_published_recently(self):
        # return self.pub_date >= timezone.now() - datetime.timedelta(days=1)
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now

    def save(self, *args, **kwargs):
        self.question_text = self.question_text.strip().rstrip('.').rstrip('?') +'?'
        super(Question, self).save(*args, **kwargs)

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text

    def save(self, *args, **kwargs):
        self.choice_text = self.choice_text.strip().rstrip('.') +'.'
        super(Choice, self).save(*args, **kwargs)

# vote submission action object
class VoteSub(object):
    def __init__(self, question_id, answer_id):
        self.question_id = question_id
        self.answer_id = answer_id

# object to supply the number of answers a question has
class AnswerCount(object):
    def __init__(self, question_id, answer_count):
        self.question_id = question_id
        self.answer_count = answer_count

