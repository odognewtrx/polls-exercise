
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf.urls import url

from . import views

app_name = 'polls'
urlpatterns = [
    # Page template URLs
    # ex: /polls/
    url(r'^$', views.IndexView.as_view(), name='index'),
    # ex: /polls/5/
    url(r'^(?P<pk>[0-9]+)/$', views.DetailView.as_view(), name='detail'),
    # ex: /polls/5/results/
    url(r'^(?P<pk>[0-9]+)/results/$', views.ResultsView.as_view(), name='results'),

    # Get data URLs
    # ex: /polls/index/gcfg.json
    url(r'^(?P<page_name>[a-z_]+)/gcfg/$', views.ConfigView.as_view(), name='get_config'),
    # ex: /polls/5/quest.json
    url(r'^(?P<pk>[0-9]+)/quest/$', views.QuestionJSONView.as_view(), name='question_json'),
    # ex: /polls/count.json
    url(r'^count/$', views.CountJSONView.as_view(), name='count_json'),

    # Get and create model URLs
    # Get question list/add question ex: /polls/jindex.json
    url(r'^jindex/$', views.IndexJSONView.as_view(), name='index_json'),
    # Get answer list/add answer ex: /polls/5/answers.json
    url(r'^(?P<pk>[0-9]+)/answers/$', views.DetailJSONView.as_view(), name='answers_json'),

    # Perform action URLs
    # Vote for answer.  ex: /polls/jvote.json
    url(r'^jvote/$', views.JSONvote.as_view(), name='JSONvote'),
]

urlpatterns = format_suffix_patterns(urlpatterns)

