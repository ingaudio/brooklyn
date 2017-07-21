package org.opsart.event.core.rest;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.opsart.event.core.CorsOption;
import org.opsart.event.core.dao.RankDAO;
import org.opsart.event.core.facade.SocialFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/social")
public class SocialRestController {

	private Logger LOG = LogManager.getLogger(SocialRestController.class);
	
	@Autowired
	private SocialFacade socialFacade;
	
	@CrossOrigin(origins={ CorsOption.origins }, maxAge=CorsOption.maxAge, allowCredentials=CorsOption.allowCredentials)
	@RequestMapping(value="/rank/event/{eventId}", method=RequestMethod.GET)
	public ResponseEntity<RankDAO> setRank(@PathVariable String eventId, @RequestParam(name="rank", required=true) Long rank, HttpSession session) {
		try {
			return new ResponseEntity<RankDAO>(this.socialFacade.rankEvent(session, eventId, rank), HttpStatus.OK);
		} catch(Exception e) {
			LOG.error("fail to process [setRank] request", e);
			return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
		}
	}
	
	@CrossOrigin(origins={ CorsOption.origins }, maxAge=CorsOption.maxAge, allowCredentials=CorsOption.allowCredentials)
	@RequestMapping(value="/rank/events", method=RequestMethod.POST)
	public ResponseEntity<List<RankDAO>> getRanks(@RequestBody String[] eventIds, HttpSession session) {
		try {

			//Rank
			return new ResponseEntity<List<RankDAO>>(this.socialFacade.getRanks(session, eventIds), HttpStatus.OK);
			
		} catch(Exception e) {
			LOG.error("fail to process [getRanks] request", e);
			return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
		}
	}
	
	
}
