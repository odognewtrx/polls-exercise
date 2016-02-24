
from rest_framework import serializers
from polls.models import Json_config, Question, Choice, VoteSub, AnswerCount

class ConfigSerializer(serializers.ModelSerializer):

    class Meta:
        model = Json_config
        fields = ('id', 'page_name', 'field_name', 'field_text',)

class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question

class DetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Choice

class VoteSerializer(serializers.Serializer):
    answer_id = serializers.IntegerField();
    question_id = serializers.IntegerField();

    def create(self, validated_data):
        return VoteSub(**validated_data)

class CountSerializer(serializers.Serializer):
    question_id = serializers.IntegerField();
    answer_count = serializers.IntegerField();

    def create(self, validated_data):
        return AnswerCount(**validated_data)

