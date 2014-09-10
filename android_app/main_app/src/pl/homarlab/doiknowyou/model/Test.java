package pl.homarlab.doiknowyou.model;

import java.util.List;

public class Test {

	private List<Question> questions;
	private int currentQuestionNumber = 0;
	
	public Test(List<Question> questions){
		this.questions = questions;
	}
	
	public List<Question> getQuestions(){
		return questions;
	}
	
	public int getNumberOfQuestions(){
		return questions.size();
	}
	
	public Question getCurrentQuestion(){
		return questions.get(currentQuestionNumber);
	}
	
	public Question getNextQuestion(){
		if(currentQuestionNumber < questions.size()-1){
			currentQuestionNumber++;
		}
		return getCurrentQuestion();
	}
	
	public Question getPreviousQuestion(){
		if(currentQuestionNumber > 0){
			currentQuestionNumber--;
		}
		return getCurrentQuestion();
	}
}
