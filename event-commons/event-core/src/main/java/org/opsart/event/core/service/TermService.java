package org.opsart.event.core.service;

import java.util.ArrayList;
import java.util.List;

import org.opsart.event.core.config.ISolrEvent;
import org.opsart.event.core.dto.FacetDTO;
import org.opsart.event.core.repo.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.solr.core.query.result.TermsFieldEntry;
import org.springframework.data.solr.core.query.result.TermsPage;
import org.springframework.stereotype.Service;

@Service
public class TermService {

	@Autowired
	private EventRepository repo;
	
	public List<FacetDTO> getTerms(String term) {
		//Allowed Terms
		if("category".equalsIgnoreCase(term)) return getTermsSolr(ISolrEvent.category);
		if("tags".equalsIgnoreCase(term)) return getTermsSolr(ISolrEvent.tags);
		if("place".equalsIgnoreCase(term)) return getTermsSolr(ISolrEvent.place);
		if("city".equalsIgnoreCase(term)) return getTermsSolr(ISolrEvent.city);
		return null;
	}
	
	public List<FacetDTO> getTermsSolr(String field) {
		List<FacetDTO> result = new ArrayList<>();
		
		TermsPage page = repo.searchTerm(field);
		for(TermsFieldEntry entry : page.getContent()) {
			result.add(new FacetDTO(entry.getValue(), entry.getValueCount()));
		}
		
		return result;
	}
	
}
