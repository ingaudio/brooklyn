package org.opsart.event.core.dao;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "auth")
public class AuthDAO {

	@Id
	public String id;
	
	@DBRef
	public UserDAO user;
	
	@Indexed(unique=true)
	public String token;
	
	public Date creationDate = new Date();
	
	public Date lastLogin = new Date();
	
	public Date endDate;
	
	//TRACE
	
	public String provider;
	
	public String remoteHost;
	
	public String remoteAddress;
	
	public String userAgent;
	
	public boolean isValid() {
		return (endDate != null && new Date().before(endDate));
	}
	
}
