package pl.homarlab.doiknowyou.model;

import java.util.List;

public class TestFulfillment {

	private Long testNumber;
	private User owner;
	private List<Answer> answers;
	
	public Long getTestNumber() {		
		return testNumber;
	}
	
	public void setTestNumber(Long testNumber) {
		this.testNumber = testNumber;
	}
	
	public User getOwner() {
		return owner;
	}
	
	public void setOwner(User owner) {
		this.owner = owner;
	}
	
	public List<Answer> getAnswers() {
		return answers;
	}
	
	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}		
}
