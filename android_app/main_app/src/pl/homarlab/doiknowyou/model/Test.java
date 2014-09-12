package pl.homarlab.doiknowyou.model;

import java.util.List;

public class Test {
	
	private Long testId;
	private String testName;
	private String testDescription;
	private List<Question> questions;
	private transient int currentQuestionNumber = 0;
	
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

	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	public String getTestDescription() {
		return testDescription;
	}

	public void setTestDescription(String testDescription) {
		this.testDescription = testDescription;
	}

	public Long getTestId() {
		return testId;
	}

	public void setTestId(Long testId) {
		this.testId = testId;
	}
	
	public boolean isFirstQuestion(){
		if(currentQuestionNumber == 0) {
			return true;
		}
		return false;
	}
}
