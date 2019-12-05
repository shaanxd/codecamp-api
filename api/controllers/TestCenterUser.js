const Examination = require('../models/Examination');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

module.exports.addExamination = async (req, res, next) => {
  const {
    body: {
      title,
      easyQuestionCount,
      moderateQuestionCount,
      advanceQuestionCount,
      durationInMinutes
    }
  } = req;
  try {
    if (
      title &&
      easyQuestionCount &&
      moderateQuestionCount &&
      advanceQuestionCount &&
      durationInMinutes
    ) {
      const createdExamination = await Examination.create({
        title,
        easyQuestionCount,
        moderateQuestionCount,
        advanceQuestionCount,
        durationInMinutes
      });
      res.status(200).json({
        examinationId: createdExamination.id
      });
    } else {
      res.status(401).json({
        message: 'Bad Request'
      });
    }
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message || 'Internal server error please try again.'
    });
  }
};

module.exports.addQuestion = async (req, res) => {
  const {
    body: { examinationId, difficultyLevel, question, answers }
  } = req;
  try {
    if (!examinationId || !difficultyLevel || !question || !answers) {
      return res.status(401).json({
        message: 'Bad Request'
      });
    }
    const examination = await Examination.findOne({
      where: {
        id: examinationId
      }
    });
    if (examination) {
      const addedQuestion = await Question.create({
        question,
        difficulty: difficultyLevel,
        examId: examinationId
      });
      const answerList = answers.map(answer => {
        return { ...answer, questionId: addedQuestion.id };
      });
      const addedAnswers = await Answer.bulkCreate(answerList);
      res.status(200).json({
        question: addedQuestion,
        answers: addedAnswers
      });
    } else {
      res.status(400).json({
        message: 'Examination not found'
      });
    }
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message || 'Internal server error please try again.'
    });
  }
};
