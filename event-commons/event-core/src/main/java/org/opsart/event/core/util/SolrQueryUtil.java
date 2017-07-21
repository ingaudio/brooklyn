package org.opsart.event.core.util;

import java.util.ArrayList;
import java.util.List;

import org.opsart.event.core.config.ISolrEvent;
import org.opsart.event.core.dto.QueryDTO;
import org.springframework.data.solr.core.query.Criteria;
import org.springframework.data.solr.core.query.FilterQuery;
import org.springframework.data.solr.core.query.SimpleFacetQuery;
import org.springframework.data.solr.core.query.SimpleQuery;
import org.springframework.data.solr.core.query.SimpleStringCriteria;
import org.springframework.data.solr.core.query.result.FacetQueryEntry;

public class SolrQueryUtil {

	//Extra Query
	public static final String QUERY_TEXT = "query";
	public static final String QUERY_PAGE = "page";
	
	//What Filters
	public static final String FILTER_CATEGORY = "category";
	public static final String FILTER_TAGS = "tags";
	public static final String FILTER_PRICE = "price";

	//Where Filters
	public static final String FILTER_COUNTRY = "country";
	public static final String FILTER_CITY = "city";
	public static final String FILTER_LOCALITY = "locality";
	public static final String FILTER_PLACE = "place";
	
	
	// FIXME //TODO Date Time is calculated server side!!! where is the
	// client??!?!?!?!?
	// Generic Range Query: dateStart_dt:[X TO Y] OR (dateStart_dt:[* TO X] AND
	// dateEnd_dt:[X TO *])
	public static final String FQ_TODAY = "dateStart_dt:[NOW/DAY TO NOW/DAY+1DAY] OR (dateStart_dt:[* TO NOW/DAY] AND dateEnd_dt:[NOW/DAY TO *])";
	public static final String FQ_TOMORROW = "dateStart_dt:[NOW+1DAY/DAY TO NOW+1DAY/DAY+2DAYS] OR (dateStart_dt:[* TO NOW+1DAY/DAY] AND dateEnd_dt:[NOW+1DAY/DAY TO *])";
	public static final String FQ_WEEK = "dateStart_dt:[NOW/DAY TO NOW/DAY+7DAYS] OR (dateStart_dt:[* TO NOW/DAY] AND dateEnd_dt:[NOW/DAY TO *])";

	public static final String[] PIVOT_GEO = { ISolrEvent.coordinate, ISolrEvent.address, ISolrEvent.place };

	
	public static boolean isFilterEmpty(QueryDTO query, String filter) {
		return query.get(filter) == null || query.get(filter).isEmpty();
	}
	
	public static SimpleQuery generateFilterQueryByFilter(QueryDTO query, String filter, String solrField) {
		if (query.containsKey(filter)) {
			Criteria criteria = new Criteria(solrField).is(query.get(filter).get(0));
			for (int i = 1; i < query.get(filter).size(); i++) {
				criteria = criteria.or(new Criteria(solrField).is(query.get(filter).get(i)));
			}
			return new SimpleQuery(criteria);
		}
		return new SimpleQuery();
	}
	
	public static SimpleQuery generateFilterQueryByFilterPrice(QueryDTO query, String solrField) {
		if (query.containsKey(FILTER_PRICE)) {
			Criteria criteria = new Criteria(solrField).between(query.get(FILTER_PRICE).get(0).split(" - ")[0], query.get(FILTER_PRICE).get(0).split(" - ")[1]);
			for (int i = 1; i < query.get(FILTER_PRICE).size(); i++) {
				criteria = criteria.or(new Criteria(solrField).between(query.get(FILTER_PRICE).get(0).split(" - ")[i], query.get(FILTER_PRICE).get(i).split(" - ")[1]));
			}
			return new SimpleQuery(criteria);
		}
		return new SimpleQuery();
	}

	public static List<FilterQuery> getFacetQueryTime(QueryDTO query) {
		List<FilterQuery> filters = new ArrayList<>();
		filters.add(new SimpleFacetQuery(new SimpleStringCriteria(FQ_TODAY)));
		filters.add(new SimpleFacetQuery(new SimpleStringCriteria(FQ_TOMORROW)));
		filters.add(new SimpleFacetQuery(new SimpleStringCriteria(FQ_WEEK)));
		return filters;
	}

	public static FilterQuery getFilterQueryTime(QueryDTO query) {
		if(query.containsKey("time")) {
			Criteria criteria = null;
			for(String value : query.get("time")) {
				if("today".equals(value)) {
					criteria = (criteria == null ? new SimpleStringCriteria(FQ_TODAY) : criteria.or(new SimpleStringCriteria(FQ_TODAY)));
				}
				if("tomorrow".equals(value)) {
					criteria = (criteria == null ? new SimpleStringCriteria(FQ_TOMORROW) : criteria.or(new SimpleStringCriteria(FQ_TOMORROW)));
				}
				if("week".equals(value)) {
					criteria = (criteria == null ? new SimpleStringCriteria(FQ_WEEK) : criteria.or(new SimpleStringCriteria(FQ_WEEK)));
				}
			}
			return new SimpleQuery(criteria);
		}
		return null;
	}

	public static String getFilterKeyTime(FacetQueryEntry query) {
		if (FQ_TODAY.equals(query.getKey()))
			return "today";
		else if (FQ_TOMORROW.equals(query.getKey()))
			return "tomorrow";
		else if (FQ_WEEK.equals(query.getKey()))
			return "week";
		else
			return null;
	}

}
