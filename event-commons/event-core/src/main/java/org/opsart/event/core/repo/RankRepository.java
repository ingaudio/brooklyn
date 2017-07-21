package org.opsart.event.core.repo;

import java.util.List;

import org.opsart.event.core.dao.RankDAO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface RankRepository extends MongoRepository<RankDAO, String> {

	@Query("{ 'user.id': ?0, 'eventId': ?1 }")
	RankDAO findRank(String userId, String eventId);
	
	@Query(value="{ 'user.id':?0 }", fields="{ 'user':0 }")
	Page<RankDAO> findLastRanks(String userID, Pageable pageable);
	
	@Query(value="{ 'user.id':?0, eventId:{ $in:?1 } }", fields="{ 'user':0 }")
	List<RankDAO> findEventRanks(String userID, String[] eventIds);
	
}
