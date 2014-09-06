package pl.homarlab.doiknowyou;


import pl.homarlab.doiknowyou.facebook.MainFragment;
import android.support.v4.app.FragmentActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;


public class MenuActivity extends FragmentActivity {

	public static final String SOURCE = "MENU_ACTIVITY_SOURCE"; 
	public static final String FILL_TEST_SOURCE = "MENU_ACTIVITY_FILL_TEST";
	public static final String INVITE_FRIEND = "MENU_ACTIVITY_INVITE_FRIEND";
	
	private MainFragment mainFragment;
	
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        if(savedInstanceState == null) {
        	mainFragment = new MainFragment();
        	getSupportFragmentManager()
        		.beginTransaction()
        		.add(android.R.id.content, mainFragment)
        		.commit();
        } else {
        	mainFragment = (MainFragment) getSupportFragmentManager()
        			.findFragmentById(android.R.id.content);
        }               
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
      
    }
    
}
