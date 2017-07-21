package org.opsart.event.core.converter;

import java.util.ArrayList;
import java.util.List;

import org.opsart.event.core.config.ISolrEvent;
import org.opsart.event.core.dao.EventDAO;
import org.opsart.event.core.dto.FacetDTO;
import org.opsart.event.core.dto.GeoDTO;
import org.opsart.event.core.dto.ResultDTO;
import org.opsart.event.core.util.SolrQueryUtil;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.Page;
import org.springframework.data.solr.core.query.result.FacetEntry;
import org.springframework.data.solr.core.query.result.FacetFieldEntry;
import org.springframework.data.solr.core.query.result.FacetPage;
import org.springframework.data.solr.core.query.result.FacetPivotFieldEntry;
import org.springframework.data.solr.core.query.result.FacetQueryEntry;
import org.springframework.data.solr.core.query.result.SpellcheckedPage;
import org.springframework.stereotype.Component;

@Component
public class ConverterFacetPage2ResultDTO implements Converter<FacetPage<EventDAO>, ResultDTO> {

	@Override
	public ResultDTO convert(FacetPage<EventDAO> source) {
		ResultDTO target = new ResultDTO();
		
		target.setEvents(source.getContent());
		target.setCount(source.getTotalElements());

		populateFacetField(source, target, SolrQueryUtil.FILTER_CATEGORY, ISolrEvent.category);
		populateFacetField(source, target, SolrQueryUtil.FILTER_TAGS, ISolrEvent.tags);
		populateFacetField(source, target, SolrQueryUtil.FILTER_PLACE, ISolrEvent.place);
		
		populateFacetRangePrice(source,target);
		
		populateGeoPoints(source, target);
		populateFacetQuery(source, target);
		
		if(source instanceof SpellcheckedPage) {
			SpellcheckedPage<EventDAO> spellPage = (SpellcheckedPage<EventDAO>) source;
			target.setSuggestion(spellPage.getSuggestions());
		}
		
		return target;
	}
	
	protected void populateFacetField(FacetPage<EventDAO> source, ResultDTO target, String fieldName, String fieldKey) {
		Page<FacetFieldEntry> facet = source.getFacetResultPage(fieldKey);
		for(FacetEntry entry : facet.getContent()) {
			if(!target.getFacets().containsKey(fieldName)) {
				target.getFacets().put(fieldName, new ArrayList<>());
			}
			target.getFacets().get(fieldName).add(new FacetDTO(entry.getValue(), entry.getValueCount()));
		}
	}
	
	protected void populateGeoPoints(FacetPage<EventDAO> source, ResultDTO target) {
		List<FacetPivotFieldEntry> pivots = source.getPivot(String.join(",", SolrQueryUtil.PIVOT_GEO));
		if(pivots != null) {
			pivots.forEach(pivot -> {
				GeoDTO dto = new GeoDTO();
				dto.setCoordinate(pivot.getValue());
				dto.setCount(pivot.getValueCount());
				if(!pivot.getPivot().isEmpty()) {
					dto.setAddress(pivot.getPivot().get(0).getValue());
					if(!pivot.getPivot().get(0).getPivot().isEmpty()) {
						dto.setPlace(pivot.getPivot().get(0).getPivot().get(0).getValue());
					}
				}
				target.getGeoPoints().add(dto);
			});
		}
	}
	
	protected void populateFacetQuery(FacetPage<EventDAO> source, ResultDTO target) {
		if(source.getFacetQueryResult() != null) {
			target.getFacets().put("time", new ArrayList<>());
			for(FacetQueryEntry entry : source.getFacetQueryResult().getContent()) {
				String filterKey = SolrQueryUtil.getFilterKeyTime(entry);
				if(filterKey != null && entry.getValueCount() > 0) {
					target.getFacets().get("time").add(new FacetDTO(filterKey, entry.getValueCount()));
				}
			}
		}
	}

	protected void populateFacetRangePrice(FacetPage<EventDAO> source, ResultDTO target) {
		if(source.getRangeFacetResultPage(ISolrEvent.price) != null) {
			target.getFacets().put("price", new ArrayList<>());
			for(FacetFieldEntry entry : source.getRangeFacetResultPage(ISolrEvent.price).getContent()) {
				if(entry.getValueCount() > 0) {
					target.getFacets().get("price").add(new FacetDTO((Double.valueOf(entry.getValue()).intValue()) + " - " + (Double.valueOf(entry.getValue()).intValue()+9), entry.getValueCount()));
				}
			}
			if(target.getFacets().get("price").isEmpty()) target.getFacets().remove("price");
		}
		
	}
	
}
