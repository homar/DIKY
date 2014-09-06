package pl.homarlab.doiknowyou;

import pl.homarlab.doiknowyou.provider.UserListProvider;

import android.app.ListActivity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;
import android.view.View;

public class SelectFriendActivity extends ListActivity {

	private static final String INVITE_FRIEND = "Invite Friend";
	private static final String FILL_TEST = "Fill test";
	private UserListProvider userListProvider = new UserListProvider();
	String source;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);				
		
		Intent intent = getIntent();
		source = intent.getStringExtra(MenuActivity.SOURCE);						    
		
	    ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
	        R.layout.activity_select_friend, R.id.label, 
	        UserListProvider.getUserList());
	    
	    TextView textView = new TextView(this);
	    textView.setText("There are " + UserListProvider.getNumberOfUsers() + " different possibilities!");
	    ListView listView = getListView();
	    listView.addHeaderView(textView);
	    
	    setListAdapter(adapter);
	    
	}
	
	@Override
	protected void onListItemClick(ListView l, View v, int position, long id) {
		if(source.equals(MenuActivity.INVITE_FRIEND)){
			setRedirectionToInviteFriend((String)l.getItemAtPosition(position));
		}else {
			setRedirectionToFillTest((String)l.getItemAtPosition(position));
		}
	}

	private void setRedirectionToInviteFriend(String item) {
		setTitle(INVITE_FRIEND);
		Toast toast = Toast.makeText(this, "Invite Friends " + item, 3000);
		toast.show();
	}
	

	private void setRedirectionToFillTest(String item) {
		setTitle(FILL_TEST);
		Toast toast = Toast.makeText(this, "Fill Test " + item, 3000);
		toast.show();
	}
}
