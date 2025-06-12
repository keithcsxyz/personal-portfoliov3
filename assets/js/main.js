/**
 * Template Name: Personal - v2.1.0
 * Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
!(function ($) {
  "use strict";

  // Nav Menu
  $(document).on("click", ".nav-menu a, .mobile-nav a", function (e) {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents(".nav-menu, .mobile-nav").length) {
          $(".nav-menu .active, .mobile-nav .active").removeClass("active");
          $(this).closest("li").addClass("active");
        }

        if (hash == "#header") {
          $("#header").removeClass("header-top");
          $("section").removeClass("section-show");
          // Reset AOS animations for header
          if (typeof AOS !== "undefined") {
            setTimeout(function () {
              AOS.refresh();
            }, 100);
          }
          return;
        }

        if (!$("#header").hasClass("header-top")) {
          $("#header").addClass("header-top");
          setTimeout(function () {
            $("section").removeClass("section-show");
            $(hash).addClass("section-show");
            // Enhanced AOS refresh with proper timing
            if (typeof AOS !== "undefined") {
              setTimeout(function () {
                // Reset all AOS elements in the target section
                $(hash).find("[data-aos]").removeClass("aos-animate");
                AOS.refresh();
                // Force re-animation
                setTimeout(function () {
                  $(hash).find("[data-aos]").addClass("aos-animate");
                }, 50);
              }, 100);
            }
          }, 350);
        } else {
          $("section").removeClass("section-show");
          $(hash).addClass("section-show");
          // Enhanced AOS refresh with proper timing
          if (typeof AOS !== "undefined") {
            setTimeout(function () {
              // Reset all AOS elements in the target section
              $(hash).find("[data-aos]").removeClass("aos-animate");
              AOS.refresh();
              // Force re-animation
              setTimeout(function () {
                $(hash).find("[data-aos]").addClass("aos-animate");
              }, 50);
            }, 100);
          }
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
          $(".mobile-nav-overly").fadeOut();
        }

        return false;
      }
    }
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $("#header").addClass("header-top");
      $(".nav-menu .active, .mobile-nav .active").removeClass("active");
      $(".nav-menu, .mobile-nav")
        .find('a[href="' + initial_nav + '"]')
        .parent("li")
        .addClass("active");
      setTimeout(function () {
        $("section").removeClass("section-show");
        $(initial_nav).addClass("section-show");
        // Initialize AOS for the initial section
        if (typeof AOS !== "undefined") {
          setTimeout(function () {
            AOS.refresh();
          }, 100);
        }
      }, 350);
    }
  }

  // Mobile Navigation
  if ($(".nav-menu").length) {
    var $mobile_nav = $(".nav-menu").clone().prop({
      class: "mobile-nav d-lg-none",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
    );
    $("body").append('<div class="mobile-nav-overly"></div>');

    $(document).on("click", ".mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $(".mobile-nav-toggle i").toggleClass(
        "icofont-navigation-menu icofont-close"
      );
      $(".mobile-nav-overly").toggle();
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
          $(".mobile-nav-overly").fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  // Skills section
  $(".skills-content").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    {
      offset: "80%",
    }
  );

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      900: {
        items: 3,
      },
    },
  });

  // Portfolio isotope and filter
  $(window).on("load", function () {
    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });

    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");

      portfolioIsotope.isotope({
        filter: $(this).data("filter"),
      });

      // Refresh AOS after isotope animation
      if (typeof AOS !== "undefined") {
        setTimeout(function () {
          AOS.refresh();
        }, 500);
      }
    });
  });

  // Initiate venobox (lightbox feature used in portfolio)
  $(document).ready(function () {
    $(".venobox").venobox();

    // Enhanced AOS initialization for SPA behavior
    if (typeof AOS !== "undefined") {
      // Override AOS default behavior for this SPA setup
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: false,
        mirror: true, // Allow animations to fire again when scrolling up
        anchorPlacement: "top-bottom",
      });

      // Custom function to handle section-specific AOS animations
      function triggerAOSForSection(sectionId) {
        var $section = $(sectionId);
        if ($section.length) {
          $section.find("[data-aos]").each(function () {
            var $element = $(this);
            var rect = this.getBoundingClientRect();
            var windowHeight = window.innerHeight;

            // If element is in viewport or section is visible, trigger animation
            if (rect.top < windowHeight && rect.bottom > 0) {
              $element.addClass("aos-animate");
            }
          });
        }
      }

      // Observer for section visibility changes
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
          ) {
            var $target = $(mutation.target);
            if ($target.hasClass("section-show")) {
              setTimeout(function () {
                triggerAOSForSection("#" + $target.attr("id"));
              }, 100);
            }
          }
        });
      });

      // Observe all sections for class changes
      $("section").each(function () {
        observer.observe(this, {
          attributes: true,
          attributeFilter: ["class"],
        });
      });
    }
  });
})(jQuery);
