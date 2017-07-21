package org.opsart.event.core.facade;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.opsart.event.core.dao.RankDAO;
import org.opsart.event.core.dto.ProfileDTO;
import org.opsart.event.core.service.EventService;
import org.opsart.event.core.service.SocialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SocialFacade {
	
	public static final long RANK_LIKE = +1;
	public static final long RANK_UNLIKE = -1;
	
	@Autowired
	private UserFacade userFacade;
	
	@Autowired
	private EventService eventService;
	
	
	@Autowired
	private SocialService socialService;
	
	public ProfileDTO getProfile(HttpSession session) {
		return socialService.getProfile(userFacade.getSessionUser(session));
	}
	
	public RankDAO rankEvent(HttpSession session, String eventId, long rank) {
		//Normalize Rank ;)
		if(rank > 0) return rankEventInternal(session, eventId, RANK_LIKE);
		else if(rank < 0) return rankEventInternal(session, eventId, RANK_UNLIKE);
		else return rankEventInternal(session, eventId, 0);
	}
	
	public List<RankDAO> getRanks(HttpSession session, String[] eventIds) {
		return this.socialService.getRanks(this.userFacade.getSessionUser(session), eventIds);
	}
	
	
	protected RankDAO rankEventInternal(HttpSession session, String eventId, long rank) {
		if(userFacade.hasSessionUser(session)) {
			//Rank
			RankDAO dao = this.socialService.getRank(userFacade.getSessionUser(session), eventId);

			//Event Rank
			long rankPositive = 0;
			long rankNegative = 0;
			
			//Already vote?
			if(dao != null) {
				//Already vote?
				if(dao.vote > 0) rankPositive -= dao.vote;
				if(dao.vote < 0) rankNegative -= dao.vote;
				
				//Change
				dao.changedVote += 1;
				dao.vote = rank;
				
			} else {
				//Create
				dao = new RankDAO();
				dao.eventId = eventId;
				dao.user = userFacade.getSessionUser(session);
				dao.vote = rank;
			}
			
			//Save Rank
			dao = this.socialService.saveRank(dao);
			
			//Update Current Rank
			if(dao.vote > 0) rankPositive += dao.vote;
			if(dao.vote < 0) rankNegative += dao.vote;
			
			//Update Event
			this.eventService.updateEventRank(eventId, rankPositive, rankNegative);
			
			//Update Social
			return dao;
		}
		return null;
	}
	
}
