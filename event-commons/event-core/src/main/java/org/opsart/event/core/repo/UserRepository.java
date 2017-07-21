package org.opsart.event.core.repo;

import org.opsart.event.core.dao.UserDAO;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<UserDAO, String> {

	@Query("{email:'?0'}")
    UserDAO findUserByEmail(String email);
	
}
