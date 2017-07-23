package org.opsart.event.core.converter;

import org.opsart.event.core.config.ISolrEvent;
import org.opsart.event.core.dto.QueryDTO;
import org.opsart.event.core.util.SolrQueryUtil;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.solr.core.query.Criteria;
import org.springframework.data.solr.core.query.FacetOptions;
import org.springframework.data.solr.core.query.FacetOptions.FieldWithNumericRangeParameters;
import org.springframework.data.solr.core.query.FacetQuery;
import org.springframework.data.solr.core.query.SimpleFacetQuery;
import org.springframework.data.solr.core.query.SimpleStringCriteria;
import org.springframework.data.solr.core.query.SolrPageRequest;
import org.springframework.stereotype.Component;

@Component
public class ConverterQueryDTO2FacetQuery implements Converter<QueryDTO, FacetQuery> {

	private static final int EVENT_SIZE = 10;
	
	@Override
	public FacetQuery convert(QueryDTO source) {
		
		//Facet Query (for SOLR)
		FacetQuery target;
		
		//Query
		if(!SolrQueryUtil.isFilterEmpty(source, SolrQueryUtil.QUERY_TEXT)) {
			target = new SimpleFacetQuery(new Criteria(ISolrEvent.searchField).contains(source.get(SolrQueryUtil.QUERY_TEXT).get(0)));
		} else {
			target = new SimpleFacetQuery(new SimpleStringCriteria("*:*"));
		}
		
		//Pagination
		if(!SolrQueryUtil.isFilterEmpty(source, SolrQueryUtil.QUERY_PAGE)) {
			target.setPageRequest(new SolrPageRequest(Integer.parseInt(source.get(SolrQueryUtil.QUERY_PAGE).get(0)), EVENT_SIZE));
		} else {
			target.setPageRequest(new SolrPageRequest(0, EVENT_SIZE));
		}
		
		//SpellCheck
//		target.setSpellcheckOptions(SpellcheckOptions.spellcheck());
		
		//Filtering based on Query
		populateFilterQuery(source, target);
		
		//Faceting Default
		target.setFacetOptions(new FacetOptions(ISolrEvent.category));
		target.getFacetOptions().setFacetMinCount(0);
		target.getFacetOptions().setFacetLimit(50);
		
		//Faceting Extra
		populateFacetWhat(source, target);
		populateFacetWhen(source,target);
		populateFacetWhere(source,target);
		
		
//		populateGeneric(source, target);
//		populateFacet(source, target);
//		populateFilterQuery(source, target);
		
		
		return target;
	}
	
	
	protected void populateFilterQuery(QueryDTO source, FacetQuery target) {

		//What
		target.addFilterQuery(SolrQueryUtil.generateFilterQueryByFilter(source, SolrQueryUtil.FILTER_CATEGORY, ISolrEvent.category));
		target.addFilterQuery(SolrQueryUtil.generateFilterQueryByFilterPrice(source, ISolrEvent.price));
		
		//Where
		target.addFilterQuery(SolrQueryUtil.generateFilterQueryByFilter(source, SolrQueryUtil.FILTER_COUNTRY, ISolrEvent.country));
		target.addFilterQuery(SolrQueryUtil.generateFilterQueryByFilter(source, SolrQueryUtil.FILTER_CITY, ISolrEvent.city));
		target.addFilterQuery(SolrQueryUtil.generateFilterQueryByFilter(source, SolrQueryUtil.FILTER_PLACE, ISolrEvent.place));
		
		//When
		if(SolrQueryUtil.getFilterQueryTime(source) != null) {
			target.addFilterQuery(SolrQueryUtil.getFilterQueryTime(source));
		}
		
	}

	protected void populateFacetWhat(QueryDTO source, FacetQuery target) {
		FacetOptions facets = target.getFacetOptions();
		
		//Faceting on Price
		facets.addFacetByRange(new FieldWithNumericRangeParameters(ISolrEvent.price, 1, 200, 20));
		
	}
	
	protected void populateFacetWhen(QueryDTO source, FacetQuery target) {
		FacetOptions facets = target.getFacetOptions();
		SolrQueryUtil.getFacetQueryTime(source).forEach(filter -> { facets.addFacetQuery(filter); });
	}
	
	protected void populateFacetWhere(QueryDTO source, FacetQuery target) {
		FacetOptions facets = target.getFacetOptions();

		//Faceting for map
		facets.addFacetOnPivot(SolrQueryUtil.PIVOT_GEO);

		//Filtering by place
		if(!SolrQueryUtil.isFilterEmpty(source, SolrQueryUtil.FILTER_PLACE)) {
			facets.addFacetOnField(ISolrEvent.place);
//		} else if(!SolrQueryUtil.isFilterEmpty(source, SolrQueryUtil.FILTER_LOCALITY)) {
//			facets.addFacetOnField(ISolrEvent.place);
		} else if(!SolrQueryUtil.isFilterEmpty(source, SolrQueryUtil.FILTER_CITY)) {
			facets.addFacetOnField(ISolrEvent.place);
		} else if(!SolrQueryUtil.isFilterEmpty(source, SolrQueryUtil.FILTER_COUNTRY)) {
			facets.addFacetOnField(ISolrEvent.city);
		} else {
			facets.addFacetOnField(ISolrEvent.country);
		}
		
	}

	
//	protected void populateFacet(QueryDTO source, FacetQuery target) {
//		
//		//WHAT
//		facets.addFacetOnField(ISolrEvent.category);
//		facets.addFacetOnField(ISolrEvent.tags);
//		
//		//WHERE
//		if(source.get(ISolrEvent.place) != null) {
//			facets.addFacetOnField(ISolrEvent.place);
//			facets.addFacetOnField(ISolrEvent.zone);
//		} else if(source.get(ISolrEvent.locality) != null) {
//			facets.addFacetOnField(ISolrEvent.place);
//		} else if(source.get(ISolrEvent.city) != null) {
//			facets.addFacetOnField(ISolrEvent.locality);
//		} else if(source.get(ISolrEvent.country) != null) {
//			facets.addFacetOnField(ISolrEvent.city);
//		} else {
//			facets.addFacetOnField(ISolrEvent.country);
//		}
//		
//		
//		//Pivot
//		//Query
//		SolrQueryUtil.getFacetQueryTime(source).forEach(filter -> { facets.addFacetQuery(filter); });
//		//Range
////		facets.addFacetByRange(new FieldWithNumericRangeParameters(ISolrEvent.price, 1, 200, 10));
//		
//		//End
//		target.setFacetOptions(facets);
//	}
	
}
