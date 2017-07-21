package org.opsart.event.core.dao;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class UserDAO implements Serializable {

	private static final long serialVersionUID = -663190985141306664L;

	@Id
	public String id;
	
	/* Roles */
	
	public Map<String, List<String>> roles = new HashMap<>();;

	/* Info */
	
	public String pictureUrl;
	
	public String name;
	
	@Indexed(unique=true)
	public String email;
	
	/* Date */

	public Date creationDate = new Date();
	
	public Date modificationDate = new Date();

	/* Extra */
	
	public Map<String, String> attributes = new HashMap<>();
	
}
