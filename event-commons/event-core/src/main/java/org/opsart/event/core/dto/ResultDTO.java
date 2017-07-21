package org.opsart.event.core.dto;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.opsart.event.core.dao.EventDAO;

public class ResultDTO {

	private long count;

	private List<EventDAO> events = new ArrayList<>();
	
	private Map<String, List<FacetDTO>> facets = new HashMap<>();

	private List<GeoDTO> geoPoints = new ArrayList<>();
	
	private Collection<String> suggestion;
	
	public Collection<String> getSuggestion() {
		return suggestion;
	}

	public void setSuggestion(Collection<String> suggestion) {
		this.suggestion = suggestion;
	}

	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}

	public List<EventDAO> getEvents() {
		return events;
	}

	public void setEvents(List<EventDAO> events) {
		this.events = events;
	}

	public Map<String, List<FacetDTO>> getFacets() {
		return facets;
	}

	public void setFacets(Map<String, List<FacetDTO>> facets) {
		this.facets = facets;
	}

	public List<GeoDTO> getGeoPoints() {
		return geoPoints;
	}
	
	public void setGeoPoints(List<GeoDTO> geoPoints) {
		this.geoPoints = geoPoints;
	}
}
