from django.shortcuts import get_object_or_404, get_list_or_404, render

# Create your views here.

from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.views.generic.base import TemplateView
from django.template import RequestContext
from django.utils import timezone

from .models import Choice, Question, Json_config

# For views that return JSON using REST framework.
from rest_framework import generics, mixins
from rest_framework.response import Response
from .serializers import ConfigSerializer, QuestionSerializer, DetailSerializer, VoteSerializer, CountSerializer

import datetime

class ConfigView(generics.ListAPIView):
    """
    Configuration JSON with site values substituted for values not
    defined for the page.
    """
    serializer_class = ConfigSerializer

    def get_queryset(self):

        page_name = self.kwargs['page_name']
        site = get_list_or_404( Json_config, page_name__iexact='site')
        if page_name == 'site': return site

        # replace any site entries with duplicates found for the page
        # or add any unique entries. Note: each page must have a specific
        # title. If not and no other page entries, a 404 will result.
        cfg = list(site)
        for dobj in get_list_or_404( Json_config, page_name__iexact=page_name ):
            i = 0
            found = False
            for sobj in cfg:
                if dobj.field_name == sobj.field_name:
                    cfg[i] = dobj
                    found = True
                i += 1
            if not found: cfg.append( dobj)

        return cfg

# Question list
class IndexJSONView(generics.ListAPIView):
    """
    JSON question list
    """
    serializer_class = QuestionSerializer

    def get_queryset(self):
        queryset = Question.objects.order_by('-pub_date')
        if not queryset: return []
        return queryset

# Single Question
class QuestionJSONView( mixins.CreateModelMixin,
                        mixins.RetrieveModelMixin,
                        generics.GenericAPIView):
    """
    JSON question retrieve
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve( request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

# Answer list for Question
class DetailJSONView(mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     generics.GenericAPIView):
    """
    JSON Choice list
    """
    serializer_class = DetailSerializer

    def get_queryset(self):
        q = get_object_or_404( Question, pk=self.kwargs['pk'] )
        return q.choice_set.order_by('-votes')

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        # If question id was not supplied by the JSON request,
        # insert it from the URL.
        if not u'question' in self.request.data:
            self.request.data[u'question'] = self.kwargs['pk']
        return self.create(request, *args, **kwargs)


# Answer count for eachQuestion
class CountJSONView(mixins.ListModelMixin,
                     generics.GenericAPIView):
    """
    JSON Choice list
    """
    serializer_class = CountSerializer

    def get_queryset(self):

        qset = []
        for q in Question.objects.all():
            qset.append( { 'question_id': q.id, 'answer_count': q.choice_set.count() } )
        return qset

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


# Page views are simple template rendering and supply simple context
# for template processing and JSON object lookup.
class IndexView(TemplateView):
    template_name = 'polls/index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context['question_count'] = Question.objects.count()
        context['page_name'] = "index"
        return context

class DetailView(TemplateView):
    template_name = 'polls/detail.html'

    def get_context_data(self, **kwargs):
        context = super(DetailView, self).get_context_data(**kwargs)
        qid = kwargs['pk']
        question = get_object_or_404(Question, pk=qid)
        context['answers_count'] = question.choice_set.count()
        context['question_id'] = qid
        context['page_name'] = "detail"
        return context

class ResultsView(TemplateView):
    template_name = 'polls/results.html'

    def get_context_data(self, **kwargs):
        context = super(ResultsView, self).get_context_data(**kwargs)
        qid = kwargs['pk']
        question = get_object_or_404(Question, pk=qid)
        context['answers_count'] = question.choice_set.count()
        context['question_id'] = qid
        context['page_name'] = "results"
        return context

class JSONvote(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        sz = VoteSerializer(data=self.request.data)
        if sz.is_valid():
            vote = VoteSerializer().create( sz.validated_data )
            qid = vote.question_id
            aid = vote.answer_id

            question = get_object_or_404(Question, pk=qid)
            try:
                selected_choice = question.choice_set.get(pk=aid)
            except (KeyError, Choice.DoesNotExist):
                # Redisplay the question voting form.
                return render(request, 'polls/detail.html', {
                    'question': question,
                    'error_message': "You didn't select a choice.",
                })
            else:
                selected_choice.votes += 1
                selected_choice.save()
                return Response()


