package org.opsart.event.core.rest;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.opsart.event.core.CorsOption;
import org.opsart.event.core.dao.EventDAO;
import org.opsart.event.core.dto.QueryDTO;
import org.opsart.event.core.dto.ResultDTO;
import org.opsart.event.core.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/event")
public class EventRestController {

	private Logger LOG = LogManager.getLogger(EventRestController.class);
	
	@Autowired
	private EventService searchService;
	
	@CrossOrigin(origins={ "${cors.origin}" }, maxAge=CorsOption.maxAge, allowCredentials=CorsOption.allowCredentials)
	@RequestMapping(value="", method=RequestMethod.POST)
	public ResponseEntity<ResultDTO> doSearch(@RequestBody QueryDTO query) {
		//SEARCH
		try {
			return new ResponseEntity<ResultDTO>(searchService.search(query), HttpStatus.OK);
		} catch(Exception e) {
			LOG.error("fail to process [doSearch] request", e);
			return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
		} 
	}
	
	@CrossOrigin(origins={ CorsOption.origins }, maxAge=CorsOption.maxAge, allowCredentials=CorsOption.allowCredentials)
	@RequestMapping(value="/{eventId}", method=RequestMethod.GET)
	public ResponseEntity<EventDAO> getEvent(@PathVariable String eventId) {
		try {
			return new ResponseEntity<EventDAO>(searchService.getEvent(eventId), HttpStatus.OK);
		} catch(Exception e) {
			LOG.error("fail to process [getEvent] request", e);
			return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
		}
	}
	
	@CrossOrigin(origins={ CorsOption.origins }, maxAge=CorsOption.maxAge, allowCredentials=CorsOption.allowCredentials)
	@RequestMapping(value="/save", method=RequestMethod.POST)
	public ResponseEntity<EventDAO> saveEvent(@RequestBody EventDAO event) {
		try {
			this.searchService.writeEvent(event);
			return new ResponseEntity<EventDAO>(event, HttpStatus.OK);
		} catch(Exception e) {
			LOG.error("fail to process [getEvent] request", e);
			return new ResponseEntity<EventDAO>(HttpStatus.SERVICE_UNAVAILABLE);
		}
	}
	
}
