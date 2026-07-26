package com.bookshop.config;

import com.bookshop.entity.Category;
import com.bookshop.entity.Product;
import com.bookshop.entity.User;
import com.bookshop.repository.CategoryRepository;
import com.bookshop.repository.ProductRepository;
import com.bookshop.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, 
                      CategoryRepository categoryRepository, 
                      ProductRepository productRepository, 
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        seedAdminUser();
        seedCategoriesAndProducts();
    }

    private void seedAdminUser() {
        String adminEmail = "admin@smartbookshop.com";
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = User.builder()
                    .firstName("Admin")
                    .lastName("User")
                    .email(adminEmail)
                    .password(passwordEncoder.encode("admin123"))
                    .phone("0771234567")
                    .role("ADMIN")
                    .active(true)
                    .emailVerified(true)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            userRepository.save(admin);
            System.out.println("----------------------------------------");
            System.out.println("Admin user created successfully!");
            System.out.println("Email: " + adminEmail);
            System.out.println("Password: admin123");
            System.out.println("----------------------------------------");
        }
    }

    private void seedCategoriesAndProducts() {
        if (categoryRepository.count() == 0) {
            Category fiction = Category.builder()
                    .name("Fiction")
                    .description("Bestselling fiction novels and literature")
                    .slug("fiction")
                    .active(true)
                    .displayOrder(1)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            Category educational = Category.builder()
                    .name("Educational & Academic")
                    .description("Textbooks, study guides, and reference material")
                    .slug("educational")
                    .active(true)
                    .displayOrder(2)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            Category stationery = Category.builder()
                    .name("Stationery & Office")
                    .description("Pens, notebooks, files, and office supplies")
                    .slug("stationery")
                    .active(true)
                    .displayOrder(3)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            Category studyKits = Category.builder()
                    .name("Study Kits & Packs")
                    .description("Complete study packs for school and college students")
                    .slug("study-kits")
                    .active(true)
                    .displayOrder(4)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            List<Category> savedCategories = categoryRepository.saveAll(Arrays.asList(fiction, educational, stationery, studyKits));
            System.out.println("Seeded " + savedCategories.size() + " categories into MongoDB.");

            if (productRepository.count() == 0) {
                Product book1 = Product.builder()
                        .name("The Great Gatsby")
                        .type("Book")
                        .category(fiction.getId())
                        .description("Classic novel by F. Scott Fitzgerald")
                        .author("F. Scott Fitzgerald")
                        .price(1850.0)
                        .stock(50)
                        .averageRating(4.8)
                        .reviewCount(12)
                        .active(true)
                        .featured(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();

                Product book2 = Product.builder()
                        .name("Advanced Mathematics Guide")
                        .type("Book")
                        .category(educational.getId())
                        .description("Comprehensive guide for Advanced Level mathematics")
                        .author("Dr. K. Perera")
                        .price(2400.0)
                        .stock(35)
                        .averageRating(4.9)
                        .reviewCount(8)
                        .active(true)
                        .featured(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();

                Product penSet = Product.builder()
                        .name("Premium Gel Pen Set (Pack of 10)")
                        .type("Stationary")
                        .category(stationery.getId())
                        .description("Smooth writing 0.5mm gel pens in black and blue")
                        .price(750.0)
                        .stock(100)
                        .averageRating(4.6)
                        .reviewCount(15)
                        .active(true)
                        .featured(false)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();

                Product studyPack = Product.builder()
                        .name("Complete A/L Science Study Pack")
                        .type("Study Pack")
                        .category(studyKits.getId())
                        .description("Includes past papers, model answers, 5 notebooks, and gel pen set")
                        .price(5500.0)
                        .stock(20)
                        .averageRating(5.0)
                        .reviewCount(6)
                        .active(true)
                        .featured(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();

                List<Product> savedProducts = productRepository.saveAll(Arrays.asList(book1, book2, penSet, studyPack));
                System.out.println("Seeded " + savedProducts.size() + " products into MongoDB.");
            }
        }
    }
}

