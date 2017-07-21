package org.opsart.event.core.service;

import org.opsart.event.core.dao.UserDAO;
import org.opsart.event.core.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

//	private static final Logger LOG = LogManager.getLogger(UserService.class);

	@Autowired
	private UserRepository repo;
	
	public UserDAO getUser(String id) {
		return repo.findOne(id);
	}
	
	public UserDAO getUserByEmail(String email) {
		return repo.findUserByEmail(email);
	}
	
	public UserDAO updateOrCreateUser(UserDAO user) {
		return repo.save(user);
	}
	
//	public boolean canEdit(UserDAO user, EventDAO event) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
//		//Loop on roles
//		for(String key : user.roles.keySet()) {
//			//Loop on role
//			for(String value : user.roles.get(key)) {
//				if(value.equalsIgnoreCase((String)PropertyUtils.getSimpleProperty(event, key))) {
//					return true;
//				}
//			}
//		}
//		//Fallback
//		return false;
//	}
	
}
