package org.opsart.event.core.service;

import java.util.List;

import org.opsart.event.core.dao.RankDAO;
import org.opsart.event.core.dao.UserDAO;
import org.opsart.event.core.dto.ProfileDTO;
import org.opsart.event.core.repo.RankRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class SocialService {

	public static final int RANK_PAGE = 100;
	
	@Autowired
	private RankRepository rankRepo;
	
	public ProfileDTO getProfile(UserDAO user) {
		
		//Create Profile
		ProfileDTO profile = new ProfileDTO();
		
		//Last Ranks
		profile.eventRanks = rankRepo.findLastRanks(user.id, new PageRequest(0, RANK_PAGE, new Sort(Sort.Direction.DESC,"date"))).getContent();
		
		//End
		return profile;
	}
	
	public List<RankDAO> getRanks(UserDAO user, String[] eventIds) {
		return rankRepo.findEventRanks(user.id, eventIds);
	}
	
	public RankDAO getRank(UserDAO user, String eventId) {
		return rankRepo.findRank(user.id, eventId);
		
	}
	
	public RankDAO saveRank(RankDAO rank) {
		return this.rankRepo.save(rank);
	}
	
}
