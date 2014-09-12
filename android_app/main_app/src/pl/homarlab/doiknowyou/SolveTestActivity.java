package pl.homarlab.doiknowyou;

import pl.homarlab.doiknowyou.model.Question;
import pl.homarlab.doiknowyou.model.Test;
import pl.homarlab.doiknowyou.provider.TestProvider;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class SolveTestActivity extends Activity{

	private TestProvider testProvider = new TestProvider();
	private Test test;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);				
		setContentView(R.layout.activity_solve_test);
		
	    Intent intent = getIntent();	    
	    String userId = intent.getStringExtra(SelectFriendActivity.USER_ID);
	    test = testProvider.getTestForUser("D");
	    
	    Question firstQuestion = test.getCurrentQuestion();	    
	    setQuestion(firstQuestion);

	}
	
	public void prevQuestion(View view){		
		Question question = test.getPreviousQuestion();
		setQuestion(question);
	}
	
	public void nextQuestion(View view){
		Question question = test.getNextQuestion();
		setQuestion(question);
	}

	private void setQuestion(Question question) {
		TextView questionTextView = (TextView)findViewById(R.id.questionText);
	    questionTextView.setText(question.getText());
	}
	
}
