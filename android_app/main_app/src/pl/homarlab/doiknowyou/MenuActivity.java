package pl.homarlab.doiknowyou;

import com.facebook.*;
import com.facebook.model.GraphUser;

import android.support.v7.app.ActionBarActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;


public class MenuActivity extends ActionBarActivity {

	public static final String SOURCE = "MENU_ACTIVITY_SOURCE"; 
	public static final String FILL_TEST_SOURCE = "MENU_ACTIVITY_FILL_TEST";
	public static final String INVITE_FRIEND = "MENU_ACTIVITY_INVITE_FRIEND";
	
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);
        
        Session.openActiveSession(this, true, new Session.StatusCallback() {

            // callback when session changes state
            @Override
            public void call(Session session, SessionState state, Exception exception) {
            	if (session.isOpened()) {
            		// make request to the /me API
            		Request.newMeRequest(session, new Request.GraphUserCallback() {

            		  // callback after Graph API response with user object
            		  @Override
            		  public void onCompleted(GraphUser user, Response response) {
            			  if (user != null) {
            				  TextView welcome = (TextView) findViewById(R.id.welcome);
            				  welcome.setText("Hello " + user.getName() + "!");
            			  }
            		  }
            		}).executeAsync();
            	}
            }
          });
    }

    //called when the user wants to fill the test
    public void fillTest(View view){
    	Intent intent = new Intent(this, SelectFriendActivity.class);
    	intent.putExtra(SOURCE, FILL_TEST_SOURCE);
    	startActivity(intent);
    }
    
    public void inviteFriend(View view){
    	Intent intent = new Intent(this, SelectFriendActivity.class);
    	intent.putExtra(SOURCE, INVITE_FRIEND);
    	startActivity(intent);
    }
    
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
      super.onActivityResult(requestCode, resultCode, data);
      Session.getActiveSession().onActivityResult(this, requestCode, resultCode, data);
    }
    
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
