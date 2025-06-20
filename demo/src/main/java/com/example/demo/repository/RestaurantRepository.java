package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Restaurant;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
  boolean existsByNameAndZip(String name, String zip);
  List<Restaurant> findByZipAndPeanutScoreIsNotNullOrderByPeanutScoreDesc(String zip);
  List<Restaurant> findByZipAndEggScoreIsNotNullOrderByEggScoreDesc(String zip);
  List<Restaurant> findByZipAndDairyScoreIsNotNullOrderByDairyScoreDesc(String zip);
}
