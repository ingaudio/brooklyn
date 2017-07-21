package org.opsart.event.core.rest;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.opsart.event.core.CorsOption;
import org.opsart.event.core.dto.FacetDTO;
import org.opsart.event.core.dto.GeoDTO;
import org.opsart.event.core.service.GoogleService;
import org.opsart.event.core.service.EventService;
import org.opsart.event.core.service.TermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/term")
public class TermRestController {

	private Logger LOG = LogManager.getLogger(TermRestController.class);

	@Autowired
	private TermService termService;
	
	@Autowired
	private EventService searchService;
	
	@Autowired
	private GoogleService googleService;
	
	@CrossOrigin(origins={ CorsOption.origins }, maxAge=CorsOption.maxAge, allowCredentials=CorsOption.allowCredentials)
	@RequestMapping(value="/facet/{term}", method=RequestMethod.GET)
	public ResponseEntity<List<FacetDTO>> getTerms(@PathVariable String term) {
		try {
			return new ResponseEntity<List<FacetDTO>>(termService.getTerms(term), HttpStatus.OK);
		} catch (Exception e) {
			LOG.error("fail to process [getTerms] request", e);
			return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
		}
	}
	
	@CrossOrigin(origins={ CorsOption.origins }, maxAge=CorsOption.maxAge, allowCredentials=CorsOption.allowCredentials)
	@RequestMapping(value="/geo", method=RequestMethod.GET)
	public ResponseEntity<List<GeoDTO>> getGeo(@RequestParam(name="place",required=false) String place, @RequestParam(name="address",required=false) String address) {
		try {
			
			//By Place
			if(StringUtils.isNotEmpty(place)) {
				return new ResponseEntity<List<GeoDTO>>(this.searchService.searchPlace(place), HttpStatus.OK);
			}
			
			//By Address
			if(StringUtils.isNotEmpty(address)) {
				return new ResponseEntity<List<GeoDTO>>(this.googleService.searchAddress(address), HttpStatus.OK);
			}
			
			//Bad
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		} catch (Exception e) {
			LOG.error("fail to process [getGeo] request", e);
			return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
		}
	}
	
}
