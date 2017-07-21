package org.opsart.event.core.repo;

import javax.annotation.Resource;

import org.opsart.event.core.config.SolrConfig;
import org.opsart.event.core.dao.EventDAO;
import org.springframework.data.domain.Page;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.data.solr.core.query.FacetQuery;
import org.springframework.data.solr.core.query.Query;
import org.springframework.data.solr.core.query.SimpleQuery;
import org.springframework.data.solr.core.query.SimpleStringCriteria;
import org.springframework.data.solr.core.query.SimpleTermsQuery;
import org.springframework.data.solr.core.query.result.FacetPage;
import org.springframework.data.solr.core.query.result.TermsPage;
import org.springframework.stereotype.Repository;

@Repository
public class EventRepository {

	@Resource
	protected SolrTemplate solrTemplate;

	public FacetPage<EventDAO> searchFacet(FacetQuery query) {
		return solrTemplate.queryForFacetPage(query, EventDAO.class);
	}

	public long count() {
		return solrTemplate.count(new SimpleQuery("*:*"));
	}

	public EventDAO getEvent(String eventId) {
		return solrTemplate.getById(eventId, EventDAO.class);
	}

	public TermsPage searchTerm(String field) {
		return solrTemplate.queryForTermsPage(SolrConfig.CORE_EVENT, SimpleTermsQuery.queryBuilder(field).withCriteria(new SimpleStringCriteria("*:*")).build());
	}
	
	public Page<EventDAO> searchEvent(Query query) {
		return solrTemplate.query(query, EventDAO.class);
	}
	
	public void save(EventDAO event) {
		this.solrTemplate.saveBean(event);
		this.solrTemplate.commit(SolrConfig.CORE_EVENT);
	}

}
