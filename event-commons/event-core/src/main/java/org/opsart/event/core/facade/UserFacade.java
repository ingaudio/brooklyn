package org.opsart.event.core.facade;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.opsart.event.core.dao.UserDAO;
import org.opsart.event.core.service.AuthService;
import org.opsart.event.core.service.GoogleService;
import org.opsart.event.core.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserFacade {

	public static final String SESSION_USER = "session.user";
	
	@Autowired
	private GoogleService googleService;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private UserService userService;
	
	public UserDAO refresh(UserDAO user) {
		return userService.getUser(user.id);
	}
	
	public UserDAO getSessionUser(HttpSession session) throws SecurityException {
		final UserDAO user = (UserDAO) session.getAttribute(SESSION_USER);
		if(user == null) throw new SecurityException("session [" + session.getId() + "] has not valid user associated!!!");
		return user;
	}

	public void setSessionUser(HttpSession session, UserDAO user) {
		session.setAttribute(SESSION_USER, user);
	}
	
	public boolean hasSessionUser(HttpSession session) {
		return session.getAttribute(SESSION_USER) != null;
	}
	
	public void logoutCurrentSession(HttpSession session) {
		session.removeAttribute(SESSION_USER);
	}
	
	public LoginResponse loginWithGoogle(HttpServletRequest request, HttpSession session, String tokenID) throws Exception {
		
		//Login with google
		UserDAO user = googleService.login(tokenID);
		
		//Check repository
		UserDAO repoUser = this.userService.getUserByEmail(user.email);
	
		//Get or Create
		if(repoUser != null) user = repoUser;
		else user = this.userService.updateOrCreateUser(user);
		
		//Check
		if(user != null) {
			
			//Set session user
			this.setSessionUser(session, user);
			
			//End
			return new LoginResponse(authService.createToken(user, request, "google"), user);
		}

		//End
		return null;
	}
	
	public LoginResponse loginWithToken(HttpSession session, String token) throws Exception {
		
		//Login
		UserDAO user = authService.login(token);
		
		//Check
		if(user != null) {
			this.setSessionUser(session, user);

			return new LoginResponse(token, user);	//Response return same token - currently not needed (future: auto-refresh of expired token)
		}
		
		//Fail
		return null;
	}
	
	
	public class LoginResponse {
		
		public String secretToken;
		
		public UserDAO user;

		public LoginResponse(String secretToken, UserDAO user) {
			super();
			this.secretToken = secretToken;
			this.user = user;
		}
		
	}

}
