package entity;

import java.util.HashSet;
import java.util.Set;

public class Place implements Comparable<Place>{
	
	private String place_id;
	private String name;
	private String lat;
	private String lot;
	private Set<String> types;
	private String icon_url;
	private double rating;
	
	//Descending sort by rating
	@Override
	public int compareTo(Place o) {
		if(this.getRating() < o.getRating()){
			return 1;
		}else if(this.getRating() == o.getRating()){
			return 0;
		}else{
			return -1;
		}
	}
	
	
	public static class PlaceBuilder {
		private String place_id;
		private String name;
		private String lat;
		private String lot;
		private Set<String> types;  //eg. church, park ...
		private String icon_url;
		private double rating;
		
		public PlaceBuilder() {
			this.types = new HashSet<String>();
		}
		
		public void setPlace_id(String place_id) {
			this.place_id = place_id;
		}

		public void setName(String name) {
			this.name = name;
		}

		public void setLat(String lat) {
			this.lat = lat;
		}

		public void setLot(String lot) {
			this.lot = lot;
		}

		public void setTypes(Set<String> types) {
			this.types = types;
		}

		public void setIcon_url(String icon_url) {
			this.icon_url = icon_url;
		}
		
		public void addTypes(String types) {
			this.types.add(types);
		}
		
		public void setRating(double rating) {
			this.rating = rating;
		}
		
		public Place build() {
			return new Place(this);
		}
		
		
		
		
	}
	
	private Place(PlaceBuilder builder) {
		this.place_id = builder.place_id;
		this.name = builder.name;
		this.lat = builder.lat;
		this.lot = builder.lot;
		this.types = builder.types;
		this.icon_url = builder.icon_url;
		this.types = builder.types;
		this.rating = builder.rating;
	}
	
	
	public String getPlace_id() {
		return place_id;
	}

	public String getName() {
		return name;
	}

	public String getLat() {
		return lat;
	}

	public String getLot() {
		return lot;
	}

	public Set<String> getTypes() {
		return types;
	}

	public String getIcon_url() {
		return icon_url;
	}
	
	public double getRating() {
		return rating;
	}







}
