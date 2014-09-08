package pl.homarlab.doiknowyou.provider;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import pl.homarlab.doiknowyou.model.User;

import com.facebook.model.GraphUser;

public class UserListProvider {
	
	public static Set<User> users = new HashSet<User>();
	
	public static User[] getUserList(){
		List<User> userList = new ArrayList<User>();
		userList.addAll(users);
		return userList.toArray(new User[userList.size()]);
	}
	
	public static int getNumberOfUsers(){
		return users.size();
	}
	
	public static void addUser(User graphUser){
		users.add(graphUser);
	}
	

}
