package org.opsart.event.core.dao;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "rank")
@CompoundIndexes({
    @CompoundIndex(name = "user_event", def = "{'user.id' : 1, 'eventId': 1}")
})
public class RankDAO {

	@Id
	public String id;
	
	@DBRef
	public UserDAO user;
	
	public String eventId;
	
	public long vote = 0;
	
	public Date date = new Date();
	
	public long changedVote = 0;
	
}
