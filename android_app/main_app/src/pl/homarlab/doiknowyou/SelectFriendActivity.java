package pl.homarlab.doiknowyou;

import pl.homarlab.doiknowyou.model.User;
import pl.homarlab.doiknowyou.provider.FacebookDataProvider;

import android.app.ListActivity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;
import android.view.View;

public class SelectFriendActivity extends ListActivity {

	public static final String USER_NAME = "USER_NAME";
	public static final String USER_ID = "USER_ID";	
	String source;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);				
		
		Intent intent = getIntent();
		source = intent.getStringExtra(MenuActivity.SOURCE);						    
		
	    ArrayAdapter<User> adapter = new ArrayAdapter<User>(this,
	        R.layout.activity_select_friend, R.id.label, 
	        FacebookDataProvider.getFriendsList());
	    
	    TextView textView = new TextView(this);
	    textView.setText("There are " + FacebookDataProvider.getNumberOfFriends() + " different possibilities!");
	    ListView listView = getListView();
	    listView.addHeaderView(textView);
	    
	    setListAdapter(adapter);
	    
	}
	
	@Override
	protected void onListItemClick(ListView l, View v, int position, long id) {
		if(source.equals(MenuActivity.INVITE_FRIEND)){
			setRedirectionToInviteFriend((User)l.getItemAtPosition(position));
		}else {
			setRedirectionToFillTest((User)l.getItemAtPosition(position));
		}
	}

	private void setRedirectionToInviteFriend(User item) {
		Intent intent = new Intent(this, SolveTestActivity.class);
		intent.putExtra(USER_NAME, item.getName());
		intent.putExtra(USER_ID, item.getId());
		startActivity(intent);
	}
	

	private void setRedirectionToFillTest(User item) {
		Intent intent = new Intent(this, SolveTestActivity.class);
		intent.putExtra(USER_NAME, FacebookDataProvider.getLoginUserName());
		intent.putExtra(USER_ID, FacebookDataProvider.getLoginUserId());
		startActivity(intent);
	}
}
