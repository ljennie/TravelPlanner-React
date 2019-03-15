package entity;

import java.util.List;
import java.util.Set;

public class Place {
	
	private String place_id;
	private String name;
	private String lat;
	private String lot;
	private List<String> types;
	private String icon_url;
	
	
	public static class PlaceBuilder {
		private String place_id;
		private String name;
		private String lat;
		private String lot;
		private List<String> types;  //eg. church, park ...
		private String icon_url;
		
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

		public void setTypes(List<String> types) {
			this.types = types;
		}

		public void setIcon_url(String icon_url) {
			this.icon_url = icon_url;
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

	public List<String> getTypes() {
		return types;
	}

	public String getIcon_url() {
		return icon_url;
	}




}
