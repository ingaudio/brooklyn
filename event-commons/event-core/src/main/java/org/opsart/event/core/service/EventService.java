package org.opsart.event.core.service;

import java.util.Arrays;
import java.util.List;

import org.opsart.event.core.config.ISolrEvent;
import org.opsart.event.core.converter.ConverterFacetPage2ResultDTO;
import org.opsart.event.core.converter.ConverterQueryDTO2FacetQuery;
import org.opsart.event.core.dao.EventDAO;
import org.opsart.event.core.dto.GeoDTO;
import org.opsart.event.core.dto.QueryDTO;
import org.opsart.event.core.dto.ResultDTO;
import org.opsart.event.core.repo.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.solr.core.query.Criteria;
import org.springframework.data.solr.core.query.SimpleFilterQuery;
import org.springframework.data.solr.core.query.SimpleQuery;
import org.springframework.stereotype.Service;

@Service
public class EventService {

//	private static final Logger LOG = LogManager.getLogger(SearchService.class);
	
	@Autowired
	private EventRepository repo;
	
	@Autowired
	private ConverterQueryDTO2FacetQuery converterQueryDTO2FacetQuery;
	
	@Autowired
	private ConverterFacetPage2ResultDTO converterFacetPage2ResultDTO;
	
	public ResultDTO search(QueryDTO query) {
		return converterFacetPage2ResultDTO.convert(this.repo.searchFacet(converterQueryDTO2FacetQuery.convert(query)));
	}
	
	public List<GeoDTO> searchPlace(String place) {
		SimpleQuery query = new SimpleQuery(new Criteria(ISolrEvent.place).is(place));
		query.addFilterQuery(new SimpleFilterQuery(new Criteria(ISolrEvent.country).isNotNull()));
		query.addFilterQuery(new SimpleFilterQuery(new Criteria(ISolrEvent.city).isNotNull()));
		query.addFilterQuery(new SimpleFilterQuery(new Criteria(ISolrEvent.locality).isNotNull()));
		query.addFilterQuery(new SimpleFilterQuery(new Criteria(ISolrEvent.place).isNotNull()));
		query.addFilterQuery(new SimpleFilterQuery(new Criteria(ISolrEvent.address).isNotNull()));
		query.addFilterQuery(new SimpleFilterQuery(new Criteria(ISolrEvent.coordinate).isNotNull()));
		
		Page<EventDAO> page = this.repo.searchEvent(query);
		//FIXME TAKE FIRST
		if(page.getContent().size() > 0) {
			GeoDTO geo = new GeoDTO();
			EventDAO event = page.getContent().get(0);
			geo.setCountry(event.getCountry());
			geo.setCity(event.getCity());
			geo.setLocality(event.getLocality());
			geo.setPlace(event.getPlace());
			geo.setAddress(event.getAddress());
			geo.setCoordinate(event.getCoordinate());
			return Arrays.asList(geo);
		}

		return null;
	}
	
	public long getCount() {
		return repo.count();
	}
	
	public EventDAO getEvent(String eventId) {
		return repo.getEvent(eventId);
	}
	
	public void writeEvent(EventDAO event) {
		this.repo.save(event);
	}
	
//	public void updateEventRank(String eventId, long rankPositive, long rankNegative) {
//		EventDAO event = this.repo.getEvent(eventId);
//		event.setRankPositive(event.getRankPositive()+rankPositive);
//		event.setRankNegative(event.getRankNegative()+rankNegative);
//		this.repo.save(event);	
//	}
	
	
}
