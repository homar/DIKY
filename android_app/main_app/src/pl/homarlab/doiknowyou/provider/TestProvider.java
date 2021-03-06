package pl.homarlab.doiknowyou.provider;

import java.util.Arrays;

import pl.homarlab.doiknowyou.model.OpenQuestion;
import pl.homarlab.doiknowyou.model.Question;
import pl.homarlab.doiknowyou.model.Test;

public class TestProvider {
	
	private Test test;
	
	public TestProvider(){
		Question q1 = new OpenQuestion(1L, "What is his name?");
		Question q2 = new OpenQuestion(2L, "How old is he?");
		test = new Test(Arrays.asList(q1, q2));
	}
	
	public Test getTestForUser(String userId){
		return test; 
	}
	
}
