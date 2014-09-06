package pl.homarlab.doiknowyou.provider;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.facebook.model.GraphUser;

public class UserListProvider {
	
	public static Set<GraphUser> users = new HashSet<GraphUser>();
	
	public static String[] getUserList(){
		List<String> userList = new ArrayList<String>();
		for(GraphUser user : users){
			userList.add(user.getFirstName() + " " + user.getLastName());
		}
		return userList.toArray(new String[userList.size()]);
	}
	
	public static int getNumberOfUsers(){
		return users.size();
	}
	
	public static void addUser(GraphUser graphUser){
		users.add(graphUser);
	}
}
