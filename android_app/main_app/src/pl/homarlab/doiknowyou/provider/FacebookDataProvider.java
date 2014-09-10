package pl.homarlab.doiknowyou.provider;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import pl.homarlab.doiknowyou.model.User;

import com.facebook.model.GraphUser;

public class FacebookDataProvider{
	
	private static Set<User> friends = new HashSet<User>();
	private static String loginUserName;
	private static String loginUserId;
	
	public static User[] getFriendsList(){
		List<User> userList = new ArrayList<User>();
		userList.addAll(friends);
		return userList.toArray(new User[userList.size()]);
	}
	
	public static int getNumberOfFriends(){
		return friends.size();
	}
	
	public static void addFriend(User graphUser){
		friends.add(graphUser);
	}

	public static String getLoginUserName() {
		return loginUserName;
	}

	public static void setLoginUserName(String loginUserName) {
		FacebookDataProvider.loginUserName = loginUserName;
	}

	public static String getLoginUserId() {
		return loginUserId;
	}

	public static void setLoginUserId(String loginUserId) {
		FacebookDataProvider.loginUserId = loginUserId;
	}
	

}
