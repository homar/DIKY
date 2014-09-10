package pl.homarlab.doiknowyou.facebook;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import pl.homarlab.doiknowyou.R;
import pl.homarlab.doiknowyou.model.User;
import pl.homarlab.doiknowyou.provider.FacebookDataProvider;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.Request;
import com.facebook.Response;
import com.facebook.Session;
import com.facebook.SessionState;
import com.facebook.UiLifecycleHelper;
import com.facebook.model.GraphMultiResult;
import com.facebook.model.GraphObject;
import com.facebook.model.GraphObjectList;
import com.facebook.model.GraphUser;
import com.facebook.widget.LoginButton;

public class MainFragment extends Fragment{
	
	private static final String TAG = "MainFragment";
	
	private Session.StatusCallback callback = new Session.StatusCallback() {
	    @Override
	    public void call(Session session, SessionState state, Exception exception) {
	        onSessionStateChange(session, state, exception);
	    }
	};
		
	private UiLifecycleHelper uiHelper;
	
	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
	    View view = inflater.inflate(R.layout.activity_menu, container, false);

	    LoginButton authButton = (LoginButton) view.findViewById(R.id.authButton);
	    authButton.setFragment(this);
	    authButton.setReadPermissions(Arrays.asList("user_friends"));
	    
	    return view;
	}
	
	private void onSessionStateChange(Session session, SessionState state, Exception exception) {
	    if (state.isOpened()) {
	        this.getView().findViewById(R.id.fillTestAboutFriend).setVisibility(View.VISIBLE);
	        this.getView().findViewById(R.id.fillTestAboutYourself).setVisibility(View.VISIBLE);
	        
	        Request.newMeRequest(session, new Request.GraphUserCallback() {

	            // callback after Graph API response with user object
	            @Override
	            public void onCompleted(GraphUser user, Response response) {
	              if (user != null) {
	                FacebookDataProvider.setLoginUserName(user.getName());
	                FacebookDataProvider.setLoginUserId(user.getId());	               
	              }
	            }
	          }).executeAsync();
	        
	        Request friendsRequest = createRequest(session);
	        friendsRequest.setCallback(new Request.Callback() {
				
				@Override
				public void onCompleted(Response response) {
					List<GraphUser> friends = getResults(response);
					for(GraphUser graphUser : friends){	
						User user = new User((String)graphUser.getProperty("id"),
								(String)graphUser.getProperty("name"));						
						FacebookDataProvider.addFriend(user);
					}
				}
			});
	        friendsRequest.executeAsync();
	    } else if (state.isClosed()) {
	    	this.getView().findViewById(R.id.fillTestAboutFriend).setVisibility(View.GONE);
	        this.getView().findViewById(R.id.fillTestAboutYourself).setVisibility(View.GONE);
	    }
	}
	
	private Request createRequest(Session session) {
	    Request request = Request.newGraphPathRequest(session, "me/friends", null);

	    Set<String> fields = new HashSet<String>();
	    String[] requiredFields = new String[] {"name",
	            "installed" };
	    fields.addAll(Arrays.asList(requiredFields));

	    Bundle parameters = request.getParameters();
	    parameters.putString("fields", TextUtils.join(",", fields));
	    request.setParameters(parameters);

	    return request;
	}
	
	private List<GraphUser> getResults(Response response) {
	    GraphMultiResult multiResult = response
	            .getGraphObjectAs(GraphMultiResult.class);
	    GraphObjectList<GraphObject> data = multiResult.getData();
	    return data.castToListOf(GraphUser.class);
	}
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);
	    uiHelper = new UiLifecycleHelper(getActivity(), callback);
	    uiHelper.onCreate(savedInstanceState);
	}
	
	@Override
	public void onResume() {
	    super.onResume();
	    Session session = Session.getActiveSession();
	    if (session != null &&
	           (session.isOpened() || session.isClosed()) ) {
	        onSessionStateChange(session, session.getState(), null);
	    }
	    uiHelper.onResume();
	}

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
	    super.onActivityResult(requestCode, resultCode, data);
	    uiHelper.onActivityResult(requestCode, resultCode, data);
	}

	@Override
	public void onPause() {
	    super.onPause();
	    uiHelper.onPause();
	}

	@Override
	public void onDestroy() {
	    super.onDestroy();
	    uiHelper.onDestroy();
	}

	@Override
	public void onSaveInstanceState(Bundle outState) {
	    super.onSaveInstanceState(outState);
	    uiHelper.onSaveInstanceState(outState);
	}
	
}
