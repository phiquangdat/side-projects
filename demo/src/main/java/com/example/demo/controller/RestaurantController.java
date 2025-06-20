package com.example.demo.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.controller.RestaurantController.RestaurantDto;
import com.example.demo.model.Restaurant;
import com.example.demo.repository.RestaurantRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {
  private final RestaurantRepository restaurantRepository;

  public RestaurantController(RestaurantRepository restaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }

  @PostMapping
  public ResponseEntity<?> createRestaurant(@RequestBody @Valid RestaurantDto dto) {
    if (restaurantRepository.existsByNameAndZip(dto.getName(), dto.getZip())) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body("Restaurant with the same name and zip exists");
    }
    Restaurant restaurant = new Restaurant();
    restaurant.setName(dto.getName());
    restaurant.setAddress(dto.getAddress());
    restaurant.setCity(dto.getCity());
    restaurant.setState(dto.getState());
    restaurant.setZip(dto.getZip());
    restaurantRepository.save(restaurant);
    return ResponseEntity.status(HttpStatus.CREATED).body(new RestaurantDto(restaurant));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getRestaurant(@PathVariable Long id) {
    Optional<Restaurant> restaurant = restaurantRepository.findById(id);
    if (restaurant.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Restaurant not found");
    }
    return ResponseEntity.ok(new RestaurantDto(restaurant.get()));
  }

  @GetMapping("/search")
  public ResponseEntity<?> searchRestaurants(@RequestParam String zip, @RequestParam String allergy) {
    List<Restaurant> results;
    switch(allergy.toLowerCase()) {
      case "peanut":
        results = restaurantRepository.findByZipAndPeanutScoreIsNotNullOrderByPeanutScoreDesc(zip);
        break;
      case "egg":
        results = restaurantRepository.findByZipAndEggScoreIsNotNullOrderByEggScoreDesc(zip);
        break;
      case "dairy":
        results = restaurantRepository.findByZipAndDairyScoreIsNotNullOrderByDairyScoreDesc(zip);
        break;
      default:
        return ResponseEntity.badRequest().body("Invalid allergy type");
    }
    List<RestaurantDto> dtos = results.stream().map(RestaurantDto::new).collect(Collectors.toList());
    return ResponseEntity.ok(dtos);
  }

  public static class RestaurantDto {
    private Long id;
    private String name;
    private String address;
    private String city;
    private String state;
    private String zip;
    private Double peanutScore;
    private Double eggScore;
    private Double dairyScore;
    private Double overallScore;

    public RestaurantDto() {}
    public RestaurantDto(Restaurant r) {
      this.id = r.getId();
      this.name = r.getName();
      this.address = r.getAddress();
      this.city = r.getCity();
      this.state = r.getState();
      this.zip = r.getZip();
      this.peanutScore = formatScore(r.getPeanutScore());
      this.eggScore = formatScore(r.getEggScore());
      this.dairyScore = formatScore(r.getDairyScore());
      this.overallScore = formatScore(r.getOverallScore());
    }
    private Double formatScore(Double score) {
      if (score == null) return null;
      return Math.round(score * 100.0) / 100.0;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getZip() { return zip; }
    public void setZip(String zip) { this.zip = zip; }
    public Double getPeanutScore() { return peanutScore; }
    public void setPeanutScore(Double peanutScore) { this.peanutScore = peanutScore; }
    public Double getEggScore() { return eggScore; }
    public void setEggScore(Double eggScore) { this.eggScore = eggScore; }
    public Double getDairyScore() { return dairyScore; }
    public void setDairyScore(Double dairyScore) { this.dairyScore = dairyScore; }
    public Double getOverallScore() { return overallScore; }
    public void setOverallScore(Double overallScore) { this.overallScore = overallScore; }
  }
}
